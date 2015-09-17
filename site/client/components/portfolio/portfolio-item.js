'use strict'


angular.module('evtrs-site').directive('portfolioItem', function ($rootScope, PROJECT_CONSTANTS) {

    return {
        templateUrl: 'components/portfolio/portfolio-item.html',
        scope: {

        },
        link: function (scope, element, attrs) {
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
            var progressButton = element.querySelector('div[data-progress-button]');
            var projectView = document.querySelector('.project-view');
            var projectImg;
            var previewImg = element.querySelector('.preview-img');
            var portfolio = document.querySelector('.portfolio-section');


            $scope.$on('LOAD_PROJECT', function (event, projectName) {
                var flexDirection = window.getComputedStyle(portfolio, null).getPropertyValue('flex-direction');
                if (projectName === $scope.project.name) {

                    //TODO center sub-inner div
                    element.style.zIndex = '2';
                    // element.addEventListener("transitionend", openProjectEventListener, true);
                    projectView.style.backgroundColor = element.style.backgroundColor;
                    var bounding = previewImg.getBoundingClientRect();
                    projectImg = new Image();
                    projectImg.classList.add('project-img');
                    projectImg.src = previewImg.src;
                    projectImg.style.top = bounding.top + 'px';
                    projectImg.width = previewImg.width;
                    projectImg.height = previewImg.height;
                    //set/unset properties with add/remove class
                    subOuter.style.opacity = '0';
                    progressButton.display = 'none';

                    var repositionImage = function () {
                        var projectVisual = document.querySelector('.project-visual-img');
                        projectVisual.appendChild(projectImg);
                        projectImg.style.position = 'relative';
                    };

                    if (flexDirection === 'row') {
                        projectImg.style.transform = 'skewX(-16deg)';
                        projectImg.style.left = bounding.left + 100 + 'px';
                        document.body.appendChild(projectImg);
                        var resetRowView = function () {
                            portfolio.style.opacity = '0';
                            projectView.style.zIndex = '3';
                            TweenLite.to(element, 0, {css: {transform: 'scale(1) skewX(-16deg)'}});
                            element.style.zIndex = '1';
                            subOuter.style.opacity = '1';
                        }

                        //TODO improve transition, use timeline
                        TweenLite.to(element, 0.9, {css: {transform: 'scale(5,1) skewX(-1deg)'}, ease: Power1.easeIn, onComplete: resetRowView });
                        TweenLite.to(projectImg, 0.4, {css: {
                            transform: 'scale(1.4) skewX(0deg)'
                        }, delay: 0.2});

                        TweenLite.to(projectImg, 0.5, {css: {
                            transform: 'scale(1)',
                            top: 45,
                            left: 30,
                            maxHeight: '90vh',
                            width: 'auto'
                        },
                            ease: Power0.easeIn,
                            onComplete: repositionImage,
                            delay: 0.5
                        });
                    } else {
                        var resetColumnView = function () {
                            repositionImage();
                            element.style.zIndex = '1';
                            subOuter.style.opacity = '1';
                        }
                        portfolio.style.opacity = '0';
                        projectView.style.zIndex = '3';
                        projectImg.style.left = bounding.left + 'px';
                        document.body.appendChild(projectImg);
                        TweenLite.to(projectImg, 0.5, {css: {
                            top: '60px',
                            width: 'auto',
                            maxHeight: '90vh'
                        },
                            ease: Power0.easeIn,
                            onComplete: resetColumnView
                        });
                    }

                }
            });

            $scope.$on('CLOSE_PROJECT', function (event, project) {
                if (project === $scope.project.name) {
                    projectView.style.zIndex = '0';
                    portfolio.style.opacity = '1';

                }
            });

        }
    }

});