/**
 * @author Alexander Tserkovniy
 *    alexander.tserkovniy@maxymiser.com
 *    skype Alexblbl1
 * @description Detect IE from version 8 till 11
 * @task Detect IE version and add class to the HTML element
 * @version a (try in mm test 3 BLCI)
 * @compatibility IE8+
 */

;(function (agentString, prefix) {
  "use strict";

  var mainReg       = /MSIE\s?(\d+)\.(?:\d+)?|rv\:(\d+)\.(?:\d+)?/i,
    matchedResult   = null,
    version         = 0,
    elementToEnrich =
      document.documentElement || document.getElementsByTagName('html')[0];

  if ((matchedResult = agentString.match(mainReg)) &&
    (version = matchedResult[1] || matchedResult[2])) {
    if (elementToEnrich.classList) {
      elementToEnrich.classList.add(prefix + 'IE' + version);
    } else {
      elementToEnrich.className += (' ' + prefix + 'IE' + version);
    }
  }
})(navigator.userAgent, 'mm');