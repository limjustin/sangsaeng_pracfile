FlowRouter.template('/', 'main');

Template.main.onRendered(function() {
  // 화면이 그려지고 난 후 제일 먼저 수행
  Session.set('count', 0);
  Session.set('data', " ");
});

Template.main.helpers({
  // 화면에 데이터를 전달
  count: function() {
    var count = Session.get('count');
    if (!count) {
      return 'Click!';
    } else {
      return 'Count: ' + count;
    }
  },

  link: function () {
    return Session.get('data');
  }
});

Template.main.events({
  // 화면의 이벤트를 처리
  'click #btn-count': function(event) {
    // Session.set('count', Session.get('count')+1);
    var article_link = $('#inp-link').val(); // input 창에 입력된 단어 가져오기

    // callback 함수를 이용해서 Meteor.call() 호출
    Meteor.call('word_searching', article_link, function (error, result) {
      if(error) {
        alert('Error');
      } else{
        result = result.replace(/<br>/g, '');
        result = result.replace(/<br \/>/g, '');
        Session.set('data', result);
        console.log(Session.get('data'));
      }
    })

  }
});