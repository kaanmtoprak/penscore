import Button from '@/components/Button';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FiVideo, FiDollarSign, FiHeadphones, FiMail, FiCheck, FiSend } from 'react-icons/fi';
import s from './contact.module.scss';

const optionKeys = ['opt1', 'opt2', 'opt3'];
const optionIcons = [FiVideo, FiDollarSign, FiHeadphones];

const ContactPage = () => {
  const { t } = useTranslation();
  const teamOptions = t('contact.form.field5Options', { returnObjects: true }) || [];
  const bullets = t('contact.form.bullets', { returnObjects: true }) || [];
  const email = t('contact.options.email');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={s.page}>
      <section className={s.hero}>
        <div className={s.heroInner}>
          <span className={s.kicker}>{t('contact.hero.badge')}</span>
          <h1 className={s.heroTitle}>{t('contact.hero.headline')}</h1>
          <p className={s.heroSub}>{t('contact.hero.subtext')}</p>
        </div>
      </section>

      <section className={s.section}>
        <div className={s.container}>
          <div className={s.options}>
            {optionKeys.map((key, index) => {
              const Icon = optionIcons[index];
              return (
                <article
                  key={key}
                  className={s.optionCard}
                  style={{ animationDelay: `${0.1 * index}s` }}
                >
                  <span className={s.optionIcon}>
                    <Icon />
                  </span>
                  <h3>{t(`contact.options.${key}.title`)}</h3>
                  <p>{t(`contact.options.${key}.desc`)}</p>
                </article>
              );
            })}
          </div>

          <div className={s.split}>
            <div className={s.formWrap}>
              <header className={s.formHead}>
                <h2>{t('contact.form.title')}</h2>
                <p>{t('contact.form.subtitle')}</p>
              </header>

              <form className={s.form} onSubmit={handleSubmit} noValidate>
                <div className={s.fieldRow}>
                  <label className={s.field} htmlFor="contact-first">
                    <span className={s.label}>{t('contact.form.field1')}</span>
                    <input id="contact-first" name="firstName" type="text" autoComplete="given-name" required />
                  </label>
                  <label className={s.field} htmlFor="contact-last">
                    <span className={s.label}>{t('contact.form.field2')}</span>
                    <input id="contact-last" name="lastName" type="text" autoComplete="family-name" required />
                  </label>
                </div>

                <label className={s.field} htmlFor="contact-email">
                  <span className={s.label}>{t('contact.form.field3')}</span>
                  <input id="contact-email" name="email" type="email" autoComplete="email" required />
                </label>

                <label className={s.field} htmlFor="contact-company">
                  <span className={s.label}>{t('contact.form.field4')}</span>
                  <input id="contact-company" name="company" type="text" autoComplete="organization" />
                </label>

                <label className={s.field} htmlFor="contact-team">
                  <span className={s.label}>{t('contact.form.field5')}</span>
                  <select id="contact-team" name="teamSize" defaultValue="" required>
                    <option value="" disabled>
                      {t('contact.form.field5')}
                    </option>
                    {teamOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </label>

                <label className={s.field} htmlFor="contact-message">
                  <span className={s.label}>{t('contact.form.field6')}</span>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    placeholder={t('contact.form.field6Placeholder')}
                    required
                  />
                </label>

                <Button variant="primary" type="submit" className={s.submit}>
                  {t('contact.form.submit')} <FiSend />
                </Button>
                <p className={s.note}>{t('contact.form.note')}</p>
              </form>
            </div>

            <aside className={s.side}>
              <div className={s.sideCard}>
                <h3>{t('contact.form.bulletsTitle')}</h3>
                <ul className={s.bullets}>
                  {bullets.map((item) => (
                    <li key={item}>
                      <FiCheck />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a className={s.emailCard} href={`mailto:${email}`}>
                <span className={s.emailIcon}>
                  <FiMail />
                </span>
                <div>
                  <span className={s.emailLabel}>Email</span>
                  <span className={s.emailAddr}>{email}</span>
                </div>
              </a>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
