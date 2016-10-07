var conf = require('../../nightwatch.conf.js');

testmessage ="this is case 1 test";

module.exports= {
  'test user 2': function (browser) {
    browser
      .login('hob','hob')
      .send_message(testmessage)
      .add_favorite();
  }
};

