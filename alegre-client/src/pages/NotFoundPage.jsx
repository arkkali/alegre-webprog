import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-[#0c0e2f] flex items-center justify-center px-6 z-[999]">
      
      <div className="relative w-full max-w-xl rounded-3xl border border-white/10 bg-black/20 backdrop-blur-md shadow-2xl p-10 text-center overflow-hidden">
        <h1 className="absolute inset-0 flex items-center justify-center text-[160px] font-black text-white/5 tracking-tighter pointer-events-none select-none">
          404
        </h1>

        <div className="relative z-10 flex flex-col items-center">
          
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-blue-500 mb-3">
            System Error
          </p>
          <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
            Access Denied
          </h2>
          <p className="mt-4 text-sm text-slate-400 max-w-md leading-relaxed">
            The requested resource does not exist or has been removed from the system.
          </p>
          <div className="w-16 h-[2px] bg-blue-500 rounded-full mt-6 mb-8"></div>
          <div className="flex gap-4">
            <Button onClick={() => navigate('/articles')} variant="primary">
              Articles
            </Button>

            <Button onClick={() => navigate('/')} variant="secondary">
              Home
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
        <p className="text-[10px] tracking-[0.3em] uppercase text-slate-500">
          Not Found
        </p>
      </div>
    </div>
  );
}

export default NotFoundPage;