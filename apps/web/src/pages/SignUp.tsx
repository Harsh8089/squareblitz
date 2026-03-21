import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { PasswordInput, UsernameInput } from '../components';
import { useNavigate } from 'react-router-dom';
import { Button } from '@repo/ui/button';
import { User } from '@repo/types/user';
import { Input } from '@repo/ui/input';
import { useSignup } from '../hooks';
import { Info } from 'lucide-react';
import { FC } from 'react';

export const SignUp: FC = () => {
  const { mutate: signup, isPending } = useSignup();
  const navigate = useNavigate();

  const methods = useForm<User>();
  const { register, handleSubmit } = methods;

  const onSubmit: SubmitHandler<User> = (data) => {
    signup(data);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-20rem)] items-center justify-center px-4">
      <h2 className="text-grain-3 text-2xl font-medium text-center mb-12">
        Create Account
      </h2>

      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-6"
        >
          <UsernameInput
            label="username"
            register={register}
            disabled={isPending}
          />

          <Input
            type="email"
            placeholder="Email"
            aria-label="Email"
            label="email"
            register={register}
            icon={<Info color="#3a1d1d" strokeWidth={2} />}
            validations={{
              required: 'Email is required.',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Please provide correct email address',
              },
            }}
            disabled={isPending}
          />

          <PasswordInput
            label="password"
            register={register}
            disabled={isPending}
          />

          <Button
            type="submit"
            title={isPending ? 'Creating account...' : 'Sign Up'}
            className="mt-6"
            variant="outline"
          />

          <div className="text-grain-3 text-center mt-4 text-lg gap-4 opacity-70 flex justify-center">
            <p>Already have an account?</p>
            <button
              type="button"
              onClick={() => navigate('../sign-in')}
              className="text-grain-2 hover:text-grain-1 hover:cursor-pointer font-semibold underline"
            >
              Sign In
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
