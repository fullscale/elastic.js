/*jshint jquery:true */

(function () {
  'use strict';

  // setup elastic.js client for jQuery
  ejs.client = ejs.jQueryClient('http://localhost:9200');
  
  $(function () {
    
    // grab the templates and compile them only once
    var searchTmpl = _.template($('#searchTmpl').html()),
      resultsTmpl = _.template($('#resultsTmpl').html()),
      viewport = $('#viewport'),
      
      // setup the indices and types to search across
      request = ejs.Request({indices: 'twitter', types: 'tweet'}),
      
      // generates the elastic.js query and executes the search
      executeSearch = function (qstr) {
        request.query(ejs.QueryStringQuery(qstr || '*'))
          .doSearch(gotoResults);
      },
      
      // renders the main search page
      gotoSearch = function () {
        viewport.empty().append(searchTmpl({}))
          .find('#btnSearch')
          .click(function () {
            var txtSearch = $('#txtSearch');
            executeSearch(txtSearch.val());
            txtSearch.val('');
          });
      },
      
      // renders the results page
      gotoResults = function (results) {
        viewport.empty().append(resultsTmpl({results: results}))
          .find('#goBack')
          .click(function () {
            gotoSearch();
          });
      };
      
      // load the search page as the landing page
      gotoSearch();
  });
}).call(this);