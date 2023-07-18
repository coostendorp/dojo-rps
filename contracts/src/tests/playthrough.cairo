use traits::{Into, TryInto};
use core::result::ResultTrait;
use array::{ArrayTrait, SpanTrait};
use option::OptionTrait;
use box::BoxTrait;
use clone::Clone;
use debug::PrintTrait;

use starknet::{ ContractAddressIntoFelt252, contract_address_const};

use starknet::{ContractAddress, syscalls::deploy_syscall};
use starknet::class_hash::{ClassHash, Felt252TryIntoClassHash};
use dojo::database::query::{IntoPartitioned, IntoPartitionedQuery};
use dojo::interfaces::{
    IComponentLibraryDispatcher, IComponentDispatcherTrait, ISystemLibraryDispatcher,
    ISystemDispatcherTrait
};
use dojo::world::{IWorldDispatcher, IWorldDispatcherTrait};

use dojo::test_utils::spawn_test_world;

use dojo_rps::components::game::{game, Game};
use dojo_rps::systems::create::create;
use dojo_rps::systems::commit::commit;

use dojo_rps::utils::hash_commit;

use dojo_rps::constants::{
    STATE_IDLE,STATE_COMMIT_1,STATE_COMMIT_2,STATE_REVEAL_1, ROCK, PAPER, SCISSORS
};

use dojo_rps::tests::create::create_game;


fn player_commit(
    world: IWorldDispatcher,
    game_id: u32,
    hash: felt252
){
    let mut player_commit_calldata = array::ArrayTrait::<felt252>::new();
    player_commit_calldata.append(game_id.into());
    player_commit_calldata.append(hash);

    world.execute('commit'.into(), player_commit_calldata.span());
}

fn player_reveal(
    world: IWorldDispatcher,
    game_id: u32,
    hash: felt252,
    commit: u8,
    salt: felt252
){
    let mut player_commit_calldata = array::ArrayTrait::<felt252>::new();
    player_commit_calldata.append(game_id.into());
    player_commit_calldata.append(hash);
    player_commit_calldata.append(commit.into());
    player_commit_calldata.append(salt);

    world.execute('reveal'.into(), player_commit_calldata.span());
}

#[test]
#[available_gas(100000000)]
fn test_playthrough() {
    let player1 = starknet::contract_address_const::<0x1337>();
    let player2 = starknet::contract_address_const::<0x1338>();

    // Initialize the Game with player 1
    let (world_address, game_id, player_id) = create_game();
    let world = IWorldDispatcher { contract_address: world_address };

    // Set the players commitments
    let player_1_commit: u8 = SCISSORS;
    let player_2_commit: u8 = PAPER;

    // Set the player's secret salt. For the test its just different, client will send truly random
    let player_1_salt: felt252 = '0'.into();
    let player_2_salt: felt252 = '1'.into();

    // Precompute the player's hashes of the commitment
    let player_1_hash: felt252 = hash_commit(player_1_commit, player_1_salt);
    let player_2_hash: felt252 = hash_commit(player_2_commit, player_2_salt);

    // Make player1 the caller
    starknet::testing::set_contract_address(player1);

    // Player 1 commits
    player_commit(world, game_id, player_1_hash);

    // Make player2 the caller
    starknet::testing::set_contract_address(player2);

    // Player 2 commits
    player_commit(world, game_id, player_2_hash);

    // Make player1 the caller
    starknet::testing::set_contract_address(player1);

    // Player 1 reveals
    player_reveal(
        world,
        game_id,
        player_1_hash,
        player_1_commit,
        player_1_salt
    );

    // Make player2 the caller
    starknet::testing::set_contract_address(player2);

    // Player 2 reveals
    player_reveal(
        world,
        game_id,
        player_1_hash,
        player_2_commit,
        player_2_salt
    );

    // TODO Event with winner?




}

