FROM node:20-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY package.json ./
COPY pnpm-lock.yaml ./

COPY . .

RUN pnpm install

EXPOSE 3333

CMD ["pnpm", "start"]