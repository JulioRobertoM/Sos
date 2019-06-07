FROM node:10.7
EXPOSE 4200

WORKDIR /app

ADD package.json /app/
RUN npm install

ADD . /app

CMD ["npm", "start"]