import { createContext, useState } from "react";

import clayful from "clayful/client-js";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  //Provider : Context는 Provider 안에서 사용가능 => Provider 생성 후 App 컴포넌트 감싸기
  //value로 넣을 데이터 (필요 데이터, 업데이트 할 함수) 만들기 (예: isAuth = true/false)
  //children : AuthContext안에 들어간 부분
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);

  //isAuth(로그인 여부 확인) API) https://dev.clayful.io/ko/js/apis/customer/is-authenticated
  const isAuthenticated = () => {
    const Customer = clayful.Customer;
    const options = {
      customer: localStorage.getItem("accessToken"),
    };

    Customer.isAuthenticated(options, function (err, result) {
      if (err) {
        console.log(err.code);
        setIsAuth(false);
        return; //에러시 하단 실행 방지
      }

      const data = result.data;

      if (data.authenticated) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });
  };

  const signOut = () => {
    setIsAuth(false);
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  //AuthContextData에 담긴 내용은 Provider의 어떤 컴포넌트들이든 위 데이터를 업데이트 할 수 있다.
  const AuthContextData = {
    isAuth,
    isAuthenticated,
    signOut,
  };

  return (
    <AuthContext.Provider value={AuthContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
