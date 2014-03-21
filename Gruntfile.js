'use strict';

module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n\n'
    },
    concat: {
      options: {
        banner: '<%= meta.banner %>'
      },
      dist: {
        src: [
          'src/pre.js',
          'src/util.js',
          'src/mixins/**/*.js',
          'src/facet/*.js',
          'src/aggregations/*.js',
          'src/filter/*.js',
          'src/query/**/*.js',
          'src/search/**/*.js',
          'src/utils.js',
          'src/post.js'
        ],
        dest: 'dist/elastic.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= meta.banner %>',
        ascii_only: true
      },
      dist: {
        src: ['<%= concat.dist.dest %>'],
        dest: 'dist/elastic.min.js'
      }
    },
    nodeunit: {
      files: ['tests/**/*.js']
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
        globalstrict: true,
        globals: {
          exports: true,
          module: false
        }
      },
      files: [
        'Gruntfile.js',
        '<%= concat.dist.dest %>',
        'tests/**/*.js'
      ]
    }
  });

  // load plugins
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Default task.
  grunt.registerTask('default', ['concat', 'jshint', 'nodeunit', 'uglify']);

};
