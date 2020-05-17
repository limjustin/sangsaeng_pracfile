Meteor.startup(function() {
  // code to run on server at startup
  if (!Meteor.users.findOne({username: 'admin'})) {
    //유저(관리자) 생성 예
    Accounts.createUser({
      username: 'admin',
      email: 'admin@admin.admin',
      password: 'admin!24',
      profile: {
        //이름, 주소 등 원하는 사용자 데이터
        type: 'admin',
        name: '관리자'
      }
    });
  }
});

const request = require('request');
const cheerio = require('cheerio');

request.get('https://www.lexico.com/en/definition/car', function (err, httpResponse, html) {
  const $ = cheerio.load(html) // 이거 필수임
  // console.log(html)
  // console.log($('div.entryGroup').html())

  console.log($('div.entryWrapper section ul li div p span.ind').html()) // 원하는 단어 뽑아오는 코드

})