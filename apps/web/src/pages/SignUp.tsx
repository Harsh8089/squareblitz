import { FC } from "react";
import { Input } from "@repo/ui/input";
import { Button } from "@repo/ui/button";
import { useNavigate } from "react-router-dom";
import { Info } from "lucide-react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../contexts";
import { User } from "@repo/types/user";
import { PasswordInput, UsernameInput } from "../components";

export const SignUp: FC = () => {
  const authContext = useAuth();
  if (!authContext) {
    throw new Error("authContext is missing");
  }
  
  const { signup } = authContext;
  const navigate = useNavigate();

  const methods = useForm<User>();
  const { register, handleSubmit } = methods;
  
  const onSubmit: SubmitHandler<User> = async (data) => {
    const response = await signup(data);

    if(response.success) {
      navigate("../sign-in")
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-20rem)] items-center justify-center px-4">
      <h2 className="text-grain-3 text-4xl font-medium text-center mb-12">
        Create Account
      </h2>
      
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <UsernameInput
            label="username"
            register={register}
          />
          
          <Input
            type="email"
            placeholder="Email"
            aria-label="Email"
            label="email"
            register={register}
            icon={<Info color="#3a1d1d" strokeWidth={2} />}
            validations={{
              required: "Email is required.",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Please provide correct email address'
              }
            }}
          />
          
          <PasswordInput
            label="password"
            register={register}
          />
          
          <Button
            type="submit"
            title="Sign Up"
            className="mt-6"
            variant="outline"
          />
          
          <div className="text-grain-3 text-center mt-4 text-xl gap-4 opacity-70 flex justify-center">
            <p>
              Already have an account?
            </p>
            <button
              type="button"
              onClick={() => navigate("../sign-in")}
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