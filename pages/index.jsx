import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from "react";
// import { RatingStar } from "rating-star";
import { v4 as uuidv4 } from 'uuid';
// import Cart from './Cart';

const url = "https://dummyjson.com/products?skip=0&limit=100";

const imgStyle = {
  width: "150px",
  height: "150px"
};
const cartImg = {
  width: "50px",
  height: "50px"
};

export default function Home() {

  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [storeTotal, setStoreTotal] = useState(0)

  const [searchStatus, setSearchStatus] = useState('')
  const [searchInput, setSearchInput] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const searchItems = (searchValue) => {
    const searchErrorMessage = 'No items found matching search'
    setSearchInput(searchValue)

    if (searchValue == '' || ' ' || searchStatus == searchErrorMessage){setFilteredData([]),(setSearchStatus(''))}

    if (data.filter((item) => {return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())}).length == 0)
    {setSearchStatus(searchErrorMessage)}
    // console.log((data.filter((item) => {return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())})));
    setFilteredData(
      data.filter((item) => {return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())})
    )
    // console.log(filteredData);
  }
  const fetchApi = () => {
    setLoading(true)
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setData(json.products);
        setLoading(false)
      });

    fetch('/api/store')
    .then((response) => response.json())
      .then((json) => {
        // setStoreTotal(json)
        console.log(json);
      });
 
  };

  const fetchStoreData = () => {
    fetch('/api/store')
    .then((response) => response.json())
      .then((json) => {
        setStoreTotal(json.total)
        console.log(json);
      });
  }

  const clearCart = () => {
    setCart([])
    setTotal(0)
  }

  const removeFromCart = (e) => {
    const id = e.target.getAttribute("slot")
    const price = e.target.getAttribute("value")

    setTotal(total - parseInt(price))

    setCart(cart.filter(item => item.id !== id))

  }

  const addToCart = (e) => {
    const name = e.target.name
    const price = e.target.value
    const image = e.target.getAttribute("image")
    const attributes = e.target.attributes

    // console.log(attributes);

    setCart(
      [{
        "id": uuidv4(),
        "name": name,
        "price": price,
        "image": image,
        // "data": attributes,
      }, ...cart]
    );

    setTotal(total + parseInt(e.target.value))
  }

  const buyCart = (e) => {

    // console.log(`spent ${total}`);
    alert(`Thank you for shopping! You spent $${total}`)
    // fetch('/api/store', {method: 'POST'})
    fetch('/api/store', {
      method: 'POST',
      body: total
      })

    //reset cart
    setCart([])
    setTotal(0)
  }

 
  const renderedProducts = data.map(({ id, title, description, price, stock, brand, category, thumbnail, images, rating }) => (

    <div key={id} className={styles.card}>
      <h2>{title}</h2>
      <img alt="thumbnail"style={imgStyle} src={thumbnail} />
      <p>{description}</p>
      <p>${price}</p>
      <button
        className={styles.buttonAlt}
        value={price}
        slot={id}
        id={id}
        title={title}
        name={title}
        key={id}
        image={thumbnail}
        stock={stock}
        brand={brand}
        category={category}
        images={images}
        onClick={addToCart}>+</button>
    </div>

  ));

  const renderFilteredData = filteredData.map(({ id, title, description, price, stock, brand, category, thumbnail, images, rating }) => (

    <div key={id} className={styles.card}>
      <h2>{title}</h2>
      <img alt="thumbnail"style={imgStyle} src={thumbnail} />
      <p>{description}</p>
      <p>${price}</p>
      <button
        className={styles.buttonAlt}
        value={price}
        slot={id}
        id={id}
        title={title}
        name={title}
        key={id}
        image={thumbnail}
        stock={stock}
        brand={brand}
        category={category}
        images={images}
        onClick={addToCart}>+</button>
    </div>

  ));


  const cartList = cart.map((item) => (

    <li key={item.id} className={styles.listitem}>
      {item.name}
      {/* <img style={cartImg} src={item.image}/> */}
      <button
        slot={item.id}
        title={item.name}
        name={item.name}
        value={item.price}
        onClick={removeFromCart}>-
      </button>
    </li>

  ));


  if (loading) return <h1 className={styles.title}>LOADING</h1>

  return (

    <div className={styles.container}>
      <main className={styles.main}>

        <h1 className={styles.title}>Product Viewer</h1>
        
        <div className={styles.gridshow}>

          {data.length !== 0 ?
          <>
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
                  <button className={styles.button} onClick={clearCart}>Empty Cart</button>
                  <button className={styles.button} onClick={buyCart}>Buy</button>
                </p>
              </div>
              <input placeholder='Search...' onChange={(e) => searchItems(e.target.value)}></input>
              {/* {searchInput} */}
          </>  
            : null}
        </div >
        


        {data.length == 0 ?
          <div className={styles.description}>
            <button className={styles.button} onClick={fetchApi}>View Products</button>
          </div>
          : null}



        <div className={styles.gridshow}>
          {searchStatus? searchStatus :filteredData.length > 0? renderFilteredData : renderedProducts}
          {/* {filteredData.length > 0? renderFilteredData : renderedProducts} */}
        </div >


        <div>
        </div>
      </main>




      {/* console logs for dev purposes */}
      <div>
        <button onClick={() => { console.log(cart); }}>Log cart</button>
        <button onClick={() => { console.log(data); }}>Log products</button>
        <button onClick={fetchStoreData}>Update Store Data</button>
        {` Store Total is: ${storeTotal}`}
      </div>
      
    </div>
  )



}
