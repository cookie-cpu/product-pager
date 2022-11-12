import axios from "axios";
import React, { useState, useEffect } from "react";

const url1 = "https://dummyjson.com/products";
const url2 = "https://jsonplaceholder.typicode.com/posts"
const url3 = "http://localhost:3000/api/random-num"

export default function Home() {

  const [data, setData] = useState([]);

  const apiGet = () => {
    fetch(url1)
      .then((response) => response.json())
      .then((json) => {
        setData(json.products);
        console.log(json.products);
        
      });
  };

  const imgStyle = {
      width: "250px",
  };

  return (
    <>
      <div>
        <h1>API Call</h1>
        <br />
          <button onClick={apiGet}>Fetch API</button>
        <br />
          <ul>
              {data.map(({id, title, description, price, stock, brand, category, thumbnail, images, rating}: any) => (
                <li key={id}>
                  {title}
                  <img style={imgStyle} src={thumbnail}/>
                  <p>{description}</p>
                  <p>${price}</p>
                  <p>rating:{rating}</p>
                  <p>{stock} in stock</p>
                  <p>made by {brand}</p>
                  <p>{category}</p>
                </li>
              ))}
          </ul>
      </div>
    </>
  )


  
}
