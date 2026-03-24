import React from 'react';
import { useTranslation } from 'react-i18next';
import { FiShield, FiLock, FiCreditCard, FiCheckSquare, FiAlertTriangle, FiGlobe } from 'react-icons/fi';
import s from './compliances.module.scss';

const ComplianceCenterViz = () => (
  <div className={s.complianceViz} aria-hidden>
    <div className={s.vizGlow} />
    <div className={s.vizHex} />
    <div className={s.vizRipples}>
      <span className={s.vizRipple} />
      <span className={s.vizRipple} />
      <span className={s.vizRipple} />
    </div>
    <div className={`${s.vizRing} ${s.vizRingA}`} />
    <div className={`${s.vizRing} ${s.vizRingB}`} />
    <div className={`${s.vizRing} ${s.vizRingC}`} />
    <div className={s.vizSweep} />
    <div className={s.vizOrbits}>
      <span className={`${s.vizOrbit} ${s.vizOrbitA}`}>
        <span className={s.vizNode} />
      </span>
      <span className={`${s.vizOrbit} ${s.vizOrbitB}`}>
        <span className={s.vizNode} />
      </span>
      <span className={`${s.vizOrbit} ${s.vizOrbitC}`}>
        <span className={s.vizNode} />
      </span>
    </div>
    <div className={s.vizCore}>
      <FiShield />
      <span className={s.vizCoreRing} />
    </div>
    <div className={s.vizScanlines} />
  </div>
);

const badgeKeys = ['badge1', 'badge2', 'badge3', 'badge4', 'badge5', 'badge6'];
const badgeIcons = [FiShield, FiLock, FiCreditCard, FiCheckSquare, FiAlertTriangle, FiGlobe];

const Compliances = () => {
  const { t } = useTranslation();

  return (
    <section className={s.section}>
      <div className={s.wrapper}>
        <div className={s.heading}>
          <span className={s.kicker}>{t('home.compliance.sectionLabel')}</span>
          <h2 className={s.title}>{t('home.compliance.sectionHeadline')}</h2>
          <p className={s.subtitle}>{t('home.compliance.sectionSubtext')}</p>
        </div>

        <div className={s.stage}>
          <div className={s.media}>
            <div className={s.mediaGlow} />
            <ComplianceCenterViz />
          </div>

          <div className={s.grid}>
            {badgeKeys.map((key, index) => {
              const Icon = badgeIcons[index];
              return (
                <article key={key} className={s.card}>
                  <div className={s.cardIcon}>
                    <Icon />
                  </div>
                  <div className={s.cardBody}>
                    <h3>{t(`home.compliance.${key}.name`)}</h3>
                    <p>{t(`home.compliance.${key}.desc`)}</p>
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

export default Compliances;
