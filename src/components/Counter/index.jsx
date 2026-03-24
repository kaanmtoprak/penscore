import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiLayers, FiShield, FiClock, FiTarget } from 'react-icons/fi';
import s from './counter.module.scss';

const metricKeys = ['stat1', 'stat2', 'stat3', 'stat4'];
const metricIcons = [FiLayers, FiShield, FiClock, FiTarget];

const Counter = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { root: null, rootMargin: '0px 0px -12% 0px', threshold: 0.15 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${s.section} ${visible ? s.visible : ''}`}
      aria-label={t('home.metrics.ariaLabel')}
    >
      <div className={s.inner}>
        <div className={s.grid}>
          {metricKeys.map((key, index) => {
            const metric = t(`home.metrics.${key}`, { returnObjects: true });
            const number = metric?.value ?? '';
            const label = metric?.label ?? '';
            const Icon = metricIcons[index];

            return (
              <article
                key={key}
                className={s.card}
                style={{ '--i': index }}
              >
                <div className={s.cardInner}>
                  <div className={s.iconRail} aria-hidden>
                    <span className={s.iconRing} />
                    <span className={s.iconRing2} />
                  </div>
                  <div className={s.iconWrap}>
                    <Icon aria-hidden />
                  </div>
                  <h2 className={s.number}>
                    <span className={s.numberInner}>{number}</span>
                  </h2>
                  <p className={s.label}>{label}</p>
                  <div className={s.cardFooter} aria-hidden>
                    <span className={s.dot} />
                    <span className={s.dot} />
                    <span className={s.dot} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Counter;
