import { lazy } from 'react';

export const HomePage = lazy(() => import('./home'));
export const AboutPage = lazy(() => import('./about'));
export const PricingPage = lazy(() => import('./pricing'));
export const ContactPage = lazy(() => import('./contact'));
export const BlogPage = lazy(() => import('./blog'));
export const BlogDetailPage = lazy(() => import('./blog/detail'));
export const PaymentPage = lazy(() => import('./payment'));
export const NotFoundPage = lazy(() => import('./not-found'));
