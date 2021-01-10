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
### 서버 모니터링 설정 정보
`filebeat-nginx-config`

```tsx
filebeat.prospectors:
- type: log
  enabled: true
  paths:
    - /opt/nginx/logs/access.log
  fields:
    server_name: dashboard-server
    log_type: nginx_access
  
- type: log
  enabeld: true
  paths:
    - /opt/nginx/logs/error.log
  fields:
    server_name: dashboard-server
    log_type: nginx_error

# output.elasticsearch:

output.logstash:
  hosts: ["LOGSTASH_URL"]
```
`metricbeat-config`

```tsx
# ----------------------- Elasticsearch output -----------------------
output.elasticsearch:
  # Array of hosts to connect to.
  hosts: ["HOST_URL:9200"]
  index: "%{[fileds.log_type]}-%{[agent.version]}-%{+yyyy.MM.dd}"

setup.template:
  name: "ec2-monitoring"
  pattern: 'metricbeat-*
  enabled: false

# ----------------------- Logstash output -----------------------
output.logstash:
  # The Logstash hosts
  hosts: ["HOST_URL:5044"]
```

`metricbeat-aws-module-config`

```tsx
- module: aws
  period: 60s
  metricsets:
    - "ec2"
  regions:
    - ap-northeast-2
  access_key_id: '${AWS_ACCESS_KEY_ID}'
  secret_access_key: '${AWS_SECRET_ACCESS_KEY}'
  metricsets:
    - cloudwatch
  metrics:
    - namespace: CWAgent
      tags.resource_type_filter: mem_used_percent
      tags.resource_type_filter: swap_used_percent
    - namespace: CPUtilization
      statistic: ["Average"]
      dimensions:
        - name: InstanceId
          value: ${FRONT-EC2_INSTANCE_ID}
        - name: InstanceId
          value: ${BACKEND-EC2_INSTANCE_ID}
    access_key_id: '${AWS_ACCESS_KEY_ID}'
    secret_access_key: '${AWS_SECRET_ACCESS_KEY}'
```

`logstash-config`

```tsx
input {
  hosts {
    host => "aws public ip",
    port => 5044
  }
}

filter {
  if [fileds][server_name] == "dashboard-server" {
    if [fileds][log_type] == "nginx_access" {
      grok {
        match => { "message" => {"%{IPORHOST: [nginx][access][remote_ip]} - %{DATA: [nginx][access][user_name]}"}}
        remote_filed => "message"
      }
      mutate {
        add_filed => { "read_timestamp" => "%{@timestamp}" } 
      }
      date {
        match => { "[nginx][access][time]", "dd/MMM/YYYY:M:m:s z" }
        remove_field => "[nginx][access][time]"
      }
      useragent {
        source => "[nginx][access][agent]"
        target => "[nginx][access][user_agent]"
        remove_field => "[nginx][access][agent]"
      }
      geoip {
        source => "[nginx][access][remote_ip]"
        target => "[nginx][access][geoip]"
      }
    }
  }
}

output {
  if ([fileds][server_name] == "dashboard-server" and [fileds][log_type] == "nginx_access") {
    elasticsearch {
      hosts => ["152.168.0.10:9200"]
      index => "dashboard-access-log-%{+YYYY.MM.dd}"
    }
  }
  else {
    elasticsearch {
      hosts => ["152.168.0.10:9200"]
      index => "dashboard-error-log-%{+YYYY.MM.dd}"
    }
  }
}
```

### 엘라스틱서치에 색인된 예시 데이터

![elasticserach-indexed-log](https://user-images.githubusercontent.com/29710785/104126219-c598dd80-539e-11eb-94e8-749b523062c3.png)
### 전체 시스템 구성도
![전체 시스템 구성도](https://user-images.githubusercontent.com/29710785/104126977-d9464300-53a2-11eb-83c4-840ef3408b2c.png)
### 시스템 아키텍처
![시스템 아키텍처](https://user-images.githubusercontent.com/29710785/104126573-a438f100-53a0-11eb-86e4-959a352f5058.png)



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

