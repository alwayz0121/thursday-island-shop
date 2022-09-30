import React, { useEffect, useState } from "react";
import clayful from "clayful/client-js";

import "../../LandingPage/LandingPage.css";
import { Link, useLocation } from "react-router-dom";

function CategoryPage({ category }) {
  const Product = clayful.Product;
  const [items, setItems] = useState([]);
  let [fadepage, setFadepage] = useState("");

  const url = useLocation();
  const item_summary = url.pathname.slice(1);

  useEffect(() => {
    const pageTitle = document.getElementsByTagName("title")[0];
    pageTitle.innerHTML = "T.I Shop | 카테고리";
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

  const filteredItems = items.filter((item) => item.summary === item_summary);
  const renderCards = filteredItems.map((item) => {
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
      <section className="welcome welcome-bottom"></section>

      <section className="product-grid">
        <div className="grid-container">
          <h2>{category}</h2>
          <div className="grid">{renderCards}</div>
        </div>
      </section>
    </div>
  );
}

export default CategoryPage;
