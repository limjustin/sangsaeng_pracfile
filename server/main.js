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
// Future = Npm.require('fibers/future'); // future fibers 보류
const request = require('request');
const cheerio = require('cheerio');

// request.get('https://www.lexico.com/en/definition/car', function (err, httpResponse, html) {
//   const $ = cheerio.load(html) // 이거 필수임
//   // console.log(html)
//   // console.log($('div.entryGroup').html())
//
//   console.log($('div.entryWrapper section ul li div p span.ind').html()) // 원하는 단어 뽑아오는 코드
//
// })

Meteor.methods({
  'callingServer': function(){
    // console.log("Hello world!!");
    // // Calling Server


    request.get('https://www.lexico.com/en/definition/car', Meteor.bindEnvironment (function(err, response, html) {
      const $ = cheerio.load(html); // 이거 필수임
      const meaning = $('div.entryWrapper section ul li div p span.ind').html();
      console.log("Server is live");
      console.log(meaning);
      return Promise.resolve(meaning); // 이거 잘 안됨
      // return meaning;

      // 확인용 콘솔
      // console.log($('div.entryWrapper section ul li div p span.ind').html()) // 원하는 단어 뽑아오는 코드

      // return $('div.entryWrapper section ul li div p span.ind').html();

      // // 단어 저장 DB
      // DB_WORDS.insert({
      //   word: 'car',
      //   meaning: meaning
      // })

      // // Meteor.call() 에서는 return 안 되나 보네,,,
      // var meaning = $('div.entryWrapper section ul li div p span.ind').html();
      // return meaning;
    }))

    // var future = new Future();
    // var url = 'https://www.lexico.com/en/definition/car';
    //
    // HTTP.get(url,{},function (error,result) {
    //     if(!error) {
    //       future.return("hihi");
    //     } else {
    //       future.return(error);
    //     }
    // });
    //
    // return future.wait();
  },
});