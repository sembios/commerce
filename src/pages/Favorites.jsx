import React, {useContext} from 'react';
import Card from '../components/Card/Card';
import MyContext from '../context/context';

const Favorites = ( { onAddFavorites, onAddToCart} ) => {

  const {favorites} = React.useContext(MyContext)
    return (
        <div className="content">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "40px",
            justifyContent: "space-between",
          }}
        >
          <h1>Мои закладки</h1>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {
            favorites.map(item => (
              <Card
              key={`${item.title}_${item.id}`}
              id={item.id}
              title={item.title}
              price={item.price}
              imgURL={item.imgURL}
              onClickFavorites={onAddFavorites}
              onPlus={onAddToCart}
              stateHeart={true}
               />
            ))
          }
        </div>
      </div>
    );
}

export default Favorites;
