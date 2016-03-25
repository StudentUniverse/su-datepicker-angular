// when in development use the build resources
// in prod point to dist
var jsPath, cssPath;
var env = 'PROD'; //'DEV'

if(location.protocol === 'file:' ||
    location.hostname === 'localhost' ||
    location.hostname === '127.0.0.1'){
      env = 'DEV';
    }

if(env === 'PROD'){
  jsPath = '../../dist/su-datepicker.min.js';
  cssPath = '../../dist/su-datepicker.min.css';
} else {
  jsPath = '../../build/su-datepicker.js';
  cssPath = '../../src/styles/su-datepicker.css';
}

appendStyle(cssPath);
appendScript(jsPath);

function appendScript(pathToScript) {
    var js = document.createElement("script");
    js.type = "text/javascript";
    js.src = pathToScript;
    document.write(js.outerHTML);
}

function appendStyle(pathToCss){
  var head = document.head,
    link = document.createElement('link');

  link.type = 'text/css';
  link.rel = 'stylesheet';
  link.href = pathToCss;

  document.write(link.outerHTML);
}
