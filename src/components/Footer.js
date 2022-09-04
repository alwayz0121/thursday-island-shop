import React from "react";
import { Container } from "react-bootstrap";
import "../css/footer.css";

function Footer() {
  return (
    <>
      <Container className="footer-container">
        <div className="footer-upper"></div>
        <div className="footer-lower">
          <div className="footer-lower-left">
            <h1 className="footer-name">CS CENTER</h1>
            <span>1234-5678(유료) AM 9:00 - PM 6:00</span>
            <span>토요일 / 일요일 / 공휴일 휴무 / AM 9:00 주문마감</span>
            <span>(이후 주문건은 익일 확인)</span>
          </div>
          <div className="footer-lower-right">
            <ul>
              <li>회사소개</li>
              <li>이용약관</li>
              <li>개인정보처리방침</li>
              <li>매장찾기</li>
              <li>친구추천</li>
            </ul>
            <address>
              회사주소 : 서울시 가나다구 한강로
              <br />
              고객센터 주소(반품처) : 경기도 00시 00읍 00길
              <br />
              고객센터 전화: 1234-5678(유료) 고객센터 팩스: 012-345-6789
            </address>
          </div>
        </div>
      </Container>
      <div className="text-center p-3 footer-copyright">
        &copy; {new Date().getFullYear()} Copyright:{" "}
        <span>본 페이지는 포트폴리오용으로 제작되었습니다.</span>
      </div>
    </>
  );
}

export default Footer;
