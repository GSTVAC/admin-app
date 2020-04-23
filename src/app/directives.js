'use strict';

var module = angular.module('supportAdminApp');

//Directive used to set metisMenu and minimalize button
module
    .directive('sideNavigation', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element) {
                // Call metsi to build when user signup
                scope.$watch('authentication.user', function() {
                    $timeout(function() {
                        element.metisMenu();
                    });
                });

            }
        };
    })
    .directive('minimalizaSidebar', function ($timeout) {
        return {
            restrict: 'A',
            template: '<a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="" ng-click="minimalize()"><i class="fa fa-bars"></i></a>',
            controller: function ($scope, $element) {
                $scope.minimalize = function () {
                    angular.element('body').toggleClass('mini-navbar');
                    if (!angular.element('body').hasClass('mini-navbar') || angular.element('body').hasClass('body-small')) {
                        // Hide menu in order to smoothly turn on when maximize menu
                        angular.element('#side-menu').hide();
                        // For smoothly turn on menu
                        $timeout(function () {
                            angular.element('#side-menu').fadeIn(500);
                        }, 100);
                    } else {
                        // Remove all inline style from jquery fadeIn function to reset menu state
                        angular.element('#side-menu').removeAttr('style');
                    }
                };
            }
        };
    })
    .directive('findUser', function (UserService, Alert, $rootScope) {
        return {
            restrict: 'A',
            link: function (scope, element, attributes) {
                element.on('blur', function () {
                    var handle = $(this).val();
                    if (handle && handle.length) {
                        UserService.find({
                            filter: 'handle=' + handle
                        }).then(function (data) {
                            var id = '';
                            if (data.length) {
                                id = data[0].id;
                            } else {
                                Alert.error('Can not find ID with handle : ' + handle, $rootScope);
                            }
                            scope.newResource.userId = id;
                        })
                    }
                });
            }
        };
    })
    // disable keyboard input event on single element
    .directive('disableKeyboard', function () {
        return {
            restrict: 'AE',
            link: function (scope, element, attributes) {                
                $(element).keypress(function (event) {                    
                    event.preventDefault();
                    event.stopPropagation();
                    return false;
                });
            }
        };
    });

// Restrict input keystrokes
module
    .directive('numbersOnly', function(){
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attrs, modelCtrl) {
    
                modelCtrl.$parsers.push(function (inputValue) {
                    var transformedInput = inputValue ? inputValue.replace(/\D/g,'') : null;
    
                    if (transformedInput!=inputValue) {
                        modelCtrl.$setViewValue(transformedInput);
                        modelCtrl.$render();
                    }
    
                    return transformedInput;
                });
            }
        };
    });