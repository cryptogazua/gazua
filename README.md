# cryptogazua 웹서버

## 소개

```cryptogazua - 내가 쓴 글이 시세에 영향을 줄까?``` 프로젝트의 Dashboard를 위한 웹서버 입니다.

## node.js 및 관련 환경설치

* node.js 및 관련 모듈 설치
```
:~$ curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
:~$ sudo apt-get install -y nodejs
:~$ sudo npm install -g pm2
```

## cryptogazua - 내가 쓴 글이 시세에 영향을 줄까?

소스 저장소 : https://github.com/cryptogazua/crawl

## 의존성 관리

```
~/gazua$ npm install
```

## DB설정

```

~/gazua$ vi config.js
var config = {};
config.mysql = {
  connectionLimit : 100,
  host            : 'DB주소',
  user            : 'DB사용자',
  password        : 'DB비밀번호',
  database        : 'DB명'
}
module.exports = config;
```

## 실행

```
~/gazua$ pm2 start app.js
```
