import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from "react";
import { RatingStar } from "rating-star";
import { v4 as uuidv4 } from 'uuid';
import Cart from './Cart';

const url = "https://dummyjson.com/products?skip=5&limit=100";

export default function Home() {

  const [data, setData] = useState([]);
  // const [numberID, setNumberID] = useState(uuidv4());
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const apiGet = () => {
    setLoading(true)
    fetch(url)
      
      .then((response) => response.json())
      .then((json) => {
        setData(json.products);
        setLoading(false)
        // console.log(json.products);
        
      });
  };

  const removeFromCart = (e) => {
    const id = e.target.getAttribute("slot")
    const price = e.target.getAttribute("value")


    setTotal(total - parseInt(price))

    setCart(cart.filter(item => item.id !== id))
    console.log(cart);
    
  }

  const addToCart = (e) => {

    const name = e.target.name
    const price = e.target.value
    
    setCart(
      [{"id": uuidv4(),
       "name": name,
       "price": price,
    },...cart]
      );
      setTotal(total + parseInt(e?.target.value))
      // setNumberID(uuidv4())

  }

  const logCart = () => {
    console.log(cart);
  }

  const clearCart = () => {
    setCart([])
    setTotal(0)
  }

  const imgStyle = {
      width: "150px",
      height: "150px"
  };

  const renderedData = data.map(({id, title, description, price, stock, brand, category, thumbnail, images, rating}) => (

        <div key={id} className={styles.card}>
          <h2>{title}</h2>
          <img style={imgStyle} src={thumbnail}/>
          <p>{description}</p>
          <p>${price}</p>
            <p>
              {/* <RatingStar id={id} rating={rating} /> */}
            </p>
          {/* <p>Only {stock} left in stock!</p> */}
          {/* <h3>{brand}</h3> */}
          <button className={styles.buttonAlt} value={price} slot={id} title={title} name={title} key={id} onClick={addToCart}>+</button>
        </div>
      
  ));

  const itemList = cart.map((item)=>(
    
    <li key={item.id} className={styles.listitem}>
       {item.name} ,${item.price}
       <button className={styles.buttonAlt} slot={item.id} title={item.name} name={item.name} value={item.price}onClick={removeFromCart}>-</button>
    </li>
  
));


  if (loading) return <h1 className={styles.title}>LOADING</h1>

  return (

    <div className={styles.container}>
        <main className={styles.main}>

              <h1 className={styles.title}>Product Viewer</h1>
                <div className={styles.gridshow}>

                {data.length !== 0 ? 
                
                    //  <Cart 
                    //    cart={cart} 
                    //    clearCart={clearCart()}
                    //    total={total}
                    //  /> 

                      <div className={styles.cart}>
                          <h1 className={styles.title}>CART </h1>
                          
                          
                              <ul className={styles.list}>
                                {itemList}
                              </ul>

                            <p className={styles.description}>
                              Total: ${total} item count: {cart.length}<br/>
                              <button className={styles.button} onClick={clearCart}>Empty Cart</button>
                            </p>
                          
                      </div> 
                  
                : null}
                
                
                 
                </div >


              
                {data.length == 0 ? 
                    <div className={styles.description}>
                      <button className={styles.button} onClick={apiGet}>View Products</button>
                    </div>
                 : null}
              


              <div className={styles.gridshow}>
                {renderedData}
              </div >


              <div>
            </div>
        </main>
        <button onClick={logCart}>log cart</button>
    </div>
  )


  
}
