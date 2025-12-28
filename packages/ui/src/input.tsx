import {
  FieldValues,
  Path,
  RegisterOptions,
  useFormContext,
  UseFormRegister,
} from 'react-hook-form';
import { InputHTMLAttributes, ReactElement } from 'react';

type Prop<T extends FieldValues> = {
  type: 'text' | 'email' | 'password';
  placeholder: string;
  label: Path<T>;
  validations?: RegisterOptions<T>;
  className?: string;
  register?: UseFormRegister<T>;
  icon?: ReactElement;
  children?: ReactElement;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = <T extends FieldValues>({
  type,
  placeholder,
  label,
  className = '',
  validations,
  register,
  icon,
  children,
  ...props
}: Prop<T>) => {
  const {
    formState: { errors },
  } = useFormContext<T>();

  const error = errors[label];

  return (
    <div className="flex flex-col justify-center">
      <div className={`${children && 'pr-4'} w-120 flex items-center`}>
        <input
          type={type}
          placeholder={placeholder}
          className={`w-120 h-12 bg-grain-2 rounded-md px-4 border-2 border-transparent outline-none 
            focus:border-grain-2 focus:ring-2 focus:ring-grain-2/20 
            placeholder:text-brown-2 placeholder:font-bold text-brown-1 text-[18px] font-bold
            transition-all duration-200 ${className}`}
          {...(register ? register(label, validations) : {})}
          {...props}
        />
        {children}
      </div>
      {error && (
        <p className="text-brown-1 bg-grain-1 px-4 py-2 font-semibold text-lg mt-1 flex items-center gap-2">
          {icon}
          {error.message as string}
        </p>
      )}
    </div>
  );
};
