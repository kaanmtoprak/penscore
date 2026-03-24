import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiChevronDown, FiHelpCircle } from 'react-icons/fi';
import s from './faq-area.module.scss';

const Faq = ({ flat = false }) => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const faqData = [1, 2, 3, 4, 5, 6].map((item) => ({
    id: item,
    question: t(`pricing.faq.q${item}`),
    answer: t(`pricing.faq.a${item}`),
  }));

  const toggleActive = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className={`${s.section} ${flat ? s.sectionFlat : ''}`}>
      <div className={s.wrapper}>
        <header className={s.heading}>
          <span className={s.kicker}>
            <FiHelpCircle />
            FAQ
          </span>
          <h2>{t('pricing.faq.sectionHeadline')}</h2>
        </header>

        <div className={s.accordion}>
          {faqData.map((item, i) => {
            const isOpen = activeIndex === i;
            return (
              <article
                key={item.id}
                className={`${s.item} ${flat ? s.itemFlat : ''} ${isOpen ? s.itemOpen : ''}`}
              >
                <button
                  type="button"
                  className={s.question}
                  onClick={() => toggleActive(i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                >
                  <span>{item.question}</span>
                  <FiChevronDown className={s.chevron} />
                </button>

                <div id={`faq-answer-${item.id}`} className={s.answerWrap} aria-hidden={!isOpen}>
                  <p className={s.answer}>{item.answer}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Faq;
