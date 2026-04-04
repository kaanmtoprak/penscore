import DatePicker from '@/components/DatePicker';
import Link from '@/components/common/Link';
import React, { useMemo, useState } from 'react';
import { FiArrowLeft, FiBriefcase, FiCreditCard, FiLock, FiMail, FiUser } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { Navigate, useParams, useSearchParams } from 'react-router-dom';
import {
  formatCardNumberInput,
  formatExpiryInput,
  normalizeDigits,
  validateCardNumber,
  validateCvc,
  validateExpiry,
} from './cardValidation';
import {
  validateAddress,
  validateBirthDate,
  validateEmail,
  validatePersonName,
  validatePhone,
} from './contactValidation';
import s from './payment.module.scss';

function toDateInputValueLocal(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

const PLAN_IDS = new Set(['starter', 'professional']);

const PaymentPage = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const planId = id;
  const billing = searchParams.get('billing') === 'annual' ? 'annual' : 'monthly';

  const [invoiceType, setInvoiceType] = useState('individual');

  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [cardErrors, setCardErrors] = useState({
    cardNumber: null,
    expiry: null,
    cvc: null,
  });

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [contactErrors, setContactErrors] = useState({
    firstName: null,
    lastName: null,
    birthDate: null,
    email: null,
    phone: null,
    address: null,
  });

  const birthDateBounds = useMemo(() => {
    const today = new Date();
    const max = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    const min = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate());
    return { min: toDateInputValueLocal(min), max: toDateInputValueLocal(max) };
  }, []);

  const setBilling = (next) => {
    setSearchParams(next === 'annual' ? { billing: 'annual' } : { billing: 'monthly' });
  };

  const priceDisplay = useMemo(() => {
    if (!planId || !PLAN_IDS.has(planId)) return '';
    return billing === 'annual' ? t(`pricing.${planId}.priceAnnual`) : t(`pricing.${planId}.priceMonthly`);
  }, [planId, billing, t]);

  const billingLabel = useMemo(() => {
    return billing === 'annual' ? t('payment.billingAnnual') : t('payment.billingMonthly');
  }, [billing, t]);

  if (planId === 'enterprise') {
    return <Navigate to="/contact" replace />;
  }

  if (!planId || !PLAN_IDS.has(planId)) {
    return <Navigate to="/pricing" replace />;
  }

  const setCardFieldError = (field, key) => {
    setCardErrors((prev) => ({ ...prev, [field]: key }));
  };

  const handleCardNumberChange = (e) => {
    setCardNumber(formatCardNumberInput(e.target.value));
    if (cardErrors.cardNumber) setCardFieldError('cardNumber', null);
  };

  const handleCardNumberBlur = () => {
    setCardFieldError('cardNumber', validateCardNumber(cardNumber));
  };

  const handleExpiryChange = (e) => {
    setCardExpiry(formatExpiryInput(e.target.value));
    if (cardErrors.expiry) setCardFieldError('expiry', null);
  };

  const handleExpiryBlur = () => {
    setCardFieldError('expiry', validateExpiry(cardExpiry));
  };

  const handleCvcChange = (e) => {
    setCardCvc(normalizeDigits(e.target.value).slice(0, 4));
    if (cardErrors.cvc) setCardFieldError('cvc', null);
  };

  const handleCvcBlur = () => {
    setCardFieldError('cvc', validateCvc(cardCvc));
  };

  const setContactFieldError = (field, key) => {
    setContactErrors((prev) => ({ ...prev, [field]: key }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextContact = {
      firstName: validatePersonName(firstName, 'firstName'),
      lastName: validatePersonName(lastName, 'lastName'),
      birthDate: validateBirthDate(birthDate),
      email: validateEmail(email),
      phone: validatePhone(phone),
      address: validateAddress(address),
    };
    const nextCard = {
      cardNumber: validateCardNumber(cardNumber),
      expiry: validateExpiry(cardExpiry),
      cvc: validateCvc(cardCvc),
    };
    setContactErrors(nextContact);
    setCardErrors(nextCard);
    if (Object.values(nextContact).some(Boolean) || Object.values(nextCard).some(Boolean)) return;

    const formData = Object.fromEntries(new FormData(e.currentTarget).entries());
    console.log('Payment form submit', { planId, billing, invoiceType, ...formData });
  };

  return (
    <div className={s.page}>
      <div className={s.backWrap}>
        <Link href="/pricing" className={s.back}>
          <FiArrowLeft aria-hidden />
          {t('payment.back')}
        </Link>
      </div>

      <div className={s.layout}>
        <aside className={s.summary}>
          <div className={s.summaryBadge}>
            <FiLock aria-hidden />
            {t('payment.secureBadge')}
          </div>
          <p className={s.summaryTitle}>{t('payment.summaryTitle')}</p>
          <h1 className={s.planName}>{t(`pricing.${planId}.name`)}</h1>

          <div className={s.billingRow}>
            <span>{t('payment.billingLabel')}</span>
            <span className={s.billingValue}>{billingLabel}</span>
          </div>

          <div className={s.segmented} role="group" aria-label={t('payment.ariaBilling')}>
            <button
              type="button"
              className={`${s.segmentBtn} ${billing === 'monthly' ? s.segmentBtnActive : ''}`}
              onClick={() => setBilling('monthly')}
              aria-pressed={billing === 'monthly'}
            >
              {t('payment.billingMonthly')}
            </button>
            <button
              type="button"
              className={`${s.segmentBtn} ${billing === 'annual' ? s.segmentBtnActive : ''}`}
              onClick={() => setBilling('annual')}
              aria-pressed={billing === 'annual'}
            >
              {t('payment.billingAnnual')}
            </button>
          </div>

          <div className={s.priceBlock}>
            <p className={s.priceLabel}>{t('payment.priceToday')}</p>
            <p className={s.priceAmount}>{priceDisplay}</p>
            <p className={s.priceNote}>{t('payment.priceNote')}</p>
          </div>
        </aside>

        <form className={s.forms} onSubmit={handleSubmit} noValidate>
          <section className={s.panel}>
            <div className={s.panelHead}>
              <span className={s.panelIcon}>
                <FiBriefcase aria-hidden />
              </span>
              <div>
                <h2 className={s.panelTitle}>{t('payment.invoiceSection')}</h2>
                <p className={s.panelHint}>{t('payment.invoiceHint')}</p>
              </div>
            </div>
            <div className={s.segmented} role="group" aria-label={t('payment.ariaInvoice')}>
              <button
                type="button"
                className={`${s.segmentBtn} ${invoiceType === 'individual' ? s.segmentBtnActive : ''}`}
                onClick={() => setInvoiceType('individual')}
                aria-pressed={invoiceType === 'individual'}
              >
                {t('payment.invoiceIndividual')}
              </button>
              <button
                type="button"
                className={`${s.segmentBtn} ${invoiceType === 'corporate' ? s.segmentBtnActive : ''}`}
                onClick={() => setInvoiceType('corporate')}
                aria-pressed={invoiceType === 'corporate'}
              >
                {t('payment.invoiceCorporate')}
              </button>
            </div>
          </section>

          <section className={s.panel}>
            <div className={s.panelHead}>
              <span className={s.panelIcon}>
                <FiMail aria-hidden />
              </span>
              <div>
                <h2 className={s.panelTitle}>{t('payment.contactSection')}</h2>
              </div>
            </div>
            <div className={s.grid2}>
              <div className={s.field}>
                <label className={s.label} htmlFor="pay-first-name">
                  {t('payment.firstName')}
                </label>
                <input
                  id="pay-first-name"
                  name="firstName"
                  type="text"
                  className={`${s.input} ${contactErrors.firstName ? s.inputError : ''}`}
                  autoComplete="given-name"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    if (contactErrors.firstName) setContactFieldError('firstName', null);
                  }}
                  onBlur={() => setContactFieldError('firstName', validatePersonName(firstName, 'firstName'))}
                  aria-invalid={contactErrors.firstName ? 'true' : 'false'}
                  aria-describedby={contactErrors.firstName ? 'pay-first-name-error' : undefined}
                />
                {contactErrors.firstName ? (
                  <p id="pay-first-name-error" className={s.fieldError} role="alert">
                    {t(`payment.errors.${contactErrors.firstName}`)}
                  </p>
                ) : null}
              </div>
              <div className={s.field}>
                <label className={s.label} htmlFor="pay-last-name">
                  {t('payment.lastName')}
                </label>
                <input
                  id="pay-last-name"
                  name="lastName"
                  type="text"
                  className={`${s.input} ${contactErrors.lastName ? s.inputError : ''}`}
                  autoComplete="family-name"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    if (contactErrors.lastName) setContactFieldError('lastName', null);
                  }}
                  onBlur={() => setContactFieldError('lastName', validatePersonName(lastName, 'lastName'))}
                  aria-invalid={contactErrors.lastName ? 'true' : 'false'}
                  aria-describedby={contactErrors.lastName ? 'pay-last-name-error' : undefined}
                />
                {contactErrors.lastName ? (
                  <p id="pay-last-name-error" className={s.fieldError} role="alert">
                    {t(`payment.errors.${contactErrors.lastName}`)}
                  </p>
                ) : null}
              </div>
              <div className={`${s.field} ${s.fieldFull}`}>
                <label className={s.label} htmlFor="pay-birth-date">
                  {t('payment.birthDate')}
                </label>
                <DatePicker
                  id="pay-birth-date"
                  name="birthDate"
                  value={birthDate}
                  onChange={(v) => {
                    setBirthDate(v);
                    if (contactErrors.birthDate) setContactFieldError('birthDate', null);
                  }}
                  min={birthDateBounds.min}
                  max={birthDateBounds.max}
                  placeholder={t('payment.datePlaceholder')}
                  locale={i18n.language === 'en' ? 'en-GB' : 'tr-TR'}
                  hasError={Boolean(contactErrors.birthDate)}
                  aria-invalid={contactErrors.birthDate ? 'true' : 'false'}
                  aria-describedby={contactErrors.birthDate ? 'pay-birth-date-error' : undefined}
                  calendarAriaLabel={t('payment.birthDate')}
                  onBlur={() => setContactFieldError('birthDate', validateBirthDate(birthDate))}
                />
                {contactErrors.birthDate ? (
                  <p id="pay-birth-date-error" className={s.fieldError} role="alert">
                    {t(`payment.errors.${contactErrors.birthDate}`)}
                  </p>
                ) : null}
              </div>
              <div className={s.field}>
                <label className={s.label} htmlFor="pay-email">
                  {t('payment.email')}
                </label>
                <input
                  id="pay-email"
                  name="email"
                  type="email"
                  className={`${s.input} ${contactErrors.email ? s.inputError : ''}`}
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (contactErrors.email) setContactFieldError('email', null);
                  }}
                  onBlur={() => setContactFieldError('email', validateEmail(email))}
                  aria-invalid={contactErrors.email ? 'true' : 'false'}
                  aria-describedby={contactErrors.email ? 'pay-email-error' : undefined}
                />
                {contactErrors.email ? (
                  <p id="pay-email-error" className={s.fieldError} role="alert">
                    {t(`payment.errors.${contactErrors.email}`)}
                  </p>
                ) : null}
              </div>
              <div className={s.field}>
                <label className={s.label} htmlFor="pay-phone">
                  {t('payment.phone')}
                </label>
                <input
                  id="pay-phone"
                  name="phone"
                  type="tel"
                  className={`${s.input} ${contactErrors.phone ? s.inputError : ''}`}
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (contactErrors.phone) setContactFieldError('phone', null);
                  }}
                  onBlur={() => setContactFieldError('phone', validatePhone(phone))}
                  aria-invalid={contactErrors.phone ? 'true' : 'false'}
                  aria-describedby={contactErrors.phone ? 'pay-phone-error' : undefined}
                />
                {contactErrors.phone ? (
                  <p id="pay-phone-error" className={s.fieldError} role="alert">
                    {t(`payment.errors.${contactErrors.phone}`)}
                  </p>
                ) : null}
              </div>
              <div className={`${s.field} ${s.fieldFull}`}>
                <label className={s.label} htmlFor="pay-address">
                  {t('payment.address')}
                </label>
                <textarea
                  id="pay-address"
                  name="address"
                  className={`${s.textarea} ${contactErrors.address ? s.inputError : ''}`}
                  rows={3}
                  placeholder={t('payment.addressPlaceholder')}
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    if (contactErrors.address) setContactFieldError('address', null);
                  }}
                  onBlur={() => setContactFieldError('address', validateAddress(address))}
                  aria-invalid={contactErrors.address ? 'true' : 'false'}
                  aria-describedby={contactErrors.address ? 'pay-address-error' : undefined}
                />
                {contactErrors.address ? (
                  <p id="pay-address-error" className={s.fieldError} role="alert">
                    {t(`payment.errors.${contactErrors.address}`)}
                  </p>
                ) : null}
              </div>
            </div>
          </section>

          {invoiceType === 'individual' ? (
            <section className={s.panel}>
              <div className={s.panelHead}>
                <span className={s.panelIcon}>
                  <FiUser aria-hidden />
                </span>
                <div>
                  <h2 className={s.panelTitle}>{t('payment.individualSection')}</h2>
                </div>
              </div>
              <div className={s.grid1}>
                <div className={s.field}>
                  <label className={s.label} htmlFor="pay-tc">
                    {t('payment.tcKimlik')}
                  </label>
                  <input
                    id="pay-tc"
                    name="tcKimlik"
                    className={s.input}
                    inputMode="numeric"
                    maxLength={11}
                    autoComplete="off"
                    placeholder={t('payment.tcPlaceholder')}
                    required
                  />
                </div>
              </div>
            </section>
          ) : (
            <section className={s.panel}>
              <div className={s.panelHead}>
                <span className={s.panelIcon}>
                  <FiBriefcase aria-hidden />
                </span>
                <div>
                  <h2 className={s.panelTitle}>{t('payment.corporateSection')}</h2>
                </div>
              </div>
              <div className={s.grid2}>
                <div className={`${s.field} ${s.fieldFull}`}>
                  <label className={s.label} htmlFor="pay-company">
                    {t('payment.companyName')}
                  </label>
                  <input id="pay-company" name="companyName" type="text" className={s.input} autoComplete="organization" required />
                </div>
                <div className={s.field}>
                  <label className={s.label} htmlFor="pay-vkn">
                    {t('payment.taxId')}
                  </label>
                  <input id="pay-vkn" name="taxId" className={s.input} inputMode="numeric" required />
                </div>
                <div className={s.field}>
                  <label className={s.label} htmlFor="pay-tax-office">
                    {t('payment.taxOffice')}
                  </label>
                  <input id="pay-tax-office" name="taxOffice" type="text" className={s.input} required />
                </div>
              </div>
            </section>
          )}

          <section className={s.panel}>
            <div className={s.panelHead}>
              <span className={s.panelIcon}>
                <FiCreditCard aria-hidden />
              </span>
              <div>
                <h2 className={s.panelTitle}>{t('payment.cardSection')}</h2>
              </div>
            </div>
            <div className={s.grid2}>
              <div className={`${s.field} ${s.fieldFull}`}>
                <label className={s.label} htmlFor="pay-card-number">
                  {t('payment.cardNumber')}
                </label>
                <input
                  id="pay-card-number"
                  name="cardNumber"
                  className={`${s.input} ${cardErrors.cardNumber ? s.inputError : ''}`}
                  inputMode="numeric"
                  autoComplete="cc-number"
                  placeholder="0000 0000 0000 0000"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  onBlur={handleCardNumberBlur}
                  aria-invalid={cardErrors.cardNumber ? 'true' : 'false'}
                  aria-describedby={cardErrors.cardNumber ? 'pay-card-number-error' : undefined}
                />
                {cardErrors.cardNumber ? (
                  <p id="pay-card-number-error" className={s.fieldError} role="alert">
                    {t(`payment.errors.${cardErrors.cardNumber}`)}
                  </p>
                ) : null}
              </div>
              <div className={s.field}>
                <label className={s.label} htmlFor="pay-exp">
                  {t('payment.cardExpiry')}
                </label>
                <input
                  id="pay-exp"
                  name="cardExpiry"
                  className={`${s.input} ${cardErrors.expiry ? s.inputError : ''}`}
                  autoComplete="cc-exp"
                  placeholder="MM/YY"
                  inputMode="numeric"
                  value={cardExpiry}
                  onChange={handleExpiryChange}
                  onBlur={handleExpiryBlur}
                  aria-invalid={cardErrors.expiry ? 'true' : 'false'}
                  aria-describedby={cardErrors.expiry ? 'pay-exp-error' : undefined}
                />
                {cardErrors.expiry ? (
                  <p id="pay-exp-error" className={s.fieldError} role="alert">
                    {t(`payment.errors.${cardErrors.expiry}`)}
                  </p>
                ) : null}
              </div>
              <div className={s.field}>
                <label className={s.label} htmlFor="pay-cvc">
                  {t('payment.cardCvc')}
                </label>
                <input
                  id="pay-cvc"
                  name="cardCvc"
                  className={`${s.input} ${cardErrors.cvc ? s.inputError : ''}`}
                  inputMode="numeric"
                  autoComplete="cc-csc"
                  value={cardCvc}
                  onChange={handleCvcChange}
                  onBlur={handleCvcBlur}
                  maxLength={4}
                  aria-invalid={cardErrors.cvc ? 'true' : 'false'}
                  aria-describedby={cardErrors.cvc ? 'pay-cvc-error' : undefined}
                />
                {cardErrors.cvc ? (
                  <p id="pay-cvc-error" className={s.fieldError} role="alert">
                    {t(`payment.errors.${cardErrors.cvc}`)}
                  </p>
                ) : null}
              </div>
              <div className={`${s.field} ${s.fieldFull}`}>
                <label className={s.label} htmlFor="pay-card-name">
                  {t('payment.cardName')}
                </label>
                <input id="pay-card-name" name="cardName" type="text" className={s.input} autoComplete="cc-name" />
              </div>
            </div>
          </section>

          <div className={s.submitBar}>
            <button type="submit" className={s.submit}>
              {t('payment.submit')}
            </button>
            <p className={s.disclaimer}>{t('payment.disclaimer')}</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
