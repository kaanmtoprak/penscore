import Link from '@/components/common/Link';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FiArrowLeft } from 'react-icons/fi';
import { Navigate, useParams } from 'react-router-dom';
import s from './blog.module.scss';

const BLOG_IMAGE = '/img/cyber-security.jpg';

const BlogDetailPage = () => {
  const { t } = useTranslation();
  const { slug } = useParams();

  const title = t(`blog.posts.${slug}.title`, { defaultValue: '' });
  if (!title) {
    return <Navigate to="/404" replace />;
  }

  const body = t('blog.articleBody');
  const paragraphs = typeof body === 'string' ? body.split(/\n\n+/).filter(Boolean) : [];

  return (
    <article className={s.detailPage}>
      <div className={s.detailHero}>
        <Link href="/blog" className={s.back}>
          <FiArrowLeft aria-hidden />
          {t('blog.detail.back')}
        </Link>
        <h1 className={s.detailTitle}>{title}</h1>
      </div>

      <div className={s.detailImageWrap}>
        <img className={s.detailImage} src={BLOG_IMAGE} alt={t('blog.detail.imageAlt')} loading="eager" decoding="async" />
      </div>

      <div className={s.article}>
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </article>
  );
};

export default BlogDetailPage;
