import React from 'react';
import { useTranslation } from 'react-i18next';
import s from './pricing.module.scss';
import PricingPlans from './PricingPlans';

const PricingComp = () => {
  const { t } = useTranslation();

  return (
    <section className={`${s.sectionBlend} ${s.pricingHome}`}>
      <div className={s.wrapper}>
        <header className={s.heading}>
          <span className={s.kicker}>{t('pricing.billingToggle')}</span>
          <h2>{t('pricing.pageHeadline')}</h2>
          <p>{t('pricing.pageSubtext')}</p>
        </header>

        <PricingPlans billingAnnual={false} />
      </div>
    </section>
  );
};

export default PricingComp;
