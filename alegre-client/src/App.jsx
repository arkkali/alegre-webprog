import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ArtViewPage from './pages/ArtViewPage';
import Layout from './components/Layout';
import OtherWorksPage from './pages/OtherWorksPage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';

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
    ],
  },
];

const router = createBrowserRouter(routes);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;