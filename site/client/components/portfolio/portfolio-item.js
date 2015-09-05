'use strict'


angular.module('evtrs-site').directive('portfolioItem', function ($state, $rootScope, PROJECT_CONSTANTS) {

    return {
        templateUrl: 'components/portfolio/portfolio-item.html',
        scope: {

        },
        link: function (scope, element, attrs) {
            //adding class here causes skew transition to trigger
            //element.addClass('flex-sub');
            scope.project = {};
            scope.project.name = attrs.portfolioItem;
            element[0].style.backgroundColor = PROJECT_CONSTANTS[attrs.portfolioItem].bgColor;
            scope.project.image = PROJECT_CONSTANTS[attrs.portfolioItem].image.src;
            var subInner = element[0].querySelector('.sub-inner');
            subInner.style.paddingTop = PROJECT_CONSTANTS[attrs.portfolioItem].image.paddingTop;

        },
        controller: function ($scope, $element) {

            var element = $element[0];
            var subOuter = element.querySelector('.sub-outer');
            var progressButton = element.querySelector('.progress-button');
            var overlay = document.querySelector('.project-overlay');
            var projectImg;
            var previewImg = element.querySelector('.preview-img');
            var portfolio = document.querySelector('.portfolio');


            $scope.$on('LOAD_PROJECT', function (event, projectName) {
                if (projectName === $scope.project.name) {
                    element.addEventListener("transitionend", openProjectEventListener, true);
                    overlay.style.backgroundColor = element.style.backgroundColor;
                    var bounding = previewImg.getBoundingClientRect();
                    projectImg = new Image();
                    projectImg.classList.add('project-img');
                    projectImg.src = previewImg.src;
                    //TODO find correct position
                    projectImg.style.left = bounding.left + 50 + 'px';
                    projectImg.style.top = bounding.top + 'px';
                    projectImg.width = previewImg.width;
                    projectImg.height = previewImg.height;
                    document.body.appendChild(projectImg);
                    //set/unset properties with add/remove class
                    //cannot use visibility, breaks animation
                    toggleVisibility(subOuter);
                    element.style.transform = 'skewX(-16deg) scale(5,1)';
                    element.style.zIndex = '1';
                    $state.go('work.project1');
                }

            });

            var openProjectEventListener = function (event) {
                element.removeEventListener("transitionend", openProjectEventListener, true);
                portfolio.style.visiblity= 'hidden';
                portfolio.style.opacity = '0';
                //reset the view
                element.style.transform = 'skewX(-16deg) scale(1,1)';
                element.style.zIndex = '0';
                toggleVisibility(subOuter);
                //Move project image into place (calculate to center left)
                projectImg.style.transform = 'scale(1.1) translateX(300px)';
                projectImg.style.opacity = '0.9';

            };


            $scope.$on('CLOSE_PROJECT', function (event) {
                if (event.currentScope.project.name === $scope.project.name) {
                    //document.body.removeChild(projectImg);
                    portfolio.style.visibility = 'visible';
                    portfolio.style.opacity = '1';
                    $state.go('work');
                }
            });

            var toggleVisibility = function(element){
                var visibility = element.style.visibility;
                visibility = visibility === 'visible' ? 'hidden' : 'visible';
                element.style.visibility = visibility;
                _(element.children).forEach(function(el) {
                    el.style.visibility = visibility;
                });

            }


        }
    }


});