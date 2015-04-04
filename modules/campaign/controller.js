myApp.controller("CampaignCtrl", ['$scope', '$state', function ($scope, $state) {

    var accounts = ['Google', 'Google', 'Bing'];
    var names = "Travel:Cruises,Travel:Hotel,Travel:Other,Car:Ford,Car:Chevrolet,Car:Kia,Car:Honda,Fall Promotion,Winter Promotion".split(',');

    var dataList = [];

    for (var i = 0; i < 100; i++) {
        var account = accounts[Math.floor(Math.random() * accounts.length)];
        var publisher = account + "Test";
        var name = names[i % names.length];

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
            startDate: new Date(2015, i % 12, 1 + (i % 28)),
            active: i % 4 == 0,
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
    $scope.campaignCollection.pageSize = 10;

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
