import { FC } from "react"
import { Outlet } from "react-router-dom"

export const Root: FC = () => {
  return <div className="h-screen font-mono overflow-hidden px-48 bg-brown-1">
    <Outlet />
  </div>
}