app.controller("fieldEditorGoogleMapSetting",
[
    "$scope", "$q", "languagesService", "$filter",
    function($scope, $q, languagesService, $filter) {
        "use strict";

        $scope.model.option = $scope.model.option || {};
        $scope.model.option.mapApiKey = $scope.model.option.mapApiKey || '';
        $scope.modelServer = {}
        angular.copy($scope.model, $scope.modelServer);
    }
]);