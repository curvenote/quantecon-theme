import classNames from 'classnames';
import { CircleMinus, CirclePlus } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Tooltip } from './Tooltip';

export function FontScaleListItems({ scale, size }: { scale: string; size: number }) {
  const fontSizes = useMemo(() => {
    if (typeof document === 'undefined') return [] as string[];
    return ['0.9rem', document.documentElement.style.fontSize, '1.1rem'];
  }, []);
  const [current, setCurrent] = useState(1);

  const increment = () => {
    if (current < 2) {
      if (typeof document === 'undefined') return;
      const root = document.documentElement;
      root.style.fontSize = fontSizes[current + 1];
      setCurrent(current + 1);
    }
  };

  const decrement = () => {
    if (current > 0) {
      if (typeof document === 'undefined') return;
      const root = document.documentElement;
      root.style.fontSize = fontSizes[current - 1];
      setCurrent(current - 1);
    }
  };

  return (
    <>
      <li>
        <button
          onClick={increment}
          className="flex items-center cursor-pointer"
          disabled={current === 2}
        >
          <Tooltip label="Increase font size">
            <CirclePlus
              className={current === 2 ? 'opacity-100' : 'opacity-70 hover:scale-110 '}
              width={current === 2 ? 1.2 * size : size}
              height={current === 2 ? 1.2 * size : size}
            />
          </Tooltip>
        </button>
      </li>
      <li>
        <button
          onClick={decrement}
          className="flex items-center cursor-pointer"
          disabled={current === 0}
        >
          <Tooltip label="Reduce font size">
            <CircleMinus
              className={current === 0 ? 'opacity-100' : 'opacity-70 hover:scale-110 '}
              width={current === 0 ? 1.2 * size : size}
              height={current === 0 ? 1.2 * size : size}
            />
          </Tooltip>
        </button>
      </li>
    </>
  );
}
