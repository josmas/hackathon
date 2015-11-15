var clariafi = angular.module('clarifai', ['chart.js']);

clariafi.controller('ImagesListCtrl', function ($scope, $http, $parse, $timeout, $location) {
  console.log('ImagesListCtrl is loaded');
//  $http.get('data/thumb_standard.json').success(function(foo) { 
//    $scope.images = _.object(_.map(foo, function(item,x,k) {
//             return [x, _.map(item, function(inner){ return inner.thumbnail})];}))
//  });
  $http.get('data/all_data_50.json').success(function(foo) { 
    $scope.food = _.map(foo, function(item) { return [item.url, item.result.tag.classes] });
    $scope.noFood = _.filter($scope.food, function(item) { return (_.contains(item[1], 'food')); })

    $scope.healthy = _.filter($scope.food, function(item) { return (_.contains(item[1], 'healthy')); })

    $scope.tasty = _.filter($scope.food, function(item) { return (_.contains(item[1], 'delicious')); })

    $scope.images = $scope.food;
  });

  $scope.foodToggle = 'Filter by Food tag';
  var toggleFood = true;
  $scope.filterFood = function(){
    console.log('clicking me');
    if (toggleFood) {
      $scope.images = $scope.noFood;
      $scope.foodToggle = 'Show no Foods again';
      toggleFood = false;
    }
    else {
      $scope.images = $scope.food;
      $scope.foodToggle = 'Filter by Food tag';
      toggleFood = true;
    }
  };

  $scope.healthyToggle = 'Filter by Healthy food';
  var toggleHealthy = true;
  $scope.filterHealthy = function(){
    if (toggleHealthy) {
      $scope.images = $scope.healthy;
      $scope.healthyToggle = 'Show non healthy Foods again';
      toggleHealthy = false;
    }
    else {
      $scope.images = $scope.food;
      $scope.healthyToggle = 'Filter by Healthy food';
      toggleHealthy = true;
    }
  };

  $scope.tastyToggle = 'Filter by Tasty food';
  var toggleTasty = true;
  $scope.filterTasty = function(){
    if (toggleTasty) {
      $scope.images = $scope.tasty;
      $scope.tastyToggle = 'Show non tasty Foods again';
      toggleTasty = false;
    }
    else {
      $scope.images = $scope.food;
      $scope.tastyToggle = 'Filter by Tasty food';
      toggleTasty = true;
    }
  };

  $scope.showDetail = function(index){
    console.log('el index: ' + index);
    var model = $parse('showTags.i' + index);
    model.assign($scope, true);
    $timeout(function(){ model.assign($scope, false); }, 2000);
  }

  $scope.loginInstagram = function(){
    var client_id = 'f59eb792e0f04da0a64c7158a1bb7d9e';
    console.log('gonna login');
    window.open("https://instagram.com/oauth/authorize/?client_id=" + client_id +
                "&redirect_uri=http://localhost:8080/example.html&response_type=token", "igPopup");
  };

});

clariafi.controller('ExampleController', function ($scope, $timeout) {
  $scope.example = {
    text: 'http://pickyeaterblog.com/wp-content/uploads/2009/06/IMG_3930.jpg',
    word: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
  };

  $scope.trainModel = function(){
    init();
    positive();
    negative()
    train();
  };

  $scope.sendRequest = function(url) {
    console.log(url);
    predict(url, function(res){ // library does not send error FIXME
      console.log(res);
      $scope.healthProb = res;
      $scope.data = [ res.score * 100, (100 - res.score * 100) ];
      $scope.$digest();
    });

    getTags(url, function(res){
      console.log(res);
      $scope.dataIngredients = _.map(res, function(item){ return item * 100; });
      $scope.labelIngredients = _.keys(res);
      $scope.$digest();
    });
  };

  $scope.labels =["Healthy", "Tasty"];

//  $scope.data = [ $scope.healthProb, ( 1 - $scope.healthProb ) ];
  $scope.data = [ 75, 25 ];
  $scope.colours = [ '#4A7023', '#FF0000' ];
});
