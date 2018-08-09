const myApp = angular.module('CarApp', []);

myApp.controller('CarController', function($http) {
    // onReady for our controller
    // ALL OF OUR CODE GOES HERE
    console.log('CarController is ready');
    const vm = this;
    vm.carData = [];
    vm.carToAdd = {car: 'Outback', 
                   miles: 12345, 
                   repair:'tires', 
                   cost: 800};
    // vm.addCarRepair(vm.carToAdd) // WILL FAIL!!!!
    // FUNCTION EXPRESSION
    vm.addCarRepair = function(carIn) {
        console.log(carIn);
        $http({
            method: 'POST',
            url: '/repair',
            data: carIn
        }).then(function(response) {
            getCarRepairs();
        }).catch(function(error) {
            alert('unable to post car repair');
        })
    }
    getCarRepairs();

    vm.completeRepair = function(repairId){
        $http({
            method: 'PUT',
            url: '/repair/repairComplete/' + repairId
        }).then(function(response) {
            getCarRepairs();
        })
    }

    // FUNCTION DECLARATION
    function getCarRepairs() {
        console.log('HERE');
        $http({
            method: 'GET',
            url: '/repair'
        }).then(function(response) {
            vm.carData = response.data; // cars from the server
        }).catch(function(error) {
            alert('unable to get car repairs');
        })
    }
});