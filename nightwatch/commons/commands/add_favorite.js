exports.command = function() {
    var self =this;
    this
      .assert.containsText('body', 'honey')
      .click('xpath', "//*[@id='dropdownMenu1']/div/p[text()='honey']", function(e){
          this.getText("#room-users > div > div.btn-group.open > ul > li:nth-child(1)", function(result) {
              console.log(result.value);
          })
          this.click('#room-users > div > div.btn-group.open > ul > li:nth-child(1)')
      })
      .pause(4000)
      .end()
      return this;
};