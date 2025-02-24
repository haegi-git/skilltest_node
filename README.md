<p>백엔드로 라라벨 사용해보려했으나 시간상의 문제로 불가능할 것을 감지하고 express 시작</p>

<h1>02-23 오전 1:30</h1>
<p> 기초 Express, sqlite3 연동해보며 테스트 진행중</p>
<p>ㄴ 오전 2시8분 조금 더 편해보이는 Sequelize 사용한 방법으로 재시도 후 post, get 요청 성공</p>

<h1>02-24 오전 1시33분</h1>
<p>로그인은 유저의 닉네임과 태그로만 작동하게끔 구현 - 닉네임과 태그가 이미 있는 거라면 409에러로 통과 후 로그인처럼 만듬</p>
<p>해당 로그인의 id값으로 id값에 일치하는 todo 불러옴</p>
<p>ㄴ 1시 59분 새로운 유저 생성시 유저 id값 받아올 수 있게끔 만들어두고 로그인 마무리</p>

<h1>02-24 오후 6시37분</h1>
<p>api 정리</p>
<ul>
  <li>/todo/:userId - get 해당 유저 Id값에 맞는 todolist 불러옴</li>
  <li>/todo - post 글 쓰기 기능</li>
  <li>/todo - delete 글 삭제 기능</li>
  <li>/todo - put 글 업데이트 기능</li>
<br/>
  <li>/:userId/:search - get 검색 기능 params로 userId값 search input값 받아온 뒤 Todos 데이터에서 뽑아옴</li>
<br/>
  <li>/user - post 유저 생성 기능, (로그인 로직 대신 닉네임과 태그를 받아와 저장 후 중복확인으로 409에러로 접속시켜버림)</li>
</ul>
