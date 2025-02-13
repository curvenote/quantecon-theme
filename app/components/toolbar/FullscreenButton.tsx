import { Maximize, Minimize } from 'lucide-react';
import { useCallback, useState } from 'react';
import { Tooltip } from './Tooltip';

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
    <button onClick={handleFullscreen} className="flex items-center cursor-pointer">
      {fullScreen && (
        <Tooltip label="Reset Full Screen">
          <Minimize className="opacity-60 hover:scale-110" width={size} height={size} />
        </Tooltip>
      )}
      {!fullScreen && (
        <Tooltip label="Full Screen">
          <Maximize className=" opacity-60 hover:scale-110" width={size} height={size} />
        </Tooltip>
      )}
    </button>
  );
}
