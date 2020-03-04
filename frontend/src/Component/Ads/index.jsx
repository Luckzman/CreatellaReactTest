import React from 'react';
import './Ads.css';

const Ads = ({src}) => {
  return (
    <img className="ads" src={src} alt="advert from our sponsors" />
  );
}

export default Ads;
