import React from 'react';
import {
  BlogHomeSection,
  Features,
  Approach,
  Hero,
  CaseStudy,
  Compliances,
  Counter,
  Testimonials,
  PricingComp,
  Newsletter,
} from '@/components';
import s from './home.module.scss';

const HomePage = () => {
  return (
    <div className={s.home}>
      <Hero />
      <Counter />
      <Features />
      <Approach />
      <Compliances />
      <PricingComp />
      <CaseStudy />
      <Testimonials />
      <BlogHomeSection />
      <Newsletter />
    </div>
  );
};

export default HomePage;
