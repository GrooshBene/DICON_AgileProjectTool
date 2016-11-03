# DICON_Cool6
2016 Digital Contest Web AgileProject Tool

Cool6 API 문서
==========
이 문서에서는 Cool6의 웹 프론트엔드를 위해 제공되는 서버에 대한 API에 대해 다룹니다.

서버 구동
=====

    DICON_AgileProjectTool 디렉토리 기준으로 설명합니다.
    
    node www/bin

통신 방법
======

클라이언트->서버
------
클라이언트와 서버가 기본적으로 통신하는데는 HTTP 프로토콜을 사용하며, html 상의 폼을 이용한 GET/POST 메서드를 이용합니다.

서버->클라이언트
-------
서버가 클라이언트에게 처리된 정보를 보낼때는 JSON을 사용해 직렬화 된 JSON Object를 전송합니다.

클라이언트에서의 처리는 어떻게 할 것인지 직접 연락 바랍니다.

클라이언트는 모든 요청에 있어 session 내부에 아이디값을 포함하고 있어야 합니다.

인증방법
------
서비스 내부에서의 인증 방법에 대해 설명합니다.

###Facebook Login
[서버 API](https://github.com/drudge/passport-facebook)

클라이언트 상의 `/auth/facebook` 으로 연결된 버튼을 눌러 페이스북 로그인이 완료 되면,

서버는 그 값을 초기 1회 로그인에 한하여 데이터베이스에 새로이 저장하고, 그 이후 인증에 필요한 아이디값을 세션에 저장하게 됩니다.


서버는 클라이언트에서 요청이 들어올 때마다 세션에 저장된 아이디값이 유효한지를 판별하고 그에 따른 대답을 보냅니다.

API인증
----

Cool6 Backend의 모든 API는 로그인을 제외하고 세션에 저장되어있는 아이디값의 유효성을 기준으로 작동합니다.

세션에는 반드시 로그인했을때 id값이 저장되어 있어야 하며, 이것이 유효하지 않을 시에는 HTTP 상태코드를 다르게 송출하게됩니다.


Database 스키마
=====
여기서는 Cool6에 사용되는 Database 스키마를 다룹니다.

이 Database 스키마는 내부적으로도 사용되며, 외부에 공개된 API에서도 그대로 사용됩니다.

User
-----
사용자 하나를 의미합니다.

###_id
String, 사용자의 고유 번호입니다.

### email
String, 사용자의 로그인에 사용되는 이메일 주소입니다.

### password
String, 사용자의 로그인에 사용되는 비밀번호입니다.
로그인이 완료된 후 보내지는 JSON에는 나타나지 않습니다.

### profile
String(JSON 일수도 있는데), 사용자의 프로필 사진에 대한 URL입니다.

### name
String, 사용자의 이름입니다.

### projects
Array, 속해있는 프로젝트의 id값만을 담은 배열입니다.

이는 project 스키마에 대해 population 되어 Array Of Object 형태로 보내지게 됩니다. 하지만 데이터베이스 상에는 Array Of String 형태로 저장됩니다.


Project
------
프로젝트 하나를 의미합니다.

###_id
String, 프로젝트의 고유 번호입니다.

### name
String, 프로젝트의 이름입니다.

### invite_link
String, 프로젝트에 초대하기 위해 공유되는 링크입니다.


ProjectUser
----
프로젝트에 귀속된 UserSchema 하나를 의미합니다.

###_id
String, 프로젝트에 귀속된 유저의 고유 번호입니다.

###_projectId
String, 유저가 귀속된 프로젝트의 고유 번호입니다.

### profile
String, 유저의 프로필 사진에 대한 경로입니다.


Scrum
-----
프로젝트에서 생성된 Scrum에 대한 스키마입니다.

### _id
String, Scrum에 귀속된 고유 식별번호입니다.

### maker
String, Scrum Maker

### title
String, Scrum Title

### date
Date, Date of Scrum Maded

### due
Date, Scrum Deadline

### important
Number, Amounts of Importance

### comment
String, Scrum Comment, Saves ID Of Memo

### project
String, Project id of Scrum

### status
Number, Status of Scrum
    1 - To-Do
    2 - Doing
    3 - Done


Memo
----
Scrum에 부가적으로 달리는 메모에 대한 스키마입니다.

### _id
String, 메모의 고유 식별번호입니다.

### maker
String, 메모를 쓴 사람입니다.

### comment
String, 메모의 내용입니다.

API 레퍼런스
====

오류 처리
-----
오류가 발생했는지는 반환되는 HTTP상태코드를 이용하여 확인할 수 있습니다.

- 200 - 성공적으로 처리함
- 400 - 입력받은 데이터가 유효하지 않음
- 401 - Access Denied
- 500 - 내부 서버 오류

로그인
----

### /auth/facebook - GET
Passport-Facebook Strategy를 이용하여 페이스북 계정을 통해 로그인합니다.

자세한 것은 [fb 로그인 API](https://github.com/drudge/passport-facebook)를 참조해 주세요.

### /auth/local/login - POST
로컬 데이터베이스를 이용하여 로그인합니다.

#### 입력
- email - 사용자의 회원가입 시 입력했던 이메일 주소입니다.
- password - 사용자의 회원가입 시 입력했던 비밀번호입니다.

#### 출력

##### 로그인 성공
HTTP Status 200, Express Session user_id has _id Value

##### 로그인 실패
- 접근이 제한됨 또는 사용자가 존재하지 않음 - 400
- 회원정보가 유효하지 않음 - 401
- 내부 서버 오류 - 500

### /auth/local/signin - POST
로컬 데이터베이스를 이용하여 회원가입합니다.

#### 입력
- email - 사용자의 로그인에 사용할 이메일 주소입니다.
- password - 사용자의 로그인에 사용할 비밀번호입니다.
- name - 사용자의 이름입니다.

#### 출력

##### 로그인 성공
HTTP Status 200

##### 로그인 실패
- 회원정보가 유효하지 않음 - 401
- 내부 서버 오류 - 500

### /user/info - POST
세션에 저장된 유저 _id를 가져와 정보를 조회합니다.

#### 입력
- session._id - 세션의 사용자 고유 번호입니다.

#### 출력

##### 로그인 성공
HTTP Status 200, User Schema

##### 조회 실패
따로 출력하지 않음.


프로젝트
----

### /project/user/list - GET
현재 속해있는 프로젝트 리스트를 모두 가져옵니다.

#### 입력
- _id - 세션에 저장되어 있는 사용자의 아이디 정보입니다.

#### 출력

#### 조회 성공
HTTP Status 200, Project Id Array of User

#### 조회 실패
HTTP Status 401

### /project/add - GET
새 프로젝트를 생성합니다.

#### 입력
- name - 프로젝트의 이름입니다.

#### 출력

##### 생성 성공
HTTP Status 200

##### 생성 실패
- 권한 없음 - HTTP Status 401
- 내부 DB 에러 - HTTP Status 500

### /project/profile/edit - POST
프로젝트에 해당하는 유저스키마인 ProjectUser Schema의 정보를 수정합니다.

#### 입력
- _id - 세션에 저장되어 있는 사용자의 아이디 정보입니다.
- name - 사용자의 이름입니다.
- profile - 사용자의 프로필 사진입니다. req.file 프로토콜을 이용하여 입력받습니다.

#### 출력

##### 업데이트 성공
HTTP Status 200, Update Result

##### 업데이트 실패
- 권한 없음 - HTTP Status 401
- 입력 받은 값이 유효하지 않음 - HTTP Status 400
- 내부 DB 에러 - HTTP Status 500

### /project/invite - POST

프로젝트에 유저를 초대하는 링크를 발급받습니다.

#### 입력
별다른 입력은 받지 않습니다.

#### 출력

##### 발급 성공
HTTP Status 200, Invitation Link

##### 발급 실패
- 내부 DB 에러 - HTTP Status 500
- 권한 없음 - HTTP Status 401

### /project/join/(project_id) - GET

프로젝트 초대 링크를 통해 참여합니다.

#### 입력
- project_id : 참여할 대상 프로젝트의 고유 식별번호입니다. URL에 있는 서브 도메인 형식으로 입력받습니다.
- profile : file 프로토콜을 이용해 입력합니다. 사용자의 프로필사진입니다.
- name : 프로젝트 내에서 사용할 사용자의 이름입니다.

#### 출력

##### 가입 성공
HTTP Status 200, ProjectUser Schema

##### 가입 실패
- URL이 유효하지 않음 - HTTP Status 400
- 내부 DB 에러 - HTTP Status 500
- 권한 없음 - HTTP Status 401

채팅
-----
### /chat - GET

프로젝트 내의 채팅방에 참가합니다.

#### 입력
- id - 프로젝트의 고유 식별번호입니다.
- room - 방의 종류입니다. 종류는 기본적으로 다음과 같이 구성되어 있습니다. 각 방에 맞는 영어 명칭을 생각해주시기 바랍니다.
	1. 공지사항
	2. 기획
	3. 디자인
	4. 개발
	5. github log

#### 출력

##### 접속 성공
소켓으로 연결됩니다.

##### 접속 실패
- 권한 없음 - HTTP Status 401
- 방이 존재하지 않음 - HTTP Status 400
- 프로젝트가 존재하지 않음 - HTTP Status 400
- 내부 서버 에러 - HTTP Status 500

### /chat/user - GET
프로젝트 내의 유저와 1대1 채팅을 합니다.

#### 입력
- id - 프로젝트의 고유 식별번호입니다.
- user_id - 프로젝트에 속해있는 유저의 고유 식별번호입니다.

#### 출력

##### 접속 성공
소켓으로 연결됩니다.

##### 접속 실패
- 권한 없음 - HTTP Status 401
- 유저가 존재하지 않음 - HTTP Status 400
- 프로젝트가 존재하지 않음 - HTTP Status 400
- 내부 서버 에러 - HTTP Status 500

### /chat/find - GET
채팅 내에서 키워드에 따라 검색합니다.

#### 입력
- id - 프로젝트의 고유 식별번호입니다.
- keyword - 프로젝트에서 검색할 키워드입니다.

#### 출력

##### 검색 성공
Search Result Object

##### 검색 실패
- 권한 없음 - HTTP Status 401
- 프로젝트가 존재하지 않음 - HTTP Status 400
- 내부 서버 에러 - HTTP Status 500


스크럼
---

### /scrum/project/:project_id

프로젝트에 해당하는 스크럼을 모두 가져옵니다.

#### 입력

- project_id : 프로젝트의 고유 식별번호입니다.

#### 출력

Scrum DB Array


### /scrum/add

스크럼을 추가합니다.

#### 입력

- title : Scrum Title

- due : Scrum Deadline

- important : Importance of Scrum

- comment : Scrum Comment

- project : Project Of Scrum

#### 출력

Scrum Schema


### /scrum/memo/add

스크럼에 대한 메모를 추가합니다.

#### 입력

- comment : Memo Comment

#### 출력

MemoSchema
