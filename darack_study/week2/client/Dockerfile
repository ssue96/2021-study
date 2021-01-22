#nginx가 제공을 해줄 빌드 파일들을 생성하는 코드
FROM node:12

RUN mkdir -p /app
WORKDIR /app 

COPY ./package*.json ./ 

COPY . . 
#RUN npm run build

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
 
