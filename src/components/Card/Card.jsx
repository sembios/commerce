import React, { useState } from 'react';
import ContentLoader from "react-content-loader"
import MyContext from '../../context/context';

import style from './Card.module.scss'

const Card = ({ id, title, price, imgURL, onPlus, onClickFavorites, stateHeart, loading }) => {
  const [isFavorite, setIsFavorite] = useState(stateHeart)


  const { isItemAdded } = React.useContext(MyContext)

  const obj = {title, price, imgURL, id, parentId: id}

  const onClickPlus = () => {
    onPlus(obj)
  }

  const onClickFavorite = () => {
    onClickFavorites({ title, price, imgURL, id, onPlus })
    setIsFavorite(!isFavorite)
  }
  return (
    <div className={style.card}>
          {loading ? <ContentLoader 
    speed={2}
    width={220}
    height={140}
    viewBox="0 0 400 460"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="31" cy="31" r="15" /> 
    <rect x="58" y="18" rx="2" ry="2" width="220" height="10" /> 
    <rect x="58" y="34" rx="2" ry="2" width="220" height="10" /> 
    <rect x="1" y="60" rx="2" ry="2" width="220" height="140" />
  </ContentLoader> : 
  <>
  <div className={style.favorite}>
            <img onClick={onClickFavorite}  src={isFavorite ? 'images/hearttrue.svg'  : 'images/heartfalse.svg'}  />
          </div>
          <img width={133} height={112} src={imgURL} alt="Music" />
          <h5>
            {title}
          </h5>
          <div className={style.cardBottom}>
          <div className={style.cardPrice}>
            <span>Цена:</span>
            <b>{price} сом.</b>
          </div>
          <button className={style.button} onClick={() => onClickPlus()}>
            <img width={30} height={30} src={isItemAdded(id) ? 'images/addCard.svg': 'images/plus.svg'} alt="plus"/>
          </button>
        </div>
  </>
  }
      </div>
  );
}

export default Card;