import Link from '@/components/common/Link';
import React, { useMemo } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import s from './blog-home-section.module.scss';

const BLOG_IMAGE = '/img/cyber-security.jpg';
const LATEST_COUNT = 4;

const BlogHomeSection = () => {
  const { t } = useTranslation();

  const latestSlugs = useMemo(() => {
    const order = t('blog.postOrder', { returnObjects: true });
    if (!Array.isArray(order) || order.length === 0) return [];
    const last = order.slice(-LATEST_COUNT);
    return last.reverse();
  }, [t]);

  if (latestSlugs.length === 0) {
    return null;
  }

  const gridClass = latestSlugs.length === 1 ? `${s.grid} ${s.gridSingle}` : s.grid;

  return (
    <section className={s.section} aria-labelledby="blog-home-heading">
      <div className={s.inner}>
        <div className={s.head}>
          <div className={s.headText}>
            <span className={s.kicker}>{t('blog.home.kicker')}</span>
            <h2 id="blog-home-heading" className={s.title}>
              {t('blog.home.title')}
            </h2>
            <p className={s.subtitle}>{t('blog.home.subtitle')}</p>
          </div>
          <Link href="/blog" className={s.viewAll}>
            {t('blog.home.viewAll')}
            <FiArrowRight aria-hidden />
          </Link>
        </div>

        <ul className={gridClass}>
          {latestSlugs.map((slug) => (
            <li key={slug}>
              <Link href={`/blog/${slug}`} className={s.card}>
                <span className={s.cardGlow} aria-hidden />
                <div className={s.cardImageWrap}>
                  <img className={s.cardImage} src={BLOG_IMAGE} alt="" loading="lazy" decoding="async" />
                </div>
                <div className={s.cardBody}>
                  <h3 className={s.cardTitle}>{t(`blog.posts.${slug}.title`)}</h3>
                  <p className={s.cardExcerpt}>{t(`blog.posts.${slug}.excerpt`)}</p>
                  <div className={s.cardFooter}>
                    <span className={s.readLink}>
                      {t('blog.home.readArticle')}
                      <FiArrowRight aria-hidden />
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default BlogHomeSection;
