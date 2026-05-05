import { useLocation } from "react-router-dom";
import Button from "../../components/Button.jsx";
import ArticleList from "../../components/ArticleList.jsx";
import articles from "../../assets/article-content.js";

const ArticleListPage = () => {
  const location = useLocation();

  return (
    <div className="relative min-h-screen w-full flex flex-col gap-10 bg-[#0c0e2f] overflow-x-hidden">
      <div className="relative z-10">
        <section className="border-b border-white/10 px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-blue-400">
              Learn
            </p>
            <h1 className="max-w-xl text-4xl font-black leading-tight text-white sm:text-5xl tracking-tighter uppercase">
              Articles & <span className="text-blue-500">Techniques</span>
            </h1>
            <p className="mt-6 max-w-lg text-sm leading-8 text-slate-400 sm:text-base">
              My favorite list of articles of techniques that helped me progress
              and learn what I can do now. Feel free to check them out and learn
              something from them too.
            </p>
            <div className="mt-8">
              <Button to="/" variant="primary">
                Back Home
              </Button>
            </div>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-blue-400">
                Latest Content
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-white uppercase">
                Related Articles
              </h2>
            </div>

            <div className="relative">
              <ArticleList articles={articles} />
            </div>
          </div>
        </section>

        <footer className="mt-20 border-t border-white/5 bg-black/20 backdrop-blur-md py-8 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] tracking-[0.2em] uppercase font-medium">
            {/* Copyright Info */}
            <p className="text-slate-500">
              © 2026 Allen B. Alegre. All Rights Reserved.
            </p>

            {/* System Status Line */}
            <div className="flex items-center gap-3 text-slate-300">
              <span className="text-blue-500 font-bold tracking-[0.3em]">
                System Status:
              </span>
              <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
              <span>Active & Developing</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ArticleListPage;
