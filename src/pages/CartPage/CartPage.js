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
    //customer: '<customer-auth-token>' 로그인 후 저장된 이 토큰을 가진 고객의 카트 가져오기
    customer: localStorage.getItem("accessToken"),
  };

  //useEffect로 데이터 가져오기
  useEffect(() => {
    //로그인 된 고객 카트 계산하기 API) https://dev.clayful.io/ko/js/apis/cart/get-for-me
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

  // 상품 갯수 더하고 빼는 UI 구현
  const buttonHandler = (type, index) => {
    let newCart = { ...cart };

    //CartItem.js에서 버튼이 plus/minus에 따라
    if (type === "plus") {
      const price =
        cart.items[index].price.sale.raw / cart.items[index].quantity.raw;
      //아이템 가격 변동 : 1개 가격만큼 올려주기
      newCart.items[index].price.sale.raw += price;
      //전체 아이템 가격 변경
      newCart.total.amount.raw += price;
      //해당 아이템 갯수 변경
      newCart.items[index].quantity.raw += 1;
    } else {
      if (newCart.items[index].quantity.raw === 1) return;
      const price =
        cart.items[index].price.sale.raw / cart.items[index].quantity.raw;
      newCart.items[index].price.sale.raw -= price;

      newCart.total.amount.raw -= price;

      newCart.items[index].quantity.raw -= 1;
    }

    updateItemData(newCart.items[index]._id, newCart.items[index].quantity.raw);
    setCart(newCart);
  };

  //사이트에서도 상품 지우기 UI 구현
  const removeItemFromState = (itemId, price) => {
    const newCart = { ...cart };
    // 클릭한 것을 지우고 (내가 클릭한 item id와 다른 친구만 남기기)
    const filteredItems = newCart.items.filter((item) => item._id !== itemId);
    newCart.items = filteredItems;
    //가격 재 계산
    newCart.total.amount.raw -= price;
    setCart(newCart);
  };

  //로그인 한 고객의 상품 지우기 API) https://dev.clayful.io/ko/js/apis/cart/delete-item-for-me
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

  //clayful에서 카트 품목 수령하기
  const updateItemData = (itemId, quantity) => {
    let payload = {
      quantity,
    };

    // 로그인 한 고객의 카트 품목을 수정 API) https://dev.clayful.io/ko/js/apis/cart/update-item-for-me
    Cart.updateItemForMe(itemId, payload, options, function (err, result) {
      if (err) {
        console.log(err.code);
        return;
      }
    });
  };

  const items = cart.items;
  return (
    <div className="pageWrapper">
      <div className="shopping-cart">
        <h3 className="shopping-cart-title">장바구니</h3>

        <div className="shopping-cart-body">
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
            <p>장바구니에 상품이 없습니다.</p>
          )}
        </div>

        {items && items.length > 0 && (
          <div className="shopping-cart-bottom">
            <span className="total-price">총 : {cart.total?.amount.raw}원</span>
            <button
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
