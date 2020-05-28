const request = require('request'); // request
const cheerio = require('cheerio'); // cheerio
const sanitizeHtml = require('sanitize-html');
Future = Npm.require('fibers/future'); // fibers/future

Meteor.methods({

  'word_searching':function(link_article) {

    const fut = new Future(); // Future 객체 생성
    const link = link_article; // 받아온 인자 값을 word 변수에 저장

    Meteor.setTimeout(function() {
      // var link = 'http://aha-dic.com/View.asp?word=' + word;
      request.get(link, function (err, response, html) {
        const $ = cheerio.load(html,{decodeEntities: true});
        article = sanitizeHtml($('div.view_article div div div span').html(),{ parser: {decodeEntities: true}});
        console.log(article)
        // const wordmeaning =new Array();
        // wordmeaning[0] = sanitizeHtml($('ul li').html(),{ parser: {decodeEntities: true}});
        // wordmeaning[1] = sanitizeHtml($('fieldset.panel span').html(), { parser: {decodeEntities: true}});

        // console.log(link); // 새로운 링크 잘 연결 되었는가??
        // console.log(word); // 인자 값 잘 가져왔는가??
        // console.log(wordmeaning[0]);
        // console.log(wordmeaning[1]);// 뜻이 잘 나오는가??
        fut.return(article);// client로 값 return
      })
    }, 1000);
    return fut.wait(); // async? sync?

  }
});