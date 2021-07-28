import React from 'react';

import '../../scss/Header.scss';

import { ReactComponent as CloudColor } from '../../images/cloud-color.svg';
import { ReactComponent as CloudEffects } from '../../images/cloud-effects.svg';

const Header = () => {
  return (
    <header id="main-header" className="header">
      <div className="logo">
        <CloudColor className="logo__color" />
        <CloudEffects className="logo__effects" />
      </div>
      <h1 className="header__title">Agility Title Tracker</h1>
    </header>
  );
};

export default Header;
