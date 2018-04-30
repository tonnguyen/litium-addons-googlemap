app.controller("fieldEditorGoogleMap", [
    "$scope", "$q", "languagesService", "$filter",
    function($scope, $q, languagesService, $filter) {
        "use strict";

        $scope.setEditLanguage = function(language) {
            $scope.editLanguage = language;
        }

        $scope.setViewLanguage = function(language) {
            $scope.viewLanguage = language;
        }

        $scope.getFrameSource = function (fieldId, language, mode) {
            var key = this._getKey(mode, language);
            var sessionLocation = $scope._location[key];
            var value = $scope.model.fields[fieldId] ? $scope.model.fields[fieldId][language] : null;
            var location = sessionLocation || value;
            var zoom = $scope._zoom[key] || 10;
            var lat = location ? location.lat : 0;
            var lng = location ? location.lng : 0;
            var markerLat = value ? value.lat : 0;
            var markerLng = value ? value.lng : 0;
            var mapApiKey = $scope.model.formField.options.mapApiKey;
            var url = '/Litium/UI/frame/GoogleMapAddOn%23GoogleMap?${mapApiKey}&${fieldId}&${language}&${lat}&${lng}&${markerLat}&${markerLng}&${zoom}&${mode}';
            return url.replace('${mapApiKey}', 'mapApiKey=' + mapApiKey)
                    .replace('${fieldId}', 'fieldId=' + fieldId)
                    .replace('${language}', 'language=' + language)
                    .replace('${lat}', 'lat=' + lat)
                    .replace('${lng}', 'lng=' + lng)
                    .replace('${markerLat}', 'markerLat=' + markerLat)
                    .replace('${markerLng}', 'markerLng=' + markerLng)
                    .replace('${zoom}', 'zoom=' + zoom)
                    .replace('${mode}', 'mode=' + mode)
                    ;
        }

        window.addEventListener("message", receiveMessage, false);
		function receiveMessage(event) {
            if (event.origin != window.location.origin && event.data.source != 'googleMap') {
                return;
			}
            var data =  event.data.value,
                action = data.action,
                value = data.value,
                fieldId = data.fieldId,
                mode = data.mode,
                language = data.language;
            switch (action) {
                case 'onLocationChoose':
                    $scope.model.fields[fieldId] = $scope.model.fields[fieldId] || {};
                    $scope.model.fields[fieldId][language] = value;
                    $scope.$apply();
                    break;
                case 'onCenterChange':
                    $scope._location[this._getKey(mode, language)] = value;
                    break;
                case 'onZoomChange':
                    $scope._zoom[this._getKey(mode, language)] = value;
                    break;
            }
		}

        $scope._location = {};
        $scope._zoom = {};
        $scope._getKey = function (mode, language) {
            return mode + '-' + language;
        }

        // scope init
        $scope.$watch("model.formField.editable", function(v) {
            if (v === true) {
                if ($scope.model.culture) {
                    var parentLanguage = $filter("filter")($scope.languageList, { id: $scope.model.culture }, true);
                    if (parentLanguage && parentLanguage.length > 0) {
                        $scope.editLanguage = parentLanguage[0];
                        var notParentLanguage = $filter("filter")($scope.languageList, { id: !$scope.model.culture }, true);
                        if (notParentLanguage && notParentLanguage.length > 0) {
                            $scope.viewLanguage = notParentLanguage[0];
                        }
                    }
                }
            }
        });

        languagesService.getCultures().then(function(data) {
            $scope.languageList = data.map(function(item) {
                return { id: item.id, value: item.title };
            });

            if ($scope.model.culture) {
                var parentLanguage = $filter("filter")($scope.languageList, { id: $scope.model.culture }, true);
                if (parentLanguage && parentLanguage.length > 0) {
                    $scope.editLanguage = parentLanguage[0];
                    var notParentLanguage = $filter("filter")($scope.languageList, { id: !$scope.model.culture }, true);
                    if (notParentLanguage && notParentLanguage.length > 0) {
                        $scope.viewLanguage = notParentLanguage[0];
                    }
                }
            }

            if (!$scope.editLanguage || $scope.languageList.indexOf($scope.editLanguage) === -1) {
                $scope.editLanguage = $scope.languageList[0];
            }
            if (!$scope.viewLanguage) {
                $scope.viewLanguage = $scope.languageList[$scope.languageList.length > 1 ? 1 : 0];
            }
        }, angular.noop);
    }
]);