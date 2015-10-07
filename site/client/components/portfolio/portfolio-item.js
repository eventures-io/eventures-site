'use strict'

angular.module('evtrs-site').directive('portfolioItem', function ($rootScope, PROJECT_CONSTANTS) {

    return {
        templateUrl: 'components/portfolio/portfolio-item.html',
        scope: {},
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
            var progressButton = element.querySelector('div[progress-button]');
            var projectView = document.querySelector('.project-view');
            var projectImg;
            var previewImg = element.querySelector('.preview-img');
            var portfolio = document.querySelector('.portfolio-section');

            $scope.$on('LOAD_PROJECT', function (event, project) {
                var flexDirection = window.getComputedStyle(portfolio, null).getPropertyValue('flex-direction');
                if (project.name === $scope.project.name) {

                    element.style.zIndex = '2';
                    projectView.style.backgroundColor = element.style.backgroundColor;
                    var bounding = previewImg.getBoundingClientRect();
                    projectImg = new Image();
                    projectImg.classList.add('project-img');
                    projectImg.src = previewImg.src;
                    projectImg.style.top = bounding.top + 'px';
                    projectImg.width = previewImg.width;
                    projectImg.height = previewImg.height;


                    //TODO used class based styling
                    subOuter.style.opacity = '0';
                    progressButton.display = 'none';

                    var repositionImage = function () {
                        var visualContainer = document.querySelector('.visual-container');
                        visualContainer.appendChild(projectImg);
                        projectImg.style.position = 'relative';
                    };

                    if (flexDirection === 'row') {
                        var positionLeft;
                        if (!project.next) {
                            projectImg.style.transform = 'skewX(-16deg)';
                            positionLeft = bounding.left + 100;
                        } else {
                            projectImg.style.transform = 'scale(0.5)';
                            positionLeft = 120;//previewImg.width;
                        }
                        projectImg.style.left = positionLeft + 'px';
                        document.body.appendChild(projectImg);

                        //TODO use class-based styling
                        var resetRowView = function () {
                            portfolio.style.opacity = '0';
                            projectView.style.opacity = '1';
                            projectView.style.zIndex = '3';
                            TweenLite.to(element, 0, {css: {transform: 'scale(1) skewX(-16deg)'}});
                            element.style.zIndex = '1';
                            subOuter.style.opacity = '1';
                        }

                        var calculateLeftOutPosition = function() {
                            var containerWidth = (window.innerWidth * 40)/ 100;
                            var margin =  (containerWidth - projectImg.width)/ 2;
                            margin = margin < 0 ? 20 : margin;
                            return margin;
                        }

                        //TODO improve transition, use timeline
                        TweenLite.to(element, 0.9, {css: {transform: 'scale(5,1) skewX(-1deg)'}, ease: Power1.easeIn, onComplete: resetRowView });
                        TweenLite.to(projectImg, 0.4, {css: {
                            transform: 'scale(1.4) skewX(0deg)'
                        }, delay: 0.2});

                        TweenLite.to(projectImg, 0.5, {css: {
                            transform: 'scale(1)',
                            top: 45,
                            left: calculateLeftOutPosition(),
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
                            projectView.style.opacity = '1';
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
                    projectView.style.transition = 'opacity .4s';
                    TweenLite.to(projectView, 0.4, {css: {
                        opacity: '0'
                    },
                        ease: Power4.easeOut,
                        onComplete: function () {
                            projectView.style.zIndex = '0';
                        }
                    });
                    projectView.style.transition = '';
                    portfolio.style.opacity = '1';

                }
            });

        }
    }

});