import { Outlet } from 'react-router-dom';
import logo from '../assets/images/logo.png';

const AuthLayout = () => {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-2 bg-[#0c0e2f] text-white">
      
      <div className="hidden lg:flex items-center justify-center bg-white/5 border-r border-white/5 overflow-hidden">
        <div className="h-full w-full">
          <img
            src={logo}
            alt="ARKKALI Branding"
            className="w-full h-full object-contain p-10" 
          />
        </div>
      </div>
      <div className="flex items-center justify-center p-8 sm:p-12">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;