import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../components/Button.jsx";
import articles from "../../assets/article-content.js";
import api from "../../lib/api.js";
import { resolveArticleImage } from "../../lib/articleImageResolver.js";
import NotFoundPage from "../NotFoundPage.jsx";

function ArticlePage() {
  const { name } = useParams();
  const navigate = useNavigate();
  const localArticle = articles.find((article) => article.name === name);
  const [article, setArticle] = useState(localArticle ?? null);
  const [loading, setLoading] = useState(!localArticle);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (localArticle) return;

    let cancelled = false;
    const run = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/articles/${encodeURIComponent(name)}`);
        if (!cancelled) {
          setArticle(data.article);
        }
      } catch (error) {
        if (!cancelled) {
          if (error.response?.status === 404) {
            setNotFound(true);
          }
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    void run();
    return () => {
      cancelled = true;
    };
  }, [localArticle, name]);

  if (notFound) {
    return <NotFoundPage />;
  }

  if (loading && !article) {
    return (
      <div className="fixed inset-0 bg-[#0c0e2f] flex items-center justify-center text-slate-200">
        Loading article...
      </div>
    );
  }

  if (!article || article.invalid) {
    return <NotFoundPage />;
  }

  return (
    <div className="fixed inset-0 h-screen w-screen bg-[#0c0e2f] overflow-hidden flex items-center justify-center">
      <div className="absolute top-8 right-10 z-50 translate-y-18">
        <Button onClick={() => navigate("/articles")} variant="primary">
          Back to Articles
        </Button>
      </div>

      <aside className="absolute left-10 top-1/2 -translate-y-1/2 z-10 hidden xl:flex flex-col gap-2 max-w-[20vw]">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-500">
          Article
        </p>
        <h1 className="text-4xl font-black text-white tracking-tighter uppercase leading-[0.9]">
          {article.title}
        </h1>
        <div className="h-0.5 w-16 bg-blue-500 rounded-full mt-4"></div>
      </aside>

      <div className="relative w-full max-w-4xl h-[82vh] overflow-y-auto custom-scrollbar rounded-3xl border border-white/10 bg-black/20 shadow-2xl p-6 md:p-10 translate-y-8">
        {resolveArticleImage(article) && (
          <div className="w-full aspect-video rounded-2xl overflow-hidden border border-white/5 mb-8 shadow-inner">
            <img
              src={resolveArticleImage(article)}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="prose prose-invert prose-sm max-w-none space-y-6">
          {article.content.map((paragraph, index) => (
            <p
              key={index}
              className="text-lg leading-relaxed text-slate-300 font-light whitespace-pre-wrap"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-6 mb-10 rounded-xl border border-blue-500/20 bg-blue-500/5 p-4 backdrop-blur-sm">
          <p className="text-[10px] font-bold uppercase tracking-widest text-blue-400 mb-1">
            Credits & Original Source
          </p>
          <p className="text-sm text-slate-300">
            Read more at:
            <a
              href={article.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 font-medium text-white underline decoration-blue-500/50 underline-offset-4 transition-colors hover:text-blue-400"
            >
              {article.sourceUrl}
            </a>
          </p>
        </div>
      </div>

      <footer className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
        <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-slate-500">
          Scroll to explore the techniques
        </p>
      </footer>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(59, 130, 246, 0.4); border-radius: 10px; }
      `,
        }}
      />
    </div>
  );
}

export default ArticlePage;
