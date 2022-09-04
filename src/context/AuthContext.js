//Provider 위한 함수 생성 후 Provider 리턴해서 App.js에서 사용하기
import { createContext, useState } from "react";

import clayful from "clayful/client-js";
import { useNavigate } from "react-router-dom";

//react의 Context 개념을 이용해, 로그인 정보를 다른 컴포넌트에서도 자유롭게 사용 가능
export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  //Provider : Context는 Provider 안에서 사용가능 => Provider 생성 후 App 컴포넌트 감싸기
  //value로 넣을 데이터 (필요 데이터, 업데이트 할 함수) 만들기 (예: isAuth = true/false)
  //children : AuthContext안에 들어간 부분
  //  (value에 들어있는 값을 컴포넌트에서 쓰기 위해서는 Provider로 감싸줘야 하므로, { children }으로 감싸준 후,
  //   value에 필요한 값(children 안의 컴포넌트에서 사용하게 될 값을 넣고 업데이트 하는 함수도 넣어주자.)
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
