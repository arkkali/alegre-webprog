import { useLocation } from "react-router-dom";
import Button from "../../components/Button";
import me from "../../assets/images/me.jpg";
import seles from "../../assets/images/seles.jpg";
import doImage from "../../assets/images/d.o.jpg";
import king from "../../assets/images/king.jpg";

const HomePage = () => {
  const location = useLocation();

  const artworks = [
    {
      id: "celese",
      src: seles,
      title: "Celese",
      desc: "A study in dynamic lighting and ethereal character design.",
    },
    {
      id: "kyungsoo",
      src: doImage,
      title: "Kyungsoo",
      desc: "Exploration of realism and emotive portraiture.",
    },
    {
      id: "king-baldwin",
      src: king,
      title: "King Baldwin IV",
      desc: "Powerful character rendering with focus on texture and armor.",
    },
  ];

  return (
    <div className="relative min-h-screen w-full flex flex-col gap-10 bg-[#0c0e2f] overflow-x-hidden">
      <div className="relative z-10">
        <section className="border-b border-white/10 px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-blue-400">
                Digital Art Portfolio
              </p>
              <h1 className="max-w-xl text-4xl font-black leading-tight text-white sm:text-5xl tracking-tighter">
                Welcome to My <span className="text-blue-500">Creative</span>{" "}
                Space
              </h1>
              <p className="mt-6 max-w-lg text-sm leading-8 text-slate-400 sm:text-base">
                Hi! Welcome to my Art Portfolio!
                <br />
                <br />
                Get to know me through art. Feel free to explore a curated
                collection of some of my drawings throughout the time. I've only
                shared few of them and will make sure to draw and add more.
                Thank you and have fun!
              </p>
              <div className="mt-8">
                <Button to="/about" variant="primary">
                  Learn More
                </Button>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="relative group w-2/3 lg:w-1/2">
                <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-r from-blue-600 to-cyan-500 opacity-20 blur transition duration-1000 group-hover:opacity-40"></div>
                <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0d1117]">
                  <img
                    src={me}
                    alt="Portrait of the Artist"
                    className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-blue-400">
                Featured Pieces
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-white">
                Character Spotlights
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {artworks.map((art) => (
                <article
                  key={art.id}
                  className="group flex flex-col rounded-3xl border border-white/5 bg-white/5 backdrop-blur-md p-4 transition-all hover:bg-white/10 hover:-translate-y-1"
                >
                  <div className="overflow-hidden rounded-2xl bg-black/50 flex items-center justify-center">
                    <img
                      src={art.src}
                      alt={art.title}
                      className="w-full object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-white tracking-tight">
                    {art.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    {art.desc}
                  </p>
                  <div className="mt-auto pt-6">
                    <Button
                      to={`/art/${art.id}`}
                      state={{ from: location.pathname }}
                      variant="primary"
                    >
                      View Full Art
                    </Button>
                  </div>
                </article>
              ))}
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

export default HomePage;
