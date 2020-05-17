FlowRouter.template('/ex_album', 'ex_album');
//
// const cheerio = require('cheerio');
// const $ = cheerio.load('<ul id="fruits"> <li class="apple">AppleTexts</li> <li class="orange">Orange</li> <li class="pear1">Pear</li> </ul>');
//
// var a = $('.apple', '#fruits').text()
//
// var b = $('ul .pear1').attr('class') // class는 .
//
// var c = $('ul').html()
//
// console.log(a)
// console.log(b)
// console.log(c)

// const cors = require('cors');
// const express = require('express')
// const router = express.Router();
// //
// router.get('/',cors(), (req, res) => { res.writeHead(200, {'Access-Control-Allow-Origin' : '*'}); });
//
// // 이거 왜 안됌
// const request = require('request');
// const cheerio = require('cheerio');
//
// request.get('https://www.naver.com', function (err, httpResponse, html) {
//     console.log(html)
// })
