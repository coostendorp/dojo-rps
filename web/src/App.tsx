// import {useDojo} from './DojoContext';
// import {useComponentValue} from "@dojoengine/react";
// import {Direction} from './dojo/createSystemCalls'
// import {Utils} from '@dojoengine/core';
import clsx from "clsx";
import GamePanel from "./components/GamePanel.tsx";
import useSyncEvents from "./hooks/useSyncEvents";

function App() {
    useSyncEvents()

    return (
       <div className={clsx(
           'w-screen h-screen',
           'flex justify-center items-center',
           'bg-gradient-to-b from-[#007795] to-[#1F215C]'
       )}>
           <img
               src={'/left_dojoCut.png'}
               alt={'left'}
               className={'absolute top-0 left-[85px]'}
               draggable={false}
           />
           <img
               src={'/right_dojoCut.png'}
               alt={'right'}
               className={'absolute top-0 right-[85px]'}
               draggable={false}
           />
           <img
               src={'/top_dojoCut.png'}
               alt={'right'}
               className={'absolute top-0'}
               draggable={false}
           />
           <img
               src={'/img_logo.png'}
               alt={'right'}
               className={'absolute top-[42px]'}
               draggable={false}
           />
           <div className={clsx(
               'w-[1330px] h-[807px] absolute top-[114px]',
               'flex p-8 gap-6 z-[50]',
               'rounded-3xl border-4 border-option-3',
               'bg-game-panel bg-no-repeat bg-cover',
           )}>
               <GamePanel />
           </div>
       </div>
    );
}

export default App;
