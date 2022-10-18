## 🛒 리액트 쇼핑몰 (Ver 2.2)

[직접 만든 Thursday Island 쇼핑몰 바로가기](https://alwayz0121-react-shop.netlify.app/)<br>

본 프로젝트는 React와 Clayful API를 활용한 쇼핑몰 Web Application Project 입니다. <br>
회원가입, 로그인, 카테고리, 장바구니, 상품 구매 등의 페이지로 구성되어 있습니다.<br>
(Thursday Island 브랜드의 쇼핑몰을 재구성했습니다.) <br>

<br>

```
Frontend | React, styled-components, Bootstrap, API
Backend | -
```

<br>

test ID : test@naver.com <br>
test PW : 12345678
<br> <br>

---

## Structure

### Global

- `styled components`로 컴포넌트 스타일을 적용했습니다.
- 페이지별로 폴더를 나눠서 작업했습니다.

### Header, Footer

- 컴포넌트화 해서 사이트 전역에 걸쳐 이용할 수 있습니다.

### Register / Login Page

- Clayful API를 이용해 쇼핑몰에 들어오는 고객 정보를 저장했습니다.
- 로그인 된 정보는 `localStorage`에 토큰이 저장됩니다.
- 로그인 한 유저만 장바구니에 접속할 수 있습니다.

### Main Page

- `useEffect`와 setTimeout을 이용해 메인 화면 사진에 `transition` 효과를 주었습니다.
- `useParams`를 이용해 상품 클릭 시 해당 id와 동일한 상세정보 사이트로 이동합니다.
- `map` 함수를 이용해 상품 목록을 구현했습니다.

### Category Page (Top, One Piece, Bottom)

- `filter`를 이용해 카테고리에 따라 분류했습니다.
- `Context`를 이용해 카테고리별 페이지를 컴포넌트화 했습니다.

### Detail Page

- 상품 구매 버튼을 누를 시, 사용자의 로그인 유무에 따른 정보를 `Context`로 데이터를 관리했습니다.

### LookBook Page

- `axios` 라이브러리를 이용하여 서버 데이터를 불러왔습니다.

### Cart Page

- 구매 상품 목록을 `Component`로 관리하여 반복적으로 사용하도록 했습니다.
- 상품 수량 조정은 동일한 함수에서 인자에 따라 다르게 움직이도록 조건문을 이용했습니다.
- 로그인이 되어있지 않다면 로그인 페이지로 이동합니다.

### Payment Page

- `useState`를 통해 주문자 정보와 배송지 정보가 동일하다면 자동으로 입력될 수 있도록 input을 연결시켰습니다.
  <br><br>

---

## 🚩 Ver 2.1에서 성장한 점

1. 순수 CSS에서 `styled components`로 재구현

2. 리팩토링과 컴포넌트화를 통해 코드의 재사용을 하려고 노력했다.

3. GIT을 활용해 버전 관리를 진행했다. (branch를 이용해 styled components 적용)

<br>

## 🧭 Ver 2.1에서 나아갈 점

1. 상태 관리 - context API에서 Redux로 연습해보기

2. 데이터 로딩 UI 추가하기

3. 기능 - 최근에 본 항목) 뱃지로 띄우기

4. 최적화 시도하기
