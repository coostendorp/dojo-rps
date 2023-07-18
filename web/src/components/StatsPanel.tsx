import useLogs from "../hooks/useLogs";
import {useDojo} from "../DojoContext";
import {useComponentValue} from "@dojoengine/react";
import {Utils} from "@dojoengine/core";
import {GAME_ID} from "../global/constants";

const StatsPanel = () => {
  const {
    battleLogs,
    totalGames,
  } = useLogs()

  const {
    components: { Game, Player },
  } = useDojo()


  const game = useComponentValue(Game, Utils.getEntityIdFromKeys([BigInt(GAME_ID)]))

  const player1 = useComponentValue(Player, Utils.getEntityIdFromKeys([BigInt(game?.player1 ?? 0)]))
  const player2 = useComponentValue(Player, Utils.getEntityIdFromKeys([BigInt(game?.player2 ?? 0)]))

  return (
    <>
      <div className={'p-8 rounded-3xl border-2 border-option-5 bg-option-6 text-start'}>
        <p className={'text-[36px] text-option-2 font-oswald mb-2'}>Stats</p>
        <p className={'text-[18px] text-option-1 font-noto mb-1'}>Total Games: {totalGames}</p>
        <p className={'text-[20px] text-option-2 font-bold'}>
          Player1 : <span className={'text-option-1 ml-1'}>{player1?.wins ?? 0} Wins</span>
        </p>
        <p className={'text-[20px] text-option-2 font-bold'}>
          Player2 : <span className={'text-option-1 ml-1'}>{player2?.wins ?? 0} Wins</span>
        </p>
      </div>
      <div className={'p-8 h-full rounded-3xl border-2 border-option-5 bg-option-6 text-start'}>
        <p className={'text-[36px] text-option-2 font-oswald mb-2'}>History</p>
        {
          battleLogs.length > 0 && battleLogs.map((data, index) => {
            if (data.player === "0") return (
              <p key={index} className={'text-[18px] text-option-1 font-noto'}>Draw! Both players chose {data.selectedChoice} </p>
            )
            return (
              <p key={index} className={'text-[18px] text-option-1 font-noto'}>Player {data.player} won with {data.selectedChoice} </p>
            )
          })
        }
      </div>
    </>
  )
}

export default StatsPanel