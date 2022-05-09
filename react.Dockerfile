FROM node:18-alpine3.14

RUN mkdir -p /react
WORKDIR /react

COPY ./fontend/package.json /react
COPY ./fontend/package-lock.json /react
RUN npm install -g npm@8.3.0

COPY ./fontend /react
EXPOSE 3000
CMD ["npm","start"]
