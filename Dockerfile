FROM node:24-alpine

WORKDIR /app

COPY . .

RUN npm ci

COPY . .

RUN npm run deploy

CMD ["node", "dist/main.js"]