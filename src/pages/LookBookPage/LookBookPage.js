import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import axios from "axios";

import backgroundImg from "../../images/background2.jpg";

const LookBookWrapper = styled.div`
  width: 100%;
`;

const Banner = styled.div`
  width: 100%;
  height: 35vw;
  max-height: 400px;
  background-image: url(${backgroundImg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PageContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 5rem 3rem 3rem;
  max-width: 1200px;
  margin: auto;
`;

const PageTitle = styled.h2`
  font-size: 2rem;
  font-weight: 300;
  margin: 20px auto;
`;

const LookBookItem = styled.figure`
  width: 90%;
  margin: 1.5rem;
`;

const LookBookImage = styled.img`
  width: 100%;
  box-shadow: 0px 0px 15px #aaa;
`;

function LookBookPage() {
  let [fadepage, setFadepage] = useState("");

  let lookBookData = [
    {
      id: 0,
      title: "lookbook1",
      content: "lookbook1",
    },
    {
      id: 1,
      title: "lookbook2",
      content: "lookbook2",
    },
    {
      id: 2,
      title: "lookbook3",
      content: "lookbook3",
    },
  ];

  let [lookBook, setLookBook] = useState(lookBookData);
  let [btnClick, setBtnClick] = useState(1);
  let [loadingDisplay, setLoadingDisplay] = useState(false);

  useEffect(() => {
    const pageTitle = document.getElementsByTagName("title")[0];
    pageTitle.innerHTML = "T.I Shop | LookBook";
  }, []);

  useEffect(() => {
    setFadepage("end");
    return () => {
      setFadepage("");
    };
  }, []);

  return (
    <LookBookWrapper className={`start ${fadepage}`}>
      <Banner></Banner>

      <PageContainer>
        <PageTitle>Look Book</PageTitle>
        <div className="row">
          {lookBook.map((a, i) => {
            return <Card lookBook={lookBook[i]} i={i} key={i} />;
          })}
        </div>
      </PageContainer>

      <Button
        variant="outline-dark"
        style={{ display: "block", margin: "0px auto" }}
        onClick={() => {
          setBtnClick(btnClick + 1);
          setLoadingDisplay(true);
          if (btnClick >= 0 && btnClick < 3) {
            axios
              .get(
                `https://alwayz0121.github.io/thursday_island_json/main/lookbook${btnClick}.json`
              )
              .then((result) => {
                let newLookBook = [...lookBook, ...result.data];
                setLookBook(newLookBook);
                setLoadingDisplay(false);
              })
              .catch(() => {
                setLoadingDisplay(false);
              });
          } else {
            alert("to be continued 💛");
          }
        }}
      >
        +
      </Button>
    </LookBookWrapper>
  );
}

function Card({ lookBook }) {
  return (
    <div className="col-md-4 col-sm-6">
      <LookBookItem>
        <LookBookImage
          src={
            "https://alwayz0121.github.io/thursday_island_json/img/lookbook/lookbook" +
            (lookBook.id + 1) +
            ".jpg"
          }
          alt="lookbook"
        />
      </LookBookItem>
    </div>
  );
}

export default LookBookPage;
