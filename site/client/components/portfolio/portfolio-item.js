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
                    //TODO set width of element to hover state width
                    element.style.zIndex = '2';
                    // element.addEventListener("transitionend", openProjectEventListener, true);
                    overlay.style.backgroundColor = element.style.backgroundColor;
                    var bounding = previewImg.getBoundingClientRect();
                    projectImg = new Image();
                    projectImg.classList.add('project-img');
                    projectImg.src = previewImg.src;
                    //TODO use padding instead of translate-X to move the image on hover
                    projectImg.style.left = bounding.left + 100 + 'px';
                    projectImg.style.top = bounding.top + 'px';
                    projectImg.width = previewImg.width;
                    projectImg.height = previewImg.height;
                    document.body.appendChild(projectImg);
                    //set/unset properties with add/remove class
                    subOuter.style.opacity = '0';
                    progressButton.display = 'none';

                    var moveToFlexSub = function () {
                        portfolio.style.opacity = '0';
                        overlay.style.zIndex = '3';
//                      //reset the view
                        //element.style.transform = 'skewX(-16deg)';
                        TweenLite.to(element, 0, {css: {transform: 'scale(1) skewX(-16deg)'}});
                        element.style.zIndex = '1';
                        subOuter.style.opacity = '1';
                    }

                    TweenLite.to(element, 0.9, {css: {transform: 'scale(5,1) skewX(-1deg)'}, ease: Power1.easeIn});
                    TweenLite.to(projectImg, 0.2, {css: {
                        transform: 'skewX(0deg) scale(1.3)'
                    }, delay: 0.4});

                    TweenLite.to(projectImg, 0.5, {css: {
                        // transform: 'skewX(0deg)',
                        transform: 'scale(1)',
                        left: 100,
                        height: '70%',
                        width: 'auto'
                    },
                        ease: Power0.easeIn,
                        onComplete: moveToFlexSub,
                        delay: 0.5
                    });

                    $state.go('work.project1');
                }

            });


//            var openProjectEventListener = function () {
//                element.removeEventListener("transitionend", openProjectEventListener, true);
//                portfolio.style.opacity = '0';
//                overlay.style.zIndex = '3';
////                //reset the view
//                //element.style.transform = 'skewX(-16deg)';
//                TweenLite.to(element, 0, {css:{transform: 'scale(1) skewX(-16deg)'}});
//                element.style.zIndex = '1';
//                subOuter.style.opacity = '1';
////                //Move project image into place (calculate to center left)
//                //projectImg.style.transform = 'skewX(0deg)';
//
//
//                //projectImg.style.transform = 'translateX(300px)';
//                //projectImg.style.opacity = '0.9';
//
//            };


            $scope.$on('CLOSE_PROJECT', function (event, project) {
                if (project === $scope.project.name) {
                    document.body.removeChild(projectImg);
                    overlay.style.zIndex = '0';
                    portfolio.style.opacity = '1';
                    $state.go('work');
                }
            });

        }
    }

});