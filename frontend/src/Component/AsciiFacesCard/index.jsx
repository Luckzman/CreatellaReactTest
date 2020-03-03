import React from 'react';
import {ReactComponent as DateIcon} from './icon/clock-regular.svg'
import {ReactComponent as DollarIcon} from './icon/dollar-sign-solid.svg'
import {ReactComponent as SizeIcon} from './icon/weight-solid.svg'
import './AsciiFacesCard.css';

const AsciiFacesCard = ({id, face, size, price, date}) => {

  return(
    <div className="ascii-card">
      <div className="ascii-face">
        <div className="face">
          <p>{face}</p>
        </div>
      </div>
      <div className="ascii-details">
        <div className="details">
          <p className="title">{id}</p>
          <p><SizeIcon className="ico" />{`${size}px`}</p>
          <p><DollarIcon className="ico" />{price}</p>
        </div>
        <p className="time"><DateIcon className="icon" />3 days ago</p>
      </div>
    </div>
  );
}

export default AsciiFacesCard;
