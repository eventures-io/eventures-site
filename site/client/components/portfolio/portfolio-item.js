'use strict'


angular.module('evtrs-site').directive('portfolioItem', function($state) {

    return {
        templateUrl: 'components/portfolio/portfolio-item.html',
        link: function(scope, element) {
            //adding class here causes skew transition to trigger
            //element.addClass('flex-sub');

        },
        controller: function($scope, $element){

            var element = $element[0];
            var subInner = element.querySelector('.sub-inner');
            var overlay = document.querySelector('.project-overlay');
            var projectImg = overlay.querySelector('.project-img');
            var previewImg = element.querySelector('.preview-img');


            $scope.expand = function () {
                subInner.addEventListener("transitionend", openProjectEventListener, true);

                var bounding = previewImg.getBoundingClientRect();
                projectImg.src = previewImg.src;
                projectImg.style.left = bounding.left + 'px';
                projectImg.style.top = bounding.top + 'px';
                projectImg.width = bounding.width;
                projectImg.height = bounding.height;

                //set/unset properties with add/remove class
                overlay.style.visibility='visible';
                //cannot use visibility, breaks animation
                //subInner.style.opacity = '0';
                subInner.style.width= '240vw';
                subInner.style.transform = 'translateX(-500px)';
                subInner.style.zIndex = '10';
                previewImg.style.display='none';
                //element.style.transform = 'skewX(-16deg) scale(5,1)';
                //
                element.style.zIndex = '1';
                $state.go('work.project1');
            };


            var openProjectEventListener = function (event) {

                //Move project image into place
                //use keyframes to scale in, move and scale out
                projectImg.style.transform = 'scale(0.7) translateX(-200px)';
                projectImg.style.opacity = '0.9';
                element.removeEventListener("transitionend", openProjectEventListener, true);
            };


            $scope.closeProject = function() {
                subInner.style.width= '100%';
                subInner.style.transform = 'translateX(0px)';
                subInner.style.zIndex = '1';
                //overlay.style.opacity= "0";
                //todo wait for opacity transition end
                overlay.style.visibility = 'hidden';
                //projectImg.style.transform = 'scale(1) translateX(200px)';
               // projectImg.style.visibility = 'hidden';
                $state.go('work');

            }

//            var closeProjectEventListener =  function(event) {
//                overlay.style.display= "none";
//                subInner.style.opacity = '1';
//                element.removeEventListener("transitionend", closeProjectEventListener, true);
//            }

        }
    };


});