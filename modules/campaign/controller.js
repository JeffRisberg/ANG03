myApp.controller("CampaignCtrl", ['$scope', '$interpolate', '$compile', '$state', function ($scope, $interpolate, $compile, $state) {

    var accounts = ['Google', 'Google', 'Bing'];
    var names = "Travel:Cruises,Travel:Hotel,Travel:Other,Car:Ford,Car:Chevrolet,Car:Kia,Car:Honda,Fall Promotion,Winter Promotion".split(',');
    var statuses = "Active,Disabled,Removed,Completed".split(',');

    var dataList = [];

    for (var i = 0; i < 100; i++) {
        var account = accounts[Math.floor(Math.random() * accounts.length)];
        var publisher = account + "Test";
        var name = names[i % names.length];
        var status = statuses[Math.floor(Math.random() * statuses.length)];
        var searchBid = 1.45 + 34.9 * Math.random();

        var impressions = Math.floor(Math.random() * 10000);
        var ctr = 0.05 + 0.05 * Math.random();
        var clicks = Math.floor(impressions * ctr);
        var cost = Math.random() * 45.0;
        var revenue = cost * 10.0 * Math.random();

        dataList.push({
            id: i + 1,
            account: account,
            publisher: publisher,
            name: name,
            endDate: new Date(2015, i % 12, 1 + (i % 28)),
            status: status,
            searchBid: searchBid,
            impressions: impressions,
            clicks: clicks,
            ctr: ctr,
            cpc: 0.03,
            cost: cost,
            revenue: revenue
        })
    }

    $scope.campaigns = dataList;

    $scope.campaignCollection = new wijmo.collections.CollectionView(dataList);
    $scope.campaignCollection.pageSize = 20;

    $scope.campaignColumnLayout = [
        {header: "Id", binding: "id"},
        {header: "Name", binding: "name"},
        {header: "Account", binding: "account" },
        {header: "Publisher", binding: "publisher"},
        {header: "Status", binding: "status"},
        {header: "End Date", binding: "endDate"},
        {header: "Search Bid", binding: "searchBid", format: "c"},
        {header: "Ad Rotation", binding: "adRotation"},
        {header: "Impressions", binding: "impressions", format: 'n0'},
        {header: "Clicks", binding: "clicks", format: 'n0'},
        {header: "CTR", binding: "ctr", format: 'p2'},
        {header: "CPC", binding: "cpc", format: "c"},
        {header: "Cost", binding: "cost", format: "c"},
        {header: "Revenue", binding: "revenue", format: "c"}
    ];

    $scope.itemFormatter = function (panel, r, c, cell) {
        if (panel.cellType == wijmo.grid.CellType.Cell) {
            var flex = panel.grid;

            if (c == 1) {
                $scope.$item = panel.rows[r].dataItem;

                var template = '<a ng-click="editCampaign({{$item.id}})">{{$item.name}}</a>';
                var innerHTML = $interpolate(template)($scope);

                cell.innerHTML = innerHTML;

                $compile(cell)($scope);
            }
        }
    };

    $scope.editCampaign = function (id) {
        $scope.campaign = null;

        // Find the campaign in the collection
        for (var i = 0; i < $scope.campaignCollection.items.length; i++) {
            var campaign = $scope.campaignCollection.items[i];

            if (campaign.id == id) {
                $scope.campaign = campaign;
                break;
            }
        }

        if ($scope.campaign !== null) {
            $state.go("campaign.edit");
        }
    };
}]);
