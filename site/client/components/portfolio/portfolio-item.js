'use strict'

angular.module('evtrs-site').directive('portfolioItem', function ($rootScope, PROJECT_CONSTANTS, UAService) {

    return {
        templateUrl: 'components/portfolio/portfolio-item.html',
        scope: {},
        link: function (scope, element, attrs) {
            scope.project = {};
            scope.project.name = attrs.portfolioItem;
            var projectProperties = PROJECT_CONSTANTS[attrs.portfolioItem];
            element[0].style.backgroundColor = projectProperties.bgColor;
            scope.project.image = projectProperties.image.src;
            var subOuter = element[0].querySelector('.sub-outer');
            subOuter.style.height = projectProperties.outerHeight;
            subOuter.style.backgroundColor = projectProperties.bgColor;
            var subInner = element[0].querySelector('.sub-inner');
            subInner.style.paddingTop = projectProperties.image.paddingTop;
            scope.project.imagePosition = projectProperties.position;
        },
        controller: function ($scope, $element) {
            var element = $element[0];
            var subOuter = element.querySelector('.sub-outer');
            var projectView = document.querySelector('.project-view');
            var previewImg = element.querySelector('.preview-img');
            var portfolio = document.querySelector('.portfolio-section');
            var portfolioTitle = element.querySelector('.portfolio-title');
            var paddingTop = 60;


            /**
             * get img width and height to fit into the img container,
             * respecting the aspect ratio
             */
            function calculateAspectRatio(srcWidth, srcHeight, maxWidth, maxHeight) {
                var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
                return { width: srcWidth * ratio, height: srcHeight * ratio };
            }

            var calculateImagePositioning = function (projectImg, mobileView) {
                var bounding = document.querySelector('.bounding-element').getBoundingClientRect();
                var maxWidth;
                if (mobileView) {
                    maxWidth = bounding.width;
                } else {
                    maxWidth = Math.round((bounding.width * 40) / 100);
                    if (maxWidth < 400) {
                        maxWidth = 400;
                    }
                }
                var aspectRatio = calculateAspectRatio(
                    projectImg.width,
                    projectImg.height,
                    maxWidth - 30,
                    window.innerHeight - 120
                );
                var padding;
                if (mobileView) {
                    padding = 0;
                } else {
                    padding = Math.round((maxWidth - aspectRatio.width) / 2);
                }

                var getLeftPosition = function () {
                    var leftPosition;
                    if (mobileView) {
                        leftPosition = padding;

                    } else {

                        if ($scope.project.imagePosition === 'left') {
                            leftPosition = Math.round(bounding.left + padding);
                        } else {
                            leftPosition = Math.round(bounding.right - aspectRatio.width - padding);
                        }
                    }
                    return leftPosition;
                };

                var positioning = {
                    top: paddingTop,
                    left: getLeftPosition(),
                    maxHeight: (element.clientHeight - 10),
                    width: Math.round(aspectRatio.width),
                    padding: padding
                };
                return positioning;
            };

            var positionImage = function (imgPositioning, projectImg) {
                var visualContainer = document.querySelector('.visual-container');
                visualContainer.style.paddingLeft = imgPositioning.padding + 'px';
                visualContainer.style.paddingTop = imgPositioning.top + 'px';
                //IE misery
                if (UAService.detectIE()) {
                    document.body.removeChild(document.querySelector('.project-img'));
                }
                visualContainer.appendChild(projectImg);
                projectImg.style.position = 'static';
            };

            var scrollToTop = function (onCompleteFunction) {
                TweenLite.to(window, .6, {scrollTo: {y: 0}, ease: Power2.easeOut, onComplete: onCompleteFunction});
            };

            $scope.$on('LOAD_PROJECT', function (event, project) {
                if (project.name === $scope.project.name) {

                    var flexDirection = window.getComputedStyle(portfolio, null).getPropertyValue('flex-direction') ||
                        window.getComputedStyle(portfolio, null).getPropertyValue('-webkit-flex-direction');
                    var imgBounding = previewImg.getBoundingClientRect();

                    projectView.style.backgroundColor = 'transparent';
                    var projectImg = new Image();
                    projectImg.src = previewImg.src;
                    projectImg.width = previewImg.width;
                    projectImg.height = previewImg.height;
                    projectImg.classList.add('project-img');

                    var resetRowView = function () {
                        portfolio.style.opacity = '0';
                        projectView.style.opacity = '1';
                        projectView.style.zIndex = '3';
                        TweenLite.to(element, 0, {css: {transform: 'scale(1)'}});
                        element.style.borderLeft = 'none';
                        element.style.zIndex = '1';
                        subOuter.style.opacity = '1';
                        var progressButton = element.querySelector('.progress-button');
                        progressButton.style.visibility = 'visible';
                        portfolioTitle.style.visibility = 'visible';
                    }

                    var resetColumnView = function () {
                        projectView.style.opacity = '1';
                        var circleProgress = element.querySelector('.circle-progress');
                        circleProgress.classList.remove('circle-animate');
                        circleProgress.style.strokeDashoffset = 615;
                    }

                    if (flexDirection === 'row') {
                        var progressButton = element.querySelector('.progress-button');
                        progressButton.style.visibility = 'hidden';
                        portfolioTitle.style.visibility = 'hidden';
                        subOuter.style.opacity = '0';
                        element.style.zIndex = '2';
                        var imgPositioning = calculateImagePositioning(projectImg, false);
                        element.style.borderLeft = '1px solid gray';
                        projectImg.style.top = imgBounding.top + 'px';
                        var positionLeft;
                        if (!project.next) {
                            positionLeft = imgBounding.left;
                        } else {
                            projectImg.style.opacity = 0;
                            projectImg.style.top = '45px';
                            if ($scope.project.imagePosition === 'left') {
                                positionLeft = imgPositioning.left;
                            } else {
                                positionLeft = imgPositioning.left + imgPositioning.padding;
                            }
                            //scroll to top first
                            scrollToTop();
                        }
                        projectImg.style.left = positionLeft + 'px';
                        document.body.appendChild(projectImg);

                        var tll = new TimelineLite({onComplete: positionImage, onCompleteParams: [imgPositioning, projectImg], delay: 0.3});
                        TweenLite.to(element, 0.9, {css: {transform: 'scale(5,1)'}, ease: Power1.easeIn, onComplete: resetRowView });
                        tll.to(projectImg, .4, {css: {
                            opacity: 1,
                            height: imgPositioning.maxHeight + 'px',
                            width: 'auto',
                            top: '10px',
                            left: imgPositioning.left + 100 + 'px'
                        }})
                            .to(projectImg, .3, {css: {
                                height: 'auto',
                                width: imgPositioning.width + 'px',
                                top: paddingTop + 'px',
                                left: imgPositioning.left + 'px'
                            },
                                ease: Power0.easeIn
                            }
                        );
                    } else {

                        var imgPositioning = calculateImagePositioning(projectImg, true);


                        var transitionProject = function () {
                            portfolio.style.opacity = 0;
                            projectView.style.zIndex = 3;
                            //document.body.appendChild(projectImg);
                            //TweenLite.to(element, 0.9, {css: {transform: 'scale(1,5)'}, ease: Power1.easeIn, onComplete: resetColumnView });
                            positionImage(imgPositioning, projectImg);
                            resetColumnView();
                        }

                        scrollToTop(transitionProject);
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