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
            var title = element.querySelector('.portfolio-title');
            var paddingTop = '60px';
            var projectImg;

            /**
             * get img width and height to fit into the img container,
             * respecting the aspect ratio
             */
            function calculateAspectRatio(srcWidth, srcHeight, maxWidth, maxHeight) {
                var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
                return { width: srcWidth * ratio, height: srcHeight * ratio };
            }

            var calculateImagePositioning = function (projectImg) {
                var bounding = document.querySelector('.bounding-element').getBoundingClientRect();
                var maxWidth = (bounding.width * 40) / 100;
                if (maxWidth < 400) {
                    maxWidth = 400;
                }
                var aspectRatio = calculateAspectRatio(
                    projectImg.width,
                    projectImg.height,
                    maxWidth - 30,
                    element.clientHeight - 100
                );
                var padding = (maxWidth - aspectRatio.width) / 2;

                var getLeftPosition = function () {
                    var leftPosition;
                    if ($scope.project.imagePosition === 'left') {
                        leftPosition = bounding.left + padding;
                    } else {
                        leftPosition = bounding.right - aspectRatio.width - padding;
                    }
                    return leftPosition;
                };

                var positioning = {
                    top: paddingTop,
                    left: getLeftPosition(),
                    maxHeight: (element.clientHeight - 10) + 'px',
                    width: aspectRatio.width + 'px',
                    padding: padding + 'px'
                };
                return positioning;
            };

            var positionImage = function (imgPositioning, projectImg) {
                var visualContainer = document.querySelector('.visual-container');
                visualContainer.style.paddingLeft = imgPositioning.padding;
                visualContainer.style.paddingTop = imgPositioning.top;
                //IE misery
                if (UAService.detectIE()) {
                    document.body.removeChild(document.querySelector('.project-img'));
                }
                visualContainer.appendChild(projectImg);
                projectImg.style.position = 'static';
            };


            $scope.$on('LOAD_PROJECT', function (event, project) {
                if (project.name === $scope.project.name) {
                    var flexDirection = window.getComputedStyle(portfolio, null).getPropertyValue('flex-direction') ||
                        window.getComputedStyle(portfolio, null).getPropertyValue('-webkit-flex-direction');
                    var imgBounding = previewImg.getBoundingClientRect();

                    title.style.visibility = 'hidden';
                    element.style.zIndex = '2';
                    projectView.style.backgroundColor = 'transparent';
                    projectImg = new Image();
                    projectImg.src = previewImg.src;
                    projectImg.style.top = imgBounding.top + 'px';
                    projectImg.width = previewImg.width;
                    projectImg.height = previewImg.height;
                    subOuter.style.opacity = '0';

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
                    }

                    var resetColumnView = function () {
                        positionImage();
                        projectView.style.opacity = '1';
                        element.style.zIndex = '1';
                        subOuter.style.opacity = '1';
                    }

                    if (flexDirection === 'row') {
                        var imgPositioning = calculateImagePositioning(projectImg);
                        element.style.borderLeft = '1px solid gray';
                        projectImg.classList.add('project-img');
                        var positionLeft;
                        if (!project.next) {
                            positionLeft = imgBounding.left;
                        } else {
                            projectImg.style.transform = 'scale(0.7)';
                            projectImg.style.top = '45px';
                            if($scope.project.imagePosition === 'left'){
                                 positionLeft = -420;
                            } else {
                                positionLeft = window.innerWidth - 420;
                            }
                            //scroll to top first
                            TweenLite.to(window, .6, {scrollTo: {y: 0}, ease: Power2.easeOut});
                        }
                        projectImg.style.left = positionLeft + 'px';
                        document.body.appendChild(projectImg);

                         var tll = new TimelineLite({onComplete: positionImage, onCompleteParams: [imgPositioning, projectImg], delay: 0.3});
                         TweenLite.to(element, 0.9, {css: {transform: 'scale(5,1)'}, ease: Power1.easeIn, onComplete: resetRowView });
                         tll.to(projectImg, .4, {css: {
                         height: imgPositioning.maxHeight,
                         width: 'auto',
                         top: '10px',
                         left: imgPositioning.left + 100 + 'px'
                         }})
                         .to(projectImg, .3, {css: {
                         height: 'auto',
                         width: imgPositioning.width,
                         top: paddingTop,
                         left: imgPositioning.left + 'px'
                         },
                         ease: Power0.easeIn
                         }
                         );
                    } else {
                        TweenLite.to(window, .6, {scrollTo: {y: 0}, ease: Power2.easeOut});

                        portfolio.style.opacity = '0';
                        projectView.style.zIndex = '3';
                        projectImg.style.left = imgBounding.left + 'px';
                        projectImg.style.maxHeight = '100vh';
                        projectImg.style.opacity = 0;
                        element.querySelector('.progress-button').style.visibility = 'visible';

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