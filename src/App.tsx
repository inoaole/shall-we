import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { AppProvider } from './store/AppContext';

export default function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}
