import React from 'react';
import { VideoPlayerProps } from '../types/VideoPlayerTypes';

const VideoPlayer: React.FC<VideoPlayerProps> = ({
    selectedVideo,
    closeVideo,
}) => {
    return (
        selectedVideo && (
            <div
                className="fixed left-0 top-0 flex h-full w-full cursor-pointer items-center justify-center bg-black/80"
                onClick={closeVideo}
            >
                <div className="h-3/4 w-3/4 rounded-lg">
                    <iframe
                        className="rounded-lg"
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${selectedVideo}`}
                        title="YouTube video player"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        )
    );
};

export default VideoPlayer;
