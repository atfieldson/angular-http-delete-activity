const carApp = angular.module('CarApp', []);

carApp.controller('CarController', function ($http) {
    console.log('CarController is ready');
    const vm = this;
    vm.carData = [];
    vm.carToAdd = {};

    vm.getCarRepairs = function() {
        console.log('HERE');
        $http({
            method: 'GET',
            url: '/repair'
        }).then(function (response) {
            vm.carData = response.data; // cars from the server
        }).catch(function (error) {
            alert('unable to get car repairs');
        });
    }

    vm.addCarRepair = function (carIn) {
        console.log(carIn);
        $http({
            method: 'POST',
            url: '/repair',
            data: carIn
        }).then(function (response) {
            vm.getCarRepairs();
        }).catch(function (error) {
            alert('unable to post car repair');
        });
    }

    vm.updateRepair = function (carToUpdate) {
        $http({
            method: 'PUT',
            url: '/repair',
            params: carToUpdate
        }).then(function (response) {
            vm.getCarRepairs();
        });
    }

    vm.getCarRepairs();
});