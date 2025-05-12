import { Outlet } from "react-router-dom";
import login from '../../assets/glass/login.avif'

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden lg:flex items-center justify-center text-white  bg-black w-1/2 px-12">
        <div className="space-y-6 text-center text-primary-foreground rounded-3xl">
          <h1 className="text-2xl font-extrabold tracking-tight">
            Welcome to ClickCart
          </h1>
        <img src={login} alt="login" className="w-full h-full object-cover rounded-2xl " />
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
