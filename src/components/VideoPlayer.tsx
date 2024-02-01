import React from 'react';
import { VideoPlayerProps } from '../types/VideoPlayerTypes';

const VideoPlayer: React.FC<VideoPlayerProps> = ({
    selectedVideo,
    closeVideo,
}) => {
    return (
        selectedVideo && (
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={closeVideo}>
                        &times;
                    </span>
                    <iframe
                        width="560"
                        height="315"
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
