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
            var subInner = element.querySelector('.sub-inner');
            var overlay = document.querySelector('.project-overlay');
            var projectImg;
            var previewImg = element.querySelector('.preview-img');
            var portfolio = document.querySelector('.portfolio');


            $scope.loadProject = function () {
                if($scope.project){
                $scope.$emit('LOAD_PROJECT', $scope.project.name);
                }
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
                subInner.style.opacity = '0';
                element.style.transform = 'skewX(-16deg) scale(5,1)';
                element.style.zIndex = '1';
                $state.go('work.project1');
            };

            var openProjectEventListener = function (event) {
                portfolio.style.visibility = 'hidden';
                portfolio.style.opacity = '0';
                //reset
                subInner.style.opacity = '1';
                element.style.transform = 'skewX(-16deg) scale(1,1)';
                element.style.zIndex = '0';
                //Move project image into place
                projectImg.style.transform = 'scale(1.1) translateX(300px)';
                //projectImg.style.opacity = '0.9';
                element.removeEventListener("transitionend", openProjectEventListener, true);
            };


            $scope.$on('CLOSE_PROJECT', function (event) {
                if (event.currentScope.project.name === $scope.project.name) {
                    document.body.removeChild(projectImg);
                    portfolio.style.visibility = 'visible';
                    portfolio.style.opacity = '1';
                    $state.go('work');
                }
            });



        }
    }


});