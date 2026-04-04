import Button from '@/components/Button';
import Link from '@/components/common/Link';
import { useTheme } from '@/context/ThemeContext';
import React, { useEffect, useRef, useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';
import { useLocation } from 'react-router-dom';
import UseSticky from '@/hooks/UseSticky';
import { useTranslation } from 'react-i18next';
import s from './header.module.scss';

const cn = (...parts) => {
  return parts.filter(Boolean).join(' ');
};
const MENU_LINKS = [
  { id: 1, navKey: 'home', link: '/' },
  { id: 2, navKey: 'about', link: '/about' },
  { id: 4, navKey: 'blog', link: '/blog' },
  { id: 5, navKey: 'pricing', link: '/pricing' },
  { id: 9, navKey: 'contact', link: '/contact' },
];

const LANGUAGES = [
  { code: 'tr', label: 'Türkçe', short: 'TR' },
  { code: 'en', label: 'English', short: 'EN' },
];

const Header = () => {
  const { pathname } = useLocation();
  const { sticky } = UseSticky();
  const { theme, toggleTheme } = useTheme();
  const { i18n, t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef(null);
  const currentLang = i18n.resolvedLanguage?.startsWith('tr') ? 'tr' : 'en';
  const currentLangMeta = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[1];

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('mmactive');
    } else {
      document.body.classList.remove('mmactive');
    }
    return () => document.body.classList.remove('mmactive');
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
    setLangOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!langOpen) return;
    const onDoc = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false);
      }
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setLangOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [langOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    window.localStorage.setItem('app_lang', lang);
    setLangOpen(false);
  };

  const isNavActive = (link) => {
    if (link === '/blog') return pathname === '/blog' || pathname.startsWith('/blog/');
    return pathname === link;
  };

  return (
    <>
      <header className={cn(s.header, sticky && s.headerSticky)}>
        <div className={s.container}>
          <div className={s.siteLogo}>
            <Link href="/">
              <span className={s.logoText}>PenScore</span>
            </Link>
          </div>

          <div className={s.colNav}>
            <nav className={s.mainMenu} aria-label={t('global.nav.ariaMainNav')}>
              <ul>
                {MENU_LINKS.map((item, i) => (
                  <li key={i}>
                    <Link href={item.link} className={cn(isNavActive(item.link) && s.navLinkActive)}>
                      {t(`global.nav.${item.navKey}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className={s.themeDock}>
            <button
              type="button"
              className={s.themeToggle}
              onClick={toggleTheme}
              aria-label={t('global.nav.ariaThemeToggle')}
              title={theme === 'dark' ? t('global.nav.themeSwitchLight') : t('global.nav.themeSwitchDark')}
            >
              {theme === 'dark' ? <FiSun aria-hidden /> : <FiMoon aria-hidden />}
            </button>
          </div>

          <div className={s.langDock} ref={langRef}>
            <div className={s.langSwitcher}>
              <button
                type="button"
                className={s.langTrigger}
                aria-expanded={langOpen}
                aria-haspopup="listbox"
                aria-label={t('global.nav.ariaLangSelector')}
                onClick={() => setLangOpen((o) => !o)}
              >
                <span className={s.langTriggerShort}>{currentLangMeta.short}</span>
                <span className={s.langTriggerLabel}>{currentLangMeta.label}</span>
                <span className={cn(s.langChevron, langOpen && s.langChevronOpen)} aria-hidden>
                  ▾
                </span>
              </button>
              {langOpen && (
                <ul className={s.langMenu} role="listbox">
                  {LANGUAGES.map((lang) => (
                    <li key={lang.code} role="none">
                      <button
                        type="button"
                        role="option"
                        aria-selected={currentLang === lang.code}
                        className={cn(s.langOption, currentLang === lang.code && s.langOptionActive)}
                        onClick={() => handleLanguageChange(lang.code)}
                      >
                        <span className={s.langOptionShort}>{lang.short}</span>
                        {lang.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <Button className={s.ctaButton} variant="primary" href="/contact">
            {t('global.nav.cta')}
          </Button>

          <div className={s.burgerWrap}>
            <button
              type="button"
              className={cn(s.burger, menuOpen && s.burgerHidden)}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              aria-label={menuOpen ? t('global.nav.ariaCloseMenu') : t('global.nav.ariaOpenMenu')}
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span className={s.burgerBar} />
              <span className={s.burgerBar} />
              <span className={s.burgerBar} />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <button
          type="button"
          className={s.scrim}
          aria-label={t('global.nav.ariaCloseOverlay')}
          onClick={closeMenu}
        />
      )}

      <div
        id="mobile-navigation"
        className={cn(s.drawer, menuOpen && s.drawerOpen)}
        aria-hidden={!menuOpen}
      >
        <div className={s.drawerHeader}>
          <span className={s.drawerTitle}>{t('global.nav.drawerTitle')}</span>
          <button
            type="button"
            className={s.drawerClose}
            aria-label={t('global.nav.drawerClose')}
            onClick={closeMenu}
          >
            ×
          </button>
        </div>
        <nav className={s.drawerBody} aria-label={t('global.nav.ariaMobileNav')}>
          <ul className={s.mobileList}>
            {MENU_LINKS.map((item, i) => (
              <li key={i} className={s.mobileItem}>
                <Link
                  href={item.link}
                  className={cn(s.mobileLeafLink, isNavActive(item.link) && s.mobileLeafLinkActive)}
                  onClick={closeMenu}
                >
                  {t(`global.nav.${item.navKey}`)}
                </Link>
              </li>
            ))}
            <li className={s.mobileItem}>
              <details className={s.mobileLangDetails}>
                <summary className={s.mobileLangSummary}>
                  {t('global.nav.mobileLangSummary')}
                  <span className={s.mobileLangCurrent}>({currentLangMeta.short})</span>
                </summary>
                <div className={s.mobileLangList}>
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      className={cn(
                        s.mobileLangOption,
                        currentLang === lang.code && s.mobileLangOptionActive
                      )}
                      onClick={() => {
                        handleLanguageChange(lang.code);
                        closeMenu();
                      }}
                    >
                      <span>{lang.short}</span> {lang.label}
                    </button>
                  ))}
                </div>
              </details>
            </li>
            <li className={s.mobileItem}>
              <button type="button" className={s.mobileThemeBtn} onClick={toggleTheme}>
                {theme === 'dark' ? t('global.nav.themeSwitchLight') : t('global.nav.themeSwitchDark')}
              </button>
            </li>
          </ul>
          <div className={s.drawerCta}>
            <Button variant="primary" href="/contact" onClick={closeMenu}>
              {t('global.nav.cta')}
            </Button>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
