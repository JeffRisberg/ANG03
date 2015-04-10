var myApp = angular.module('myApp', ['ui.router', 'ngGrid', 'wj']);

myApp.config(function ($stateProvider, $urlRouterProvider) {

    // for any unmatched url, redirect to first link
    $urlRouterProvider.otherwise("/account");

    var account = {
        name: 'account',
        url: '/account',
        templateUrl: 'modules/account/templates/main.html'
    };
    var accountList = {
        name: 'account.list',
        url: '/list',
        templateUrl: 'modules/account/templates/list.html'
    };
    var accountEdit = {
        name: 'account.edit',
        url: '/edit/:id',
        templateUrl: 'modules/account/templates/edit.html'
    };

    var campaign = {
        name: 'campaign',
        url: '/campaign',
        templateUrl: 'modules/campaign/templates/main.html'
    };
    var campaignList = {
        name: 'campaign.list',
        url: '/list',
        templateUrl: 'modules/campaign/templates/list.html'
    };
    var campaignEdit = {
        name: 'campaign.edit',
        url: '/edit/:id',
        templateUrl: 'modules/campaign/templates/edit.html'
    };

    $stateProvider.state(account);
    $stateProvider.state(accountList);
    $stateProvider.state(accountEdit);

    $stateProvider.state(campaign);
    $stateProvider.state(campaignList);
    $stateProvider.state(campaignEdit);
});

myApp.directive('ang03Grid', [function () {
    return {
        restrict: 'AE',
        replace: true,
        scope: {
            itemsSource: '=',
            columnLayout: '=',
            itemFormatter: '=',
            selectionMode: '@',
            headersVisibility: '@'
        },
        template: '<div/>',

        link: function (scope, element, attrs) {

            // create flexgrid
            var flex = new wijmo.grid.FlexGrid(element[0]);

            // apply column layout
            if (scope.columnLayout) {
                var cols = scope.columnLayout;
                flex.autoGenerateColumns = false;
                for (var i = 0; i < cols.length; i++) {
                    flex.columns.push(new wijmo.grid.Column(cols[i]));
                }
            }

            // apply itemSource
            if (scope.itemsSource) {
                flex.itemsSource = scope.itemsSource;
            }

            if (scope.selectionMode) {
                flex.selectionMode = scope.selectionMode;
            }

            if (scope.headersVisibility) {
                flex.headersVisibility = scope.headersVisibility;
            }

            if (scope.itemFormatter) {
                flex.itemFormatter = scope.itemFormatter;
            }
        }
    }
}]);


myApp.factory("flash", ['$rootScope', function ($rootScope) {
    var queue = [];
    var currentMessage = "";

    $rootScope.$on("$stateChangeSuccess", function () {
        currentMessage = queue.shift() || "";
    });

    return {
        setMessage: function (message) {
            queue.push(message);
        },

        getMessage: function () {
            return currentMessage;
        }
    };
}]);

