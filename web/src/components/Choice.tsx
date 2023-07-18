import clsx from "clsx";

type PropType = {
    image: string,
    handSign?: string,
    isSelected?: boolean,
    onSelect?: () => void,
}

export default function Choice({ image, handSign, isSelected, onSelect }: PropType) {
    return (
        <div className={'flex flex-col gap-2'}>
            <div
                className={clsx(
                    'flex justify-center items-center',
                    'h-[183px] w-[183px]',
                    'rounded-full',
                    'bg-option-6',
                    `${handSign ? 'cursor-pointer' : ''}`,
                    { 'border-4': isSelected },
                )}
                onClick={onSelect}
            >
                <img src={image} alt={'hand_sign'} draggable={false} />
            </div>
            <p className={'text-option-2 text-[20px] text-center font-noto capitalize'}>{handSign}</p>
        </div>
    )
}
