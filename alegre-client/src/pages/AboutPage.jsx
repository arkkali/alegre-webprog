import { useEffect, useRef } from "react";
import Button from "../components/Button";
import id2 from "../assets/images/id2.jpg";

const AboutPage = () => {
  const glowRef = useRef(null);

  return (
    <div className="relative min-h-screen w-full flex flex-col gap-10 bg-[#050614] overflow-x-hidden">
      
      <div ref={glowRef} className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,_#0a0c28_0%,_#050614_100%)] opacity-95"></div>
        <div 
          className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1200px] h-[700px] 
                     bg-blue-900/20 rounded-[100%] blur-[120px] will-change-transform"
        ></div>
      </div>
      <div className="relative z-10">
        <section className="border-b border-white/10 px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-2 lg:items-center">
            
            <div className="flex justify-center lg:justify-start">
              <div className="relative group w-2/3 lg:w-3/4">
                <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-r from-blue-600 to-cyan-500 opacity-20 blur transition duration-1000 group-hover:opacity-40"></div>
                <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0d1117]">
                  <img
                    src={id2}
                    alt="Allen B. Alegre"
                    className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-blue-400">
                About the Artist
              </p>
              <h1 className="max-w-xl text-4xl font-black leading-tight text-white sm:text-5xl tracking-tighter">
                I'm <span className="text-blue-500">Len</span>, a Traditional Artist.
              </h1>
              <p className="mt-6 max-w-lg text-sm leading-8 text-slate-400 sm:text-base">
                I am a BSIT student that is passionate about making portraits. 
                <br /><br />
                Currently, I'm focusing on my studies rather than creating arts, but I will soon expand my portfolio with more detailed pencil 
                renderings and other portraits. Hoping to create arts in differents styles but same material usage.
              </p>
              <div className="mt-8 flex gap-4">
                <Button to="/" variant="primary">
                  Back Home
                </Button>
                <Button to="/OtherWorks">
                  View Gallery
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Stats Section */}
        <section className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-blue-400">
                Experience
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-white">
                Quick Summary
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Years in Art", val: "15" },
                { label: "Total Projects", val: "50+" },
                { label: "Creative Tools", val: "20+" },
                { label: "Focus Areas", val: "03" }
              ].map((stat, i) => (
                <div key={i} className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
                  <p className="text-3xl font-black text-blue-500">{stat.val}</p>
                  <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="mt-10 border-t border-white/5 pb-10"></footer>
      </div>
    </div>
  );
};

export default AboutPage;