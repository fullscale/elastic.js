'use strict';

module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    concat: {
      dist: {
        src: [
          '<banner:meta.banner>',
          'src/pre.js',
          'src/util.js',
          'src/facet/*.js',
          'src/filter/*.js',
          'src/index/*.js',
          'src/query/*.js',
          'src/admin/*.js',
          'src/search/**/*.js',
          'src/utils.js',
          'src/post.js'
        ],
        dest: 'dist/elastic.js'
      },
      client_node: {
        src: [
          '<banner:meta.banner>',
          'src/clients/elastic-node-client.js'
        ],
        dest: 'dist/elastic-node-client.js'
      },
      client_jquery: {
        src: [
          '<banner:meta.banner>',
          'src/clients/elastic-jquery-client.js'
        ],
        dest: 'dist/elastic-jquery-client.js'
      },
      client_extjs: {
        src: [
          '<banner:meta.banner>',
          'src/clients/elastic-extjs-client.js'
        ],
        dest: 'dist/elastic-extjs-client.js'
      },
      client_angular: {
        src: [
          '<banner:meta.banner>',
          'src/clients/elastic-angular-client.js'
        ],
        dest: 'dist/elastic-angular-client.js'
      }
    },
    min: {
      dist: {
        src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
        dest: 'dist/elastic.min.js'
      },
      client_jquery: {
        src: ['<banner:meta.banner>', 'src/clients/elastic-jquery-client.js'],
        dest: 'dist/elastic-jquery-client.min.js'
      },
      client_extjs: {
        src: ['<banner:meta.banner>', 'src/clients/elastic-extjs-client.js'],
        dest: 'dist/elastic-extjs-client.min.js'
      },
      client_angular: {
        src: ['<banner:meta.banner>', 'src/clients/elastic-angular-client.js'],
        dest: 'dist/elastic-angular-client.min.js'
      }
    },
    test: {
      files: ['tests/**/*.js']
    },
    lint: {
      files: [
        'grunt.js', 
        '<config:concat.dist.dest>', 
        'tests/**/*.js',
        'src/clients/*.js'
      ]
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint test'
    },
    jshint: {
      options: {
        bitwise: true,
        curly: true,
        eqeqeq: true,
        immed: true,
        indent: 2,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        globalstrict: true
      },
      globals: {
        exports: true,
        module: false
      }
    },
    uglify: {
      codegen: {
        ascii_only: true
      }
    }
  });

  // Default task.
  grunt.registerTask('default', 'concat lint test min');

};
