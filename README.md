# DICON_Cool6
2016 Digital Contest Web AgileProject Tool

Cool6 API 문서
==========
이 문서에서는 Cool6의 웹 프론트엔드를 위해 제공되는 서버에 대한 API에 대해 다룹니다.

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


