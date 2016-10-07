# Learn Nightwatch  
[![Codeship](https://img.shields.io/codeship/d9151e40-1473-0134-47e0-12348d1f3442.svg)](https://codeship.com/projects/157818)
[![Dependency Status](https://david-dm.org/dwyl/learn-nightwatch.svg)](https://david-dm.org/dwyl/learn-nightwatch)
[![devDependency Status](https://david-dm.org/dwyl/learn-nightwatch/dev-status.svg)](https://david-dm.org/dwyl/learn-nightwatch#info=devDependencies)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/learn-nightwatch/issues)

_**Automate** your **acceptance tests** and run them in **real browsers**_!

![nightwatch-logo-with-slogan](https://cloud.githubusercontent.com/assets/194400/16045809/099207e2-3242-11e6-99d4-99b227d7a38a.png)

## _Why_?

Testing what the people _using_ your application/website will _see_
and their ability _interact_ with the product is
(_probably_) the most important part of building a web app/site.
You can have amazing code, a super-fast backend and gorgeous UI,
but _none_ of that _matters_ if people are unable to _use_ it
because of a basic bug!

![dilbert-internet-full](https://cloud.githubusercontent.com/assets/194400/16302737/b0bb3486-3944-11e6-9875-6e691587ccd0.png)

_**User Acceptance Testing**_ (**UAT**) with a tool like Nightwatch (_Selenium_)
lets you to run real-world scenarios in your Web App which will give
you _confidence_ that the app _works_ in the chosen device(s)/browser(s).

## _What_?

_**Automated Acceptance Testing** using **Real Browsers**_.

Nightwatch is _quick_ to setup and the tests/scenarios are _easy_ to write.

> We _exhaustively_ read through all the tutorials, blog posts and documentation
for Nightwatch (_including the mailing list & StackOverflow Q&A_)
and have condensed our findings into this step-by-step guide.  
We hope you find it _useful_ and decide to use it for your web app/site!  
_**Please**_ give us _**feedback**_ and if you _get stuck_,
[_**tell us!**_](https://github.com/dwyl/learn-nightwatch/issues)

#### Background Links

+ Nightwatch website: http://nightwatchjs.org/
+ Github: https://github.com/nightwatchjs/nightwatch
+ Guide/docs: https://github.com/nightwatchjs/nightwatch-docs
(_don't be put off by the lack of docs, we're here to help if you get stuck!_)
+ Configuration file settings: http://nightwatchjs.org/guide#settings-file

## _Who_?

Who should learn/use Nightwatch?

+ **Developers** - People writing code, building web apps needing to
check that _everything_ works as expected.
+ **QA** - Quality Assurance people who have to _manually "click-test"_ apps/sites.
+ "**Testers**" - Many organisations _still_ have people who's job
is to write tests for software. If you describe yourself as a "Tester"
and want an _easier/faster_ way to write your acceptance tests, read on!

## _How_?

### _Quick Start (5mins)_

_**Try it**_ on your local machine in 5 mins by following these _**3 easy steps**_:


### 1. Clone

Clone the repository by _copy-pasting_ the following command into your terminal:

```sh
git clone https://github.com/dwyl/learn-nightwatch.git && cd learn-nightwatch && cp sample.env .env
```

> Note: if you're _curious_ what that last part is, see: https://github.com/dwyl/env2

### 2. Install<sup>1</sup>

Install the *required* dependencies
including Selenium Server and `chromedriver`:

```sh
npm install
```


### 3. Run (_tests_)<sup>2</sup>

Run the Nightwatch tests:

```sh
npm test
```


You should expect to see:  
![learn-nightwatch-console-output-success](https://cloud.githubusercontent.com/assets/194400/16376918/f2d9f8c0-3c5a-11e6-96c4-88e0bdb44638.png)

Once you see the tests pass you are well on your way
to testing with Nightwatch!


<sup>1</sup><small>This _assumes_ you have node.js installed.
If not, https://nodejs.org/en/download/ </small>  
<sup>2</sup><small>Selenium Requires Java/JDK see: [Java Installation section](https://github.com/dwyl/learn-nightwatch#installing-java-runtime-environment-jre) below. (_don't worry, you'll be up-and-running shortly..._!)  
Once you have Java installed re-run the Nightwatch tests (`npm test`).</small>

<br/>

## *Step-by-Step Tutorial*

Now that you have had a _taste_ for running tests with Nightwatch,
let's walk through each of the steps to get this working in **_your_ project**.

### Installation (_in detail_)

#### Install `nightwatch`

First install the `nightwatch` node.js module from NPM:

```sh
npm install nightwatch --save-dev
```

> <small>**Note**: while the Nightwatch docs instruct to install _globally_ (`-g`),
we _prefer_ to always install devDependencies _locally_ to the project
and list them _explicitly_ in `package.json` so it's _clear_ to everyone
viewing/using the project _exactly_ which version is required to run the tests. </small>

### Install `selenium-download`

In order to run Browser tests Nightwatch uses [Selenium](http://www.seleniumhq.org/).
We _prefer_ to _automate_ the installation of Selenium using
[`selenium-download`](https://www.npmjs.com/package/selenium-download)
which ensures that everyone on our team always has the latest version.

```sh
npm install selenium-download --save-dev
```

#### Download Selenium (_Web Driver_) Standalone Server (_Script_)

Once you've downloaded the the `selenium-download` node module,
put the following code at the bottom of your `nightwatch.conf.js` file:

```js
require('selenium-download').ensure('./bin', function(error) {  
   if (error) {
     return console.log(error);
   } else {
     console.log('✔ Selenium & Chromedriver downloaded to:', './bin');
   }
});
```
We run include this script in our `nightwatch.conf.js` which
checks for the existence of `selenium.jar` before trying to run our tests.
_You will create your `nightwatch.conf.js` file in the next step_.

### Configuration

Once you've installed `nightwatch`, you will need to create a configuration file.  
_Some_ Nightwatch tutorials use a `nightwatch.json` file;
this is good for the most _basic_ cases
but if you want to use variables in your
configuration we _recommend_ using a `.js` file;
_specifically_ called `nightwatch.conf.js`. Save this file to your project directory.

The most _basic_ configuration is: [`nightwatch.conf.BASIC.js`](https://github.com/dwyl/learn-nightwatch/blob/master/nightwatch.conf.BASIC.js)

```js
module.exports = {
  "src_folders": [
    "test/e2e"// Where you are storing your Nightwatch e2e/UAT tests
  ],
  "output_folder": "./reports", // reports (test outcome) output by nightwatch
  "selenium": { // downloaded by selenium-download module (see readme)
    "start_process": true, // tells nightwatch to start/stop the selenium process
    "server_path": "./node_modules/nightwatch/bin/selenium.jar",
    "host": "127.0.0.1",
    "port": 4444, // standard selenium port
    "cli_args": { // chromedriver is downloaded by selenium-download (see readme)
      "webdriver.chrome.driver" : "./node_modules/nightwatch/bin/chromedriver"
    }
  },
  "test_settings": {
    "default": {
      "screenshots": {
        "enabled": true, // if you want to keep screenshots
        "path": './screenshots' // save screenshots here
      },
      "globals": {
        "waitForConditionTimeout": 5000 // sometimes internet is slow so wait.
      },
      "desiredCapabilities": { // use Chrome as the default browser for tests
        "browserName": "chrome"
      }
    },
    "chrome": {
      "desiredCapabilities": {
        "browserName": "chrome",
        "javascriptEnabled": true // set to false to test progressive enhancement
      }
    }
  }
}
```

> One of our _favourite_ things about using a `.js` file
is the ability to add _comments_ in the file.  
This makes it _much_ easier for new people to
_understand_ what's going on.  
We have a slightly more _evolved_ `nightwatch.conf.js` (_with Saucelabs_) see:
[github.com/dwyl/learn-nightwatch/**nightwatch.conf.js**](https://github.com/dwyl/learn-nightwatch/blob/master/nightwatch.conf.js)


### Additional Steps for Testing a Non-NPM Project

You will need to run the config file you created to download the Selenium driver.

```sh
node nightwatch.conf.BASIC.js
```

### Create Your Nightwatch Test

Nightwatch "looks" for tests in the `/tests` folder of your project by default;
you can change this to what ever you prefer. We keep our Nightwatch tests in `test/e2e`.

This is the _simplest_ test you can write for Nightwatch

```
module.exports = { // addapted from: https://git.io/vodU0
  'Guinea Pig Assert Title': function(browser) {
    browser
      .url('https://saucelabs.com/test/guinea-pig')
      .waitForElementVisible('body')
      .assert.title('I am a page title - Sauce Labs')
      .saveScreenshot('ginea-pig-test.png')
      .end();
  }
};
```

> See: [github.com/dwyl/learn-nightwatch/**test/e2e**](https://github.com/dwyl/learn-nightwatch/tree/master/test/e2e)

### Run your Test

Depending on what you named your configuration file,
run it with a command _resembling_ the following:

```sh
node_modules/.bin/nightwatch --config nightwatch.conf.BASIC.js
```
If you called your config file `nightwatch.conf.js` (_as we suggested_)
you can run your tests without specifying the config file:

```sh
node_modules/.bin/nightwatch
```
We add an entry in our `package.json` `"scripts"` section
to _not_ have to type all that each time. e.g:

```js
"scripts": {
  "e2e": "node_modules/.bin/nightwatch"
}
```
Then _run_ it as:

```js
npm run e2e
```

## _Optional_ (_Level Up_)

### `postinstall` script

We put an entry in the `"scripts"` section of our `package.json` to
_run_ the `selenium-download` script after all `node_modules`
have been installed. e.g:

```js
  "scripts": {
    "postinstall": "node nightwatch.conf.js"
  }
```


### Saucelabs

Most people _building_ web apps/sites don't have _easy_ access
to _several_ devices/browsers to test their output, if you
need to test in a _range_ of browsers/devices Saucelabs is a great option.

![browser logos](https://cloud.githubusercontent.com/assets/194400/16362868/8c29b448-3bb1-11e6-83f1-380edd462fb1.png)

In our [`nightwatch.conf.js`](https://github.com/dwyl/learn-nightwatch/blob/master/nightwatch.conf.js)
we have defined _saucelabs_ as our `"default"` setting.

We _run_ our tests on saucelabs by running the following npm script/command:

```sh
npm run sauce
```

Which corresponds to the following _complete_ command:

```js
./node_modules/.bin/nightwatch -e chrome,ie11,android_s4_emulator,iphone_6_simulator
```

> This just means "_Run Nightwatch using the default configuration
(Suacelabs in our case) and execute all tests in this list of browsers_."

**Note**: you will need to have the following _**environment variables**_
exported for Saucelabs to run your test:
```sh
export SAUCE_USERNAME=your-username
export SAUCE_ACCESS_KEY=your-key
```

> If you're _new_ to Saucelabs, checkout:
[github.com/dwyl/**learn-saucelabs**](https://github.com/dwyl/learn-saucelabs)

### Upload Screenshots to S3

If you decide to use Saucelabs to run your tests (_in several devices/browsers_),
it will take screenshots for you and keep them inside Saucelabs.
That's _nice_ for people who are _used_ to using Saucelabs, but what about the
_other_ stakeholders?

We decided to upload our screenshots to S3 and created a _super-simple_ `.html`
file which shows a slideshow of the images.

> Example: https://isearch-ui.s3-eu-west-1.amazonaws.com/1.0.21/index.html

If you want the screenshots of tests to be uploaded to S3,
you will need to have the following environment variables declared:
```sh
export AWS_S3_BUCKET=yourbucket
export AWS_REGION=eu-west-1
export AWS_ACCESS_KEY_ID=IDHERE
export AWS_SECRET_ACCESS_KEY=YOURKEY
```
The _script_ we wrote to perform the uploading is:
[github.com/dwyl/learn-nightwatch/test/upload_screenshots_to_s3.js](https://github.com/dwyl/learn-nightwatch/blob/master/test/upload_screenshots_to_s3.js)

The screenshots taken on Saucelabs browsers/devices are saved _locally_
and uploaded to S3 when tests succeed.

<br />



### Running your Nightwatch tests on your _Continuous Integration_ (CI)

Running your Nightwatch tests on CI is easy on CodeShip.  
We usually set the required (_minimum_) node version in our
`package.json` e.g:
```js
"engines": {
  "node": "4.4.6"
},
```
Once you have the desired version of node installed.

Setup Commands:
```js
# install dependencies:
npm install
```
Test Command:
```js
# run tests
npm test
```
That's it.

> ***Note***: while the tests run seamlessly on CodeShip we were unable
 to get Selenium standalone working on Travis-CI
if you have time to ***help us***, please see:
https://github.com/dwyl/learn-nightwatch/issues/8

<br /> <br />

# tl;dr

> More detail than you will _probably_ need ... _but we're keeping for completeness_.

## Background

### Why Nightwatch instead of `xyz`...?

We _first_ looked at [`NightmareJS`](https://github.com/segmentio/nightmare),
and even though it _looks_ really good (_fast_), we saw the _reaction_
non-technical people had when we mentioned it and did not want to have to _explain_
the _name_ to people/clients every time, so instead opted for _night**watch**_.
If _night**mare**_ ever change their name, we _could re-consider_ it.


### Research

+ Basic intro: http://juristr.com/blog/2014/02/nightwatch-test-automation/
+ Page Object Pattern: http://martinfowler.com/bliki/PageObject.html
+ Nightwatch with React: https://www.syncano.io/blog/testing-syncano/
+ How to run a _single_ Nightwatch test: http://stackoverflow.com/questions/28308990/how-to-run-a-single-test-in-nightwatch/29701199#29701199
+ Custom Commands: http://nightwatchjs.org/guide#writing-custom-commands
+ Nightwatch Global Variables:
http://stackoverflow.com/questions/25067391/how-to-make-a-globally-accessible-variable/
+ Travis with Saucelabs: http://samsaccone.com/posts/testing-with-travis-and-sauce-labs.html
+ Selenium Status:
http://stackoverflow.com/questions/6517501/selenium-2-how-to-check-that-server-is-running-and-stop-the-server
+ Silence Selenium on Travis:
http://andrew.yurisich.com/work/2014/08/30/silence-noisy-selenium-server-output-in-travis-ci/
+ Intro by @mikberg: https://medium.com/@mikaelberg/zero-to-hero-with-end-to-end-tests-using-nightwatch-saucelabs-and-travis-e932c8deb695
+ Intro (Angular-focussed): http://g00glen00b.be/e2e-testing-nightwatch-js/
+ Nightwatchjs: how to check if element exists without creating an error/failure/exception
http://stackoverflow.com/questions/31687027/nightwatchjs-how-to-check-if-element-exists-without-creating-an-error-failure-e
+ Can I create reusable test steps in nightwatch.js?
http://stackoverflow.com/questions/31388280/can-i-create-reusable-test-steps-in-nightwatch-js
+ Nightwatch on ***Saucelabs***: https://github.com/saucelabs-sample-test-frameworks/JS-Nightwatch.js

<br />

### Setup (*Detail*)

#### Installing Java (_Runtime Environment JRE_)

If you see the following message while trying to run the tests:
![learn-nightwatch-java-not-installed](https://cloud.githubusercontent.com/assets/194400/16425985/0e2a9e5e-3d5f-11e6-9bf0-d2eebcd97c2b.png)

While we prefer _not_ to run `Java` on our machines for
[_security reasons_](http://krebsonsecurity.com/tag/java/) Selenium is _still_
the best way of running tests in _real_ browsers.

_Check_ if you have `Java` installed on your local machine:

> How do I install Java? https://www.java.com/en/download/help/download_options.xml
> pick your Operating System and follow the instructions

##### Mac OSX? (_use homebrew_)

If you haven't updated `brew` in a while, do that first:
```sh
brew update
```
That will install [`cask`](https://caskroom.github.io/) which is now _part_ of Homebrew.

Now you can install Java:
```sh
brew cask install java
```
You should see something like this:
![install-java-with-homebrew-cask](https://cloud.githubusercontent.com/assets/194400/16007040/296f1bfc-3168-11e6-8009-8f39b715239d.png)

> See: [http://stackoverflow.com/questions/24342886/how-to-**install-java-8**-on-**mac**](http://stackoverflow.com/questions/24342886/how-to-install-java-8-on-mac)

#### Manual Selenium Install

If you prefer to install it _manually_ that's an option.

> Visit: http://www.seleniumhq.org/download/ and download the latest version.

When downloading the `selenium-server-standalone-2.53.0.jar`
you _may_ see a _warning_ in your browser:  
![download-selenium-chrome-warning](https://cloud.githubusercontent.com/assets/194400/16004469/b865583a-3159-11e6-9b6a-40bd754ef209.png)  
Click on "keep" to save the file.
Once you have it, put it in the `bin` directory of your project
and re-name it to `selenium.jar` (_without the version number_).


### StackOverflow Questions

Remind me to Respond to these:
> + [x] http://stackoverflow.com/questions/24314040/getting-started-with-nightwatch-js
> + [ ] http://stackoverflow.com/questions/37699036/is-it-possible-to-start-a-selenium-server-inside-travis
> + [ ] http://stackoverflow.com/questions/25919673/file-upload-testing-in-nightwatch-js
> + [ ] http://stackoverflow.com/questions/31388280/can-i-create-reusable-test-steps-in-nightwatch-js/31393249#31393249
> + [ ] use saucelabs with nightwatch? http://stackoverflow.com/questions/36137270/how-to-use-saucelabs-with-nightwatch
> + [x] keypress: http://stackoverflow.com/questions/31812935/nightwatch-testing-sendkeys-and-keys-not-sending-key-clicks ... [*answer*](http://stackoverflow.com/questions/31812935/nightwatch-testing-sendkeys-and-keys-not-sending-key-clicks/37950264#37950264)
> + [x] Run Selenium as child process: http://stackoverflow.com/questions/27408864/cant-launch-selenium-phantomjs-ghostdriver-as-child-processes
> + [x] Current running browser: http://stackoverflow.com/questions/38102543/when-running-nightwatch-js-test-how-can-i-get-the-name-of-browser-currently-runn

## Cons (_of using Nightwatch_)

+ Selenium is not the fastest way to run tests.
