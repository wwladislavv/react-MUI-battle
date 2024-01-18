import type { DotLottieCommonPlayer } from '@dotlottie/react-player';
import { DotLottiePlayer, PlayerEvents } from '@dotlottie/react-player';
import type { CSSProperties, Ref } from 'react';
import React, { forwardRef } from 'react';

import { isFunction } from '../../utils/type-check';

type Props = {
    onPlayerReady: () => void;
    src: string;
    speed?: number;
    style?: CSSProperties;
    loop?: boolean;
};

const AnimationPlayer = (
    { onPlayerReady, src, speed = 1, style, loop = true }: Props,
    lottieRef: Ref<DotLottieCommonPlayer | null> | undefined,
) => {
    const handleEvent = (event: PlayerEvents) => {
        if (event === PlayerEvents.Ready) {
            if (isFunction(onPlayerReady)) {
                onPlayerReady();
            }
        }
    };

    return (
        <DotLottiePlayer
            style={style}
            ref={lottieRef}
            src={src}
            onEvent={handleEvent}
            speed={speed}
            loop={loop}
        />
    );
};

export default forwardRef(AnimationPlayer);
