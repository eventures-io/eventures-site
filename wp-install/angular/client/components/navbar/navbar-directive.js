'use strict';

angular.module('evtrs-site').directive('navbar', function(BlogResource, $state, $timeout) {
    return {
        restrict : 'E',
        templateUrl: 'components/navbar/navbar.html',
        controller: function($element, $scope){

            var menuElement = document.querySelector('.menu');

            BlogResource.getPosts().then(function(response){
                //TODO load only once
                $scope.posts = response.data;
                $scope.postImages = BlogResource.preloadImages(response.data);
            });

            $scope.openMenu = function() {
                menuElement.classList.add('menu-open');
            };

            $scope.closeMenu = function() {
                menuElement.classList.remove('menu-open');
                menuElement.style.backgroundImage='';
            };

            $scope.showPost = function(post){
                $scope.closeMenu();
                //TODO listen for animation end event
                $timeout(function(){
                    return   $state.go('post', {postId:post.ID, postTitle: post.title});
                }, 700);
            };

            $scope.getBackgroundStyle =  function(post) {
                return {'background-image':'url(' + post.featured_image.source + ')'}
            }

            $scope.bookmarkArticle = function(title) {
                var url = window.location.href;
                if(document.all) { // ie
                        $window.external.AddFavorite(url, title);
                    }
                    else if(window.sidebar) { // firefox
                        window.sidebar.addPanel(title, url, "");
                    }
                    else if(window.opera && window.print) { // opera
                        var elem = document.createElement('a');
                        elem.setAttribute('href',url);
                        elem.setAttribute('title',title);
                        elem.setAttribute('rel','sidebar');
                        elem.click(); // this.title=$document.title;
                    }
                }


        }
    }


});