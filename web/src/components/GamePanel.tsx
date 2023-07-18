import React from "react";
import clsx from "clsx";
import Choice from "./Choice.tsx";
import {useDojo} from "../DojoContext";
import {commits, GAME_ID} from "../global/constants";
import {useComponentValue} from "@dojoengine/react";
import {Utils} from "@dojoengine/core";
import useGameStatus from "../hooks/useGameStatus";
import Timer from "./Timer";
import ChoiceSelector from "./ChoiceSelector";
import StatsPanel from "./StatsPanel";

export default function GamePanel() {
    const {
        components: { Game },
        network: { signer }
    } = useDojo()


    const game = useComponentValue(Game, Utils.getEntityIdFromKeys([BigInt(GAME_ID)]))

    const isUserPlayer1 = BigInt(game?.player1 ?? 0) === BigInt(signer.address)

    const player1Choice = game?.player1_commit ?? 0
    const player2Choice = game?.player2_commit ?? 0

    const opponentChoice = isUserPlayer1 ? player2Choice : player1Choice

    const statusText = useGameStatus()

    return (
        <React.Fragment>
            <div className={'flex flex-col w-9/12 gap-2'}>
                <div className={clsx(
                    'flex w-full p-6',
                    'rounded-3xl border-2 border-option-5',
                    'bg-option-6'
                )}>
                    <p className={'text-[36px] text-option-2 font-oswald'}>
                        Status : <span className={'text-[28px] text-option-1 font-noto'}>{statusText}</span>
                    </p>
                </div>
                <div className={'flex flex-col items-center w-full h-full gap-5'}>
                    <div className={'mt-8'}>
                        <p className={'text-option-2 text-[20px] font-noto text-center mb-4'}>Opponent Choice</p>
                        {opponentChoice === 0 && <Choice image={'icon_questionMark.png'} />}
                        {opponentChoice !== 0 && <Choice
                          image={`icon_${commits[opponentChoice].toLowerCase()}.png`}
                          handSign={commits[opponentChoice]}
                        />}
                    </div>
                    <div>
                        <div className={'mb-4 text-center'}>
                            <p className={'text-option-1 text-[28px] font-noto'}>Choose your hand</p>
                            <Timer />
                            {/*<p className={'text-option-2 text-[36px] font-oswald'}>YOU WIN!</p>*/}
                        </div>
                        <div className={'flex gap-20'}>
                            <ChoiceSelector />
                        </div>
                    </div>
                </div>
            </div>
            <div className={'flex flex-col gap-6 w-3/12'}>
                <StatsPanel />
            </div>
        </React.Fragment>
    )
}
