import { NavLink } from 'react-router-dom';
import logo from '../assets/images/logo.png';

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Other Works', to: '/OtherWorks' },
];

const navLinkClassName = ({ isActive }) =>
  [
    'relative px-5 py-2 text-[11px] font-bold uppercase tracking-[0.3em] transition-all duration-300 ease-in-out',
    isActive 
      ? 'text-white bg-white/5 rounded-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]' 
      : 'text-slate-400 hover:text-white hover:bg-white/[0.03] rounded-md',
  ].join(' ');

const NavBar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-[#0a0c28] shadow-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">
        
        {/* ARKKALI Brand Section */}
        <NavLink to="/" className="group flex items-center gap-4 transition-transform hover:scale-[1.01]">
          <img 
            src={logo} 
            alt="ARKKALI Logo" 
            className="h-10 w-auto object-contain" 
          />
          <h1 
            className="text-2xl tracking-[0.1em] text-white" 
            style={{ fontFamily: '"Copperplate", "Copperplate Gothic Light", serif' }}
          >
            ARKKALI
          </h1>
        </NavLink>
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <NavLink 
              key={link.to} 
              to={link.to} 
              end={link.to === '/'} 
              className={navLinkClassName}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex md:hidden">
          <button className="text-slate-400 hover:text-white transition-colors">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;