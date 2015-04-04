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
        url: '/edit',
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
        url: '/edit',
        templateUrl: 'modules/campaign/templates/edit.html'
    };

    $stateProvider.state(account);
    $stateProvider.state(accountList);
    $stateProvider.state(accountEdit);

    $stateProvider.state(campaign);
    $stateProvider.state(campaignList);
    $stateProvider.state(campaignEdit);
});