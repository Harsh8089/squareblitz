import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { Input } from '@repo/ui/input';
import { Info } from 'lucide-react';

type Prop<T extends FieldValues> = {
  label: Path<T>;
  register: UseFormRegister<T>;
  disabled?: boolean;
};

export const UsernameInput = <T extends FieldValues>({
  label,
  register,
  disabled = false,
}: Prop<T>) => (
  <Input<T>
    type="text"
    placeholder="Username"
    aria-label="Username"
    label={label}
    register={register}
    icon={<Info color="#3a1d1d" strokeWidth={2} />}
    validations={{
      required: 'Username is required.',
      minLength: {
        value: 3,
        message: 'Username must have atleast 3 characters.',
      },
      maxLength: {
        value: 15,
        message: 'Username must have atmost 15 characters.',
      },
    }}
    disabled={disabled}
  />
);
