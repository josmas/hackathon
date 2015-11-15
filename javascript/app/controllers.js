var clariafi = angular.module('clarifai', []);

clariafi.controller('ImagesListCtrl', function ($scope, $http, $parse, $timeout) {
  console.log('ImagesListCtrl is loaded');
//  $http.get('data/thumb_standard.json').success(function(foo) { 
//    $scope.images = _.object(_.map(foo, function(item,x,k) {
//             return [x, _.map(item, function(inner){ return inner.thumbnail})];}))
//  });
  $http.get('data/all_data_50.json').success(function(foo) { 
    $scope.food = _.map(foo, function(item) { return [item.url, item.result.tag.classes] });
    $scope.noFood = _.filter($scope.food, function(item) { return (_.contains(item[1], 'food')); })

    $scope.images = $scope.food;
  });

  $scope.foodToggle = 'Filter by Food tag';
  var toggle = true;
  $scope.filterFood = function(){
    console.log('clicking me');
    if (toggle) {
      $scope.images = $scope.noFood;
      $scope.foodToggle = 'Show no Foods again';
      toggle = false;
    }
    else {
      $scope.images = $scope.food;
      $scope.foodToggle = 'Filter by Food tag';
      toggle = true;
    }
  };

  $scope.showDetail = function(index){
    console.log('el index: ' + index);
    var model = $parse('showTags.i' + index);
    model.assign($scope, true);
    $timeout(function(){ model.assign($scope, false); }, 2000);
  }

});
