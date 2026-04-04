import Link from '@/components/common/Link';
import React, { useMemo } from 'react';
import { FiBookOpen } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import s from './blog.module.scss';

const PAGE_SIZE = 16;
const BLOG_IMAGE = '/img/cyber-security.jpg';

const BlogPage = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();

  const slugs = useMemo(() => {
    const order = t('blog.postOrder', { returnObjects: true });
    return Array.isArray(order) ? order : [];
  }, [t]);

  const totalPages = slugs.length === 0 ? 0 : Math.ceil(slugs.length / PAGE_SIZE);
  const rawPage = parseInt(searchParams.get('page') || '1', 10);
  const page =
    totalPages === 0
      ? 1
      : Math.min(Math.max(1, Number.isFinite(rawPage) ? rawPage : 1), totalPages);

  const pageSlugs = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return slugs.slice(start, start + PAGE_SIZE);
  }, [slugs, page]);

  const buildPageHref = (p) => (p <= 1 ? '/blog' : `/blog?page=${p}`);

  const pageNumbers = useMemo(() => {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }, [totalPages]);

  return (
    <div className={s.page}>
      <header className={s.hero}>
        <span className={s.kicker}>PenScore</span>
        <h1 className={s.title}>{t('blog.list.title')}</h1>
        <p className={s.subtitle}>{t('blog.list.subtitle')}</p>
      </header>

      <div className={s.container}>
        {slugs.length === 0 ? (
          <div className={s.emptyState} role="status">
            <span className={s.emptyIcon} aria-hidden>
              <FiBookOpen />
            </span>
            <h2 className={s.emptyTitle}>{t('blog.list.emptyTitle')}</h2>
            <p className={s.emptyHint}>{t('blog.list.emptyHint')}</p>
          </div>
        ) : (
          <ul className={s.grid}>
            {pageSlugs.map((slug) => (
              <li key={slug}>
                <Link href={`/blog/${slug}`} className={s.cardLink}>
                  <div className={s.cardImageWrap}>
                    <img className={s.cardImage} src={BLOG_IMAGE} alt="" loading="lazy" decoding="async" />
                  </div>
                  <div className={s.cardBody}>
                    <h2 className={s.cardTitle}>{t(`blog.posts.${slug}.title`)}</h2>
                    <p className={s.cardExcerpt}>{t(`blog.posts.${slug}.excerpt`)}</p>
                    <span className={s.readMore}>{t('blog.list.readMore')} →</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}

        {slugs.length > 0 && totalPages > 1 && (
          <nav className={s.pagination} aria-label={t('blog.pagination.aria')}>
            {page > 1 ? (
              <Link href={buildPageHref(page - 1)} className={s.paginationBtn}>
                {t('blog.pagination.prev')}
              </Link>
            ) : (
              <span className={`${s.paginationBtn} ${s.paginationDisabled}`} aria-hidden="true">
                {t('blog.pagination.prev')}
              </span>
            )}
            {pageNumbers.map((n) => (
              <Link
                key={n}
                href={buildPageHref(n)}
                className={`${s.paginationBtn} ${s.pageNum} ${n === page ? s.pageNumActive : ''}`}
                aria-current={n === page ? 'page' : undefined}
              >
                {n}
              </Link>
            ))}
            {page < totalPages ? (
              <Link href={buildPageHref(page + 1)} className={s.paginationBtn}>
                {t('blog.pagination.next')}
              </Link>
            ) : (
              <span className={`${s.paginationBtn} ${s.paginationDisabled}`} aria-hidden="true">
                {t('blog.pagination.next')}
              </span>
            )}
            <p className={s.pageLabel}>
              {t('blog.pagination.pageLabel', { page, totalPages })}
            </p>
          </nav>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
