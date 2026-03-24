import React from 'react';
import { useTranslation } from 'react-i18next';
import { FiMessageSquare, FiStar } from 'react-icons/fi';
import s from './testimonials.module.scss';

const testimonialKeys = ['t1', 't2', 't3'];

const Testimonials = () => {
  const { t } = useTranslation();

  return (
    <section className={s.section}>
      <div className={s.wrapper}>
        <header className={s.heading}>
          <span className={s.kicker}>{t('home.testimonials.sectionLabel')}</span>
          <h2>{t('home.testimonials.sectionHeadline')}</h2>
        </header>

        <div className={s.grid}>
          {testimonialKeys.map((key, index) => (
            <article key={key} className={s.card} style={{ animationDelay: `${index * 0.28}s` }}>
              <span className={s.cardGlow} />
              <div className={s.cardTop}>
                <span className={s.quoteIcon}>
                  <FiMessageSquare />
                </span>
                <div className={s.stars}>
                  <FiStar />
                  <FiStar />
                  <FiStar />
                  <FiStar />
                  <FiStar />
                </div>
              </div>

              <p className={s.text}>{t(`home.testimonials.${key}.text`)}</p>

              <div className={s.person}>
                <h4>{t(`home.testimonials.${key}.name`)}</h4>
                <p>{t(`home.testimonials.${key}.role`)}</p>
                <span>{t(`home.testimonials.${key}.sector`)}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
