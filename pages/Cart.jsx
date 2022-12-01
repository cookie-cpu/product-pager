import React from 'react'
import styles from '../styles/Home.module.css'


export default function Cart({cart, total, clearCart}) {

    const itemList = cart.map((item)=>(
    
        <li key={item.id} styles={styles.listitem}>
           {item.name} ,${item.price}
           <button className={styles.buttonAlt} slot={item.id} title={item.name} name={item.name} value={item.price}onClick={removeFromCart}>-</button>
        </li>
      
    ));

  return (
    <div className={styles.cart}><h1>CART </h1>
                      <p>Total: ${total} item count: {cart.length}</p>
                      <button className={styles.button} onClick={clearCart}>Empty Cart</button>
                          <ul className={styles.list}>
                            {itemList}
                          </ul>
                    </div> 
  )
}
