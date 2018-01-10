//关于开发环境：
/*
1、IDE（写代码的效率）
2、git（代码版本管理，多人协作开发）
3、JS模块化
4、打包工具
5、上线回滚的流程
*/

//IDE
/*
webstorm、sublime、vscode、atom
插件！插件！插件！很重要
1、如果想走大牛、大咖、逼格的路线，就用webstorm;
2、如果想走普通、屌丝、低调路线，就用sublime;
3、如果想走小清新、个性路线，就用vscode或者atom;
如果是面试，最好有一个用的熟悉，其他的都会一点
*/

//git
/*正式项目都需要代码版本管理
大型项目需要多人协作开发
Git和linux是一个作者*/
//网络Git服务器如：coding.net   github.com
/*常用Git命令:
git add .   //将修改添加到文件
git status  //查看分支的状态（文件的添加、修改等）
git diff   //查看修改
git checkout ---  //撤销修改
git commit -m "---"   //提交新版本，引号内是对新版本的说明
git push origin master
git pull orgin master
git branch  //查看项目分支
git checkout -b ---/git checkout ---  //新建项目分支/切换项目分支
git merge ---  //融合分支
*/

//模块化
/*不使用模块化存在的问题：
1、js文件严格按引用顺序引用，否则会报错
2、文件中的函数等都是全局变量，可能会被污染
3、自己的文件只知道自己需要依赖的文件，而依赖文件的依赖则并不知道
*/
/*AMD:
1、require.js
2、全局define函数
3、全局require函数
4、依赖JS会自动加载、异步加载
引入require.js:
<script data-main="./main.js" src="http://cdn.bootcss.com/require.js/2.3.3/require.min.js">
*/
//AMD代码演示
//util.js
define(function(){
	return {
		getFormatDate:function(data,type){
			if(type===1){
				return '2018-01-05';
			}
			if(type===2){
				return '2018年1月5日';
			}
		}
	}
})
//a-util.js
define(['./util.js'],function(util){
	return {
		aGetFormatDate:function(data){
			return util.getFormatDate(data,2);
		}
	}
})
//a.js
define(['./a-util.js'],function(aUtil){
	return {
		printDate:function(data){
			console.log(aUtil.aGetFormatDate(data));
		}
	}
})
//main.js
require(['./a.js'],function(a){
	vat data=new Date();
	a.printDate(data);
})

/*CommonJS:nodejs模块化规范，现在被大量用于前端，原因：
1、前端开发依赖的插件和库，都可以从npm中获取
2、构建工具的高度自动化，使得使用npm的成本非常低
3、CommonJS不会异步加载JS,而是同步一次性加载出来
*/
/*使用CommonJS需要构建工具的支持，一般和npm一起使用*/
//util.js
module.exports={
	getFormatDate:function(data,type){
		if(type===1){
			return '2018-01-05';
		}
		if(type===2){
			return '2018年1月5日';
		}
	}
}
//a-util.js
var util=require('util.js');
module.exports={
	aGetFormatDate:function(data){
		return util.getFormatDate(data,2);
	}
}

/*AMD和CommonJS的使用场景：
1、需要异步加载JS，使用AMD
2、使用npm之后建议使用CommonJS
*/

/*Webpack的工作方式：
   把你的项目当作一个整体，通过一个给定的主文件（如index.js），
Webpack将从这个文件开始找到你项目的所有依赖文件，使用loaders处
理它们，最后打包为一个或多个浏览器可识别的JavaScript文件。
*/

/*上线和回滚知识点：
1、上线和回滚的基本流程
2、linux基本命令

上线流程要点：
1、将测试完成的代码提交到git版本库的master分支
2、将当前服务器的代码全部打包并记录版本号，备份
3、将master分支的代码提交覆盖到线上服务器，生成新版本号

回滚流程要点：
1、将当前服务器的代码打包并记录版本号，备份
2、将备份的上一个版本号解压，覆盖到线上服务器，并生成新的版本号

*/