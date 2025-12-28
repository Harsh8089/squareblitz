import { ButtonHTMLAttributes, FC } from 'react';

type Prop = {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<Prop> = ({
  title,
  variant = 'primary',
  className = '',
  ...props
}) => {
  const baseStyles = `w-120 h-12 text-[18px] rounded-md font-semibold cursor-pointer 
  transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`;

  const variants = {
    primary: 'bg-grain-2 hover:bg-grain-1 text-brown-1',
    secondary: 'bg-grain-3 hover:bg-grain-2 text-brown-1',
    outline:
      'border-2 border-grain-2 text-grain-1 hover:bg-grain-2 hover:text-brown-1',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {title}
    </button>
  );
};
