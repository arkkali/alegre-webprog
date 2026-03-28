import { Outlet } from 'react-router-dom';
import NavBar from './Navbar';

const Layout = () => {
  return (
    <div className="min-h-screen bg-[#0a0c28] text-white">
      <NavBar />
      <main className="pt-20"> 
        {}
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;