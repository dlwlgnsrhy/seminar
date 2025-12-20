// src/app/App.tsx
import { BrowserRouter } from 'react-router-dom';
import AppProvider from './AppProvider';
import AppRouter from './AppRouter';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AppProvider>
  );
}
