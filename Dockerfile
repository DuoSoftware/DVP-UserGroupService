FROM node:10-alpine
WORKDIR /usr/local/src/usergroupservice
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 9003
CMD [ "node", "app.js" ]
