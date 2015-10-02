'use strict';


angular.module('evtrs-site').directive('clip', function () {

    return {
        restrict: 'A',
        scope: {
            clip: '@'
        },
        link: function (scope, element) {

            element.on('click',

                function () {
                    var textareaId = 'clpbt', containerId = 'clpbc', textarea;
                    var container = document.querySelector('#' + containerId);
                    if (!container) {
                        container = document.createElement('div');
                        container.id = containerId;
                        container.setAttribute('style', [, 'position: fixed;', 'left: 0px;', 'top: 0px;', 'width: 0px;', 'height: 0px;', 'z-index: 100;', 'opacity: 0;'].join(''));
                        document.body.appendChild(container);
                    }
                    container.style.display = 'block';
                    textarea = document.createElement('textarea');
                    textarea.setAttribute('style', [, 'width: 1px;', 'height: 1px;', 'padding: 0px;'].join(''));
                    textarea.id = textareaId;
                    container.innerHTML = '';
                    container.appendChild(textarea);
                    textarea.appendChild(document.createTextNode(scope.clip));
                    textarea.focus();
                    textarea.select();

                    var message;
                    try {
                        var success = document.execCommand('copy');
                        message = success ? 'copied to clipboard' : 'copy failed';
                    } catch (err) {
                        message = 'copy failed';
                    }
                    element[0].setAttribute('data-tooltip', message);
                    container.parentNode.removeChild(container);
                });

        }
    }
});