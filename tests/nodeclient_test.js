/*global require:true */
'use strict';

var NodeClient = require('../src/clients/elastic-node-client').NodeClient;

var defaultFormattedUrl = 'http://localhost:9200';

var
    // default http clients.
    http = require('http'),
    https = require('https');

exports.serverUrl = {
  ServerURL: function (test) {
    var nc = new NodeClient(defaultFormattedUrl);
    test.equal(nc.serverUrl(), defaultFormattedUrl);
    test.done();
  },
  ServerURLFromHostAndPort: function (test) {
    var nc = new NodeClient('localhost', 9200);
    test.equal(nc.serverUrl(), defaultFormattedUrl);
    test.done();
  },
  ServerURLFromHostAndNoPort: function (test) {
    var nc = new NodeClient('localhost');
    test.equal(nc.httpClient(), http);
    test.equal(nc.serverUrl(), 'http://localhost:80');
    test.done();
  },
  ServerHTTPS: function (test) {
    var httpsUrl = 'https://localhost:89200';
    var nc = new NodeClient(httpsUrl);
    test.equal(nc.serverUrl(), httpsUrl);
    test.equal(nc.httpClient(), https);
    test.done();
  },
  ServerURLSetupLater: function (test) {
    var nc = new NodeClient();
    test.equal(nc.httpClient(), undefined);
    test.equal(nc.serverUrl(defaultFormattedUrl), nc);
    test.equal(nc.serverUrl(), defaultFormattedUrl);
    test.equal(nc.httpClient(), http);
    test.done();
  }
};

var mockHttpClientFactory = function(test, testOptionsFct) {
  return {
    request: function(opt) {
      testOptionsFct(opt);
      return {
        end: function() {
          test.done();
        }
      };
    }
  };
};

exports.httpClient = {
  HttpClientGet: function(test) {
    var nc = new NodeClient(defaultFormattedUrl);
    var path = '/_search';
    var testOptionsFct = function(opt) {
      test.equal(opt.hostname, 'localhost');
      test.equal(opt.port, 9200);
      test.equal(opt.auth, undefined);
      test.equal(opt.method, 'GET');
      test.equal(opt.path, path + '?foo=bar');
      test.equal(opt.headers, undefined);
    };
    var mockHttpClient = mockHttpClientFactory(test, testOptionsFct);
    test.equal(nc.httpClient(mockHttpClient), nc);
    test.equal(nc.httpClient(), mockHttpClient);
    nc.get(path, { foo: 'bar' });
  },
  HttpClientGetAddSlashToPath: function(test) {
    var nc = new NodeClient(defaultFormattedUrl);
    var path = '_search';
    var testOptionsFct = function(opt) {
      test.equal(opt.path, '/' + path + '?foo=bar');
    };
    nc.httpClient(mockHttpClientFactory(test, testOptionsFct));
    nc.get(path, { foo: 'bar' });
  },
  HttpClientGetEmptyData: function(test) {
    var nc = new NodeClient(defaultFormattedUrl);
    var path = '/_search';
    var testOptionsFct = function(opt) {
      test.equal(opt.path, path);
    };
    nc.httpClient(mockHttpClientFactory(test, testOptionsFct));
    nc.get(path, {});
  },
  HttpClientGetNullData: function(test) {
    var nc = new NodeClient(defaultFormattedUrl);
    var path = '/_search';
    var testOptionsFct = function(opt) {
      test.equal(opt.path, path);
    };
    nc.httpClient(mockHttpClientFactory(test, testOptionsFct));
    nc.get(path, null);
  },
  HttpClientGetWithNonRootPathEndpoint: function(test) {
    var nc = new NodeClient(defaultFormattedUrl + '/__es');
    var path = '/_search';
    var testOptionsFct = function(opt) {
      test.equal(opt.path, '/__es' + path);
    };
    nc.httpClient(mockHttpClientFactory(test, testOptionsFct));
    nc.get(path);
  },
  HttpClientGetWithAuthenticatedEndpoint: function(test) {
    var nc = new NodeClient('http://user:password@localhost:9200');
    var path = '/_search';
    var testOptionsFct = function(opt) {
      test.equal(opt.auth, 'user:password');
      test.equal(opt.hostname, 'localhost');
      test.equal(opt.port, 9200);
    };
    nc.httpClient(mockHttpClientFactory(test, testOptionsFct));
    nc.get('/_search');
  }

};