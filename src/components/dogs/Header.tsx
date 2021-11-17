import React, { FC } from 'react';

import '../../scss/Header.scss';

export const Header: FC = () => {
  return (
    <header id="main-header" className="header">
      <h1 className="header__title">Agility Title Tracker</h1>
    </header>
  );
};
