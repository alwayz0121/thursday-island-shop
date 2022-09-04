import React, { useEffect, useState } from "react";
import clayful from "clayful/client-js";

import "../LandingPage/LandingPage.css";
import { Link, useLocation } from "react-router-dom";

function TopPage() {
  const Product = clayful.Product;
  const [items, setItems] = useState([]);
  let [fadepage, setFadepage] = useState("");

  const url = useLocation();
  const item_summary = url.pathname.slice(1);

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
      console.log(result.data);
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
      <section className="welcome welcome-top"></section>

      <section className="product-grid">
        <div className="grid-container">
          <h2>Top</h2>
          <div className="grid">{renderCards}</div>
        </div>
      </section>
    </div>
  );
}

export default TopPage;
