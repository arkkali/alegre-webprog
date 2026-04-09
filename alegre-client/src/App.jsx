import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ArtViewPage from './pages/ArtViewPage';
import Layout from './components/Layout';
import OtherWorksPage from './pages/OtherWorksPage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ArticleListPage from './pages/ArticleListPage';
import ArticlePage from './pages/ArticlePage';
import NotFoundPage from './pages/NotFoundPage'; 

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'OtherWorks',
        element: <OtherWorksPage />,
      },
      {
        path: 'art/:id',
        element: <ArtViewPage />,
      },
      {
        path: 'articles',
        element: <ArticleListPage/>,
      },
      {
        path: 'articles/:name',
        element: <ArticlePage/>,
      },

      // ✅ ADD THIS (so /404 EXISTS)
      {
        path: '404',
        element: <NotFoundPage />,
      },

      // ✅ KEEP THIS (already correct)
      {
        path: '*', // CATCH-ALL ROUTE
        element: <NotFoundPage />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;