// components/VideoYoutube.tsx
import React from 'react';
import {getIframeSrc} from "@/utils/videoConstants";

interface VideoProps {
    videoId: string;
    autoplay?: boolean;
    mute?: boolean;
    controls?: boolean;
    loop?: boolean;
    height?: string;  // Allows custom height via props
}

const VideoYoutube: React.FC<VideoProps> = ({
                                                videoId,
                                                autoplay = true,
                                                mute = true,
                                                controls = false,
                                                loop = true,
                                                height = '402px', // Default height
                                            }) => {
    const iframeSrc = getIframeSrc(videoId, autoplay, mute, controls, loop);

    return (
        <div className="relative w-full" style={{height, position: 'relative', paddingBottom: '56.25%'}}>
            <iframe
                src={iframeSrc}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
                style={{pointerEvents: 'none'}} // Disables interaction
            />
        </div>
    );
};

export default VideoYoutube;