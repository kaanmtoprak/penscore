import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import './i18n';
import './styles/theme.scss';
import './styles/tailwind.scss';
import './styles/layout-system.scss';
import 'swiper/css/bundle';
import './styles/style.scss';
import { Footer, Header } from './layouts';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Header />
        <App />
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
);
