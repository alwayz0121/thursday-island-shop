import React, { useEffect, useState } from "react";
import clayful from "clayful/client-js";
import "./PaymentPage.css";

function PaymentPage() {
  const [cart, setCart] = useState({});
  //주문자, 수령자 동일 확인
  const [getUserInfo, setGetUserInfo] = useState({
    mobile: "",
    name: "",
  });
  const [sendUserInfo, setSendUserInfo] = useState({
    mobile: "",
    name: "",
  });
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const pageTitle = document.getElementsByTagName("title")[0];
    pageTitle.innerHTML = "T.I Shop | 결제하기";
  }, []);

  useEffect(() => {
    getCartData();
  }, []);

  const getCartData = () => {
    const Cart = clayful.Cart;

    const options = {
      customer: localStorage.getItem("accessToken"),
    };

    Cart.getForMe({}, options, function (err, result) {
      if (err) {
        // Error case
        console.log(err.code);
      }
      const data = result.data;
      setCart(data.cart);
    });
  };

  const handleSendChange = (e) => {
    const { name, value } = e.target;
    setSendUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleGetChange = (e) => {
    const { name, value } = e.target;
    setGetUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //주문자와 받는이가 동일한지 유무
  const onCheckboxClick = () => {
    if (isChecked) {
      setIsChecked(false);
      setGetUserInfo({
        name: "",
        mobile: "",
      });
    } else {
      setIsChecked(true);
      setGetUserInfo({
        name: sendUserInfo.name,
        mobile: sendUserInfo.mobile,
      });
    }
  };

  return (
    <div className="pageWrapper">
      <div className="payment-header">
        <div className="payment-title">결제</div>
        <div className="payment-price">
          최종 결제 금액: {cart.total?.amount.raw}원
        </div>
      </div>

      <div className="payment">
        <div className="payment-order-info" style={{ width: "49%" }}>
          <h5>주문자 정보</h5>
          <input
            type="text"
            name="name"
            onChange={handleSendChange}
            value={sendUserInfo.name}
            placeholder="주문하시는 분"
          />
          <input
            type="text"
            name="mobile"
            onChange={handleSendChange}
            value={sendUserInfo.mobile}
            placeholder="휴대폰 연락처"
          />
          <div>
            <input
              type="checkbox"
              id="sameInfo"
              name="sameInfo"
              onChange={onCheckboxClick}
              checked={isChecked}
            />
            <label htmlFor="sameInfo">배송지 정보도 동일합니다.</label>
          </div>
        </div>

        <div style={{ width: "2%" }}></div>

        <div className="payment-getter-info" style={{ width: "49%" }}>
          <h5>배송지 정보</h5>
          <input
            type="text"
            name="name"
            onChange={handleGetChange}
            value={getUserInfo.name}
            placeholder="받는 분"
          />
          <input
            type="text"
            name="mobile"
            onChange={handleGetChange}
            value={getUserInfo.mobile}
            placeholder="휴대폰 연락처"
          />

          <h5>배송 주소</h5>
          <input type="text" placeholder="주소" />
          <input type="text" placeholder="상세주소" />
          <input type="text" placeholder="우편번호" />

          <h5>결제</h5>
          <select>
            <option>옵션</option>
            <option>신용카드</option>
            <option>무통장입금</option>
          </select>

          <button style={{ width: "100%" }}>주문</button>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
