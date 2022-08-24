#  원티드 프리온보딩 4차 선발과제 제출 | wanted_pre_onboarding
`nodejs`
## 📌 소개
기업의 채용공고 관리 및 사용자의 공고 조회, 입사지원 API 서비스입니다.   

### 🌱 폴더 구조
코드 가독성을 위해 폴더 구조는 실제 데이터베이스 정보를 담은 `config`와 함께, 3계층으로 분해하였습니다.
  
**wanted_pre_onboarding**   
**├──config**    
**├── models** ------------- 데이터 관련 코드   
**├── routes** ------------- Routing 관련 코드   
**└── services** ----------- 서비스 관련 코드   

### 🌱 DB 관계
![aa](https://user-images.githubusercontent.com/50348197/186301871-c7714b96-58ca-407a-afff-0e59a6d243de.JPG)
각 모델간의 관계는 위 사진과 같습니다.  
한 채용공고(Recruits)는 여러 명의 입사지원한 사용자(Users)를 가질 수 있고, 한 회사(Companys)는 여러 개의 채용공고(Recruits)를 올릴 수 있게 설정하였습니다.  

### 🌱 사용 기술
- `Express.js`
- `PostgreSQL` (RDBMS)
- `sequelize` (ORM) 


## 📌 API 안내
[POSTMAN documantation](https://documenter.getpostman.com/view/19606295/VUqrPcgq)
### [채용공고 등록] /recruit/new
> `POST`  **localhost:3001/recruit/new**
#### 🚩 request **[body]**
```json
{
    "company_id":1,
    "position":"백엔드 개발자",
    "reward": 3000,
    "skill":"python",
    "content":"함께 성장해나갈 파이썬 백엔드 개발자를 구하고 있습니다!"
}
```
#### 🚩 response
```json
{
    "newRecruit": {
        "recruit_id": 1,
        "company_id": 1,
        "position": "백엔드 개발자",
        "reward": 3000,
        "skill": "python",
        "content": "함께 성장해나갈 파이썬 백엔드 개발자를 구하고 있습니다!"
    }
}
```

### [채용공고 수정] /recruit/modify
> `POST`  **localhost:3001/recruit/modify**
#### 🚩 request **[body]**
```json
{
    "recruit_id":1,
    "position":"프론트엔드 개발자",
    "reward": 3000,
    "skill":"python",
    "content":"함께 성장해나갈 파이썬 프론트엔드 개발자를 구하고 있습니다!"
}
```

🎯 `company_id`는 수정 불가능
#### 🚩 response
```json
{
    "change": {
        "recruit_id": 1,
        "position": "프론트엔드 개발자",
        "reward": 3000,
        "skill": "python",
        "content": "함께 성장해나갈 파이썬 프론트엔드 개발자를 구하고 있습니다!",
        "company_id": 1
    }
}
```
**🎯 만약 존재하지 않는 채용공고 id를 입력했다면???**
```json
{
    "message": "채용공고 정보를 확인해 주세요"
}
```

### [채용공고 삭제] /recruit/delelte
> `POST`  **localhost:3001/recruit/delelte**
#### 🚩 request
``` json
{
    "recruit_id":1
}
```
#### 🚩 response
```json
{
    "message": "deleted 1 "
}
```
**🎯 만약 존재하지 않는 채용공고 id를 입력했다면???**
```json
{
    "message": "채용공고 정보를 확인해 주세요"
}
```

### [모든 채용공고 조회] /apply/all
> `GET`  **localhost:3001/apply/all**
#### 🚩 request
``` 
none 
```
#### 🚩 response
```json
{
    "allRecruit": [
        {
            "recruit_id": 1,
            "position": "백엔드 개발자",
            "reward": 3000,
            "skill": "python",
            "company_id": 1,
            "company_name": "원티드",
            "country": "대한민국",
            "city": "강남구"
        },
        {
            "recruit_id": 2,
            "position": "백엔드 개발자",
            "reward": 3000,
            "skill": "nodejs",
            "company_id": 2,
            "company_name": "버터와플",
            "country": "크라운",
            "city": "귀족동"
        }
    ]
}
```
🎯 회사 정보까지 함께 표출, 채용공고 상세는 보이지 않습니다.

### [특정 채용공고 상세보기] /apply/:id/detail
> `GET`  **localhost:3001/apply/:id/detail**
#### 🚩 request [PARAMS]
```
id : 2 ----> recruit_id 
```
#### 🚩 response
``` json 
{
    "theRecruit": {
        "recruit_id": 2,
        "position": "프론트엔드 개발자",
        "reward": 3000,
        "skill": "html",
        "content": "함께 성장해나갈 프론트엔드 개발자를 구하고 있습니다!",
        "company_id": 2,
        "company_name": "원티드",
        "country": "대한민국",
        "city": "강남구",
        "another_recruit": [
            1,
            2,
            3
        ]
    }
}
```
🎯 선택한 채용공고의 상세 내용과, 동일 회사의 채용공고id 함께 출력  

**🎯 만약 존재하지 않는 채용공고 id를 입력했다면???**
```json
{
    "message": "채용공고 정보를 확인해주세요"
}
```
### [입사 지원] /apply/:id/gogo
> `GET`  **localhost:3001/apply/:id/gogo**
#### 🚩 request
**[PARAMS]**
```
id : 1 ----> recruit_id 
```
**[body]**
```json
{
    "user_id" : 1
}
```
#### 🚩 response
```json
{
    "message": "당신의 도전을 응원합니다."
}
```
**🎯 만약 같은 사용자가 입사지원을 또 한다면???**
```json
{
    "message": "입사 지원은 한번만 가능합니다."
}
```


