/*jshint globalstrict:true */
/*global angular:true */
'use strict';

angular.module('elasticjs.controllers', [])
    .controller('SearchCtrl', function($scope, $location, ejsResource) {
        
        // point to your ElasticSearch server
        var ejs = ejsResource('http://localhost:9200');
        
        // setup the indices and types to search across
        var request = ejs.Request()
            .indices("twitter")
            .types("tweet");
        
        // define our search function that will be called when a user
        // submits a search
        $scope.search = function() {
            $scope.results = request
                .query(ejs.QueryStringQuery($scope.queryTerm || '*'))
                .doSearch();
                
            $location.path("/results");
            $scope.queryTerm = "";
        };
        
    });