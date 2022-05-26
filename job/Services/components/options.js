const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
const process = require('process')
require('dotenv').config();


const screen = {
    width: 1920,
    height: 1080
}; 
//let options = new firefox.Options()
let options = new chrome.Options()
options.addArguments("-window-size=1920,1080");
//options.addArguments("-headless");
console.log(process.env.HEADLESS)
if ( process.env.HEADLESS == 'true' ){
    options.addArguments("-headless");
}

module.exports = {
    screen,
    options
};