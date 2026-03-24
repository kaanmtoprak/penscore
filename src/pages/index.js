import { lazy } from 'react';

export const HomePage = lazy(() => import('./home'));
export const AboutPage = lazy(() => import('./about'));
export const PricingPage = lazy(() => import('./pricing'));
export const ContactPage = lazy(() => import('./contact'));
export const NotFoundPage = lazy(() => import('./not-found'));
