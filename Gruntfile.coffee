module.exports = (grunt) ->
    grunt.loadNpmTasks 'grunt-contrib-watch'
    grunt.loadNpmTasks 'grunt-contrib-stylus'
    grunt.loadNpmTasks 'grunt-contrib-uglify'
    grunt.loadNpmTasks 'grunt-contrib-concat'
    grunt.initConfig(
        pkg: grunt.file.readJSON 'package.json' 
        uglify:
            app_task: 
                options: 
                    beautify: true
                    mangle: false #不混淆变量名
                    compress:false #打开或关闭使用默认选项源压缩。
                files:
                    'build/MDEditor.min.js': [
                        'node_modules/marked/marked.min.js',
                        'lib/MDEditor.js'
                    ]
        stylus:
            build: 
                options: 
                    linenos: false
                    compress: false
                    # banner: '\/** \n * <%= pkg.name %> - <%= pkg.description %>\n * version <%= pkg.version %> \n * author <%= pkg.author %>  \n**/\n'
                    # //<%= grunt.template.today() %>时间
                files:
                    'themes/default/css/MDEditor.min.css': [
                        'bower_components/AutoPrefixCss/lib/reset.styl'
                        'themes/default/stylus/MDEditor.styl'
                    ]
        watch: 
            another: 
                files: ['themes/default/stylus/*.styl','lib/*.js']
                tasks: ['stylus','uglify']
                options: 
                    livereload: 13145
    )
    grunt.registerTask 'default', ['watch']
