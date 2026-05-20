import { useEffect, useState } from "react";
import Button from "../../components/Button.jsx";
import ArticleList from "../../components/ArticleList.jsx";
import articles from "../../assets/article-content.js";
import { useAuth } from "../../hooks/useAuth.js";
import api from "../../lib/api.js";

const AddArticleForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [preview, setPreview] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;

    const slug = name || title.toLowerCase().trim().replace(/\s+/g, "-");
    const newArticle = {
      name: slug,
      title: title,
      image: imageUrl || null,
      sourceUrl: sourceUrl || "#",
      content: [preview || ""],
    };

    onAdd(newArticle);

    setTitle("");
    setName("");
    setImageUrl("");
    setSourceUrl("");
    setPreview("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 rounded-2xl border border-white/5 bg-white/3 p-4"
    >
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-blue-400">
        Add Article
      </h3>

      <div className="grid gap-3 sm:grid-cols-2">
        <input
          aria-label="Title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-md bg-black/40 p-2 text-sm text-white placeholder:text-slate-400"
        />

        <input
          aria-label="Slug"
          placeholder="Slug (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-md bg-black/40 p-2 text-sm text-white placeholder:text-slate-400"
        />

        <input
          aria-label="Image URL"
          placeholder="Image URL (optional)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full rounded-md bg-black/40 p-2 text-sm text-white placeholder:text-slate-400"
        />

        <input
          aria-label="Source URL"
          placeholder="Source URL (optional)"
          value={sourceUrl}
          onChange={(e) => setSourceUrl(e.target.value)}
          className="w-full rounded-md bg-black/40 p-2 text-sm text-white placeholder:text-slate-400"
        />

        <textarea
          aria-label="Preview"
          placeholder="Preview / first paragraph"
          value={preview}
          onChange={(e) => setPreview(e.target.value)}
          className="sm:col-span-2 h-24 w-full rounded-md bg-black/40 p-2 text-sm text-white placeholder:text-slate-400"
        />
      </div>

      <div className="mt-3 flex justify-end">
        <Button type="submit" variant="primary">
          Add Article
        </Button>
      </div>
    </form>
  );
};

const ArticleListPage = () => {
  const [articleList, setArticleList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      setLoading(true);
      try {
        const { data } = await api.get("/articles");
        if (!cancelled) {
          const serverArticles = Array.isArray(data?.articles)
            ? data.articles
            : [];
          setArticleList(serverArticles.length ? serverArticles : articles);
        }
      } catch (e) {
        if (!cancelled) setArticleList(articles);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    void run();
    return () => {
      cancelled = true;
    };
  }, []);

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
              {user?.role === "Admin" && (
                <div className="mb-4 flex justify-end">
                  <Button
                    onClick={() => setShowForm((s) => !s)}
                    variant="primary"
                  >
                    {showForm ? "Close" : "Add Article"}
                  </Button>
                </div>
              )}

              {showForm && user?.role === "Admin" && (
                <AddArticleForm
                  onAdd={async (newArticle) => {
                    try {
                      const { data } = await api.post("/articles", newArticle);
                      setArticleList((prev) => [data.article, ...prev]);
                    } catch (e) {
                      setArticleList((prev) => [newArticle, ...prev]);
                    } finally {
                      setShowForm(false);
                    }
                  }}
                />
              )}

              {!loading && <ArticleList articles={articleList} />}
              {loading && (
                <div className="py-8 text-slate-400">Loading articles...</div>
              )}
            </div>
          </div>
        </section>

        <footer className="mt-20 border-t border-white/5 bg-black/20 backdrop-blur-md py-8 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] tracking-[0.2em] uppercase font-medium">
            <p className="text-slate-500">
              © 2026 Allen B. Alegre. All Rights Reserved.
            </p>

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
