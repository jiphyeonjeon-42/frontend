## 42서울의 도서관, 집현전

<p align='center'>
<img width='70%' src='https://user-images.githubusercontent.com/79993356/180756135-0f622d3c-e5aa-4ac8-8d50-fa768aeaf5f9.png'>
</p>

<p>
    <p align='center'>
		<img src="https://img.shields.io/badge/React-v17.0.2-blue?logo=React"/>
		<img src="https://img.shields.io/badge/Recoil-^0.4.0-A6A9AA?logo=Coil" />
		<img src="https://img.shields.io/badge/Vite-react-646CFF?logo=vite&logoColor=fff" />
	</p>
	<p align='center'>
    <img src="https://img.shields.io/badge/Eslint-^7.32.0-4B32C3?logo=eslint" />
		<img src="https://img.shields.io/badge/Slack-alert-4A154B?logo=Slack" />
		<img src="https://img.shields.io/badge/zxing/library-QR code-2496ED" />
    <img src="https://img.shields.io/badge/42Oauth-^2.0-EB5424?logo=Auth0" />
	</p>
</p>

## 🏠 [HOME PAGE](https://42library.kr/)

**1,000명 이상**이 사용하는 42 SEOUL 공식 도서관 웹사이트입니다.

사용자와 사서님들에게 피드백을 매주 받는 것은 물론, 사이트에 대한 건의 사항을 **42 Seoul 재단**에서 직접 받기도 합니다.

매주 유지보수 팀이 도서관에 상주하여 해당 건의 사항을 해결합니다.

## 📌 집현전 서비스 소개

### 👩‍👩‍👧‍👦 도서검색

> - 네이버에서 제공하는 모든 도서를 검색 가능합니다.
> - 도서명, ISBN, 저자명으로 검색합니다.

### 📈 도서 대출과 반납, 등록 가능

> - 도서의 **QR코드** 및 바코드를 읽어 간단하게 책을 대출해드릴 수 있습니다.
> - 같은 방법으로, 집현전에 새로운 도서를 등록하여 DB에 저장 가능합니다.

### 📆 간편한 마이페이지 제공

> - 자신의 연체 날짜를 확인하며, 대출하거나 예약한 책의 내역을 봅니다.
> - 이메일과 비밀번호를 변경할 수 있습니다.
> - 연체 날짜가 잘못된 경우, 사서가 이를 수정해줄 수 있습니다.

### 📩 42 OAuth 2.0 활용

> - 이메일과 비밀번호로 회원가입은 물론, [**42의 OAuth API**](https://api.intra.42.fr/apidoc/guides/specification)를 통한 로그인 인증이 가능합니다.

## 📌 시연 영상

[<img src="https://user-images.githubusercontent.com/79993356/180759895-1c65c0d6-eebb-4778-a35d-d8988b3b300d.png" width="40%"></img>](https://youtu.be/WqC7n-4r-ZU)
[<img src="https://user-images.githubusercontent.com/79993356/180759916-e5d3b0a9-c8a1-4bd9-8280-79c68427642a.png" width="40%"></img>](https://youtu.be/AROfBfmo01g)

## 📌 백엔드 ERD

![집현전 ERD](https://user-images.githubusercontent.com/79993356/180768082-2031ae7f-4fe5-4595-8791-773ef3bece12.png)

## ⚙️ 프로젝트 구동 방법

프론트 코드와 백엔드 코드 모두 클론합니다.

[백엔드 코드](https://github.com/jiphyeonjeon-42/backend)

**1. MySQL 다운로드 후 워크벤치에 DB 스키마 설계 후 실행**
**2. 백엔드**

- 백엔드 환경 변수 설정
  - backend폴더 바로 안에 .env 파일 생성
  - .env 예시
    ```
    MYSQL_ROOT_PASSWORD=...
    MYSQL_DATABASE=...
    MYSQL_USER=...
    MYSQL_PASSWORD=...
    DB_SCHEMA=42library
    MODE=local
    NODE_ENV=development
    CLIENT_ID=...
    CLIENT_SECRET=...
    REDIRECT_URL=...
    CLIENT_URL=...
    BOT_USER_OAUTH_ACCESS_TOKEN=...
    JWT_SECRET=...
    NAVER_BOOK_SEARCH_CLIENT_ID = ...
    NAVER_BOOK_SEARCH_SECRET = ...
    ```
  - 실행
    ```jsx
    cd backend
    pnpm install
    pnpm dev
    ```

**3. 프론트엔드**

- 프론트엔드 환경 변수 설정

  - 폴더에 .env 파일 생성
  - .env 예시
    ```
    REACT_APP_API=...
    REACT_APP_WISH=...
    REACT_APP_E_BOOK_LIBRARY=...
    PORT=...
    REACT_APP_SUGGESTION=...
    ```
  - 실행

    ```jsx
    pnpm install
    pnpm dev
    ```

  - 컴포넌트 스토리 [(ladle)](https://ladle.dev) 보기
    ```sh
    pnpm install
    pnpm ladle serve
    ```

## 프로젝트 테스트 방법

```sh

  pnpm exec playwright test
    Runs the end-to-end tests.

  pnpm exec playwright test --ui
    Starts the interactive UI mode.

  pnpm exec playwright test --project=chromium
    Runs the tests only on Desktop Chrome.

  pnpm exec playwright test example
    Runs the tests in a specific file.

  pnpm exec playwright test --debug
    Runs the tests in debug mode.

  pnpm exec playwright codegen
    Auto generate tests with Codegen.
```

## 📌 팀원소개

서울42 인트라 아이디로 소개합니다!

- [Jwoo](https://github.com/Jiwon-Woo)
- [Sujikim](https://github.com/notusing11)
- [Chulee](https://github.com/tmam444)
- [Kyungsle](https://github.com/keinn51)
- [Seongyle](https://github.com/YeonSeong-Lee)
- [Jaekim](https://github.com/jae-hwan-kim)
- [Chanheki](https://github.com/chanhihi)
- [Youkim](https://github.com/scarf005)
- [Mingkang](https://github.com/mink97)
