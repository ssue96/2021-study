# 2021-study
나만 볼거야..  
http://darack-hyesoo.ga/  

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
* react post url 설정 - 베이스 url로 post 하므로 http://ip:port/path 가 아닌 /path만 입력하면 됨  
  
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

## 4주차 과제  
![test](https://user-images.githubusercontent.com/16449657/105993469-d01add00-60e9-11eb-9e2e-f0b11abde3ce.jpg)
https://darack-hyesoo.ga/  
```
1. ALB 생성  
2. 무료도메인 Route 53 등록  
3. ACM SSL/TLS 인증서 발급  
4. ALB로 http → https 리다이렉팅 설정  
5. Nginx www → non-www 설정   
  ex) https://www.darack-hyesoo.ga 접속 → https://darack-hyesoo.ga으로 리다이렉팅  
```

### ALB vs NLB 차이  
* 로드밸런서 
  - 서버 Health Check, SSL(HTTPS) 지원, HA(High Availability, 고가용성) 지원  
  - 서비스간 라우팅, Health Check와 같은 서비스 간 통제 기능들이 애플리케이션에서 코드로 구현하는 것이 아닌 인프라 단에서 구현함으로서 각 서비스들을 관리하는데 훨씬 편리해지기 때문에 최근 유행하는 MSA(Micro Service Architecture)에서 LB는 필수  
* ALB  
  - (L7 계층)애플리케이션 계층에서 동작하는 로드밸런서
  - 유동 IP  
  -  SSL을 적용 가능  
  - path-based(경로 기반) 라우팅 지원(Context 기반 라우팅)  
* NLB  
  - (L4 계층)네트워크 계층에서 동작
  - 고정 IP 주소 지원
  - SSL 적용이 인프라 단에서 불가능하여 애플리케이션에서 따로 적용  
  - IP:Port 기반으로 라우팅   

### ALB 외부 도메인 연동  
https://tech.cloud.nongshim.co.kr/2018/10/16/%EC%B4%88%EB%B3%B4%EC%9E%90%EB%A5%BC-%EC%9C%84%ED%95%9C-aws-%EC%9B%B9%EA%B5%AC%EC%B6%95-8-%EB%AC%B4%EB%A3%8C-%EB%8F%84%EB%A9%94%EC%9D%B8%EC%9C%BC%EB%A1%9C-route-53-%EB%93%B1%EB%A1%9D-%EB%B0%8F-elb/  
https://twofootdog.tistory.com/29  

## 5주차 과제 
![test (1)](https://user-images.githubusercontent.com/16449657/106598936-c129a400-659b-11eb-8df7-338b881b94fd.jpg)  
```
1. cloudwatch+lambda로 ec2 중지/기동 scheduling 
2. Redis(docker)설치 후 API 서버 연동  
3. Jenkins(docker)설치 후 github 연동  
```

### cloudwatch+lambda로 ec2 중지/기동 scheduling  
https://aws.amazon.com/ko/premiumsupport/knowledge-center/start-stop-lambda-cloudwatch/  

### Redis(docker)설치 후 API 서버 연동   
- node ↔ redis 연동  
https://m.blog.naver.com/PostView.nhn?blogId=rnjsrldnd123&logNo=221566841338&proxyReferer=https:%2F%2Fwww.google.com%2F  

- redis docker  
https://gompro.postype.com/post/1735800  

*Parameters*  
*URL* : http://darack-hyesoo.ga/  
```
curl -X POST /api/result
```    
*RequestBody*  
```json
{
	"fnum" : "1",
	"snum" : "2"
}
```
*Response*  
```json
*Cached data*   
{
    "fnum": 1,
    "snum": "2",
    "state": Cached,
    "result": "3"
}
*Not cached data*  
{
    "fnum": 1,
    "snum": "2",
    "state": Not cached,
    "result": "3"
}

```  

### Redis vs Memcached  
In-Memory Cache 비교
* In-Memory computing
  - 데이터를 하드디스크가 아닌 메인 메모리에서 수행 
    연산을 위한 영역으로만 여겨졌던 메모리 영역을 대량의 데이터를 저장하여 처리할수 있는 공간으로 사용  
  https://jaenjoy.tistory.com/20  
* Cache - 연산된 값을 미리 저장(복사)해두는 임시 저장소  
  데이터의 읽기(Read) 성능을 개선시키기 위해 DB와 같은 영구 저장소로부터 로드된 데이터를 빠르게 읽어올 수 있는 Memory 영역에 저장해두는 방식
* Redis  
  - 다양한 자료구조를 지원 
  - 데이터 복구가 가능  
  - 다양한 Data Eviction 정책을 지원  
* Memcached  
  - 멀티스레드를 아키텍처를 지원  
  -  Redis에 비해 적은 메모리를 요구 
  
참고자료  
https://deveric.tistory.com/65  
https://chrisjune-13837.medium.com/redis-vs-memcached-10e796ddd717  

### Jenkins(docker)설치 후 github 연동  
https://gintrie.tistory.com/7  
https://waspro.tistory.com/447  
