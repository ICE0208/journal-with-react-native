![](https://capsule-render.vercel.app/api?type=waving&height=300&color=gradient&text=Journal%20with%20React%20Native&fontAlign=50&fontSize=60&animation=twinkling)

<div align="center">

<p align="center">
<a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.demolab.com?font=Fira+Code&pause=1000&center=true&vCenter=true&random=false&width=435&lines=Journal+with+React+Native" alt="Typing SVG" /></a>
  <p align="center">
    리액트 네이티브로 만든 애플 일기앱 클론코딩
    <br />
    <br />
    <a href="https://ice-journal-rn-app.netlify.app/">Web Demo</a>
    <br />
    <span>(IOS 기준으로 제작되었기 때문에, 웹 데모에서는 작동하지 않는 기능이 있습니다.)</span>
  </p>
</div>

## 개요

### 목적

`모바일 프로그래밍` 수업의 개인 프로젝트 과제를 위하여 제작하였습니다.

### 개발 기간

24.05.18 ~ 24.06.04  
[![wakatime](https://wakatime.com/badge/user/2c47d583-cacf-4ded-9209-07a4aff5bac1/project/9669011d-343b-4da4-90d3-033966c44d7a.svg)](https://wakatime.com/badge/user/2c47d583-cacf-4ded-9209-07a4aff5bac1/project/9669011d-343b-4da4-90d3-033966c44d7a)

### 주제 / 필수 조건

아래 3가지 필수 조건을 포함한 자유 주제의 과제입니다.

- [x] 컴포넌트 10개 이상 사용
- [x] 화면 3개 이상 사용
- [x] State, Props, Event 사용

## 기술 스택

![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Expo](https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Firebase](https://img.shields.io/badge/firebase-a08021?style=for-the-badge&logo=firebase&logoColor=ffcd34)

## 프로젝트 프리뷰

### 유저 로그인/회원가입

| <center>로그인 화면</center>                                                                                                | <center>회원가입 화면</center>                                                                                              | <center>메인 화면</center>                                                                                                  |
| --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/ICE0208/journal-with-react-native/assets/46257328/5d50a3d3-c6a9-4329-9f38-682814a76566"></img> | <img src="https://github.com/ICE0208/journal-with-react-native/assets/46257328/a93bfa82-bdf8-44fe-9768-aa225f049c8d"></img> | <img src="https://github.com/ICE0208/journal-with-react-native/assets/46257328/5b7d4011-6c96-45e0-8402-98da83853427"></img> |

### 일기 작성

| <center>일기 작성 화면</center>                                                                                             | <center>일기 작성 화면2</center>                                                                                            | <center>일기 작성 완료 상태</center>                                                                                        |
| --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/ICE0208/journal-with-react-native/assets/46257328/49b3390d-1abb-4c09-a29c-ae1c40313b76"></img> | <img src="https://github.com/ICE0208/journal-with-react-native/assets/46257328/853087cb-b2f4-4077-928d-65a18428dc72"></img> | <img src="https://github.com/ICE0208/journal-with-react-native/assets/46257328/937d4b79-8334-48bf-acbc-052c17e00118"></img> |

### 일기 수정/삭제

| <center>일기 더보기 버튼</center>                                                                                           | <center>일기 수정 화면</center>                                                                                             | <center>일기 삭제 확인</center>                                                                                             |
| --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/ICE0208/journal-with-react-native/assets/46257328/b9b84ee5-3192-4390-9395-e511460ebf08"></img> | <img src="https://github.com/ICE0208/journal-with-react-native/assets/46257328/4e9f37a0-f42b-430b-b0e7-751571cc2c18"></img> | <img src="https://github.com/ICE0208/journal-with-react-native/assets/46257328/db78a56b-73be-4695-80d4-88f2d80b81c6"></img> |

### 기타

| <center>긴 일기 펼치기</center>                                                                                             | <center>사진 전체 보기</center>                                                                                             | <center>유저 정보 화면</center>                                                                                             |
| --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/ICE0208/journal-with-react-native/assets/46257328/c7732b9f-e5b3-44d1-a1d6-231c19328ea2"></img> | <img src="https://github.com/ICE0208/journal-with-react-native/assets/46257328/4d2723bc-95d7-4cdd-b4d9-a9ccdef92e3a"></img> | <img src="https://github.com/ICE0208/journal-with-react-native/assets/46257328/4d248343-796b-4f28-90ee-5170dec08d41"></img> |

## 시연 영상

https://github.com/ICE0208/journal-with-react-native/assets/46257328/2a3f992f-43b6-4141-a14a-594f5ea1ad1e

## 직접 실행하기

### 사전 작업

1. npm 설치
2. 파이어베이스 프로젝트 생성

### 파이어베이스 세팅

1. Authentication의 이메일/비밀번호 활성화
2. Firestore Database 활성화

> 규칙을 아래와 같이 설정

```rules
rules_version = "2";

service cloud.firestore {
match /databases/{database}/documents {

    // 사용자의 메모에 대한 규칙 설정
    match /users/{userId}/memos/{memoId} {
        // 사용자가 자신의 메모에 대해 읽고 쓸 수 있음
        allow read, write: if request.auth != null && request.auth.uid == userId;
    }

  }
}
```

3. Storage 활성화

> 규칙을 아래와 같이 설정

```rules
rules_version = '2';

service firebase.storage {
  match /b/{bucket}/o {
    match /images/{imageId} {
      allow write: if request.auth != null;
      allow read, delete: if request.auth != null && request.auth.uid == resource.metadata.uid;
    }
  }
}
```

### 프로젝트 세팅

1. 레포지토리 클론

```bash
git clone https://github.com/ICE0208/journal-with-react-native
```

2. NPM 패키지 설치

```bash
npm install
```

3. 파이어베이스 코드 수정

> firebaseConfig.ts에 있는 firebaseConfig 객체를 본인의 파이버베이스 구성 내용으로 수정  
> `파이어베이스 프로젝트 설정 > 일반 > 내 앱` 에서 구성 내용 확인 가능

### 프로젝트 실행 및 확인

1. 실행

```bash
npm run start
```

2. 확인

> Expo App 혹은 Web을 이용하여 확인

(자세한 내용은 [[공식문서]](https://docs.expo.dev/more/expo-cli/)를 참고)
