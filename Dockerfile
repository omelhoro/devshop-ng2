FROM node

RUN mkdir /app
ENV NODE_ENV production
WORKDIR /app

COPY ./package.json /app
RUN npm install --loglevel silent
COPY ./ /app
RUN npm run build:prod

CMD ["npm","run","server:prod"]

EXPOSE 3001
