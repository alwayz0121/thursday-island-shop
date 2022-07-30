import React, { useState, useEffect } from "react";
import "./CartItem.css";

//장바구니 아이템을 핸들하기 위한 props 가져오기
function CartItem({ item, buttonHandler, index, deleteItemHandler }) {
  let [fadepage, setFadepage] = useState("");

  useEffect(() => {
    setFadepage("end");
    return () => {
      setFadepage("");
    };
  }, []);

  //item이 아직 불러와지지 않았을 땐
  if (!item.product) return null;

  return (
    <div className={`cart-item start ${fadepage}`}>
      <div className="image">
        <img
          style={{
            height: "90%",
            objectFit: "cover",
          }}
          src={item.product.thumbnail.url}
          alt={item.product.name}
        />
      </div>

      <div className="description">
        <span>{item.product.name}</span>

        <div className="quantity">
          <button
            onClick={() => buttonHandler("plus", index)}
            className="plus-btn"
            type="button"
            name="button"
          >
            +
          </button>
          <input type="text" readOnly name="number" value={item.quantity.raw} />
          <button
            onClick={() => buttonHandler("minus", index)}
            className="minus-btn"
            type="button"
            name="button"
          >
            -
          </button>
        </div>

        <p className="final-price">{item.price.original.raw}원</p>
      </div>

      <div className="buttons">
        <span
          className="delete-btn"
          onClick={() => deleteItemHandler(item._id, item.price.original.raw)}
        >
          X
        </span>
      </div>
    </div>
  );
}

export default CartItem;
