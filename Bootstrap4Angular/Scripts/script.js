var app = angular.module('Bootstrap4Angular', ['ngRoute']);
app.config(function ($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'home.html'
        })
        .when('/about', {
            templateUrl: 'about.html'
        })
        .when('/blog', {
            templateUrl: 'Blog.html'
        })
        .when('', {
            templateUrl: 'index.html'
        })
        .when('/guessinggame', {
            templateUrl: 'guessingGame.html'
        })
      .otherwise({
          redirectTo: 'home'
      });
});

app.controller('cfgController', function ($scope, $location, $document) {


    $(document).ready(function () {
        $('#nav-icon2').click(function () {
            $(this).toggleClass('open');
        });
    });

    $scope.guessTheNumber = function () {
        $('.difficultySelect').remove();
        $('.guessTheNumberHidden').show();
    };


    $(document).on("keydown", '#guessInput', function (event) {
        if (event.which == 13)
            $('#guessButton').click();
    });

    $scope.reset = function () {
        window.location.hash = "guessinggame";
    };

    $scope.submitGuess = function () {
        if ($('#guessInput').val() == $scope.randomNumber) {
            $scope.result = "correct.";
            $('.btn.btn-primary').removeClass('btn-primary').addClass('btn-danger').text('Good Job!');
            $('.tryAgain').show();
            $('#guessInput, .helpfulMessage').hide();
            $('#guessButton').attr('disabled', 'true').css('float', 'left');
        } else if ($('#guessInput').val() > $scope.randomNumber) {
            $scope.result = "too high.";
        } else if ($('#guessInput').val() < $scope.randomNumber) {
            $scope.result = "too low.";
        } else {
            $scope.result = "NOT VALID!";
        }
    };

    $scope.easy = function () {
        $scope.randomNumber = Math.floor((Math.random() * 10) + 1);
        $scope.difficultyRange = "10.";
        $scope.guessTheNumber();
    };

    $scope.hard = function () {
        $scope.randomNumber = Math.floor((Math.random() * 100) + 1);
        $scope.difficultyRange = "100.";
        $scope.guessTheNumber();
    };

    var isDesktop = function () {
        if ($(window).width() > 735) {
            return true;
        } else
            return false;
    };

    var mobileNavigation = function () {
        if (isDesktop()) {
            return '0%';
        } else {
            return '75%';
        }
    };

    $(window).resize(function () {
        if ($('html').hasClass('navActive')) {
            page.animate({ 'padding-left': mobileNavigation() }, 600, 'easeInOutBack');
        }
    });

    $(function () {
        $("#nav-icon2").click(function () {
            if ($('#menu').hasClass('active')) {
                menuClose();
            } else {
                menuOpen();
            }
        }); 
    });
    var menu = $('#menu');
    var page = $('#page');

    var menuClose = function (arg) {
        arg = arg || [];
        menu.animate({ left: '-100%' }, 500, 'easeInOutQuart');
        menu.toggleClass('active');
        page.animate({ 'padding-left': 40 }, 600, 'easeInOutBack');
        setTimeout(function () { $('html').toggleClass('navActive'); }, 300);
        if (arg == 1) {
            $('#nav-icon2').removeClass('open');
        }
    };

    var menuOpen = function() {
        menu.animate({ left: 0 }, 500, 'easeInOutQuart');
        menu.toggleClass('active');
        setTimeout(function() { $('html').toggleClass('navActive'); }, 300);
        page.animate({ 'padding-left': mobileNavigation() }, 600, 'easeInOutBack');
    };
    

    menu.on('click', function(e) {
        e.stopPropagation();
    });

    var closeMenuOnHtmlClick = function () {
        $(document).on('click', '.navActive', function () {
            if (menu.hasClass('active')) {
                menuClose(1);
            }
        });
    }();

    $scope.submitTrivia = function () {
        var questionOneAnswer = ["Woof", "woof"];
        var questionTwoAnswer = ["Meow", "meow"];
        $(/.question/).removeClass(/btn/);
        if (questionOneAnswer.indexOf($('.questionOne').val()) !== -1)
        {
            $('.questionOne').addClass('btn-success');
        } else {
            $('.questionOne').addClass('btn-danger');
        }
        if (questionTwoAnswer.indexOf($('.questionTwo').val()) !== -1){
            $('.questionTwo').addClass('btn-success');
        } else {
            $('.questionTwo').addClass('btn-danger');
        }
    };

    $scope.$on('$locationChangeSuccess', function (event) {
        $(function () {
            $("#page").removeClass(function (index, css) {
                return (css.match(/(^|\s)loc\S+/g) || []).join(' ');
            });
            var urltest = document.URL;
            var urls = [
                    "about",
                    "calc",
                    "home",
                    "guessinggame",
                    "getstarted"
            ];

            function isIndex() {
                if (window.location.hash == "") {
                    return true;
                } else {
                    return false;
                }
            };

            for (var i = 0; i < urls.length; i++) {
                var match = urltest.indexOf(urls[i]);
                if (match != -1) {
                    $('#page').addClass('loc' + urls[i]);
                }
            }

            if (isIndex()) {
                $('#page').addClass('locIndex');
            }
            if (!isIndex()) {
                $('#page').removeClass('locIndex');
            }
        });
    });


    /*     
    Here you can handle controller for specific route as well.
    */
});

