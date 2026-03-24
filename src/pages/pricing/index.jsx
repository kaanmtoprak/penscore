import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@/components/Button';
import { Faq } from '@/components';
import PricingPlans from '@/components/PricingComp/PricingPlans';
import ps from '@/components/PricingComp/pricing.module.scss';
import { FiArrowRight } from 'react-icons/fi';
import s from './pricing-page.module.scss';

const PricingPage = () => {
  const { t } = useTranslation();
  const [billingAnnual, setBillingAnnual] = useState(false);
  const rows = t('pricing.comparison.rows', { returnObjects: true }) || [];

  return (
    <div className={s.page}>
      <section className={s.hero}>
        <div className={s.heroInner}>
          <span className={s.kicker}>{t('pricing.hero.badge')}</span>
          <h1 className={s.heroTitle}>{t('pricing.hero.headline')}</h1>
          <p className={s.heroSub}>{t('pricing.hero.subtext')}</p>
        </div>
      </section>

      <section className={ps.sectionBlend}>
        <div className={ps.wrapper}>
          <div className={s.billingBar}>
            <p className={s.billingHint}>{t('pricing.billingSaveHint')}</p>
            <div className={s.toggle} role="group" aria-label={t('pricing.billingToggle')}>
              <button
                type="button"
                className={`${s.toggleBtn} ${!billingAnnual ? s.toggleBtnActive : ''}`}
                onClick={() => setBillingAnnual(false)}
                aria-pressed={!billingAnnual}
              >
                {t('pricing.billingMonthly')}
              </button>
              <button
                type="button"
                className={`${s.toggleBtn} ${billingAnnual ? s.toggleBtnActive : ''}`}
                onClick={() => setBillingAnnual(true)}
                aria-pressed={billingAnnual}
              >
                {t('pricing.billingAnnual')}
              </button>
            </div>
          </div>

          <PricingPlans billingAnnual={billingAnnual} />
        </div>
      </section>

      <section className={s.compareSection}>
        <div className={s.compareInner}>
          <header className={s.compareHead}>
            <h2>{t('pricing.comparison.title')}</h2>
            <p>{t('pricing.comparison.subtitle')}</p>
          </header>

          <div className={s.tableWrap}>
            <table className={s.table}>
              <thead>
                <tr>
                  <th scope="col">{t('pricing.comparison.colFeature')}</th>
                  <th scope="col">{t('pricing.starter.name')}</th>
                  <th scope="col">{t('pricing.professional.name')}</th>
                  <th scope="col">{t('pricing.enterprise.name')}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={`${row.label}-${i}`}>
                    <th scope="row">{row.label}</th>
                    <td>
                      <span className={s.cell}>{row.starter}</span>
                    </td>
                    <td>
                      <span className={s.cell}>{row.professional}</span>
                    </td>
                    <td>
                      <span className={s.cell}>{row.enterprise}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Faq flat />

      <section className={s.ctaBand}>
        <div className={s.ctaInner}>
          <span className={s.ctaKicker}>{t('home.ctaBand.badge')}</span>
          <h2>{t('home.ctaBand.headline')}</h2>
          <p>{t('home.ctaBand.subtext')}</p>
          <div className={s.ctaRow}>
            <Button variant="primary" href="/contact">
              {t('home.ctaBand.ctaPrimary')} <FiArrowRight />
            </Button>
            <Button variant="outline" href="/contact">
              {t('home.ctaBand.ctaSecondary')}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
