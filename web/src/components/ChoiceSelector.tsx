import Choice from "./Choice";
import {GAME_ID, PAPER, ROCK, SCISSORS, STATE_COMMIT_2, STATE_IDLE, STATE_REVEAL_1} from "../global/constants";
import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import {poseidonHashMany} from "micro-starknet";
import useSaltGenerator from "../hooks/useSaltGenerator";
import {useDojo} from "../DojoContext";
import {useComponentValue} from "@dojoengine/react";
import {Utils} from "@dojoengine/core";
import {OptionType} from "../global/types";

const commits = [
  {
    label: 'rock',
    value: ROCK
  },
  {
    label: 'paper',
    value: PAPER,
  },
  {
    label: 'scissors',
    value: SCISSORS
  }
]

const ChoiceSelector = () => {
  const [option, setOption] = useLocalStorage('RPS_COMMIT', 0)
  const { salt, changeSalt } = useSaltGenerator()

  const {
    systemCalls: { commit, reveal },
    components: { Game },
    network: { signer }
  } = useDojo()


  const handleSelectedChoice = (value: number) => {
    if (option) return
    changeSalt()
    const hashedCommit = poseidonHashMany([BigInt(value), BigInt(salt)])
    commit(GAME_ID, hashedCommit).then()
    setOption(value)
  }

  const game = useComponentValue(Game, Utils.getEntityIdFromKeys([BigInt(GAME_ID)]))
  const gameStatus = game?.state ?? 0

  const isUserPlayer1 = BigInt(game?.player1 ?? 0) === BigInt(signer.address)

  const player1Choice = game?.player1_commit ?? 0
  const player2Choice = game?.player2_commit ?? 0

  const playerChoice = isUserPlayer1 ? player1Choice : player2Choice

  /// reveal when ready
  React.useEffect(() => {
    if (gameStatus !== STATE_COMMIT_2 && gameStatus !== STATE_REVEAL_1) return
    if (playerChoice) return
    const hashedCommit = poseidonHashMany([BigInt(option), BigInt(salt)])
    reveal(GAME_ID, hashedCommit, option as OptionType, salt).then()
  }, [gameStatus, playerChoice])

  /// reset commit when option is 0
  React.useEffect(() => {
    if (gameStatus === STATE_IDLE) setOption(0)
  }, [gameStatus])

  return (
    <>
      {
        commits.map(({label, value}) => {
          return (
            <Choice
              key={value}
              image={`icon_${label}.png`}
              handSign={label}
              isSelected={option === value}
              onSelect={() => handleSelectedChoice(value)}
            />
          )
        })
      }
    </>
  )
}

export default ChoiceSelector