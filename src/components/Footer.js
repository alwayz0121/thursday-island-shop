import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const FooterContainer = styled.div`
  width: 100%;
  max-width: 1180px;
  margin: 40px auto 0px;
`;

const Sections = styled.div`
  border-top: 1px solid #777;
  padding: 1rem;

  @media screen and (max-width: 992px) {
    text-align: center;
  }
`;

const Title = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1.2rem;
  font-weight: 700;
  color: #666;
`;

const FooterWrapper = styled.div`
  display: flex;

  @media screen and (max-width: 992px) {
    flex-direction: column;
  }
`;

const Subscription = styled.section`
  width: 50%;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 992px) {
    width: 100%;
  }
`;

const Text = styled.p`
  margin-bottom: 0.8rem;
  font-size: 1rem;
  color: #777;
`;

const FooterLinks = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  justify-content: center;
  margin: 0 auto;
`;

const LinkWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  margin-top: 2rem;
  padding: 1rem;

  @media screen and (max-width: 992px) {
    flex-direction: column;
    margin: 0;
  }
`;

const InfoLink = styled(Link)`
  color: #777;
  font-weight: 700;
  text-decoration: none;
  margin: 0.5rem;
  padding: 1rem;
  transition: 0.3s ease-out;
  text-align: center;

  &:hover {
    color: rgb(15, 112, 0);
    background: #eee;
  }

  @media screen and (max-width: 992px) {
    margin: 0;
  }
`;

const Copyright = styled.div`
  width: 98%;
  background-color: rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  padding: 1rem;
`;

const CopyrightText = styled.p`
  font-size: 1rem;
  text-align: center;
  padding: 0;
  margin: 0;
`;

function Footer() {
  return (
    <>
      <FooterContainer>
        <Sections>
          <Title className="footer-heading">CS CENTER</Title>
          <FooterWrapper>
            <Subscription>
              <Text>1234-5678(유료) AM 9:00 - PM 6:00</Text>
              <Text>토요일 / 일요일 / 공휴일 휴무 / AM 9:00 주문마감</Text>
              <Text>(이후 주문건은 익일 확인)</Text>
            </Subscription>
            <Subscription>
              <Text>회사주소 : 서울시 가나다구 한강로</Text>
              <Text>고객센터 주소(반품처) : 경기도 00시 00읍 00길</Text>
              <Text>고객센터 전화: 1234-5678(유료)</Text>
            </Subscription>
          </FooterWrapper>
          <FooterLinks>
            <LinkWrapper>
              <InfoLink to="/">회사소개</InfoLink>
              <InfoLink to="/">이용약관</InfoLink>
              <InfoLink to="/">개인정보처리방침</InfoLink>
              <InfoLink to="/">매장찾기</InfoLink>
            </LinkWrapper>
          </FooterLinks>
        </Sections>
      </FooterContainer>
      <Copyright>
        <CopyrightText>
          &copy; {new Date().getFullYear()} Copyright
        </CopyrightText>
        <CopyrightText>
          본 페이지는 포트폴리오용으로 제작되었습니다.
        </CopyrightText>
      </Copyright>
    </>
  );
}

export default Footer;
