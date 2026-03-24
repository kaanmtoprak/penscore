import React from 'react';
import s from './loading-spinner.module.scss';

const LoadingSpinner = () => (
  <div className={s.wrap}>
    <div className={s.spinner} role="status" aria-busy="true" />
    <span className={s.visuallyHidden}>Loading</span>
  </div>
);

export default LoadingSpinner;
