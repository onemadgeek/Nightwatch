var conf = require('../../nightwatch.conf.js');

testmessage ="this is case 1 test";

module.exports= {
  'test user 1': function (browser) {
    browser
      .login('bob','bob')
      .send_message(testmessage)
      .add_favorite();
  }
};

