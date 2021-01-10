# 졸업작품 : 대기전력 차단 시스템

## 팀원 구성
정재철
  - Vue.js, Node.js를 이용한 웹 대시보드 인터페이스 구현
  - Elastic stack(Elasticsearch, logstash, kibana, beats...)를 이용해 관리자(개발자)를 위한 서버 모니터링 시스템 구성

윤기선
  - zigbee & arduino를 이용한 사용 중인 콘센트로부터의 실시간 전력 데이터 수집

## 프로젝트 개요
자취를 하던 자취방의 누적 전기세를 확인하고 원격으로 On / Off 등의 제어를 할 수 있는 제품이 있으면 좋겠다는 생각으로 만든 졸업작품입니다.

## 프로젝트 기능
### 대시보드 전력 데이터 지표
  - 실시간 사용량
  - 이번 달 누적 전기요금
  - 일일 누적 전기 사용량(전일 기준)
  - 주간 요일 별 평균 사용량
  - 월간 요일 별 평균 사용량
  - 각 제품 별 전체 사용량
  - 제품이 연결된 방의 형광등 ON/OFF 기능
  - 원격 ON/OFF 기능
    
### 서버 모니터링
  - 키바나에 접속해 현재 운영중인 서버의 메타 정보에 관한 지표들을 볼 수 있다.
  
## Frontend Build Setup
```
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

## Backend Build Setup
```
# install dependencies
$ cd /back
$ npm install

# serve with hot reload at localhost:4000
$ npm run dev

# build for production and launch server
$ npm start
```

### 주의
작품에 사용된 각 모듈들과 센서들은 학교에서 대여한 물품으로 모두 반납해 센서 데이터를 수집하는 부분은 재현이 불가능

