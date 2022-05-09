FROM node:18-alpine3.14

RUN mkdir -p /nodejs
WORKDIR /nodejs

COPY ./backend /nodejs
RUN npm install
EXPOSE 8080
CMD ["npm","start"]