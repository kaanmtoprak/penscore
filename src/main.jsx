import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './i18n';
import './styles/tailwind.scss';
import './styles/layout-system.scss';
import 'swiper/css/bundle';
import './styles/style.scss';
import { Footer, Header } from './layouts';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Header />
      <App />
      <Footer/>
    </BrowserRouter>
  </React.StrictMode>,
);
