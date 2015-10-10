var app = angular.module('pulse', ['ngMaterial' , 'ngToast']);
app.controller('home',function($scope,ngToast, $http){


    $scope.submit = function(){

        if($scope.qstring == null){
            ngToast.create('song name is required!');
        }
        else {
            var getreq = 'http://localhost:3000/search?qstring=' + ($scope.qstring.split(' ').join('%20'));
            $http.get(getreq).success(function(response){
                if(response.reply == "ok") {

                    $scope.songs = response.data;
                }
                else {
                    ngToast.create('Sorry song doesnt exist in the database');
                }
            });
        }
    }
});