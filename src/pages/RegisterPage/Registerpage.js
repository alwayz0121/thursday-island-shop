import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

//사용자 정보를 받기 위한 외부 라이브러리 사용
import clayful from "clayful/client-js";

function RegisterPage() {
  useEffect(() => {
    const pageTitle = document.getElementsByTagName("title")[0];
    pageTitle.innerHTML = "T.I Shop | 회원가입";
  }, []);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const Customer = clayful.Customer;

    //Clayful API 이용한 회원가입 구현
    const payload = {
      email, //key, value 값이 같은 경우엔 한 번만 사용해도 된다
      password,
    };

    //회원가입 기능 API) https://dev.clayful.io/ko/js/apis/customer/create-me
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
          onChange={handleEmailChange}
          placeholder="이메일을 입력하세요"
          type="email"
          name="email"
          value={email}
        ></input>
        <input
          onChange={handlePasswordChange}
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
