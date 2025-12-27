import { ChangeEvent, FC, ReactElement, useState } from 'react';

type Props = {
  label: string;
  min?: string;
  max?: string;
  step?: string;
  width?: string;
  icons?: ReactElement[];
  randomIcon?: boolean;
};

export const Slider: FC<Props> = ({
  label,
  min = '4',
  max = '10',
  step = '1',
  width = '600px',
  icons = [],
  randomIcon = false,
  ...props
}) => {
  const [value, setValue] = useState<string>(min);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
  };

  const percentage =
    ((Number(value) - Number(min)) / (Number(max) - Number(min))) * 100;

  const iconIdx = randomIcon
    ? (Number(value) - Number(min)) % icons?.length
    : (Number(value) / Number(min) - 1) % icons?.length;

  return (
    <div className="flex flex-col items-center gap-5 p-6" style={{ width }}>
      <div className="text-grain-2">{icons?.length && icons[iconIdx]}</div>
      <div className="w-full space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-lg text-grain-3 font-semibold uppercase tracking-wider">
            {label}
          </span>
          <span className="text-3xl text-grain-2 font-bold tabular-nums">
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
          className="w-full h-4 rounded-full appearance-none cursor-pointer slider shadow-inner border border-grain-1/75"
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
