import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { PasswordInput, UsernameInput } from '../components';
import { useNavigate } from 'react-router-dom';
import { Button } from '@repo/ui/button';
import { User } from '@repo/types/user';
import { FC } from 'react';
import { useSignin } from '../hooks';

type FormState = Omit<User, 'email'>;

export const SignIn: FC = () => {
  const { mutate: signin, isPending } = useSignin();
  const navigate = useNavigate();

  const methods = useForm<FormState>();
  const { register, handleSubmit } = methods;

  const onSubmit: SubmitHandler<FormState> = (data) => {
    signin(data);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-20rem)] items-center justify-center px-4">
      <h2 className="text-grain-3 text-2xl font-medium text-center mb-12">
        Welcome Back
      </h2>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <UsernameInput label="username" register={register} disabled={isPending} />

          <PasswordInput label="password" register={register} disabled={isPending} />

          <Button
            type="submit"
            title={isPending ? "Signing in..." : "Sign In"}
            className="mt-6"
            variant="outline"
          />

          <div className="text-grain-3 text-center mt-4 text-lg gap-4 opacity-70 flex justify-center">
            <p>Don’t have an account?</p>
            <button
              type="button"
              onClick={() => navigate('../sign-up')}
              className="text-grain-2 hover:text-grain-1 hover:cursor-pointer font-semibold underline"
            >
              Sign Up
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
