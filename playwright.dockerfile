FROM mcr.microsoft.com/playwright:v1.37.1-jammy

WORKDIR /app

# Corepack으로 pnpm 설치
RUN corepack enable && corepack prepare pnpm@latest --activate

# 브라우저 의존성 설치
RUN pnpm dlx playwright install-deps

ENV IS_DOCKER=true
