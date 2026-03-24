import React from 'react';
import { useTranslation } from 'react-i18next';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import s from './brands.module.scss';

const BRANDS = [
  { name: 'Akbank', src: '/img/logos/akbank.png' },
  { name: 'Garanti BBVA', src: '/img/logos/garanti.png' },
  { name: 'Papara', src: '/img/logos/papara.png' },
  { name: 'Yemeksepeti', src: '/img/logos/yemeksepeti.png' },
  { name: 'Trendyol', src: '/img/logos/trendyol.png' },
  { name: 'n11', src: '/img/logos/n11.png' },
];

const Brands = () => {
  const { t } = useTranslation();

  return (
    <section className={s.section} aria-label={t('home.hero.trustedByLabel')}>
      <div className={s.inner}>
        <div className={s.swiperShell}>
          <Swiper
            modules={[Autoplay]}
            loop
            speed={900}
            autoplay={{
              delay: 3200,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            spaceBetween={18}
            slidesPerView={2}
            breakpoints={{
              520: { slidesPerView: 3, spaceBetween: 20 },
              768: { slidesPerView: 4, spaceBetween: 22 },
              1100: { slidesPerView: 5, spaceBetween: 24 },
            }}
            className={s.swiper}
          >
            {BRANDS.map((brand, i) => (
              <SwiperSlide key={brand.name} className={s.slide}>
                <div className={s.card} style={{ '--stagger': i }}>
                  <div className={s.cardInner}>
                    <img className={s.logo} src={brand.src} alt={brand.name} loading="lazy" decoding="async" />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Brands;
