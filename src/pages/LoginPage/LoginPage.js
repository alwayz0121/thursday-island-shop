import React, { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import clayful from "clayful/client-js";
import { AuthContext } from "../../context/AuthContext";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //로그인 성공시 정보 가져오기
  const { isAuthenticated } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const Customer = clayful.Customer;

    //Clayful 외부 라이브러리 이용해서 로그인 구현하기
    const payload = {
      email, //key, value 값이 같은 경우엔 한 번만 사용해도 된다
      password,
    };

    Customer.authenticate(payload, function (err, result) {
      if (err) {
        console.log(err.code);
        return; //오류 발생시 다음으로 진행되지 않도록 막기
      }

      //로그인 유저의 정보를 localStorage에 저장하기
      const data = result.data;
      localStorage.setItem("customerID", data.Customer);
      localStorage.setItem("accessToken", data.token);
      navigate("/");
      //로그인 성공시
      isAuthenticated();
    });
  };

  return (
    <div className="auth-wrapper">
      <h2>LOGIN</h2>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="가입한 이메일을 입력하세요"
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

        <button type="submit">LOGIN</button>
        <Link to="/register" className="auth-explain">
          Thursday Island 아이디가 없다면 지금 만들어요.
        </Link>
      </form>
    </div>
  );
}

export default LoginPage;
