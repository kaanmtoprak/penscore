import Button from '@/components/Button';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FiCheckCircle, FiTrendingUp, FiShield } from 'react-icons/fi';
import s from './case-study.module.scss';

const CaseStudyViz = () => {
  const bars = [36, 58, 44, 72, 52, 88, 64];
  return (
    <div className={s.caseViz} aria-hidden>
      <div className={s.caseVizAura} />
      <div className={s.caseVizGrid} />
      <div className={s.caseVizRings}>
        <span className={s.caseVizRing} />
        <span className={s.caseVizRing} />
      </div>
      <div className={s.caseVizBars}>
        {bars.map((h, i) => (
          <span
            key={i}
            className={s.caseVizBar}
            style={{ height: `${h}%`, animationDelay: `${i * 0.14}s` }}
          />
        ))}
      </div>
      <svg className={s.caseVizSpark} viewBox="0 0 240 90" preserveAspectRatio="none" aria-hidden>
        <path
          className={s.caseVizSparkPath}
          d="M4,72 L38,58 L72,62 L106,38 L140,44 L174,22 L208,28 L236,12"
        />
      </svg>
      <div className={s.caseVizCore}>
        <FiTrendingUp />
        <span className={s.caseVizCoreGlow} />
        <span className={s.caseVizCoreRing} />
      </div>
      <div className={s.caseVizShimmer} />
      <div className={s.caseVizDots}>
        <span />
        <span />
        <span />
      </div>
    </div>
  );
};

const CaseStudy = () => {
  const { t } = useTranslation();
  return (
    <section className={s.section}>
      <div className={s.wrapper}>
        <div className={s.content}>
          <span className={s.badge}>{t('home.caseStudy.badge')}</span>
          <p className={s.industry}>{t('home.caseStudy.industry')}</p>
          <h2 className={s.title}>{t('home.caseStudy.headline')}</h2>
          <p className={s.body}>{t('home.caseStudy.body')}</p>

          <div className={s.stats}>
            <div className={s.statCard} style={{ animationDelay: '0s' }}>
              <span className={s.statIcon}><FiTrendingUp /></span>
              <h3>{t('home.caseStudy.stat1')}</h3>
            </div>
            <div className={s.statCard} style={{ animationDelay: '0.15s' }}>
              <span className={s.statIcon}><FiShield /></span>
              <h3>{t('home.caseStudy.stat2')}</h3>
            </div>
            <div className={s.statCard} style={{ animationDelay: '0.3s' }}>
              <span className={s.statIcon}><FiCheckCircle /></span>
              <h3>{t('home.caseStudy.stat3')}</h3>
            </div>
          </div>

          <blockquote className={s.quote}>
            <p>{t('home.caseStudy.quote')}</p>
            <footer>
              <strong>{t('home.caseStudy.quoteAuthorName')}</strong>
              <span>{t('home.caseStudy.quoteAuthorRole')}</span>
              <span>{t('home.caseStudy.quoteAuthorSector')}</span>
            </footer>
          </blockquote>

          <div className={s.actions}>
            <Button variant="primary" href="/service">
              {t('home.caseStudy.link')}
            </Button>
          </div>
        </div>

        <div className={s.media}>
          <CaseStudyViz />
        </div>
      </div>
    </section>
  );
};

export default CaseStudy;