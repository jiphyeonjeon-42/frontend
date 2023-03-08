FROM node:19.6.0-buster

# 컨테이너의 현재 작업 경로 (cwd)를 /app로 변경
WORKDIR /app

# package.json와 package-lock.json을 컨테이너에 복사
COPY package*.json ./

# npm install을 실행하여 의존성 설치
RUN npm install

# # 소스 코드를 컨테이너에 복사
# COPY ./src ./src
# COPY ./public ./public
# COPY ./vite.config.ts ./vite.config.ts
# COPY ./eslintrc.js ./eslintrc.js
# COPY ./prettierrc.js ./prettierrc.js

# 프론트엔드 코드를 워치 모드로 실행
CMD ["npm", "show"]
