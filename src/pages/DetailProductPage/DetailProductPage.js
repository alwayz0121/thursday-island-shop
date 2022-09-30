import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import clayful from "clayful/client-js";
import { Row, Col } from "react-bootstrap";

import ProductInfos from "./Sections/ProductInfos";

function DetailProductPage() {
  //url 파라미터 이용 (App.js에 연결한 :productId)
  const params = useParams();
  const productId = params.productId;

  useEffect(() => {
    const pageTitle = document.getElementsByTagName("title")[0];
    pageTitle.innerHTML = "T.I Shop | 상품 자세히 보기";
  }, []);

  //우리가 받을 정보 item: 객체 형태
  const [item, setItem] = useState({});
  let [fadepage, setFadepage] = useState("");

  useEffect(() => {
    setFadepage("end");
    return () => {
      setFadepage("");
    };
  }, []);

  useEffect(() => {
    const Product = clayful.Product;
    const options = {};

    //JS로 상품 API 요청
    Product.get(productId, function (err, result) {
      if (err) {
        console.log(err.code);
        return;
      }

      const data = result.data;
      setItem(data);
    });
  }, []);

  //아직 url이 도착하지 않았다면 : ?
  return (
    <div
      className={`pageWrapper start ${fadepage}`}
      style={{
        margin: "20px auto",
        maxWidth: "1000px",
      }}
    >
      <Row>
        <Col md>
          <div>
            <img
              style={{
                width: "100%",
                padding: "5% 15%",
              }}
              src={item.thumbnail?.url}
              alt={item.name}
            />
          </div>
        </Col>
        <Col
          md
          style={{
            padding: "5%",
          }}
        >
          <ProductInfos item={item} />
        </Col>
      </Row>
    </div>
  );
}

export default DetailProductPage;
