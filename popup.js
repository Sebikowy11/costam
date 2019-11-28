


function getLegendElement() {
    var element = document.getElementsByClassName("eventsDateAdd");
    element.innerHTML = '<popuper>Dodaj wydarzenie</popuper>';
    $compile(element)($scope);
}
(function(angular) {
  'use strict';
angular.module('popup').component('popuper', {
  templateUrl: 'popup.html'

});
})(window.angular);
