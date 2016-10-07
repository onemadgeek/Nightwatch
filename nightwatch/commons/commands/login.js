exports.command = function(username, password) {
    this
      .url('localhost:8000')
      .windowMaximize('current')
      .waitForElementVisible('body')
      .assert.containsText('body', 'Login')
      .clearValue('#username')
      .setValue('#username', username)
      .setValue('#password', password)
      .click('button[type=submit]')
      .assert.containsText('body', 'Lobby')
      return this;
};