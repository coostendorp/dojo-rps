import React from "react";
import {useDojo} from "../DojoContext";
import {useComponentValue} from "@dojoengine/react";
import {Utils} from "@dojoengine/core";
import {commits, GAME_ID, STATE_DECIDED} from "../global/constants";

const useLogs = () => {
    const [battleLogs, setBattleLogs] = React.useState<Array<{selectedChoice: string, player: string}>>([]);
    const [totalGames, setTotalGames] = React.useState<number>(0)

    const {
        components: { Game },
        systemCalls: { reset }
    } = useDojo()

    const game = useComponentValue(Game, Utils.getEntityIdFromKeys([BigInt(GAME_ID)]))
    const gameWinner = game?.winner ?? 0
    const gameStatus = game?.state ?? 0

    React.useEffect(() => {
        if (gameStatus !== STATE_DECIDED) return
        setTotalGames(prevTotalGames => prevTotalGames + 1)
        const winningChoice = (gameWinner === 1 ? game?.player1_commit : game?.player2_commit) ?? 0
        const selectedChoice = commits[winningChoice]
        setBattleLogs(prevBattleLogs => {
            return [
              ...prevBattleLogs,
                {
                    player: gameWinner.toString(),
                    selectedChoice
                }
            ]
        })
        reset(GAME_ID).then()
    }, [gameStatus, gameWinner])

    return {
        battleLogs,
        totalGames,
    }
}

export default useLogs