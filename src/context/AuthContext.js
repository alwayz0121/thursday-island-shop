import { createContext, useState } from "react";

import clayful from "clayful/client-js";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

//children : AuthContext안에 들어간 부분 (Routes 등)
//value로 넣을 데이터 만들기(필요 데이터, 업데이트 할 함수)
const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);

  //isAuth를 업데이트 해주는 함수
  const isAuthenticated = () => {
    const Customer = clayful.Customer;
    const options = {
      customer: localStorage.getItem("accessToken"),
    };

    Customer.isAuthenticated(options, function (err, result) {
      if (err) {
        console.log(err.code);
        setIsAuth(false);
        return;
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
