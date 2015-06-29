(function () {
  'use strict';

  angular
    .module('austackApp.account')
    .service('ProfileService', ProfileService)
    .controller('ProfileController', ProfileController);

  ProfileService.$inject = ['$mdDialog', '$log'];

  function ProfileService($mdDialog, $log) {

    return {
      show: showProfile,
      hide: hideProfile
    };

    function showProfile(ev) {
      var dialog = $mdDialog.show({
        controller: 'ProfileController',
        controllerAs: 'vm',
        templateUrl: 'app/account/profile/profile.html',
        parent: angular.element(document.body),
        targetEvent: ev,
      }).then(function (answer) {
        $log.debug('You said the information was "' + answer + '".');
      }, function () {
        $log.debug('You cancelled the dialog.');
      });
    }

    function hideProfile() {
      return $mdDialog.hide();
    }
  }

  ProfileController.$inject = ['$mdDialog'];

  function ProfileController($mdDialog) {
    var vm = this;

    vm.hide = function () {
      $mdDialog.hide();
    };
    vm.cancel = function () {
      $mdDialog.cancel();
    };
    vm.answer = function (answer) {
      $mdDialog.hide(answer);
    };
  }

})();