import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import "./LookBookPage.css";

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
    <div className={`start ${fadepage}`}>
      <section className="welcome-lookbook"></section>

      <h2 className="main-title">Look Book</h2>
      <div className="container">
        <div className="row">
          {lookBook.map((a, i) => {
            return <Card lookBook={lookBook[i]} i={i} key={i} />;
          })}
        </div>
      </div>
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
    </div>
  );
}

function Card({ lookBook }) {
  return (
    <div className="col-md-4 col-sm-6">
      <div className="lookbook-wrapper">
        <img
          src={
            "https://alwayz0121.github.io/thursday_island_json/img/lookbook/lookbook" +
            (lookBook.id + 1) +
            ".jpg"
          }
          alt="lookbook"
        />
      </div>
    </div>
  );
}

export default LookBookPage;
