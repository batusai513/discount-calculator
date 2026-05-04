import { Outlet } from 'react-router';
import { Toaster } from 'sonner';

export function RootLayout() {
  return (
    <div className="root">
      <Outlet />
      <Toaster richColors />
    </div>
  );
}
