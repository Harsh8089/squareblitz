import { useMutation } from "@tanstack/react-query"
import { authService } from "../services"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts";
import { URL } from "../utils";

export const useSignup = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authService.signup,
    onSuccess: () => {
      navigate(`../${URL.LOGIN}`);
    },
    onError: (error) => {
      console.error("Signup failed "+error);
    },
  });
}

export const useSignin = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  return useMutation({
    mutationFn: authService.signin,
    onSuccess: (response) => {
      const user = response.data?.user;
      const token = response.data?.accessToken;

      if (!user || !token) {
        return;
      }

      localStorage.setItem('user', user);
      localStorage.setItem('token', token);
      
      setUser(user);

      navigate(`${URL.GAME}/${URL.SETUP}`);
    },
    onError: (error) => {
      console.error("Signin failed "+error);
    }
  })
}

export const useLogout = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      localStorage.clear();
      
      setUser(null);

      navigate(`${URL.WELCOME}/${URL.LOGIN}`);
    }
  })
}
