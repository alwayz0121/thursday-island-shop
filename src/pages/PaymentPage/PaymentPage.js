import React, { useEffect, useState } from "react";
import styled from "styled-components";
import clayful from "clayful/client-js";

const Header = styled.div`
  width: 100%;
  display: flex;
  border-bottom: 1px solid #ddd;
  padding: 20px 0px;
`;

const Title = styled.h2`
  width: 50%;
  font-size: 24px;
  font-weight: 500;
`;

const FinalPrice = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-end;
`;

const PaymentWrapper = styled.section`
  display: flex;
  width: 100%;
`;

const PaymentSection = styled.article`
  width: 49%;
`;

const SectionTitle = styled.h5`
  margin-top: 20px;
  font-size: 18px;
`;

const TextInput = styled.input`
  color: #444;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 0.8rem;
  width: 100%;
  max-width: 400px;
`;

const CheckboxInput = styled.input``;

const SelectInput = styled.input`
  color: #444;
  width: 100%;
  max-width: 400px;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 0.5rem;
`;

const PaymentBtn = styled.button`
  display: block;
  margin-top: 20px;
  padding: 10px 0px 30px;
  height: 2rem;
  max-width: 400px;
  border-radius: 5px;
  border: 1px solid #444;
  background-color: #444;
  color: #fff;
`;

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
      <Header>
        <Title>결제</Title>
        <FinalPrice>최종 결제 금액: {cart.total?.amount.raw}원</FinalPrice>
      </Header>

      <PaymentWrapper>
        <PaymentSection>
          <SectionTitle>주문자 정보</SectionTitle>
          <TextInput
            type="text"
            name="name"
            onChange={handleSendChange}
            value={sendUserInfo.name}
            placeholder="주문하시는 분"
          />
          <TextInput
            type="text"
            name="mobile"
            onChange={handleSendChange}
            value={sendUserInfo.mobile}
            placeholder="휴대폰 연락처"
          />
          <div>
            <CheckboxInput
              type="checkbox"
              id="sameInfo"
              name="sameInfo"
              onChange={onCheckboxClick}
              checked={isChecked}
            />
            <label htmlFor="sameInfo">배송지 정보도 동일합니다.</label>
          </div>
        </PaymentSection>

        <div style={{ width: "2%" }}></div>

        <PaymentSection>
          <SectionTitle>배송지 정보</SectionTitle>
          <TextInput
            type="text"
            name="name"
            onChange={handleGetChange}
            value={getUserInfo.name}
            placeholder="받는 분"
          />
          <TextInput
            type="text"
            name="mobile"
            onChange={handleGetChange}
            value={getUserInfo.mobile}
            placeholder="휴대폰 연락처"
          />

          <SectionTitle>배송 주소</SectionTitle>
          <TextInput type="text" placeholder="주소" />
          <TextInput type="text" placeholder="상세주소" />
          <TextInput type="text" placeholder="우편번호" />

          <SectionTitle>결제</SectionTitle>
          <SelectInput>
            <option>옵션</option>
            <option>신용카드</option>
            <option>무통장입금</option>
          </SelectInput>

          <PaymentBtn style={{ width: "100%" }}>주문</PaymentBtn>
        </PaymentSection>
      </PaymentWrapper>
    </div>
  );
}

export default PaymentPage;
