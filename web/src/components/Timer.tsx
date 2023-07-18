import React from "react";
import {useComponentValue} from "@dojoengine/react";
import {Utils} from "@dojoengine/core";
import {GAME_ID, GAME_MAX_DURATION} from "../global/constants";
import {useDojo} from "../DojoContext";

const Timer = () => {
  const {
    components: { Game },
  } = useDojo()

  const game = useComponentValue(Game, Utils.getEntityIdFromKeys([BigInt(GAME_ID)]))
  const [remainingTime, setRemainingTime] = React.useState<number>(0)

  const startedTimestamp = game?.started_timestamp ?? 0

  React.useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Math.floor(Date.now() / 1000)
      const timeDifference = startedTimestamp + GAME_MAX_DURATION - currentTime

      if (timeDifference > 0) {
        setRemainingTime(timeDifference)
      } else {
        setRemainingTime(0)
        clearInterval(interval)
      }
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [startedTimestamp])

  return (
    <p className={'text-option-2 text-[18px] font-noto'}>Time's up in {remainingTime}...</p>
  )
}

export default Timer