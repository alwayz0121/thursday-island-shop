import React, { useContext, useState } from "react";
import { Alert } from "react-bootstrap";
import clayful from "clayful/client-js";

import "./ProductInfos.css";
import { AuthContext } from "./../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function ProductInfos({ item }) {
  const navigate = useNavigate();
  const [count, setCount] = useState(1);
  const [shopAlert, setShopAlert] = useState(false);
  //로그인 정보 가져오기
  const { isAuth } = useContext(AuthContext);

  const handleQuantityClick = (type) => {
    if (type === "plus") {
      setCount((prev) => prev + 1);
    } else {
      if (count === 1) return;
      setCount((prev) => prev - 1);
    }
  };

  //로그인 유무에 따라 Cart 담긴 내용 호출하기
  const handleActionClick = (type) => {
    if (!isAuth) {
      alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
      navigate("/login");
      return;
    }

    const Cart = clayful.Cart;
    const payload = {
      product: item._id,
      variant: item.variants[0]._id,
      quantity: count,
    };
    //구매자 정보
    const options = {
      //customer: '<customer-auth-token>' (localStorage에 저장해둠)
      customer: localStorage.getItem("accessToken"),
    };

    //로그인 된 고객이 카트에 품목 추가 API) https://dev.clayful.io/ko/js/apis/cart/add-item-for-me
    Cart.addItemForMe(payload, options, function (err, result) {
      if (err) {
        console.log(err.code);
        return;
      }
      //상품을 장바구니에 or 바로 구매
      if (type === "cart") {
        //2초 뒤에 장바구니 담기 알람 끄기
        setShopAlert(true);
        setTimeout(() => {
          setShopAlert(false);
        }, 3000);
      } else {
        setTimeout(() => {
          navigate("/user/cart");
        }, 1000);
      }
    });
  };

  return (
    <>
      {shopAlert && (
        <Alert variant="info">
          <Alert.Heading>장바구니에 담겼습니다.</Alert.Heading>
          <p>장바구니에서 확인해주세요.</p>
        </Alert>
      )}

      <div className="detail-title">
        <h2>{item.name}</h2>
        <h5>{item.keywords}</h5>
      </div>
      <div className="detail-quantity">
        <p>수량</p>
        <button
          onClick={() => {
            handleQuantityClick("plus");
          }}
          className="plus-btn"
          type="button"
          name="button"
        >
          +
        </button>
        <input type="text" readOnly name="number" value={count} />
        <button
          onClick={() => {
            handleQuantityClick("minus");
          }}
          className="minus-btn"
          type="button"
          name="button"
        >
          -
        </button>
      </div>
      <h3 className="detail-price">
        총 금액 : {item.price?.sale.raw * count}원
      </h3>
      <div
        onClick={() => {
          handleActionClick("cart");
        }}
        className="product-info-action"
      >
        장바구니에 담기
      </div>
      <div
        onClick={() => {
          handleActionClick("pay");
        }}
        className="product-info-action"
      >
        바로 구매하기
      </div>
    </>
  );
}

export default ProductInfos;
