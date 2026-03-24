import Button from '@/components/Button';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import s from './hero.module.scss';

const BLIP_COUNT = 15;

const buildRadarBlips = () =>
  Array.from({ length: BLIP_COUNT }, (_, id) => {
    const angle = Math.random() * Math.PI * 2;
    const r = 14 + Math.random() * 36;
    return {
      id,
      top: 50 + Math.sin(angle) * r,
      left: 50 + Math.cos(angle) * r,
      delay: Math.random() * 4.5,
      duration: 1.8 + Math.random() * 2.8,
    };
  });

const Hero = () => {
  const { t } = useTranslation();
  const radarBlips = useMemo(buildRadarBlips, []);

  return (
    <section className={s.hero} aria-labelledby="hero-headline">
      <div className={s.bg} aria-hidden />
      <div className={s.bgGrid} aria-hidden />

      <div className={s.glassVeil} aria-hidden />

      <div className={s.radarScope} aria-hidden>
        <span className={s.radarFace} />
        <span className={s.radarSpokes} />
        {radarBlips.map((b) => (
          <span
            key={b.id}
            className={s.radarBlip}
            style={{
              top: `${b.top}%`,
              left: `${b.left}%`,
              '--blip-delay': `${b.delay}s`,
              '--blip-duration': `${b.duration}s`,
            }}
          />
        ))}
        <span className={s.radarPing} />
        <span className={s.radarSweep} />
      </div>

      <div className={s.inner}>
        <div className={s.content}>
          <span className={s.badge}>{t('home.hero.badge')}</span>

          <h1 id="hero-headline" className={s.headline}>
            <span className={s.headlineText}>{t('home.hero.headline')}</span>
          </h1>

          <p className={s.sub}>{t('home.hero.subtext')}</p>

          <div className={s.actions}>
            <Button variant="primary" href="/about" className={s.ctaPrimary}>
              {t('home.hero.ctaPrimary')}
            </Button>
              <Button
                variant="outline"
                href="#"
                className={s.ctaSecondary}
              >
                {t('home.hero.ctaSecondary')}
              </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
