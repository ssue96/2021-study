# 2021-study
나만 볼거야..  
## 1주차 과제  
```  
1. ec2에 도커 설치
2. 도커이미지를 생성 (Express 이용, GET으로 a, b 변수 받아서 SUM 해서 리턴하는 매우 간단한 애플리케이션)
3. 생성한 도커이미지를 docker hub에 로드
4. docker hub에서 만든 이미지 pull & run
5. web browser에 express에 GET요청 때려서 결과 출력되는 것을 캡쳐해서 보낸다
```  
### Express 설치  
https://expressjs.com/ko/starter/installing.html  

### Docker  
https://subicura.com/2017/01/19/docker-guide-for-beginners-1.html  

### Dockerfile 생성    
https://nodejs.org/ko/docs/guides/nodejs-docker-webapp/  
https://programmingsummaries.tistory.com/392  



## 2주차 과제(test 디렉터리)
```
1. nginx docker로 설치
2. fe 자유롭게 알아서 docker로 구성(react)
3. 3개 모두 docker로 돌리고 Nginx에서 URL Path따라서 API서버 or FE서버로 요청 돌려보기
```
![KakaoTalk_20210113_201708738](https://user-images.githubusercontent.com/16449657/104895282-0608e480-59b9-11eb-8a44-cd66d811ecb6.png)  

### React  
* react 설치   
https://im-developer.tistory.com/164  

* react ↔ express data 전송  
https://www.yeolceo.com/18  
https://velog.io/@taeung/Express%EC%99%80-React-%EC%97%B0%EB%8F%99%ED%95%98%EA%B8%B0Express%EC%97%90%EC%84%9C-React%EB%A1%9C-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EB%B3%B4%EB%82%B4%EA%B8%B0  
(리알못이라 만난 에러..)  
https://britny-no.tistory.com/27  

### Nginx reverse proxy  
https://www.thepolyglotdeveloper.com/2017/03/nginx-reverse-proxy-containerized-docker-applications/  
https://medium.com/sjk5766/docker-compose%EB%A1%9C-localhost-nginx-%EB%A6%AC%EB%B2%84%EC%8A%A4-%ED%94%84%EB%A1%9D%EC%8B%9C-%EA%B5%AC%EC%84%B1-8214d41a94fc  

### 주의  
![image](https://user-images.githubusercontent.com/16449657/105454340-0d840280-5cc5-11eb-8ec3-9034769ac2b1.png)
* nginx에서 express로 요청하는 것  (react → express X)  
* cors(크로스도메인) 해결하는 방법  
https://liante0904.tistory.com/171  
  1. Express에서 설정 : **cors** middleware 사용해서 express에서 받을 때 처리  
  https://firework-ham.tistory.com/70
  2. React에서 설정 : **proxy** 설정(package.json proxy부분 설정 or http-proxy-middleware middleware사용)해서 react에서 보낼 때 주소 변경하여 처리  
  https://hoons-up.tistory.com/m/26  
  
* nginx.conf location 설정  
  react(/) express(/result) : X  
  react(/) express(/api/result) : base path 자체를 다르게 설정하여 location에서 express쪽을 /api 이렇게 설정해야함  
  
## 3주차 과제  
```
1. 도커 네트워크를 구성  
2. Client, Server, Proxy 컨테이너를 생성한 네트워크에서 실행  
```

```
//bridge network 생성  
$ docker network create --driver bridge study_network  

// 생성 확인  
$ docker network ls  

//생성한 네트워크에서 컨테이너 실행(docker compose쓰면 자동으로 네트워크 만들어주는 듯)   
$ docker run -p 5000:5000 --net=study_network --name server ssue96/darack-study:server
$ docker run -p 3000:3000 --net=study_network --name clienty ssue96/darack-study:client
$ docker run -p 8080:8080 --net=study_network --name proxy ssue96/darack-study:proxy
```

### Docker Network  
https://dreamholic.tistory.com/95   
https://hoony-gunputer.tistory.com/entry/docker-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC  

### 무료 도메인 구매  
https://my.freenom.com/  
https://coyagi.tistory.com/entry/%EB%AC%B4%EB%A3%8C-%EB%8F%84%EB%A9%94%EC%9D%B8-%EA%B0%84%EB%8B%A8%ED%95%9C-%EB%8F%84%EB%A9%94%EC%9D%B8-%EB%B0%9C%EA%B8%89-freenom  

