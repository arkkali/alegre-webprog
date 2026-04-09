import { useLocation } from "react-router-dom";
import Button from "../components/Button";
import aiah from "../assets/images/aiah.jpg";
import venom from "../assets/images/venom.jpg";
import malenia from "../assets/images/malenia.jpg";
import kiss from "../assets/images/kiss.jpg";
import david from "../assets/images/david.jpg";
import lucas from "../assets/images/lucas.jpg";
import hand from "../assets/images/hand.jpg";
import eye from "../assets/images/eye.png";
import baby from "../assets/images/baby.png";
import lips from "../assets/images/lips.jpg";
import dahyun from "../assets/images/dahyun.png";
import girl from "../assets/images/girl.png";

const OtherWorksPage = () => {
  const location = useLocation();

  const extraArtworks = [
    {
      id: "aiah",
      src: aiah,
      title: "Aiah",
      desc: "A portrait focusing on soft lighting.",
    },
    {
      id: "venom",
      src: venom,
      title: "Venom",
      desc: "High-contrast character rendering and ink textures.",
    },
    {
      id: "malenia",
      src: malenia,
      title: "Malenia",
      desc: "Detailed drawing of armor textures and gold reflections.",
    },
    {
      id: "kiss",
      src: kiss,
      title: "The Kiss",
      desc: "Exploration of form, emotion, using stippling and graphite shading.",
    },
    {
      id: "david",
      src: david,
      title: "David Bowie",
      desc: "Classical portrait using stippiling and realism.",
    },
    {
      id: "lucas",
      src: lucas,
      title: "Lucas",
      desc: "Expressive portraiture and perspective.",
    },
    {
      id: "hand",
      src: hand,
      title: "Love",
      desc: "Hand structure and pencil texture exploration.",
    },
    {
      id: "eye",
      src: eye,
      title: "Look of Help",
      desc: "Intricate detail work on iris textures and reflections.",
    },
    {
      id: "lips",
      src: lips,
      title: "Chick Lips",
      desc: "Focusing on volume, highlights, and color blending.",
    },
    {
      id: "baby",
      src: baby,
      title: "Child",
      desc: "Soft pencil study of facial expressions and proportions.",
    },
    {
      id: "dahyun",
      src: dahyun,
      title: "Dahyun",
      desc: "Stylized portrait focusing on clean lines and likeness.",
    },
    {
      id: "girl",
      src: girl,
      title: "Girl",
      desc: "Exploration of hair flow and subtle shading techniques.",
    },
  ];

  return (
    <div className="relative min-h-screen w-full flex flex-col gap-10 bg-[#0c0e2f] overflow-x-hidden">
      <div className="relative z-10">
        <section className="border-b border-white/10 px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-blue-400">
              Extended Gallery
            </p>
            <h1 className="max-w-xl text-4xl font-black leading-tight text-white sm:text-5xl tracking-tighter">
              More of My <span className="text-blue-500">Creative</span> Work
            </h1>
            <p className="mt-6 max-w-lg text-sm leading-8 text-slate-400 sm:text-base">
              An archive of sketches and portraits, capturing the progress of my
              style and technique. Hoping to add more in this wall. Enjoy and
              Have fun!
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
                Gallery Archive
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-white">
                Full Collection
              </h2>
            </div>

            <div className="columns-1 gap-8 md:columns-2 lg:columns-3 space-y-8">
              {extraArtworks.map((art) => (
                <article
                  key={art.id}
                  className="group break-inside-avoid flex flex-col rounded-3xl border border-white/5 bg-white/5 backdrop-blur-md p-4 transition-all hover:bg-white/10 hover:-translate-y-1"
                >
                  <div className="overflow-hidden rounded-2xl bg-black/40">
                    <img
                      src={art.src}
                      alt={art.title}
                      className="w-full h-auto block transition-transform duration-500 group-hover:scale-105"
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

export default OtherWorksPage;
