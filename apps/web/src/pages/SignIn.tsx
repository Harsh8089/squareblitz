import { User } from "@repo/types/user";
import { FC } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../contexts";
import { PasswordInput, UsernameInput } from "../components";
import { Button } from "@repo/ui/button";
import { useNavigate } from "react-router-dom";

type FormState = Omit<User, "email">;

export const SignIn: FC = () => {
  const authContext = useAuth();
  if (!authContext) {
    throw new Error("authContext is missing");
  }

  const { signin } = authContext;
  const navigate = useNavigate(); 

  const methods = useForm<FormState>();
  const { register, handleSubmit } = methods;

  const onSubmit: SubmitHandler<FormState> = async (data) => {
    const response = await signin(data);

    if(response.success) {      
      navigate("../../game");
    }
  };

  return <div className="flex flex-col h-[calc(100vh-20rem)] items-center justify-center px-4">
    <h2 className="text-grain-3 text-4xl font-medium text-center mb-12">
      Welcome Back
    </h2>

    <FormProvider {...methods}>
      <form 
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <UsernameInput
          label="username"
          register={register}
        />

        <PasswordInput
          label="password"
          register={register}
        />

        <Button
          type="submit"
          title="Sign In"
          className="mt-6"
          variant="outline"
        />

        <div className="text-grain-3 text-center mt-4 text-xl gap-4 opacity-70 flex justify-center">
          <p>
            Don’t have an account?
          </p>
          <button
            type="button"
            onClick={() => navigate("../sign-up")}
            className="text-grain-2 hover:text-grain-1 hover:cursor-pointer font-semibold underline"
          >
            Sign Up
          </button>
        </div>
      </form>
    </FormProvider>
  </div>
}