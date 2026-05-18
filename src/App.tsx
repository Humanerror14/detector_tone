import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState, lazy, Suspense } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ToastContainer } from '@/components/Toast';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useStore } from '@/store/useStore';

// Lazy load pages to reduce initial bundle size
const HomePage = lazy(() => import('@/pages/HomePage').then(m => ({ default: m.HomePage })));
const AnalyzePage = lazy(() => import('@/pages/AnalyzePage').then(m => ({ default: m.AnalyzePage })));
const ResultsPage = lazy(() => import('@/pages/ResultsPage').then(m => ({ default: m.ResultsPage })));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

function App() {
  const [toasts, setToasts] = useState<Array<{ id: string; message: string; type: 'success' | 'error' | 'info' }>>([]);
  const { error, clearError } = useStore();

  useEffect(() => {
    if (!error) return;
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message: error, type: 'error' }]);
    clearError();
  }, [error, clearError]);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1">
          <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
              <LoadingSpinner size="lg" text="Loading..." />
            </div>
          }>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/analyze/:method" element={<AnalyzePage />} />
              <Route path="/results" element={<ResultsPage />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />

        <ToastContainer toasts={toasts} removeToast={removeToast} />
      </div>
    </Router>
  );
}

export default App;
