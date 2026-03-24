import Button from '@/components/Button';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FiSend } from 'react-icons/fi';
import s from './newsletter.module.scss';

const Newsletter = () => {
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className={s.section} aria-labelledby="newsletter-heading">
      <div className={s.inner}>
        <div className={s.panel}>
          <span className={s.kicker}>{t('home.newsletter.sectionLabel')}</span>
          <h2 id="newsletter-heading" className={s.title}>
            {t('home.newsletter.headline')}
          </h2>
          <p className={s.subtitle}>{t('home.newsletter.subtext')}</p>

          <form className={s.form} onSubmit={handleSubmit} noValidate>
            <div className={s.fieldRow}>
              <label htmlFor="home-newsletter-email" className={s.visuallyHidden}>
                {t('home.newsletter.placeholder')}
              </label>
              <input
                id="home-newsletter-email"
                name="email"
                type="email"
                autoComplete="email"
                className={s.input}
                placeholder={t('home.newsletter.placeholder')}
              />
              <Button variant="primary" type="submit" className={s.submit}>
                {t('home.newsletter.submit')} <FiSend aria-hidden />
              </Button>
            </div>
            <p className={s.hint}>{t('home.newsletter.hint')}</p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
