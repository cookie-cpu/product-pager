import React from 'react'
import styles from '../styles/Home.module.css'


export default function Cart({ cart, total, clearCart, cartList }) {


    return (
        <div className={styles.cart}>
            <h1 className={styles.title}>CART</h1>

            <ul className={styles.list}>
                {cartList}
            </ul>

            <p className={styles.description}>
                <sup>Total: ${total}</sup>
                <br />
                <sup>Items:{cart.length}</sup>
                <br />
                <button className={styles.button} onClick={clearCart()}>Empty Cart</button>
            </p>
        </div>
    )
}
