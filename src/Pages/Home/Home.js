import React, { useEffect, useState } from "react";
import Products from "./Products";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  //   setPage(Math.ceil(count / size));

  useEffect(() => {
    fetch(`http://localhost:5000/products?page=${page}&size=${size}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setCount(data.count);
      });
  }, [page, size]);

  const pages = Math.ceil(count / size);
  return (
    <div>
      <h1>Home Pgae {products.length}</h1>
      <div className="grid grid-cols-4 gap-4">
        {products.map((product) => (
          <Products key={product._id} product={product} />
        ))}
      </div>
      {[...Array(pages).keys()].map((number) => (
        <button onClick={() => setPage(number)} className="btn btn-ghost">
          {number + 1}
        </button>
      ))}
      <select onChange={(e) => setSize(e.target.value)}>
        <option value="5">5</option>
        <option selected value="10">
          10
        </option>
        <option value="15">15</option>
        <option value="20">20</option>
      </select>
    </div>
  );
};

export default Home;
