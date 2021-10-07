import React, { useState, useEffect } from 'react'
import Card from '../components/Card/Card'
import MyContext from '../context/context'
import axios from 'axios'
import style from '../pages/Orders.module.scss'

export default function Orders() {

    const [order, setOrder] = useState ([])

    React.useEffect(() => {
        (async () => {
          const {data} = await axios.get("https://614d9f38e3cf1f001712d225.mockapi.io/orders")
          // console.log(data.map(item => item.items).flat());
          setOrder(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        })()
    }, [])

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
        <h1>ВАШИ ПОКУПКИ</h1>
      </div>
      <div style={{display: 'flex', flexWrap: 'wrap'}}>
      {
        order.map((item, index) => (
          <div className={style.card}>
            <h5 style={{fontSize: '1.4vw', display: 'flex'}}>{index+1}</h5>
            <>
            <div className={style.favorite}>
        </div>
        <img width={133} height={112} src={item.imgURL} alt="Music" />
        <h5>
          {item.title}
        </h5>
        <div className={style.cardBottom}>
        <div className={style.cardPrice}>
        </div>
      </div>
            </>
    </div>
        ))
        
      }
      </div>
    </div>
    );
}
