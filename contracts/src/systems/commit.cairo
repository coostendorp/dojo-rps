#[system]
mod commit {
    use debug::PrintTrait;


    use array::ArrayTrait;
    use box::BoxTrait;
    use traits::{Into, TryInto};

    use dojo::world::Context;
    use dojo_rps::events::{emit, GameCreated};
    use dojo_rps::components::game::Game;
    use dojo_rps::components::player::Player;

    use dojo_rps::constants::{
        STATE_IDLE,STATE_COMMIT_1,STATE_COMMIT_2,STATE_REVEAL_1,GAME_MAX_DURATION
    };

    use dojo_rps::utils::random;

    fn execute(
        ctx: Context,
        game_id: u32,
        hashed_commit: felt252
    ) -> () {

        // Retrieve Game and Player
        let mut game = get !(ctx.world, game_id.into(), Game);
        let player_id: felt252 = ctx.origin.into();

        // Handle game state
        if game.state == STATE_IDLE {
            game.player1 = player_id;
            game.player1_hash = hashed_commit;
            game.state = STATE_COMMIT_1;
            game.started_timestamp = starknet::get_block_timestamp();

        }else if game.state == STATE_COMMIT_1 {

            // Ensure the second player is different
            assert(game.player1 != player_id, 'Player cannot commit twice');

            // Commitment for player 2
            game.player2 = player_id;
            game.player2_hash = hashed_commit;
            game.state = STATE_COMMIT_2;

        }

        // Store the Game
        set !(
            ctx.world,
            game_id.into(),
            (Game {
                game_id: game.game_id,
                state: game.state,
                player1: game.player1,
                player2: game.player2,
                player1_hash: game.player1_hash,
                player2_hash: game.player2_hash,
                player1_commit: game.player1_commit,
                player2_commit: game.player2_commit,
                started_timestamp: game.started_timestamp,
                winner: game.winner
            })
        );

    }
}
