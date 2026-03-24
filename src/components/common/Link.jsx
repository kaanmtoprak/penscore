import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

const Link = ({ href = '', children, ...rest }) => {
  const isInternal = typeof href === 'string' && href.startsWith('/') && !href.startsWith('//');

  if (isInternal) {
    return (
      <RouterLink to={href} {...rest}>
        {children}
      </RouterLink>
    );
  }

  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
};

export default Link;
