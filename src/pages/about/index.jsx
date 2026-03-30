import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@/components/Button';
import Testimonials from '@/components/Testimonials';
import {
  FiZap,
  FiShield,
  FiEye,
  FiTrendingUp,
  FiUsers,
  FiArrowRightCircle,
  FiLayers,
  FiTarget,
} from 'react-icons/fi';
import AboutHeroViz from './AboutHeroViz';
import s from './about.module.scss';

const valueKeys = ['v1', 'v2', 'v3', 'v4'];
const valueIcons = [FiZap, FiShield, FiEye, FiTrendingUp];

const AboutPage = () => {
  const { t } = useTranslation();
  const storyParagraphs = t('about.story.body').split('\n\n').filter(Boolean);

  return (
    <div className={s.aboutWrap}>
      <div className={s.page}>
        <section className={s.hero}>
          <span className={s.heroOrb} aria-hidden />
          <span className={s.heroOrb2} aria-hidden />
          <div className={s.heroGrid}>
            <div className={s.heroCopy}>
              <span className={s.kicker}>{t('about.hero.badge')}</span>
              <h1 className={s.heroTitle}>{t('about.hero.headline')}</h1>
              <p className={s.heroSub}>{t('about.hero.subtext')}</p>
              <div className={s.heroPills}>
                <span className={s.pill}>
                  <FiLayers /> {t('about.hero.pill1')}
                </span>
                <span className={s.pill}>
                  <FiTarget /> {t('about.hero.pill2')}
                </span>
              </div>
            </div>
            <div className={s.heroVisual} aria-hidden>
              <AboutHeroViz />
            </div>
          </div>
        </section>

        <section className={s.section}>
          <div className={s.container}>
            <div className={s.storyRow}>
              <div className={s.storyMain}>
                <span className={s.sectionKicker}>{t('about.story.sectionHeadline')}</span>
                <div className={s.storyBody}>
                  {storyParagraphs.map((paragraph, i) => (
                    <p key={i} className={s.storyPara} style={{ animationDelay: `${0.08 * i}s` }}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
              <aside className={s.teamSpotlight}>
                <span className={s.teamGlow} aria-hidden />
                <h3>{t('about.team.sectionHeadline')}</h3>
                <p className={s.teamSub}>{t('about.team.sectionSubtext')}</p>
                <article className={s.memberCard}>
                  <span className={s.memberAvatar}>
                    <FiUsers />
                  </span>
                  <div>
                    <h4>{t('about.team.member1.name')}</h4>
                    <p>{t('about.team.member1.role')}</p>
                  </div>
                </article>
              </aside>
            </div>

            <div className={s.valuesBlock}>
              <h2 className={s.valuesTitle}>{t('about.values.sectionHeadline')}</h2>
              <div className={s.valueGrid}>
                {valueKeys.map((key, index) => {
                  const Icon = valueIcons[index];
                  return (
                    <article
                      key={key}
                      className={s.valueCard}
                      style={{ animationDelay: `${0.1 * index}s` }}
                    >
                      <span className={s.valueGlow} aria-hidden />
                      <span className={s.valueIcon}>
                        <Icon />
                      </span>
                      <h3>{t(`about.values.${key}.title`)}</h3>
                      <p>{t(`about.values.${key}.desc`)}</p>
                    </article>
                  );
                })}
              </div>
            </div>

            <div className={s.cta}>
              <span className={s.ctaShine} aria-hidden />
              <div className={s.ctaInner}>
                <h2>{t('about.cta.headline')}</h2>
                <p>{t('about.cta.subtext')}</p>
                <Button variant="primary" href="/contact">
                  {t('about.cta.cta')} <FiArrowRightCircle />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Testimonials />
    </div>
  );
};

export default AboutPage;
