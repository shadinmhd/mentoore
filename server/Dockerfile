FROM node:20.7.0-alpine

WORKDIR /app

COPY package*.json	.

RUN npm install

COPY . .

CMD [ "npm", "start" ]
