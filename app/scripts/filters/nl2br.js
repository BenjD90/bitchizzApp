'use strict';

angular.module('bitchizzApp').filter('nl2br', function ($sce) {
  return function (pMsg, pIsXhtml) {
    var isXhtml = pIsXhtml || true;
    var breakTag = (isXhtml) ? '<br />' : '<br>';
    var msg = (pMsg + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
    return $sce.trustAsHtml(msg);
  };
});
