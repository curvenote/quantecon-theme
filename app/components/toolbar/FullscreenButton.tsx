import { Maximize, Minimize } from 'lucide-react';
import { useCallback, useState } from 'react';

export function FullScreenButton({ size }: { size: number }) {
  const [fullScreen, setFullScreen] = useState(false);
  const handleFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setFullScreen(false);
    } else {
      document.documentElement.requestFullscreen();
      setFullScreen(true);
    }
  }, []);
  return (
    <>
      {fullScreen && (
        <Minimize
          className="cursor-pointer opacity-60 hover:scale-110"
          width={size}
          height={size}
          onClick={handleFullscreen}
        />
      )}
      {!fullScreen && (
        <Maximize
          className="cursor-pointer opacity-60 hover:scale-110"
          width={size}
          height={size}
          onClick={handleFullscreen}
        />
      )}
    </>
  );
}
