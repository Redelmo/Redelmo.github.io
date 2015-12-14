angular.module('app', []);
angular.module('app').controller('mainCtrl', function ($scope) {
    $scope.user1 = {
        name: 'Luke Skywalker',
        address: {
            street: 'PO Box 123',
            city: 'Secret Rebel Base',
            planet: 'Yavin 4'
        },
        friends: [
            'Han',
            'Leia',
            'Chewbacca'
        ],
        level: 0
    };
    $scope.user2 = {
        name: 'Han Solo',
        address: {
            street: 'PO Box 123',
            city: 'Mos Eisley',
            planet: 'Tattoine'
        },
        friends: [
            'Luke',
            'Leia',
            'Chewbacca'
        ],
        level: 1
    };
    $scope.user1337 = {
        name: 'Adam',
        selected: false
    };

    $scope.size = 150;
    //console.log($scope);
});


angular.module('app').directive('userInfoCard', function () {
    return {
        templateUrl: "userInfoCard.html",
        restrict: "E",
        // This replaces the dodgy named element we created with a legit one, the surrounding div in userInfoCard here.
        replace: true,
        // Allows for the user to changed per usage of this directive. User is defined in the html.
        scope: {
            //This means that the user is passed into this scope named as the name user.
            user: '=',
            // This one passes the scope in and renames it as the string collapsed
            initialCollapsed: '@collapsed'
        },
        controller: function ($scope) {
            $scope.collapsed = ($scope.initialCollapsed === 'true');
            $scope.nextState = function () {
                $scope.user.level++;
                $scope.user.level = $scope.user.level % 4;
            };
            $scope.knightMe = function (user) {
                user.rank = "Knight";
            };
            $scope.collapse = function () {
                $scope.collapsed = !$scope.collapsed;
            };
            $scope.removeFriend = function (friend) {
                var idx = $scope.user.friends.indexOf(friend);
                if (idx > -1) {
                    $scope.user.friends.splice(idx, 1);
                }
            };
        }
    };
});

angular.module('app').directive('removeFriend', function () {
    return {
        restrict: 'E',
        templateUrl: 'removeFriend.html',
        scope: {
            notifyParent: '&method'
        },
        controller: function ($scope) {
            $scope.removing = false;
            $scope.startRemove = function () {
                $scope.removing = true;
            };
            $scope.cancelRemove = function () {
                $scope.removing = false;
            };
            $scope.confirmRemove = function () {
                $scope.notifyParent();
            };
        }
    };
});

angular.module('app').directive('inherited1', function () {
    return {
        scope: true,
        link: function (scope) {
            console.log('inherited1', scope);
        }
    };
});

angular.module('app').directive('inherited2', function () {
    return {
        scope: true,
        link: function (scope) {
            console.log('inherited2', scope);
        }
    };
});

angular.module('app').directive('address', function () {
    return {
        restrict: 'E',
        scope: true,
        templateUrl: 'address.html',
        controller: function ($scope) {
            $scope.collapsed = false;
            $scope.collapseAddress = function () {
                $scope.collapsed = true;
            };
            $scope.expandAddress = function () {
                $scope.collapsed = false;
            };
        }
    };
});

// Video Module controller

angular.module('app').controller('videoCtrl', function ($scope) {
    $scope.messages = [];
    $scope.handlePause = function (e) {
        console.log(e);
        $scope.messages.push({ text: 'Paused!' });
        console.log('Paused Video!');
    };
});

angular.module('app').directive('eventPause', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, el, attrs) {
            var fn = $parse(attrs['eventPause']);
            el.on('pause', function (event) {
                // Digest cycle to alert angular about events that have happened outside of angulars knowledge, i.e, HTML5 events
                scope.$apply(function () {
                    fn(scope, { evt: event });
                });
            });
        }
    };
});

angular.module('app').directive('spacebarSupport', function () {
    return {
        restrict: 'A',
        link: function (scope, el, attrs) {
            $('body').on('keypress', function (evt) {
                var vidEl = el[0];
                if (evt.keyCode === 13) {
                    if (vidEl.paused) {
                        vidEl.play();
                    } else {
                        vidEl.pause();
                    }
                }
            });
        }
    };
});

// Click module controller
angular.module('app').controller('clickCtrl', function ($scope) {
    $scope.data = { message: "I have not been clicked" };
    $scope.clickHandler = function (p) {
        p.message = "I have been clicked";
    };
});

angular.module('app').directive('myClick', function ($parse) {
    return {
        link: function (scope, el, attrs) {
            var fn = $parse(attrs['myClick']);
            el.on('click', function () {
                scope.$apply(function () {
                    fn(scope);
                });
            });
        }
    };
});

angular.module('app').directive('userTile', function () {
    return {
        restrict: 'E',
        scope: {
            user: '='
        },
        templateUrl: 'userTile.html'
    };
});

angular.module('app').directive('userClickSelect', function () {
    return {
        link: function (scope, el, attrs) {
            el.on('click', function () {
                scope.user.selected = !scope.user.selected;
                scope.$apply();
            });
        }
    };
});

// Adds a watcher for the font scale directive and passes in the value of it, which is the size entered in the input
angular.module('app').directive('fontScale', function () {
    return {
        link: function (scope, el, attrs) {
            scope.$watch(attrs['fontScale'], function (newVal) {
                el.css('font-size', newVal + '%');
            });
        }
    };
});


angular.module('app').directive('stateDisplay', function () {
    return {
        link: function (scope, el, attrs) {
            var parms = attrs['stateDisplay'].split(' ');
            var linkVar = parms[0];
            var classes = parms.slice(1);
            scope.$watch(linkVar, function (newVal) {
                el.removeClass(classes.join(' '));
                el.addClass(classes[newVal]);
            });
        }
    };
});
