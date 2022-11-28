import axios from "axios";
import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from "react";
import { json } from "stream/consumers";
import { RatingStar } from "rating-star";



const url1 = "https://dummyjson.com/products?skip=5&limit=100";
const url2 = "https://jsonplaceholder.typicode.com/posts"
const url3 = "http://localhost:3000/api/random-num"

export default function Home() {

  const [data, setData] = useState([]);
  const [num, setNum] = useState([]);

  const [clicked, setClicked] = React.useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  const apiGet = () => {
    fetch(url1)
      .then((response) => response.json())
      .then((json) => {
        setData(json.products);
        console.log(json.products);
        
      });
  };

  const numberGet = () => {
    fetch('/api/random-num')
      .then((response) => response.json())
      .then((json) => {
        setNum(json.num)
        console.log(`Random num is ${json.num}`)
      })
  };

  const newApi = () => {
    axios.get("/api/random-num")
    .then(function (response) {
      console.log(response.data.num);
    })
  }

  const imgStyle = {
      width: "150px",
      height: "150px"
  };

  const renderedData = data.map(({id, title, description, price, stock, brand, category, thumbnail, images, rating}: any) => (
      <div key={id} className={styles.card}>
        <h2>{title}</h2>
        <img style={imgStyle} src={thumbnail}/>
        <p>{description}</p>
        <sup>${price}</sup>
          <p>
            <RatingStar id={id} rating={rating} /><sup>{rating}</sup>
          </p>
        <p>Only {stock} left in stock!</p>
        <h3>{brand}</h3>
      </div>
  ));

  return (
    <div className={styles.container}>
        <main className={styles.main}>

              <h1 className={styles.title}>Product Viewer</h1>

              {/* <div className={styles.description}>
                {num && <p>Your number is {num}</p>}<button onClick={numberGet}>get random num</button>
              </div> */}

              <div className={styles.description}>
                
                {data.length == 0 ? <button onClick={apiGet}>View Products</button> : null}
                
              </div>

              {/* <div className={!clicked? styles.gridshow : styles.gridhide}> */}
              <div className={styles.gridshow}>
                {renderedData}
              </div>


              <div>
            </div>
        </main>
    </div>
  )


  
}
