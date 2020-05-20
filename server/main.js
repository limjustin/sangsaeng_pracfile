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

const request = require('request'); // request
const cheerio = require('cheerio'); // cheerio
Future = Npm.require('fibers/future'); // fibers/future

Meteor.methods({

  'word_searching':function(args) {

    const fut = new Future(); // Future 객체 생성
    const word = args; // 받아온 인자 값을 word 변수에 저장

    Meteor.setTimeout(function() {
      var link = 'https://www.lexico.com/en/definition/' + word;
      request.get(link, function (err, response, html) {
        const $ = cheerio.load(html); // 해당하는 사이트에 있는 모든 html 코드를 crawling
        const meaning = $('div.entryWrapper section ul li div p span.ind').html(); // 내가 원하는 부분만 찾아감
        console.log(link); // 새로운 링크 잘 연결 되었는가??
        console.log(word); // 인자 값 잘 가져왔는가??
        console.log(meaning); // 뜻이 잘 나오는가??
        fut.return(meaning); // client로 값 return
      })
    }, 1000);
    return fut.wait(); // async? sync?

  }

});
