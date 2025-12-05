import React, { useState, useRef, useEffect } from 'react';
import { BACKGROUND_MUSIC_URL } from '../constants';

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    // Optional: Try auto-play with low volume
    if (audioRef.current) {
        audioRef.current.volume = 0.3;
    }
  }, []);

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <audio ref={audioRef} src={BACKGROUND_MUSIC_URL} loop />
      
      <button
        onClick={togglePlay}
        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-2 border-tet-gold transition-all duration-300 ${
          isPlaying ? 'bg-tet-red animate-spin-slow' : 'bg-gray-800'
        }`}
        title={isPlaying ? "Tắt nhạc" : "Bật nhạc Tết"}
      >
        {isPlaying ? (
          <span className="text-2xl">🎵</span>
        ) : (
          <span className="text-2xl grayscale">🔇</span>
        )}
      </button>
      
      {/* Sound wave visualizer (fake) */}
      {isPlaying && (
        <div className="absolute left-14 bottom-2 flex gap-1 h-8 items-end">
           <div className="w-1 bg-tet-gold animate-bounce" style={{ animationDuration: '0.6s' }}></div>
           <div className="w-1 bg-tet-gold animate-bounce" style={{ animationDuration: '0.8s' }}></div>
           <div className="w-1 bg-tet-gold animate-bounce" style={{ animationDuration: '0.5s' }}></div>
           <div className="w-1 bg-tet-gold animate-bounce" style={{ animationDuration: '0.9s' }}></div>
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
