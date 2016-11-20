FROM node

RUN mkdir /app
ENV NODE_ENV production
WORKDIR /app

COPY ./package.json /app
RUN npm install --loglevel silent
COPY ./ /app

RUN rm -rf node_modules/@angular/http
RUN npm i @angular/http@2.0.0-rc.1 --save

RUN npm run build:prod
CMD ["npm","run","server:prod"]

EXPOSE 3001
