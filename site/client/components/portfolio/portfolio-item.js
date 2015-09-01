'use strict'


angular.module('evtrs-site').directive('portfolioItem', function ($state) {

    return {
        templateUrl: 'components/portfolio/portfolio-item.html',
        scope: {

        },
        link: function (scope, element, attrs) {
            //adding class here causes skew transition to trigger
            //element.addClass('flex-sub');
            scope.project = attrs.project;

        },
        controller: function ($scope, $element) {

            var element = $element[0];
            var subInner = element.querySelector('.sub-inner');
            var overlay = document.querySelector('.project-overlay');
            var projectImg;
            var previewImg = element.querySelector('.preview-img');
            var portfolio = document.querySelector('.portfolio');


            $scope.expand = function () {
                element.addEventListener("transitionend", openProjectEventListener, true);

                overlay.style.backgroundColor = '#a2f28d';
                var bounding = previewImg.getBoundingClientRect();
                projectImg =  new Image();
                projectImg.classList.add('project-img');
                projectImg.src = previewImg.src;
                projectImg.style.left = bounding.left+40 + 'px';
                projectImg.style.top = bounding.top + 'px';
                projectImg.width = previewImg.width;
                projectImg.height = previewImg.height;
                document.body.appendChild(projectImg);


                //set/unset properties with add/remove class
                //cannot use visibility, breaks animation
                subInner.style.opacity = '0';
                element.style.transform = 'skewX(-16deg) scale(5,1)';
                element.style.zIndex = '1';
                $state.go('work.project1');
            };

            var openProjectEventListener = function (event) {
                portfolio.style.visibility = 'hidden';
                //reset
                subInner.style.opacity = '1';
                element.style.transform = 'skewX(-16deg) scale(1,1)';
                element.style.zIndex = '0';
                //Move project image into place
                projectImg.style.transform = 'scale(0.7) translateX(-200px)';
                projectImg.style.opacity = '0.9';
                element.removeEventListener("transitionend", openProjectEventListener, true);
            };


            $scope.closeProject = function (projectName) {
                if ($scope.project === projectName) {
                    portfolio.style.visibility = 'visible';
                    //overlay.style.opacity= "0";
                    //todo wait for opacity transition end
                    //overlay.style.visibility = 'hidden';
                    //projectImg.style.transform = 'scale(1) translateX(200px)';
                    // projectImg.style.visibility = 'hidden';
                    $state.go('work');
                }

            }

//            var closeProjectEventListener =  function(event) {
//                overlay.style.display= "none";
//                subInner.style.opacity = '1';
//                element.removeEventListener("transitionend", closeProjectEventListener, true);
//            }

        }
    };


});