/* global chroma */
'use strict';

/* Controllers */

angular.module('myApp.controllers', ['colorpicker.module'])
    .controller('Cpick', ['$scope','$http',function($scope,$http) {
        $scope.languages = ["ruby","go","python","haskell","javascript"];
        $scope.prevlang = "ruby";
        $scope.adjustbg = false;

        $scope.faces = {
            deffacefg : "#303030", deffacebg : "#ffffff",
            keywordface : "#000000", builtinface : "#000000",
            stringface : "#000000", functionnameface : "#000000",
            typeface : "#000000", constantface : "#000000",
            variableface : "#000000", warningface : "#ff0000",
            commentface : "#606060"
        };
        $scope.setRandomFaces = function(data) {
            $scope.faces.keywordface = data.randkey;
            $scope.faces.builtinface= data.randbuiltin;
            $scope.faces.stringface = data.randstring;
            $scope.faces.functionnameface = data.randfuncname;
            $scope.faces.typeface= data.randtype;
            $scope.faces.constantface = data.randconst;
            $scope.faces.variableface = data.randvariable;
        };


        $scope.getRandomColWarm = function() {
            // xmlhttprequest to get a palette of 7 distinct warm colors
            // using go-colorful's WarmPalette method.
            $http.get('/randomcolorswarm').
                success(function(data) {
                    $scope.setRandomFaces(data);
                });
        };
        $scope.getRandomColSoft = function() {
            $http.get('/randomcolorssoft').
                success(function(data) {
                    $scope.setRandomFaces(data);
                });
        };
        $scope.getRandomColHappy = function() {
            $http.get('/randomcolorshappy').
                success(function(data) {
                    $scope.setRandomFaces(data);
                });
        };

        $scope.darkBg = function(color) {
            return chroma(color).luminance() <=0.5;
        };

        var facenames = ["deffacefg","commentface","keywordface",
                                 "builtinface","stringface","functionnameface",
                         "typeface","constantface","variableface"];
        $scope.decContrast = function() {
            if ($scope.darkBg($scope.faces.deffacebg)) {
                if ($scope.adjustbg) {
                    $scope.faces.deffacebg = chroma($scope.faces.deffacebg).brighten(1).hex();
                }
                for (var i = 0;i<facenames.length;i++) {
                    $scope.faces[facenames[i]] = chroma($scope.faces[facenames[i]]).darken(1).hex();
                }
            } else {
                if ($scope.adjustbg) {
                    $scope.faces.deffacebg = chroma($scope.faces.deffacebg).darken(1).hex();
                }
                for ( i=0;i<facenames.length;i++) {
                    $scope.faces[facenames[i]] = chroma($scope.faces[facenames[i]]).brighten(1).hex();
                }
            }

        };

        $scope.incContrast = function() {
            if ($scope.darkBg($scope.faces.deffacebg)) {
                if ($scope.adjustbg) {
                    $scope.faces.deffacebg = chroma($scope.faces.deffacebg).darken(1).hex();
                }

                for (var i=0;i<facenames.length;i++) {
                    $scope.faces[facenames[i]] = chroma($scope.faces[facenames[i]]).brighten(1).hex();
                }
            } else {
                if ($scope.adjustbg) {
                    $scope.faces.deffacebg = chroma($scope.faces.deffacebg).brighten(1).hex();
                }
                for (i=0;i<facenames.length;i++) {
                    $scope.faces[facenames[i]] = chroma($scope.faces[facenames[i]]).darken(1).hex();
                }
                                                       }
        };
    }]);
