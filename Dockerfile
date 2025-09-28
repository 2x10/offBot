FROM node:lts-alpine

WORKDIR /app

# install dependencies
COPY package.json ./
RUN npm install

COPY . .

RUN npm run deploy

# run
CMD ["node", "."]