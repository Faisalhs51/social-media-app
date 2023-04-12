FROM node:14-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV DB_CONN_STRING mongodb+srv://Faisalhs51:oPenmail8@test.fk4e1mk.mongodb.net/?retryWrites=true&w=majority

RUN npm test

EXPOSE 5000

CMD [ "node", "index.js" ]
