// 包装函数
module.exports = function(grunt) {
	// 任务配置，所有插件的配置信息
	grunt.initConfig({

		// 获取 package.json 的信息
		pkg : grunt.file.readJSON('package.json'),

		// uglify插件的配置信息
		uglify : {
			options : {
				stripBanners : true,
				banner : '/*! <%= pkg.name %>-<%= pkg.version %>.js <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build : {
				src : 'src/test.js',
				dest : 'build/<%= pkg.name %>-<%= pkg.version %>.js.min.js'
			}
		}

	});

	// 告诉grunt我们将使用插件
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// 告诉grunt当我们在终端中输入grunt时需要做些什么（注意先后左右顺序）
	// grunt.registerTask('default', []);
	grunt.registerTask('default', ['uglify']);

};