import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layouts/Layout";
import AuthLayout from "./layouts/AuthLayout";
import HomePage from "./pages/LandingPages/HomePage";
import AboutPage from "./pages/LandingPages/AboutPage";
import ArticleListPage from "./pages/LandingPages/ArticleListPage";
import ArticlePage from "./pages/LandingPages/ArticlePage";
import ArtViewPage from "./pages/LandingPages/ArtViewPage";
import OtherWorksPage from "./pages/LandingPages/OtherWorksPage";
import SignInPage from "./pages/AuthPages/SignInPage";
import SignUpPage from "./pages/AuthPages/SignUpPage";
import DashboardPage from "./pages/DashboardPages/DashboardPage";
import ReportsPage from "./pages/DashboardPages/ReportsPage";
import NotFoundPage from "./pages/NotFoundPage";
import DashLayout from "./layouts/DashLayout";
import RequireAuth from "./components/RequireAuth";
import UsersRoute from "./components/UsersRoute";
import DashArticleListPage from "./pages/DashboardPages/DashArticleListPage";
const routes = [
  {
    path: "/",
    element: <Layout />, 
    children: [
      { path: "", 
        element: <HomePage /> 
      },
      { path: "about", 
        element: <AboutPage /> 
      },
      { path: "OtherWorks", 
        element: <OtherWorksPage /> 
      },
      { path: "art/:id", 
        element: <ArtViewPage /> 
      },
      { path: "articles", 
        element: <ArticleListPage /> 
      },
      { path: "articles/:name", 
        element: <ArticlePage /> 
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <RequireAuth>
        <DashLayout />
      </RequireAuth>
    ),
    errorElement: <NotFoundPage />,
    children: [
      { index: true, 
        element: <DashboardPage />,
      },
      { path: "reports", 
        element: <ReportsPage />,
      },
      {
        path: "articles",
        element: <DashArticleListPage />,
      },
      { path: "users", 
        element: <UsersRoute />
      },
    ]
  },

  {
    path: "auth",
    element: <AuthLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { path: "signin", 
        element: <SignInPage /> 
      },
      { path: "signup", 
        element: <SignUpPage /> 
      },
    ],
  },
];



const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;