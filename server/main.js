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
Future = Npm.require('fibers/future');

Meteor.methods({

  // 'callingServer': function(){
  //
  //   request.get('https://www.lexico.com/en/definition/car', Meteor.bindEnvironment (function(err, response, html) {
  //     const $ = cheerio.load(html); // 이거 필수임
  //     const meaning = $('div.entryWrapper section ul li div p span.ind').html();
  //     // console.log("Server is live");
  //     console.log(meaning);
  //   }))
  //
  // },

  'future':function(args) {
    // console.log('future start:'+Date.now());
    const fut = new Future();
    const newarg = args;

    Meteor.setTimeout(function(argumentString) {
      // console.log('callback end:'+Date.now());
      var link = 'https://www.lexico.com/en/definition/' + newarg;
      request.get(link, function (err, response, html) {
        const $ = cheerio.load(html);
        const meaning = $('div.entryWrapper section ul li div p span.ind').html();
        console.log(link);
        console.log(newarg);
        console.log(meaning);
        fut.return(meaning);
      })
      // fut.return('yahoo:'+Date.now());
    }, 1000);

    // console.log('future end:'+Date.now());
    return fut.wait();
  }

});
