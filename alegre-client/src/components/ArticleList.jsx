import { Link, useLocation } from 'react-router-dom';
import Button from './Button';

const ArticleList = ({ articles }) => {
  const location = useLocation();

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article, index) => (
        <article 
          key={article.name} 
          className="group flex flex-col rounded-3xl border border-white/5 bg-white/5 backdrop-blur-md p-4 transition-all hover:bg-white/10 hover:-translate-y-1"
        >
          <div className="overflow-hidden rounded-2xl bg-black/40 aspect-video">
            <img 
              src={article.image} 
              alt={article.title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          
          <div className="flex flex-col flex-grow">
            <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-blue-400">
              Article {String(index + 1).padStart(2, '0')}
            </p>
            <h3 className="mt-2 text-xl font-bold text-white tracking-tight uppercase leading-tight">
              {article.title}
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-400 line-clamp-3">
              {article.content[0]}
            </p>
            
            <div className="mt-6">
              <Link to={`/articles/${article.name}`} state={{ from: location.pathname }}>
                <Button variant="primary" className="w-full">Read Article</Button>
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default ArticleList;