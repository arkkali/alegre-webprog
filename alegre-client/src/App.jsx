import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ArtViewPage from "./pages/ArtViewPage";
import Layout from "./components/Layout";
import OtherWorksPage from "./pages/OtherWorksPage";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ArticleListPage from "./pages/ArticleListPage";
import ArticlePage from "./pages/ArticlePage";
import AuthLayout from './components/AuthLayout';
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import NotFoundPage from "./pages/NotFoundPage";

const routes = [
  // GROUP 1: Main Site (MAY NAVBAR DITO)
  {
    path: "/",
    element: <Layout />, 
    children: [
      { path: "", element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "OtherWorks", element: <OtherWorksPage /> },
      { path: "art/:id", element: <ArtViewPage /> },
      { path: "articles", element: <ArticleListPage /> },
      { path: "articles/:name", element: <ArticlePage /> },
    ],
  },

  // GROUP 2: Auth Site (WALANG NAVBAR DITO)
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      { path: "signin", element: <SignInPage /> },
      { path: "signup", element: <SignUpPage /> },
    ],
  },


  { path: "404", element: <NotFoundPage /> },
  { path: "*", element: <NotFoundPage /> },
];

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;