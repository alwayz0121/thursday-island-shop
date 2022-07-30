import React, { useEffect, useState } from "react";
import clayful from "clayful/client-js";

import "./LandingPage.css";
import { Link } from "react-router-dom";

function LandingPage() {
  const Product = clayful.Product;
  const [items, setItems] = useState([]);
  let [fadepage, setFadepage] = useState("");

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
        console.log(err.code);
        console.log(err.message);
        return;
      }
      console.log(result.data);
      setItems(result.data);
    });
  }, []);

  const renderCards = items.map((item) => {
    if (item) {
      return (
        <div key={item._id} className="col-md-4">
          <Link to={`/product/${item._id}`}>
            <img
              src={item.thumbnail.url}
              alt={item.name}
              style={{
                width: "90%",
                boxShadow: "0px 0px 15px #ccc",
                margin: "0px 0px 20px 20px",
              }}
            />
          </Link>
        </div>
      );
    }
  });

  return (
    <div className={`start ${fadepage}`}>
      <section className="welcome"></section>
      <section className="sub-bg"></section>
      <section className="new-product pageWrapper">
        <h2 className="main-title">New Product</h2>
        <div className="container">
          <div className="row">{renderCards}</div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
