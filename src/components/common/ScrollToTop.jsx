import React, { useCallback, useEffect, useState } from 'react';
import { FiChevronUp } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import s from './scroll-to-top.module.scss';

const SCROLL_THRESHOLD = 400;

const ScrollToTop = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  const onScroll = useCallback(() => {
    setVisible(window.scrollY > SCROLL_THRESHOLD);
  }, []);

  useEffect(() => {
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      className={`${s.root} ${visible ? s.isVisible : ''}`}
      onClick={scrollTop}
      aria-label={t('common.backToTop', 'Üste dön')}
    >
      <span className={s.ring} aria-hidden />
      <FiChevronUp className={s.icon} aria-hidden />
    </button>
  );
};

export default ScrollToTop;
