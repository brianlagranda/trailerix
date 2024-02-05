import React from 'react';
import { VideoPlayerProps } from '../types/VideoPlayerTypes';

const VideoPlayer: React.FC<VideoPlayerProps> = ({
    selectedVideo,
    closeVideo,
}) => {
    return (
        selectedVideo && (
            <div
                className="bg-black/80 fixed top-0 left-0 w-full h-full flex justify-center items-center cursor-pointer"
                onClick={closeVideo}
            >
                <div className="w-3/4 h-3/4 rounded-lg">
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
