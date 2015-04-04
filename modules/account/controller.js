myApp.controller('AccountCtrl', ['$scope', '$state', function ($scope, $state) {

    var names = "Paychex,Endurance,LearCapital,Dafiti,Atlassian,ShoeDazzle,Glasses.com,ZonaJobs.com,Alpha,Beta,Gamma,Delta,Zeta".split(',');
    var publishers = ['Google', 'Google', 'Google', 'Bing'];

    var dataList = [];

    for (var i = 0; i < 100; i++) {
        var name = names[i % names.length];
        var publisher = publishers[i % publishers.length];
        var accountId = "" + Math.floor(Math.random() * 100000);
        var impressions = Math.floor(Math.random() * 10000);
        var ctr = 0.05 + 0.05 * Math.random();
        var clicks = Math.floor(impressions * ctr);
        var cpm = 0.15 + 0.90 * Math.random();
        var cpc = 0.05 + 0.67 * Math.random();
        var cost = Math.random() * 45.0;
        var revenue = cost * 10.0 * Math.random();
        var testM = 0.95 + 5.0 * Math.random();

        dataList.push({
            id: i + 1,
            name: name,
            publisher: publisher,
            accountId: accountId,
            impressions: impressions,
            clicks: clicks,
            ctr: ctr,
            cpm: cpm,
            cpc: cpc,
            cost: cost,
            revenue: revenue,
            testM: testM
        })
    }

    $scope.accounts = dataList;

    // define cell templates
    var integerCT =
        '<div class="ngCellText ng-scope col8 colt8 ngAlignRight">{{row.entity[col.field] | number : 0}}</div>';
    var percentageCT =
        '<div class="ngCellText ng-scope col8 colt8 ngAlignRight">{{100 * row.entity[col.field] | number : 0}} %</div>';
    var currencyCT =
        '<div class="ngCellText ng-scope col8 colt8 ngAlignRight">{{row.entity[col.field] | currency}}</div>';
    var editObjectCT =
        '<div class="ngCellText ng-scope col8 colt8 ngAlignRight"><a ng-click="editAccount(row.entity[\'id\'])">{{row.entity[col.field]}}</a></div>';

    // configure the ng grid
    $scope.accountGridOptions = {
        data: 'accounts',
        enablePaging: true,
        pagingOptions: {pageSize: [50], pageSize: 50},
        showFooter: true,
        showSelectionCheckbox: true,
        selectWithCheckboxOnly: true,
        columnDefs: [
            {field: 'id', displayName: 'Id'},
            {field: 'name', displayName: 'Name', cellTemplate: editObjectCT},
            {field: 'publisher', displayName: 'Publisher'},
            {field: 'accountId', displayName: 'Account Id'},
            {field: 'impressions', displayName: 'Impressions', headerClass: 'ngAlignRight', cellTemplate: integerCT},
            {field: 'clicks', displayName: 'Clicks', headerClass: 'ngAlignRight', cellTemplate: integerCT},
            {field: 'ctr', displayName: 'CTR', headerClass: 'ngAlignRight', cellTemplate: percentageCT},
            {field: 'cpc', displayName: 'CPC', headerClass: 'ngAlignRight', cellTemplate: currencyCT},
            {field: 'cpm', displayName: 'CPM', headerClass: 'ngAlignRight', cellTemplate: currencyCT},
            {field: 'cost', displayName: 'Cost', headerClass: 'ngAlignRight', cellTemplate: currencyCT},
            {field: 'revenue', displayName: 'Revenue', headerClass: 'ngAlignRight', cellTemplate: currencyCT},
            {field: 'testM', displayName: 'TestM', headerClass: 'ngAlignRight', cellTemplate: currencyCT}
        ]
    };

    $scope.editAccount = function (id) {
        $scope.account = null;

        // Find the account in the collection
        for (var i = 0; i < $scope.accounts.length; i++) {
            var account = $scope.accounts[i];

            if (account.id == id) {
                $scope.account = account;
                break;
            }
        }

        if ($scope.account !== null) {
            $state.go("account.edit");
        }
    };

    $scope.addAccount = function () {
        $scope.accounts.push({title: $scope.addName, quantity: 1, price: $scope.addPrice});
        $scope.addName = "";
        $scope.addPrice = "";

        $state.go("account.add");
    };
}]);
