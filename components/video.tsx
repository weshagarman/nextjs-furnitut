'use client';
import dynamic from 'next/dynamic';
import { Image } from '@crystallize/reactjs-components';
interface VideoMetadata {
    title?: string;
    description?: string;
}

const ReactPlayer = dynamic(() => import('react-player/lazy').then((ReactPlayer) => ReactPlayer), {
    ssr: false,
});

export const Video = ({
    playlists,
    thumbnails,
    options,
    tracks,
}: {
    playlists?: any;
    thumbnails?: any;
    options?: any;
    tracks?: any;
}) => {
    const defaultOptions = {
        width: '100%',
        height: '100%',
        playing: true,
        muted: true,
        loop: true,
        volume: 0,
        playsinline: true,
    };
    const defaultConfig = {
        file: {
            attributes: {
                crossOrigin: 'true',
            },
            tracks: tracks || [],
        },
    };
    return (
        <div className="bg-soft">
            <ReactPlayer
                url={playlists[1]}
                fallback={
                    <div className="w-full h-full flex items-center justify-center">
                        <Image src={thumbnails?.[0]?.url} alt={thumbnails?.[0]?.altText} />
                    </div>
                }
                {...{ ...defaultOptions, ...options }}
                config={defaultConfig}
            />
        </div>
    );
};

export default Video;

// 'use client';

// export const Video = (video: any, { className }: { className: string }) => {
//     return <div className={`${className}`}>Video here</div>;
// };
