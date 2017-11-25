module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('gruntPackage.json'),
    shell: {
        options: {
            stderr: false
        },
        target: {
            command: 'egret build'
        },
        publish:{
            command: 'egret publish --version pubrelease'
        },
        test:{
            command:'ls'
        },

        reveal:{
            command:'cd bin-release/web/pubrelease &&' + 
            'egret mergeJS'
        },
        rmrangerdir:{
            command:'rm release/html5/pirate/main.min.js &&' + 
            'rm release/html5/pirate/merged.js &&' + 
            'cd release/html5/pirate/resource &&' + 
            'rm -rf *'
        },
        mvRanger:{
            command: 'mv bin-release/web/pubrelease/main.min.js release/html5/pirate &' +
                'mv bin-release/web/pubrelease/resource release/html5/pirate &' + 
                'mv bin-release/web/pubrelease/merged.js release/html5/pirate'
        },
        rmpubRelease:{
            command:'cd bin-release/web/pubrelease &&' + 
            'rm -rf *'
        },
        over:{
            command:'echo "over"'
        }
    },
    watch: {
      //监听文件变化，分别有src下非skins目录的ts文件，skins的exml文件，以及launcher目录中的两个html及里面所有js
      files: ['src/**/*.ts','!src/skins*/**','src/*.js','src/**/*.exml'],
      tasks: ['shell:over']
    }
  });

    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-watch');
    // 默认被执行的任务列表。
    grunt.registerTask('default', ['shell:target']);//编译
    // grunt.registerTask('publish', ['shell:publish', 'shell:rmrangerdir']);

};
//egret create_app G1_iOS -f G1 -t egret-ios-support
