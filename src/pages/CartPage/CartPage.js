import React, { useEffect, useState } from "react";
import clayful from "clayful/client-js";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";
import CartItem from "./Sections/CartItem";

function CartPage() {
  const navigate = useNavigate();
  //장바구니 데이터 가져오기
  const [cart, setCart] = useState({});
  const Cart = clayful.Cart;

  const options = {
    customer: localStorage.getItem("accessToken"),
  };

  useEffect(() => {
    Cart.getForMe({}, options, function (err, result) {
      if (err) {
        console.log(err.code);
        return;
      }

      //장바구니의 정보 가져오기
      const data = result.data;
      setCart(data.cart);
    });
  }, []);

  //clayful에서 카트 품목 수령하기
  const updateItemData = (itemId, quantity) => {
    let payload = {
      quantity,
    };

    Cart.updateItemForMe(itemId, payload, options, function (err, result) {
      if (err) {
        console.log(err.code);
        return;
      }
    });
  };

  // 상품 갯수 더하고 빼기 API
  const buttonHandler = (type, index) => {
    let newCart = { ...cart };

    if (type === "plus") {
      const price =
        cart.items[index].price.original.raw / cart.items[index].quantity.raw;
      //아이템 가격 변동 : 1개 가격만큼 올려주기
      newCart.items[index].price.original.raw += price;
      //전체 아이템 가격 변경
      newCart.total.amount.raw += price;
      //해당 아이템 갯수 변경
      newCart.items[index].quantity.raw += 1;
    } else {
      if (newCart.items[index].quantity.raw === 1) return;
      const price =
        cart.items[index].price.original.raw / cart.items[index].quantity.raw;
      newCart.items[index].price.original.raw -= price;

      newCart.total.amount.raw -= price;

      newCart.items[index].quantity.raw -= 1;
    }

    updateItemData(newCart.items[index]._id, newCart.items[index].quantity.raw);
    setCart(newCart);
  };

  //사이트에서도 상품 지우기
  const removeItemFromState = (itemId, price) => {
    const newCart = { ...cart };
    const filteredItems = newCart.items.filter((item) => item._id !== itemId);
    //아이템 제거
    newCart.items = filteredItems;
    //가격 재 계산
    newCart.total.amount.raw = newCart.total.amount.raw = price;
    setCart(newCart);
  };

  //상품 지우기 API
  const deleteItemHandler = (itemId, price) => {
    Cart.deleteItemForMe(itemId, options, function (err, result) {
      if (err) {
        // Error case
        console.log(err.code);
        return;
      }
      removeItemFromState(itemId, price);
    });
  };

  const items = cart.items;
  return (
    <div className="pageWrapper">
      <div className="shopping-cart">
        {/* Title */}
        <h3 className="title">Shopping Bag</h3>

        <div className="shopping-cart-body" style={{ minHeight: "100" }}>
          {items && items.length > 0 ? (
            items.map((item, index) => {
              return (
                <CartItem
                  key={item._id}
                  item={item}
                  index={index}
                  buttonHandler={(type, index) => {
                    buttonHandler(type, index);
                  }}
                  deleteItemHandler={(itemId, price) => {
                    deleteItemHandler(itemId, price);
                  }}
                />
              );
            })
          ) : (
            <p style={{ textAlign: "center", marginTop: "2rem" }}>
              장바구니에 상품이 없습니다.
            </p>
          )}
        </div>

        {items && items.length > 0 && (
          <div className="bottom">
            <span className="total-price">총 : {cart.total?.amount.raw}원</span>
            <button
              style={{ float: "right", padding: "4px 8px" }}
              onClick={() => {
                navigate("/payment");
              }}
            >
              결제
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;
