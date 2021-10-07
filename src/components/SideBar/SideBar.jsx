import React from 'react';
import { TransitionGroup } from 'react-transition-group';
import MyContext from '../../context/context';

const SideBar = ({ onClose, items = [], removeItem, setCartItems, allPrice, modPrice }) => {
  const nds = Math.round(allPrice * 0.007) 
  const { buyExample } = React.useContext(MyContext)

  return (
    <TransitionGroup>
    <div className="sideBarBlock">
    <div className="sideBar">
    <h2 style={{marginBottom: '30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
      Корзина
      <img style={{cursor: 'pointer', opacity: '.5'}} width={22} height={22} src="images/close.svg" alt="close" onClick={onClose}/>
    </h2>
    <div className="items">
    {
      items.map(item => (
        <div className="cartItem" style={{display: 'flex', alignItems: 'center', marginRight: '20px', marginBottom: '20px'}}>
      <img style={{marginRight: '5px'}} width={70} height={70} src={item.imgURL} alt="music" />
      <div>
        <p style={{marginBottom: '5px', color: '#000'}}>{item.title}</p>
        <b style={{color: '#000'}}>{item.price} сом.</b>
      </div>
      <img onClick={() => removeItem(item.id)} style={{cursor: 'pointer', opacity: '.5'}} width={22} height={22} src="/images/close.svg" alt="close" />
    </div>
      ))
    }
    <div className="cartTotalBlock">
      <ul>
        <li>
          <span>Итого:</span>
          <div></div>
          <b>{modPrice} сом</b>
        </li>
        <li>
          <span>Ндс 7%:</span>
          <div></div>
          <b>{nds} сом</b>
        </li>
      </ul>
    <button onClick={buyExample} className="myButton">Оформить заказ <img src="images/arrow.svg" alt="arrow"/></button>
    </div>
    </div>
  </div>
  </div>
</TransitionGroup>
  );
}

export default SideBar;



