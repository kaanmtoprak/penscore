import React from 'react';
import { useTranslation } from 'react-i18next';
import { FiBox, FiActivity, FiKey, FiGitMerge, FiShield, FiMonitor } from 'react-icons/fi';
import s from './features.module.scss';
import { Brands } from '..';

const featureKeys = ['feature1', 'feature2', 'feature3', 'feature4', 'feature5', 'feature6'];
const featureIcons = [FiBox, FiActivity, FiKey, FiGitMerge, FiShield, FiMonitor];

const Features = () => {
  const { t } = useTranslation();

  return (
    <section className={s.section}>
      <div className={s.wrapper}>
        <div className={s.layout}>
          <div className={s.heading}>
            <div className={s.headingGlow} />
            <span className={s.kicker}>{t('home.features.sectionLabel')}</span>
            <h2 className={s.title}>{t('home.features.sectionHeadline')}</h2>
            <p className={s.subtitle}>{t('home.features.sectionSubtext')}</p>
          </div>

          <div className={s.grid}>
            {featureKeys.map((key, index) => {
              const Icon = featureIcons[index];

              return (
                <article key={key} className={s.card}>
                  <div className={s.cardTop}>
                    <span className={s.iconWrap}>
                      <Icon />
                    </span>
                  </div>

                  <h3>{t(`home.features.${key}.title`)}</h3>
                  <p className={s.cardDesc}>{t(`home.features.${key}.desc`)}</p>
                  <span className={s.cardTag}>{t(`home.features.${key}.tag`)}</span>
                </article>
              );
            })}
          </div>
        </div>
      </div>
      <Brands />
    </section>
  );
};

export default Features;