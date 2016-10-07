exports.command = function(message) {
    this
      .assert.containsText('body', 'Lobby')
      .click('#roomlist > ul > li:nth-child(1) > a')
      .assert.containsText('body', 'Goto Lobby')
      .assert.containsText('body', 'Send')
      .setValue('#msg', message)
      .click('#chatForm > div > span')
      .assert.containsText('#message-box', message)
      return this;
};