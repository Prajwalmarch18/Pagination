import "./styles.css";
import { useState, useEffect } from "react";

const ProductCard = ({ title, image }) => {
  return (
    <div className="prodcut-card">
      <img src={image} alt="Prodcut Image" />
      <p>{title}</p>
    </div>
  );
};

export default function App() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchProducts = async () => {
    const data = await fetch("https://dummyjson.com/products?limit=500");
    const json = await data.json();
    console.log(json?.products);
    setProducts(json?.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const pageSize = 9;
  const totalProducts = products.length;
  const totalPage = Math.ceil(totalProducts / pageSize);

  const start = currentPage * pageSize;
  const end = start + pageSize;

  const nextPage = (num) => {
    setCurrentPage(num);
  };

  const leftBtn = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const rightBtn = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="App">
      <h1>Pagination</h1>
      <button disabled={currentPage === 1} onClick={leftBtn}>
        {" "}
        ↩
      </button>
      {[...Array(totalPage).keys()].map((num) => (
        <button
          key={num}
          className={num === currentPage ? "btn active" : "btn"}
          onClick={() => nextPage(num)}
        >
          {num}
        </button>
      ))}
      <button disabled={currentPage === totalPage - 1} onClick={rightBtn}>
        ↪
      </button>

      <div className="products-wrapper">
        {products.slice(start, end).map((name) => (
          <ProductCard
            key={name?.id}
            title={name?.title}
            image={name?.images}
          />
        ))}
      </div>
    </div>
  );
}
