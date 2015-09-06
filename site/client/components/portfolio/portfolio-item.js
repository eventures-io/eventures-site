'use strict'


angular.module('evtrs-site').directive('portfolioItem', function ($state, $rootScope, PROJECT_CONSTANTS, $log) {

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
            var subInner = element.querySelector('.sub-inner');
            var progressButton = element.querySelector('div[data-progress-button]');
            var overlay = document.querySelector('.project-overlay');
            var projectImg;
            var previewImg = element.querySelector('.preview-img');
            var portfolio = document.querySelector('.portfolio');


            $scope.$on('LOAD_PROJECT', function (event, projectName) {
                if (projectName === $scope.project.name) {
                    element.addEventListener("transitionend", openProjectEventListener, true);
                    var bounding = previewImg.getBoundingClientRect();
                    projectImg = new Image();
                    projectImg.classList.add('project-img');
                    projectImg.src = previewImg.src;
                    //TODO find correct position
                    projectImg.style.left = bounding.left + 'px';
                    projectImg.style.top = bounding.top + 'px';
                    projectImg.width = previewImg.width;
                    projectImg.height = previewImg.height;
                    //document.body.appendChild(projectImg);
                    //set/unset properties with add/remove class
                    //cannot use visibility, breaks animation
                    subInner.style.opacity = '0';
                    progressButton.visibility = 'hidden';
                    //toggleVisibility(subOuter);
                    element.style.zIndex = '2';
                    element.style.transform = 'skewX(-16deg) scale(5,1)';
                    $state.go('work.project1');
                }

            });


            var openProjectEventListener = function () {
                element.removeEventListener("transitionend", openProjectEventListener, true);
                portfolio.style.visibility = 'hidden';
                portfolio.style.opacity = '0';
                //reset the view
                element.style.transform = 'skewX(-16deg) scale(1,1)';
                element.style.zIndex = '1';
                //toggleVisibility(subOuter);
                //Move project image into place (calculate to center left)
                projectImg.style.transform = 'scale(1.1) translateX(300px)';
                projectImg.style.opacity = '0.9';

            };


            $scope.$on('CLOSE_PROJECT', function (event, project) {
                if (project === $scope.project.name) {
                    document.body.removeChild(projectImg);
                    //portfolio.style.display = 'initial';
                    portfolio.style.opacity = '1';
                    $state.go('work');
                }
            });

            var toggleVisibility = function (element) {
                var visibility = element.style.visibility;
                visibility = visibility === 'visible' ? 'visible' : 'hidden';
                element.style.visibility = visibility;
                element.style.opacity = '0';
                _.each(element.children, function (el) {
                    el.style.visibility = visibility;
                    el.style.opacity = '0';
                });


            }
        }
    }

});