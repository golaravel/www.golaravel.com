/*
 * Laravel中文档
 * http://www.golaravel.com
 *
 * Copyright (c) 2013 
 */

'use strict';

module.exports = function(grunt) {

  var production = true;

  var moment = require('moment');
  moment.lang('zh-cn');

   /**
   * Directories structure
   */
  var dirs = {
    tmp: '.tmp',
    src: 'src',
    build: '_site',
    docs: '<%= dir.src %>/docs',
    assets: '<%= dir.src %>/assets'
  };

  // Project configuration.
  grunt.initConfig({
    dir: dirs,

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),

    // Task configuration.
    clean: {
      build: ['<%= dir.tmp %>', '<%= dir.build %>']
    },

    copy: {
      assets: {
        files: [
          {expand: true, cwd: '<%= dir.src %>/assets/', src: ['**/**'], dest: '<%= dir.build %>'}
        ]
      },
      indexfile: {
        files: [
          {dest: '<%= dir.build %>/docs/index.html', src:'<%= dir.build %>/docs/introduction.html'},
         ]
      },
      api:{
        files: [
          {expand: true, cwd: '<%= dir.src %>/api/', src: ['**/**'], dest: '<%= dir.build %>/api/'}
        ]
      }
    },

    markdown: {
      options: {
          gfm: true,
          highlight: 'manual',
          headerPrefix: false
      },
      //Laravel4 docs
      docs: {
        files: [
          {
            expand: true,
            flatten: true,
            cwd: '<%= dir.src %>/docs/cn',
            src: ['*.md'],
            dest: '<%= dir.tmp %>/docs/',
            ext: '.html'
          }
        ]
      }
    },


    'string-replace': {
      docs: {
        options: {
          replacements: [{
            pattern: /href="\/docs\/(\w+)(#[\w-]+|)"/g,
            replacement: 'href="$1.html$2"'
          }]
        },
        files: [
          {
            expand: true,
            cwd: '<%= dir.tmp %>/docs/',
            src: ['*.html'],
            dest: '<%= dir.tmp %>/docs/'
          }
        ]
      }
    },


    pages: {
      options: {
          partials: ['<%= dir.src %>/_includes/*', '<%= dir.tmp %>/docs/documentation.html'],
          context: function(src, dest){
            var content = grunt.file.read(src),
              title = content.match(/<h1>.*<\/h1>/);
            return {
              title: title?title.toString().replace(/<[\/]?h1>/g, ''):null,
              production: production,
              'sync-date': moment().format('L')
            };
          }
      },

      home: {
        options: {
          template: '<%= dir.src %>/_layouts/home.html'
        },
        files: [
          {
            expand: true,
            cwd: '<%= dir.src %>/home/',
            src: ['**.html'],
            dest: '<%= dir.build %>'
          }
        ]
      },

      docs: {
        options: {
          template: '<%= dir.src %>/_layouts/docs.html',
        },
        files: [
          {
            expand: true,
            cwd: '<%= dir.tmp %>/docs/',
            src: ['**/*.html', '!documentation.html', '!README.html'],
            dest: '<%= dir.build %>/docs/'
          }
        ]
      }
    },


    jshint: {
      options: {
        jshintrc: '.jshintrc',
      },
      gruntfile: {
        src: 'Gruntfile.js'
      }
    },

    //local http server
    connect: {
        server: {
          options: {
            keepalive:true,
            port: 9000,
            base: '<%= dir.build %>'
          }
        }
      }

  });


  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-string-replace');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('chains-markdown');
  grunt.loadNpmTasks('chains-pages');

  // Default task.
  grunt.registerTask('default', ['clean', 'docs',  'home', 'copy']);
  grunt.registerTask('docs', ['markdown:docs','string-replace:docs', 'pages:docs']);
  grunt.registerTask('home', ['pages:home']);


};
