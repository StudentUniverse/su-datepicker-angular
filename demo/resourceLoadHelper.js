// when in development use the build resources
// in prod point to dist
var jsPath;
var env = 'PROD'; //'DEV'

if(location.protocol === 'file:' ||
    location.hostname === 'localhost' ||
    location.hostname === '127.0.0.1'){
      env = 'DEV';
    }

if(env === 'PROD'){
  jsPath = '../../dist/su-datepicker.js';
} else {
  jsPath = '../../build/su-datepicker.js';
}

appendScript(jsPath);

function appendScript(pathToScript) {
    var js = document.createElement("script");
    js.type = "text/javascript";
    js.src = pathToScript;
    document.write(js.outerHTML);
}
