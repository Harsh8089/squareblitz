import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { Eye, EyeClosed, Info } from 'lucide-react';
import { Input } from '@repo/ui/input';
import { useState } from 'react';

type Prop<T extends FieldValues> = {
  label: Path<T>;
  register: UseFormRegister<T>;
};

export const PasswordInput = <T extends FieldValues>({
  label,
  register,
}: Prop<T>) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="w-150 flex items-center rounded-md bg-grain-2 pr-4">
      <Input
        type={showPassword ? 'text' : 'password'}
        placeholder="Password"
        aria-label="Password"
        label={label}
        register={register}
        icon={<Info color="#3a1d1d" strokeWidth={2} />}
        validations={{
          required: 'Password is required.',
          minLength: {
            value: 3,
            message: 'Password must have atleast 3 characters.',
          },
        }}
      >
        <p
          onClick={() => {
            setShowPassword((prev) => !prev);
          }}
          className="cursor-pointer"
        >
          {showPassword ? (
            <Eye color="#3a1d1d" />
          ) : (
            <EyeClosed color="#3a1d1d" />
          )}
        </p>
      </Input>
    </div>
  );
};
