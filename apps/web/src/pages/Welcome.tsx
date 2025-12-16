import { FC } from "react";
import { Navbar } from "../components";
import { Outlet } from "react-router-dom";

export const Welcome: FC = () => {
  return <>
    <Navbar />
    <Outlet />
  </>
}