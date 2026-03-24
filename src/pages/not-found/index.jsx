import Button from '@/components/Button';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FiArrowLeft, FiHome } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import s from './not-found.module.scss';

const DIGITS = ['4', '0', '4'];

const NotFoundPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className={s.page}>
      <section className={s.section} aria-labelledby="not-found-title">
        <span className={s.orb} aria-hidden />
        <span className={s.orb2} aria-hidden />
        <div className={s.grid} aria-hidden />

        <div className={s.inner}>
          <div className={s.codeBlock} aria-hidden>
            {DIGITS.map((ch, i) => (
              <span key={i} className={s.digit} style={{ '--i': i }}>
                {ch}
              </span>
            ))}
          </div>

          <p className={s.kicker}>{t('notFound.badge')}</p>
          <h1 id="not-found-title" className={s.title}>
            {t('notFound.headline')}
          </h1>
          <p className={s.sub}>{t('notFound.subtext')}</p>

          <div className={s.actions}>
            <Button variant="primary" href="/" className={s.cta}>
              <FiHome aria-hidden /> {t('notFound.cta')}
            </Button>
            <button type="button" className={s.backLink} onClick={() => navigate(-1)}>
              <FiArrowLeft aria-hidden />
              {t('notFound.goBack')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotFoundPage;
