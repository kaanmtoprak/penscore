import React from 'react';
import { useTranslation } from 'react-i18next';
import { FiUploadCloud, FiSearch, FiBarChart2, FiFileText } from 'react-icons/fi';
import s from './approach.module.scss';

const stepKeys = ['step1', 'step2', 'step3', 'step4'];
const stepIcons = [FiUploadCloud, FiSearch, FiBarChart2, FiFileText];

const Approach = () => {
  const { t } = useTranslation();

  return (
    <section className={s.section}>
      <div className={s.wrapper}>
        <div className={s.heading}>
          <span className={s.kicker}>{t('home.howItWorks.sectionLabel')}</span>
          <h2 className={s.title}>{t('home.howItWorks.sectionHeadline')}</h2>
          <p className={s.subtitle}>{t('home.howItWorks.sectionSubtext')}</p>
        </div>

        <div className={s.flow}>

          <div className={s.steps}>
            <span className={s.rail} />
            {stepKeys.map((key, index) => {
              const Icon = stepIcons[index];
              const isRight = index % 2 === 1;
              return (
                <article key={key} className={`${s.stepCard} ${isRight ? s.stepRight : s.stepLeft}`}>
                  <div className={s.stepDot}>
                    <Icon />
                  </div>
                  <div className={s.stepBody}>
                    <span className={s.stepLabel}>{`${index + 1}`}</span>
                    <h3>{t(`home.howItWorks.${key}.title`)}</h3>
                    <p>{t(`home.howItWorks.${key}.desc`)}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Approach;