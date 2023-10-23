FROM node:20-alpine

RUN npm install -g pnpm@8.6.0

WORKDIR /app

# Copy the necessary file into image
COPY package.json pnpm-lock.yaml ./

# Install
RUN pnpm install --frozen-lockfile

RUN echo "pnpm version: $(pnpm --version)"

CMD ["pnpm", "dev"]
