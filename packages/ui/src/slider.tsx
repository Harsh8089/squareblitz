import { ChangeEvent, cloneElement, ReactElement, useState } from 'react';

type IconProps = {
  size?: string;
  [key: string]: any;
};

type Props<T> = {
  label: string;
  min?: string;
  max?: string;
  step?: string;
  variant?: 'small' | 'large';
  icons?: ReactElement<IconProps>[];
  randomIcon?: boolean;
  parse?: (raw: string) => T;
  onChange?: (v: T) => void;
};

export const Slider = <T,>({
  label,
  min = '4',
  max = '10',
  step = '1',
  variant = 'small',
  icons = [],
  randomIcon = false,
  parse,
  onChange,
  ...props
}: Props<T>) => {
  const [value, setValue] = useState<string>(min);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);

    if (!parse || !onChange) {
      return;
    }

    onChange(parse(newValue));
  };

  const percentage =
    ((Number(value) - Number(min)) / (Number(max) - Number(min))) * 100;

  const iconIdx = randomIcon
    ? (Number(value) - Number(min)) % icons?.length
    : (Number(value) / Number(min) - 1) % icons?.length;

  const icon =
    icons.length && icons[iconIdx]
      ? cloneElement(icons[iconIdx], { size: styles[variant].iconSize })
      : null;

  return (
    <div
      className="flex flex-col items-center gap-5 p-6"
      style={{ width: styles[variant].width }}
    >
      <div className="text-grain-2">{icon}</div>
      <div className="w-full space-y-2">
        <div className="flex justify-between items-center">
          <span
            style={{ fontSize: styles[variant].fontSizeForLabel }}
            className="text-grain-3 font-semibold tracking-wider"
          >
            {label}
          </span>
          <span
            style={{ fontSize: styles[variant].fontSizeForValue }}
            className=" text-grain-2 font-bold tabular-nums"
          >
            {value}
          </span>
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          {...props}
          className="w-full h-3 rounded-full appearance-none cursor-pointer slider shadow-inner border border-grain-1/75"
          style={{
            background: `linear-gradient(to right, #e1d0b3 0%, #e1d0b3 ${percentage}%, #3a1d1d ${percentage}%, #3a1d1d 100%)`,
          }}
        />
      </div>

      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, #eae1d3, #e1d0b3 40%, #bba888);
          border: 4px solid #3a1d1d;
          cursor: pointer;
          box-shadow: 
            0 4px 12px rgba(58, 29, 29, 0.6),
            inset -2px -2px 4px rgba(0, 0, 0, 0.2),
            inset 2px 2px 4px rgba(255, 255, 255, 0.4);
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }
        
        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.25);
          box-shadow: 
            0 6px 20px rgba(58, 29, 29, 0.8),
            inset -2px -2px 4px rgba(0, 0, 0, 0.3),
            inset 2px 2px 6px rgba(255, 255, 255, 0.5);
          border-color: #703b3b;
          background: radial-gradient(circle at 35% 35%, #eae1d3, #e1d0b3 35%, #af5f5f);
        }
        
        .slider::-webkit-slider-thumb:active {
          transform: scale(1.1);
          box-shadow: 
            0 2px 8px rgba(58, 29, 29, 0.7),
            inset -1px -1px 3px rgba(0, 0, 0, 0.3),
            inset 1px 1px 3px rgba(255, 255, 255, 0.3);
        }
        
        .slider::-moz-range-thumb {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, #eae1d3, #e1d0b3 40%, #bba888);
          border: 4px solid #3a1d1d;
          cursor: pointer;
          box-shadow: 
            0 4px 12px rgba(58, 29, 29, 0.6),
            inset -2px -2px 4px rgba(0, 0, 0, 0.2),
            inset 2px 2px 4px rgba(255, 255, 255, 0.4);
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .slider::-moz-range-thumb:hover {
          transform: scale(1.25);
          box-shadow: 
            0 6px 20px rgba(58, 29, 29, 0.8),
            inset -2px -2px 4px rgba(0, 0, 0, 0.3),
            inset 2px 2px 6px rgba(255, 255, 255, 0.5);
          border-color: #703b3b;
          background: radial-gradient(circle at 35% 35%, #eae1d3, #e1d0b3 35%, #af5f5f);
        }
        
        .slider::-moz-range-thumb:active {
          transform: scale(1.1);
          box-shadow: 
            0 2px 8px rgba(58, 29, 29, 0.7),
            inset -1px -1px 3px rgba(0, 0, 0, 0.3),
            inset 1px 1px 3px rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
};

const styles = {
  large: {
    width: '500px',
    fontSizeForLabel: '1rem',
    fontSizeForValue: '1rem',
    iconSize: '30px',
  },
  small: {
    width: '400px',
    fontSizeForLabel: '',
    fontSizeForValue: '',
    iconSize: '30px',
  },
};
