// controllers.js
var app = angular.module('myApp', ['ngGrid']);

app.controller('HomeController', function ($scope) {

    $scope.myData = [
        {name: "Moroni", age: 50},
        {name: "Tiancum", age: 43},
        {name: "Jacob", age: 27},
        {name: "Nephi", age: 29},
        {name: "Enos", age: 34}
    ];

    $scope.gridOptions = {
        data: 'myData',
        columnDefs: [
            {field: 'name', displayName: 'Name'},
            {field: 'age', displayName: 'Age'}
        ]
    };
});