'use strict';

angular.module('evtrs-site')
    .controller('WorkController', function ($scope, $state) {


        $scope.expand = function () {

            var sub = document.querySelector('.sub-1');
            sub.addEventListener("transitionend", openProjectEventListener, true);

            sub.style.width = '300px';
            var subInner = sub.querySelector('.sub-inner');
            var img = sub.querySelector('img');
            var bounding = img.getBoundingClientRect();
            var overlay = document.querySelector('.project-overlay');
            var projectImg = overlay.querySelector('.project-img');

            projectImg.src = img.src;
            projectImg.style.left = bounding.left + 'px';
            projectImg.style.top = bounding.top + 'px';
            projectImg.width = bounding.width;
            projectImg.height = bounding.height;
            overlay.style.display = 'block';
            //use visibility...
            subInner.style.opacity = '0';
            sub.style.transform = 'scale(5,1)';
            sub.style.zIndex = '1';
            $state.go('work.project1');
        }

        $scope.retract = function() {
            var overlay = document.querySelector('.project-overlay');
            var sub = document.querySelector('.sub-1');
            var subInner = sub.querySelector('.sub-inner');

            //overlay.style.opacity = '1';
            sub.addEventListener("transitionend", closeProjectEventListener, true);
            sub.style.transform = 'skewX(-16deg) scale(1)';
            $state.go('work');

        }

        var openProjectEventListener =  function(event) {
            var projectImg = document.querySelector('.project-img');
            //use keyframes to scale in, move and scale out
            projectImg.style.transform = 'scale(0.7) translateX(-200px)';
            projectImg.style.opacity= '0.9';
            sub.removeEventListener("transitionend", openProjectEventListener, true);
        }


        var closeProjectEventListener =  function(event) {
            var overlay = document.querySelector('.project-overlay');
            var sub = document.querySelector('.sub-1');
            var subInner = sub.querySelector('.sub-inner');

            overlay.style.display= "none";
            subInner.style.opacity = '1';
            sub.removeEventListener("transitionend", closeProjectEventListener, true);
        }


    });
