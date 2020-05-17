FlowRouter.template('/', 'main');

Template.main.onRendered(function() {
  // 화면이 그려지고 난 후 제일 먼저 수행
  Session.set('count', 0);
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

  word: function (event) {
    // event.preventDefault();
    // console.log(Meteor.call('callingServer'));
  }
});

Template.main.events({
  // 화면의 이벤트를 처리
  'click #btn-count': function(event) {
    // Session.set('count', Session.get('count')+1);

    // // 첫 번째 호출 방법
    // event.preventDefault();
    // Meteor.call('callingServer');
    // alert("nice")

    // // 두 번째 호출 방법 - Asynchronous call
    // Meteor.call('callingServer', function (error, result) {
    //   if(error) {
    //     alert('Error');
    //   } else{
    //     Session.set('data', result);
    //     console.log(Session.get('data'));
    //     // alert("The current time is" + result);
    //   }
    //
    // })

    // Synchronous Call
    const result = Meteor.call('callingServer');
    console.log("Hi" + result);

    // var clientResult = Meteor.apply('callingServer', [], {returnStubValue: true});
    // Session.set('result', clientResult);

  }

});