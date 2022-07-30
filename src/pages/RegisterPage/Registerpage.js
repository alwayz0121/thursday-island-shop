import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

//사용자 정보를 받기 위한 외부 라이브러리 사용
import clayful from "clayful/client-js";

function RegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const Customer = clayful.Customer;

    //Clayful 외부 라이브러리 이용해서 회원가입 구현하기
    const payload = {
      email, //key, value 값이 같은 경우엔 한 번만 사용해도 된다
      password,
    };

    Customer.createMe(payload, function (err, result) {
      if (err) {
        console.log(err.code);
        return;
      }
      navigate("/login");
    });
  };

  return (
    <div className="auth-wrapper">
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="이메일을 입력하세요"
          type="email"
          name="email"
          value={email}
        ></input>
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="비밀번호를 8자리 이상 입력하세요"
          type="password"
          name="password"
          value={password}
        ></input>

        <button type="submit">회원가입</button>
        <Link to="/login" className="auth-explain">
          이미 Thursday Island 회원이라면 로그인하세요.
        </Link>
      </form>
    </div>
  );
}

export default RegisterPage;
