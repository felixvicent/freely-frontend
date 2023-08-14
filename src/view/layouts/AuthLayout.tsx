import { Outlet } from "react-router-dom";

import logoImg from "../../assets/login.svg";

export function AuthLayout() {
  return (
    <div className="flex items-center justify-evenly w-full h-full">
      <div className="flex items-center justify-center w-1/2 flex-col gap-8">
        <h1 className="font-extrabold text-3xl text-purple-700">Freely</h1>
        <img className="w-96" src={logoImg} alt="Freely" />
      </div>
      <div className="bg-purple-700 w-1/2 h-full flex items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
}
