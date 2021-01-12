FROM node:10

RUN mkdir -p /app

WORKDIR /app

ADD . /app
#COPY package*.json ./

RUN npm install

#COPY . .

EXPOSE 3000

#CMD ["node", "app.js"]
CMD ["npm", "start"]
