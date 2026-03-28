import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Button from '../components/Button';

// (Imports remain exactly as they are)
import seles from '../assets/images/seles.jpg';
import doImage from '../assets/images/d.o.jpg'; 
import king from '../assets/images/king.jpg';
import aiah from '../assets/images/aiah.jpg';
import venom from '../assets/images/venom.jpg';
import malenia from '../assets/images/malenia.jpg';
import kiss from '../assets/images/kiss.jpg';
import david from '../assets/images/david.jpg';
import lucas from '../assets/images/lucas.jpg';
import hand from '../assets/images/hand.jpg';
import eye from '../assets/images/eye.png';
import baby from '../assets/images/baby.png';
import lips from '../assets/images/lips.jpg';
import dahyun from '../assets/images/dahyun.png';
import girl from '../assets/images/girl.png';

const ArtViewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [zoomStyle, setZoomStyle] = useState({ transformOrigin: 'center' });

  const artworks = {
    'celese': { src: seles, title: "Celese (Iki)", desc: "I draw this as this is supposed to be a gift to my friend; Celese. This is my first portrait of someone that is close to me. I don't usually draw anyone that is close to me as it puts a lot of pressure to me to make it perfect yet it always ends up being messy. I'm proud of this work, the details, shadow, lighting, everything. This portrait looks exactly like her and it will never fails to amaze me. I hope to draw more of my loved ones and overcome my fear" },
    'kyungsoo': { src: doImage, title: "Kyungsoo (EXO)", desc: "I consider this as my first perfect portrait of someone. He's one of the members of the band EXO, he's the one I like among them. After years of doing portraits, this is the first time i did it flawlessly and perfect. This gives me hope that i can still do better and better overtime." },
    'king-baldwin': { src: king, title: "King Baldwin IV", desc: "I love this movie and you should also watch it. A masterpiece. This is my recent work, I challanged myself to do something i've never done before. As you can see this portrait is metallic and I love the outcome of my work. The first time i saw the reference for this I immediately know I can do it so i did, and I did it so smoothly." },
    'aiah': { src: aiah, title: "Aiah", desc: "Digital portrait study focusing on soft lighting." },
    'venom': { src: venom, title: "Venom", desc: "Ink textures." },
    'malenia': { src: malenia, title: "Malenia", desc: "Armor textures." },
    'kiss': { src: kiss, title: "The Kiss", desc: "Form and shading." },
    'david': { src: david, title: "David", desc: "Sculpture study." },
    'lucas': { src: lucas, title: "Lucas", desc: "Portrait rendering." },
    'hand': { src: hand, title: "Anatomy", desc: "Hand structure." },
    'eye': { src: eye, title: "Eye Study", desc: "Iris textures." },
    'baby': { src: baby, title: "Baby", desc: "Soft pencil study." },
    'lips': { src: lips, title: "Lips Study", desc: "Graphite blending." },
    'dahyun': { src: dahyun, title: "Dahyun", desc: "Portrait likeness." },
    'girl': { src: girl, title: "Girl", desc: "Hair flow." },
  };

  const art = artworks[id];
  const previousPath = location.state?.from;

  const handleBack = () => {
    if (previousPath) navigate(-1); 
    else navigate('/');
  };

  const isFromGallery = previousPath && previousPath.includes('OtherWorks');
  const backLabel = isFromGallery ? "Back to Gallery" : "Back Home";

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setZoomStyle({ transformOrigin: `${x}% ${y}%` });
  };

  if (!art) return null;

  return (
    <div className="fixed inset-0 h-screen w-screen bg-[#0a0c28] overflow-hidden flex items-center justify-center">
      
      {/* 1. Back Button - Increased Y offset to match the visual top of the artwork */}
      <div className="absolute top-8 right-10 z-50 translate-y-18">
        <Button onClick={handleBack} variant="primary">
          {backLabel}
        </Button>
      </div>

      {/* 2. Title & Description - Left Side */}
      <aside className="absolute left-10 top-1/2 -translate-y-1/2 z-10 hidden xl:flex flex-col gap-2 max-w-[20vw]">
        <h1 className="text-4xl font-black text-white tracking-tighter uppercase">
          {art.title}
        </h1>
        <p className="text-xs text-slate-400 uppercase tracking-widest leading-loose">
          {art.desc}
        </p>
        <div className="h-0.5 w-16 bg-blue-500 rounded-full mt-2"></div>
      </aside>

      {/* 3. The Art Container */}
      <div 
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setZoomStyle({ transformOrigin: 'center' })}
        className="relative group cursor-zoom-in overflow-hidden rounded-3xl border border-white/10 bg-black/20 shadow-2xl translate-y-8"
      >
        <img 
          src={art.src} 
          alt={art.title} 
          style={zoomStyle} 
          className="h-[80vh] w-auto object-contain transition-transform duration-200 ease-out group-hover:scale-[2.5]" 
        />
      </div>

      {/* 4. Footer - Pinned Bottom */}
      <footer className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
        <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-slate-500 animate-pulse">
          Move mouse over picture to see details
        </p>
        <div className="mx-auto mt-1 h-1 w-8 bg-blue-500/50 rounded-full"></div>
      </footer>

    </div>
  );
};

export default ArtViewPage;