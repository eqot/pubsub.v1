'use strict';

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                '*.js',
                'server/*.js',
                'app/*.js'
            ]
        }
    });

    grunt.registerTask('default', ['jshint']);
};
