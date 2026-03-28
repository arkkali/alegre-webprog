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
    'celese': { src: seles, title: "Celese (Iki)", desc: "I created this as this is supposed to be a gift to my friend: Celese. This is my first portrait of someone that is close to me. I don't usually draw anyone that is close to me as it puts a lot of pressure to me to make it perfect yet it always ends up being messy. I'm proud of this work, the details, shadow, lighting, everything. This portrait looks exactly like her and it will never fails to amaze me. I hope to draw more of my loved ones and overcome my fear" },
    'kyungsoo': { src: doImage, title: "Kyungsoo (EXO)", desc: "I consider this as my first perfect portrait of someone. He's one of the members of the band EXO, he's the one I like among them. After years of doing portraits, this is the first time i did it flawlessly and perfect. This gives me hope that i can still do better and better overtime." },
    'king-baldwin': { src: king, title: "King Baldwin IV", desc: "I love this movie and you should also watch it. A masterpiece. This is my recent work, I challanged myself to do something i've never done before. As you can see this portrait is metallic and I love the outcome of my work. The first time i saw the reference for this I immediately know I can do it so i did, and I did it so smoothly." },
    'aiah': { src: aiah, title: "Aiah", desc: "This is a portrait of a girl group member: Aiah. It actally took me months to finish this as I thought it looked nothing like the refrence picture. Then I've realized whether it looked like it or not, it is already there and art should always be perfect. It can still be considered as a piece no matter what." },
    'venom': { src: venom, title: "Venom", desc: "This drawing isn't supposed to be anything serious, I did it because I'm bored and I want to try to draw something using pen. I also like how monstrous it looks like. It came out so good and it's actually biger than my arm that it adds up on how scary it looks in actual; that's how big this one is." },
    'malenia': { src: malenia, title: "Malenia", desc: "I've always dreamed of making something so detailed like metallic armours that it will make my head and hand hurts. This can be the stepping stone in achieving it. Unlike the Venom one, this piece is created on a small sketchbook; just as big as my hand. I also like her in the game Elden Ring" },
    'kiss': { src: kiss, title: "The Kiss", desc: "This is done through the combination of stippling and shading. I've always wanted to create something that extracts emotion, will make me feel something. This is the kiss of someone that is yearning." },
    'david': { src: david, title: "David Bowie", desc: "This is one of the special piece i've made as this is requested by someone close to my heart. The pressure is high on this one, unlike to my other works. Despite the pressure, i love how it came out, and he loved it too!" },
    'lucas': { src: lucas, title: "Lucas", desc: "Portrait rendering." },
    'hand': { src: hand, title: "Love", desc: "Hand structure." },
    'eye': { src: eye, title: "Look of Help", desc: "Iris textures." },
    'baby': { src: baby, title: "Baby", desc: "Soft pencil study." },
    'lips': { src: lips, title: "Chick Lips", desc: "Graphite blending." },
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
    <div className="fixed inset-0 h-screen w-screen bg-[#0c0e2f] overflow-hidden flex items-center justify-center">
      
      <div className="absolute top-8 right-10 z-50 translate-y-18">
        <Button onClick={handleBack} variant="primary">
          {backLabel}
        </Button>
      </div>

      <aside className="absolute left-10 top-1/2 -translate-y-1/2 z-10 hidden xl:flex flex-col gap-2 max-w-[20vw]">
        <h1 className="text-4xl font-black text-white tracking-tighter uppercase">
          {art.title}
        </h1>
        <p className="text-xs text-slate-400 uppercase tracking-widest leading-loose">
          {art.desc}
        </p>
        <div className="h-0.5 w-16 bg-blue-500 rounded-full mt-2"></div>
      </aside>

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