import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import { router } from './routes';
import { AppProvider } from './store/AppContext';

export default function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        richColors
        closeButton={false}
        duration={2400}
        toastOptions={{
          className: 'text-body-14',
          style: {
            fontFamily: 'inherit',
          },
        }}
      />
    </AppProvider>
  );
}
