'use strict'

angular.module('evtrs-site').directive('portfolioItem', function ($rootScope, PROJECT_CONSTANTS, UAService) {

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
            scope.imgPosition = PROJECT_CONSTANTS[attrs.portfolioItem].position;

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
                var flexDirection = window.getComputedStyle(portfolio, null).getPropertyValue('flex-direction') ||
                    window.getComputedStyle(portfolio, null).getPropertyValue('-webkit-flex-direction');
                if (project.name === $scope.project.name) {

                    element.style.zIndex = '2';
                    projectView.style.backgroundColor = element.style.backgroundColor;
                    var bounding = previewImg.getBoundingClientRect();
                    projectImg = new Image();
                    projectImg.src = previewImg.src;
                    projectImg.style.top = bounding.top + 'px';
                    projectImg.width = previewImg.width;
                    projectImg.height = previewImg.height;
                    projectImg.classList.add('project-img');

                    subOuter.style.opacity = '0';
                    progressButton.display = 'none';

                    var positionImage = function () {
                        var visualContainer = document.querySelector('.visual-container');
                        //IE misery
                        if (UAService.detectIE()) {
                            document.body.removeChild(document.querySelector('.project-img'));
                        }
                        visualContainer.appendChild(projectImg);
                        projectImg.style.position = 'relative';

                    };

                    if (flexDirection === 'row') {
                        element.style.borderLeft = '6px solid white';

                        var positionLeft;
                        if (!project.next) {
                            projectImg.style.transform = 'skewX(-6deg)';
                            positionLeft = bounding.left + 35;
                        } else {
                            projectImg.style.opacity = 0;
                            projectImg.style.transform = 'scale(0.7)';
                            projectImg.style.top = '45px';
                            positionLeft = 120;
                            TweenLite.to(window, .6, {scrollTo: {y: 0}, ease: Power2.easeOut});
                        }
                        projectImg.style.left = positionLeft + 'px';
                        document.body.appendChild(projectImg);

                        var resetRowView = function () {
                            portfolio.style.opacity = '0';
                            projectView.style.opacity = '1';
                            projectView.style.zIndex = '3';
                            TweenLite.to(element, 0, {css: {transform: 'scale(1) skewX(-6deg)'}});
                            element.style.zIndex = '1';
                            subOuter.style.opacity = '1';
                            element.style.borderLeft = "none";
                        }

                        var calculateLeftOutPosition = function () {
                            var containerWidth = (window.innerWidth * 40) / 100;
                            var margin = (containerWidth - projectImg.width) / 2;
                            margin = margin < 0 ? 20 : margin;
//                            if($scope.imgPosition === 'right'){
//                                margin = window.innerWidth - 400;
//                            }
                            return margin;
                        }

                        //TODO improve transition, use timeline
                        TweenLite.to(element, 0.7, {css: {transform: 'scale(5,1) skewX(-1deg)'}, ease: Power1.easeIn, onComplete: resetRowView });
                        TweenLite.to(projectImg, 0.4, {css: {
                            transform: 'scale(1.1) skewX(0deg)', opacity: 1
                        }, delay: 0.3});

                        TweenLite.to(projectImg, 0.5, {css: {
                            transform: 'scale(1)',
                            top: 45,
                            left: calculateLeftOutPosition(),
                            maxHeight: '90vh',
                            width: 'auto'
                        },
                            ease: Power0.easeIn,
                            onComplete: positionImage,
                            delay: 0.5
                        });
                    } else {
                        TweenLite.to(window, .6, {scrollTo: {y: 0}, ease: Power2.easeOut});
                        var resetColumnView = function () {
                            positionImage();
                            projectView.style.opacity = '1';
                            element.style.zIndex = '1';
                            subOuter.style.opacity = '1';
                        }
                        portfolio.style.opacity = '0';
                        projectView.style.zIndex = '3';
                        projectImg.style.left = bounding.left + 'px';
                        projectImg.style.maxHeight = '90vh';
                        document.body.appendChild(projectImg);
                        TweenLite.to(projectImg, 0.5, {css: {
                            top: '50px'
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