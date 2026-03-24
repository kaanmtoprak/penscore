import React from 'react';
import { FiShield } from 'react-icons/fi';
import s from './about-hero-viz.module.scss';

const BEAM_ANGLES = [0, 72, 144, 216, 288];

const AboutHeroViz = () => (
  <div className={s.root} aria-hidden>
    <div className={s.aura} />
    <div className={s.grid} />
    <div className={s.rings}>
      <span className={s.ringA} />
      <span className={s.ringB} />
      <span className={s.ringC} />
    </div>
    <div className={s.ripples}>
      <span className={s.ripple} />
      <span className={s.ripple} />
      <span className={s.ripple} />
    </div>
    <div className={s.beams}>
      {BEAM_ANGLES.map((deg, i) => (
        <span
          key={deg}
          className={s.beam}
          style={{ transform: `rotate(${deg}deg)`, animationDelay: `${i * 0.35}s` }}
        />
      ))}
    </div>
    <div className={s.sweep} />
    <span className={s.orbit}>
      <span className={s.node} />
    </span>
    <span className={`${s.orbit} ${s.orbitB}`}>
      <span className={`${s.node} ${s.nodeAlt}`} />
    </span>
    <span className={`${s.orbit} ${s.orbitC}`}>
      <span className={s.node} />
    </span>
    <div className={s.core}>
      <span className={s.coreGlow} />
      <FiShield />
      <span className={s.coreRing} />
    </div>
    <div className={s.shimmer} />
  </div>
);

export default AboutHeroViz;
