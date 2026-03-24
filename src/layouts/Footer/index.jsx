import Link from '@/components/common/Link';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaFacebook, FaInstagram, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';
import s from './footer.module.scss';

const SOCIAL_LINKS = [
  { href: '#', label: 'Facebook', Icon: FaFacebook, bg: 'facebook' },
  { href: '#', label: 'X', Icon: FaXTwitter, bg: 'twitter' },
  { href: '#', label: 'Instagram', Icon: FaInstagram, bg: 'instagram' },
  { href: '#', label: 'LinkedIn', Icon: FaLinkedinIn, bg: 'linkedin' },
];

const SOCIAL_BG = {
  facebook: 'socialFacebook',
  twitter: 'socialTwitter',
  instagram: 'socialInstagram',
  linkedin: 'socialLinkedin',
};

const Footer = () => {
  const { t } = useTranslation();
  const col1 = t('global.footer.col1', { returnObjects: true }) || [];
  const col2 = t('global.footer.col2', { returnObjects: true }) || [];
  const col3 = t('global.footer.col3', { returnObjects: true }) || [];
  const col4 = t('global.footer.col4', { returnObjects: true }) || [];
  const legal = t('global.footer.legal', { returnObjects: true }) || [];

  return (
    <footer className={`${s.footer} section-padding`}>
      <div className="container">
        <div className={s.topGrid}>
          <div className={`${s.singleFooter} ${s.brandCol}`}>
            <Link href="/">
              <span className={s.logoText}>PenScore</span>
            </Link>
            <p>{t('global.footer.tagline')}</p>
            <a href={`mailto:${t('global.footer.contactEmail')}`} className={s.contactMail}>
              {t('global.footer.contactEmail')}
            </a>
            <div className={s.socialProfile}>
              <ul>
                {SOCIAL_LINKS.map(({ href, label, Icon, bg }) => {
                  const external = href.startsWith('http');
                  return (
                    <li key={label}>
                      <a
                        href={href}
                        className={`${s.socialLink} ${s[SOCIAL_BG[bg]]}`}
                        aria-label={label}
                        {...(external ? { rel: 'noopener noreferrer', target: '_blank' } : {})}
                      >
                        <Icon className={s.socialIcon} aria-hidden />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className={s.singleFooter}>
            <h4>{t('global.footer.col1Title')}</h4>
            <ul>
              {col1.map((item) => (
                <li key={item}>
                  <a href="#">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className={s.singleFooter}>
            <h4>{t('global.footer.col2Title')}</h4>
            <ul>
              {col2.map((item) => (
                <li key={item}>
                  <a href="#">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className={s.singleFooter}>
            <h4>{t('global.footer.col3Title')}</h4>
            <ul>
              {col3.map((item) => (
                <li key={item}>
                  <a href="#">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className={s.singleFooter}>
            <h4>{t('global.footer.col4Title')}</h4>
            <ul>
              {col4.map((item) => (
                <li key={item}>
                  <a href="#">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

          <div className={`row ${s.footerRow}`}>
            <div className="col-lg-6 col-sm-6 col-xs-12">
              <div className={s.footerCopyright}>
                <p>{t('global.footer.copyright')}</p>
              </div>
            </div>
            <div className="col-lg-6 col-sm-6 col-xs-12">
              <div className={s.footerMenu}>
                <ul>
                  {legal.map((item) => (
                    <li key={item}>
                      <a href="#">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
      </div>
    </footer>
  );
};

export default Footer;
