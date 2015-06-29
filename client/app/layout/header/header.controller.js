(function () {
  'use strict';

  angular
    .module('austackApp.layout')
    .controller('HeaderController', HeaderController);

  HeaderController.$inject = ['Auth', 'ProfileService', 'SettingsService'];
  /* @ngInject */
  function HeaderController(Auth, ProfileService, SettingsService) {
    var vm = this;

    vm.menus = [{
      text: '升级账户',
      url: '#'
    }, {
      text: '支持和帮助',
      url: '#'
    }, {
      text: '文档',
      url: '#'
    }];

    vm.user = Auth.getCurrentUser();
    vm.user.avatar = 'assets/images/profile.png';

    vm.profile = profile;
    vm.setting = setting;
    vm.logout = logout;

    function profile() {
      ProfileService.show();
    }

    function setting() {
      SettingsService.show();
    }

    function logout() {
      Auth.logout();
    }
  }
})();