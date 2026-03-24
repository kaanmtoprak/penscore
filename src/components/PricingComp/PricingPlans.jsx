import Button from '@/components/Button';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FiCheckCircle, FiShield, FiStar, FiZap } from 'react-icons/fi';
import s from './pricing.module.scss';

const planDefs = [
  { key: 'starter', icon: <FiZap />, featured: false },
  { key: 'professional', icon: <FiStar />, featured: true },
  { key: 'enterprise', icon: <FiShield />, featured: false },
];

const PricingPlans = ({ billingAnnual = false }) => {
  const { t } = useTranslation();

  const getPlanPrice = (key) => {
    if (key === 'enterprise') {
      return t('pricing.enterprise.price');
    }
    return billingAnnual ? t(`pricing.${key}.priceAnnual`) : t(`pricing.${key}.priceMonthly`);
  };

  return (
    <div className={s.grid}>
      {planDefs.map((plan) => {
        const features = t(`pricing.${plan.key}.features`, { returnObjects: true }) || [];

        return (
          <article key={plan.key} className={`${s.card} ${plan.featured ? s.cardFeatured : ''}`}>
            <div className={s.cardTop}>
              <div className={s.icon}>{plan.icon}</div>
              <h3>{t(`pricing.${plan.key}.name`)}</h3>
              {plan.featured && <span className={s.badge}>{t('pricing.professional.badge')}</span>}
            </div>

            <p className={s.desc}>{t(`pricing.${plan.key}.desc`)}</p>

            <div className={s.price}>
              <span className={s.amount}>{getPlanPrice(plan.key)}</span>
            </div>

            <ul className={s.featureList}>
              {features.map((feature) => (
                <li key={feature}>
                  <FiCheckCircle />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Button variant="primary" href="/contact" className={s.cta}>
              {t(`pricing.${plan.key}.cta`)}
            </Button>
          </article>
        );
      })}
    </div>
  );
};

export default PricingPlans;
