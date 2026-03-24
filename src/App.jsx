import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoadingSpinner from '@/components/LoadingSpinner';
import Wrapper from '@/layouts/Wrapper';
import {
  AboutPage,
  ContactPage,
  HomePage,
  NotFoundPage,
  PricingPage,
} from '@/pages';

const withWrapper = (element) => {
  return <Wrapper>{element}</Wrapper>;
};

const App = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={withWrapper(<HomePage />)} />
        <Route path="/about" element={withWrapper(<AboutPage />)} />
        <Route path="/pricing" element={withWrapper(<PricingPage />)} />
        <Route path="/contact" element={withWrapper(<ContactPage />)} />
        <Route path="/404" element={withWrapper(<NotFoundPage />)} />
        <Route path="/.well-known/appspecific/com.chrome.devtools.json" element={<Navigate to="/" replace />} />
        <Route path="*" element={withWrapper(<NotFoundPage />)} />
      </Routes>
    </Suspense>
  );
};

export default App;
