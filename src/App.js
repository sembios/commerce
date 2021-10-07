import React, { useEffect, useState } from "react";
import axios from 'axios'
import Header from "./components/Header/Header";
import SideBar from "./components/SideBar/SideBar";
import { Route } from "react-router";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import MyContext from "./context/context";
import { Transition } from "react-transition-group";
import Orders from "./pages/Orders";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const [loading, setLoading] = useState(true)
  const [order, setOrder] = useState(null)
  
  const allPrice = cartItems.reduce((currentValue, nextValue) => currentValue += nextValue.price, 0)

  const amount = allPrice;
  const modPrice = Intl.NumberFormat('en-US', {style: 'decimal'}).format(amount)


  useEffect(() => {
      async function myData () {
        try {
        const responseCart = await axios.get("https://614d9f38e3cf1f001712d225.mockapi.io/cart")
        const responseFavorites = await axios.get("https://614d9f38e3cf1f001712d225.mockapi.io/favorites")
        const responseCard = await axios.get("https://614d9f38e3cf1f001712d225.mockapi.io/card")

        setLoading(false)

        setCartItems(responseCart.data)
        // setOrder(responseOrders.data)
        setFavorites(responseFavorites.data)
        setItems(responseCard.data)
        }
        catch (error) {
          console.log(error);
        }

      }
      myData() 
  }, []);
        
  const isItemAdded = id => {
    return cartItems.some(obj => Number(obj.parentId) === Number(id))
  }

  const onAddToCart = async obj => {
    try{
      const findItem = cartItems.find(item => Number(item.parentId) === Number(obj.id))
      console.log(findItem);
      if (findItem) {
        await axios.delete(`https://614d9f38e3cf1f001712d225.mockapi.io/cart/${findItem.id}`)
        setCartItems(prev => prev.filter(item => Number(item.parentId) !== Number(obj.id)))
      } else {
        const { data } = await axios.post(`https://614d9f38e3cf1f001712d225.mockapi.io/cart`, obj)
        setCartItems(prev => [...prev, data])
        // alert(JSON.stringify(obj.title))
      }
    }
    catch (error){
      console.error(error)
    }
  }

  const removeItem = (id) => {
    axios.delete(`https://614d9f38e3cf1f001712d225.mockapi.io/cart/${id}`)
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const onAddFavorites = async obj => {
    try {
      if (favorites.find(favObj => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://614d9f38e3cf1f001712d225.mockapi.io/favorites/${obj.id}`)
        setFavorites(prev => prev.filter(item => Number(item.id) !== Number(obj.id)))
      } else {
        const { data } = await axios.post('https://614d9f38e3cf1f001712d225.mockapi.io/favorites', obj)
        setFavorites(prev => [...prev, data])
      }
    }
    catch (error) {
      alert('Произошла ошибка...')
    }
  }

  const delayMy = () => new Promise(resolve => setTimeout(resolve, 1000))

  const buyExample = async () => {
    try {
      const { data } = await axios.post('https://614d9f38e3cf1f001712d225.mockapi.io/orders', {
        items: cartItems
      })
      setOrder(data.id)
      setCartItems([])

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i]
        console.log(item);
        await axios.delete('https://614d9f38e3cf1f001712d225.mockapi.io/cart/' + item.id)
        await delayMy()
      }
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <MyContext.Provider value={{favorites, isItemAdded, buyExample, order}}>
    <div className="wrapper">
      {cartOpen && <SideBar onClose={() => setCartOpen(false)} modPrice={modPrice} items={cartItems} removeItem={removeItem} allPrice={allPrice}/>}
      <Header onClickCart={() => setCartOpen(true)}
      allPrice={allPrice}
      modPrice={modPrice}
      />
      <Route path="/" exact>
        <Home 
          items={items}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onAddFavorites={onAddFavorites}
          onAddToCart={onAddToCart}
          cartItems={cartItems}
          loading={loading}
          
        />
      </Route>


      <Route path='/Favorites'>
          <Favorites
          onAddFavorites={onAddFavorites}
          onAddToCart={onAddToCart}
          />
      </Route>

      <Route path="/Orders">
      <Orders />
      </Route>
    </div>
    </MyContext.Provider>
  );
}
export default App;
