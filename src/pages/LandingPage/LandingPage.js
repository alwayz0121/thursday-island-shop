import React, { useEffect, useState } from "react";
import clayful from "clayful/client-js";

import "./LandingPage.css";
import { Link } from "react-router-dom";

function LandingPage() {
  const Product = clayful.Product;
  const [items, setItems] = useState([]);
  let [fadepage, setFadepage] = useState("");

  useEffect(() => {
    const pageTitle = document.getElementsByTagName("title")[0];
    pageTitle.innerHTML = "Thursday Island Shop";
  }, []);

  useEffect(() => {
    setFadepage("end");
    return () => {
      setFadepage("");
    };
  }, []);

  useEffect(() => {
    const options = {
      query: {
        page: 1,
      },
    };

    Product.list(options, function (err, result) {
      if (err) {
        console.log(err.status);
        console.log(err.code);
        console.log(err.message);
        return;
      }
      setItems(result.data);
    });
  }, []);

  const renderCards = items.map((item) => {
    if (item) {
      return (
        <div key={item._id} className="grid-product">
          <Link to={`/product/${item._id}`}>
            <img src={item.thumbnail.url} alt={item.name} />
            <div className="grid-detail">
              <p>{item.name}</p>
              <p>{item.price.sale.formatted}</p>
            </div>
          </Link>
        </div>
      );
    }
  });

  return (
    <div className={`start ${fadepage}`}>
      <section className="welcome"></section>

      <section className="movie-wrapper">
        <div className="container">
          <div className="movie-subtitle">2022 Fall</div>
          <div className="movie-title">Flower Market</div>
          <div className="movie-player">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/iS65Ttye6Kg"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      <section className="sub-bg"></section>

      <section className="product-grid">
        <div className="grid-container">
          <h2>New Product</h2>
          <div className="grid">{renderCards}</div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
