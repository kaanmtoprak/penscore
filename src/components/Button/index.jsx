import Link from '@/components/common/Link';
import React from 'react';
import s from './button.module.scss';

const cn = (...parts) => {
  return parts.filter(Boolean).join(' ');
};

const variantClass = {
  primary: s.primary,
  outline: s.outline,
  blog: s.blog,
  subscribe: s.subscribe,
  video: s.video,
};

const Button = ({
  variant = 'primary',
  href,
  children,
  className,
  type = 'button',
  title,
  id,
  name,
  value,
  onClick,
}) => {
  const classes = cn(variantClass[variant], className);

  if (href !== undefined && href !== '') {
    const isInternal = href.startsWith('/') && !href.startsWith('//');
    if (isInternal) {
      return (
        <Link href={href} className={classes} title={title} id={id} onClick={onClick}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} className={classes} title={title} id={id} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      title={title}
      id={id}
      name={name}
      value={value}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
