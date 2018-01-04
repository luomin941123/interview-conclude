//原型链继承
function Elem(id){
	this.elem=document.getElementById(id);
}

Elem.prototype.html=function(val){
	var elem=this.elem;
	if(val){
		elem.innerHtml=var
		return this; //链式操作
	}else{
		return elem.inner
	}
}

Elem.prototype.on=function(type,fn){
	var elem=this.elem;
	elem.addEventListener(type,fn);
	return this;//链式操作
}

var div1=new Elem('div1');
console.log(div1.html());
//////////////////////////////////////////////////////////////

//闭包
//1、函数作为返回值
//2、函数作为参数传递
eg1:
function F1(){
	var a=100;
	return function(){
		console.log(a);
	}
}
var f1=F1();
var a=200;
f1();//100，一个函数的作用域链是它在定义时产生的，而不是执行时

eg2:
function F1(){
	var a=100;
	return function(){
		console.log(a);
	}
}
var f1=F1();
function F2(fn){
	var a=200;
	fn();
}
F2(f1);//100，一个函数的作用域链是它在定义时产生的，而不是执行时
////////////////////////////////////////////////////////////////

//实际开发中闭包的应用：封装变量，收敛权限（只把接口提供出去）
//在函数isFirstLoad函数外面，根本不可能修改_list的值
function isFirstLoad(){
	var _list=[];//以下划线开始的变量代表私有变量，只在该作用域内有效
	return function(id){
		if(_list.indexOf(id)>=0){
			return false;
		}else{
			_list.push(id);
			return true;
		}
	}
}
var firstLoad=isFirstLoad();
firstLoad(10);//true
firstLoad(10);//false
firstLoad(20);//true
firstLoad(20);//false

//创建10个a标签，依次点击出现对应序号
var i;
for(i=0;i<10;i++){
	(function(i){
		var a=document.createElement("a");
		a.innerHTML=i+'<br/>';
		a.addEventListener("click",function(e){
			e.preventDefault();
			alert(i);//a是自由变量，要去父级作用域寻找
		})
		document.body.appendChild(a);
	})(i);
	
}
////////////////////////////////////////////////////////

//同步和异步
//同步
console.log(100);
alert(200); //对弹框进行确认前后面的程序不回执行，即程序阻塞
console.log(300);

//异步
console.log(100);
setTimeout(function(){
	console.log(200);
},1000);  //程序等待1s后执行，等待时不会阻塞后面的程序执行
console.log(300);

//同步异步区别：同步会阻塞程序，异步不会
//异步和单线程：js是单线程语言，想要一次执行多个任务，则需使用异步，执行其中一个任务，其他任务等顺序任务执行完之后再执行
//前端异步场景：1、定时任务  2、ajax，image动态加载  3、事件绑定

//日期API
var dt=new Date();
dt.getTime();
dt.getFullYear();
dt.getMonth();
dt.getDate();
dt.getHours();
dt.getMinutes();
dt.getSeconds();

//数组API
var arr=[1,5,2,7,4,3];
arr.forEach(function(item,index){
	console.log(index,item);
})
var result1=arr.every(function(item,index){
	if(item<3){
		return true;
	}
})
console.log(result1);
var result2=arr.some(function(item,index){
	if(item<3){
		return true;
	}
})
console.log(result2);
var arr2=arr.sort(function(a,b){
	return a-b;
})
console.log(arr2);
var arr3=arr.map(function(item,index){
	return '<b>'+item+'</b>';
})
console.log(arr3);
var arr4=arr.filter(function(item,index){
	if(item>2){
		return true;
	}
})
console.log(arr4);

//对象API
var obj={
	x:100,
	y:200,
	z:300
};
var key
for(key in obj){
	if(obj.hasOwnProperty(key)){
		console.log(key,obj[key]);
	}
}

//获取2018-01-03格式的日期
function formatDate(dt){
	if(!dt){
		dt=new Date();
	}
	var year=dt.getFullYear();
	var month=dt.getMonth()+1;
	var date=dt.getDate();
	if(month<10){
		month='0'+month;
	}
	if(date<10){
		date='0'+date;
	}
	return year+'-'+month+'-'+date;
}
var dt=new Date();
var formatDate=formatDate(dt);
console.log(formatDate);

//获取随机数，要求是长度一致的字符串格式
var random=Math.random();
random=random+'0000000000';//加10个0防止长度不够时报错
random=random.slice(0,10);
console.log(random);

//能遍历数组和对象的forEach函数
function forEach(obj,fn){
	var key;
	if(obj instanceof Array){
		//判断是不是数组
		obj.forEach(function(item,index){
			fn(index,item);
		})
	}else{
		//不是数组就是对象
		for(key in obj){
			if(obj.hasOwnProperty(key)){
				fn(key,obj[key]);
			}
		}
	}
}
var arr=[1,2,3];
forEach(arr,function(index,item){
	console.log(index,item);
})
var obj={x:100,y:200};
forEach(obj,function(key,value){
	console.log(key,value);
})
///////////////////////////////////////////////////////////////////

//JS-Web-API
//DOM本质：文档对象模型，浏览器将拿到的HTML代码，结构化成一个浏览器可识别且js可操作的一个模型
//DOM的基础数据结构是：树
//DOM节点的Attribute和property的区别：
//1、property只是一个JS对象的属性的修改
//2、Attribute是对html标签属性的修改和获取
//DOM节点的操作
document.getElementById("id")
document.getElementsByTagName("div")
document.getElementsByClassName(".class1")
document.querySelectorAll("p")
div1.getAttribute("data-name")
div1.setAttribute("data-name",abc)
//DOM结构操作(DOM结构就是DOM树)
//新增节点、获取父元素、获取子元素、删除节点
var div1=document.getElementById('div1');
var p1=document.createElement('p');
p1.innerHTML='this is p1';
div1.appendChild(p1);//添加新创建的元素
var p2=document.getElementById('div2');
div1.appendChild(p2);//移动已有节点
var parent=div1.parentElement;//获取父元素
var child=div1.childNodes;//获取子元素（NodeList，标签之间的换行符也是一个子元素）
div1.removeChild(child[0]);//删除元素

//BOM:浏览器对象模型
//navigator
var ua=navigator.userAgent;
var isChrome=ua.indexOf('Chrome');
console.log(isChrome);
//screen
console.log(screen.width);
console.log(screen.height);
//location
console.log(location.href);
console.log(location.protocol);
console.log(location.host);
console.log(location.pathname);
console.log(location.search);//问号后面的查询字符串，参数之间用&连接起来
console.log(location.hash);//#后面的就是哈希
//history
history.back();
history.forward();

//事件知识点：事件绑定、事件冒泡、代理
//通用事件绑定
var btn=document.getElementById('btn1');
btn.addEventListener('click',function(event){
	console.log('clicked');
})

function bindEvent(elem,type,fn){
	elem.addEventListener(type,fn)
}
var a=document.getElementById('link1');
bind(a,'click',function(e){
	e.preventDefault();//阻止浏览器默认行为，比如a标签点击默认跳转页面
	alert('clicked');
})
//事件冒泡（DOM树形结构->冒泡->阻止冒泡->应用）
var p1=document.getElementById('p1');
var body=document.body;
bindEvent(p1,'click',function(e){
	e.stopPropatation();
	alert('激活');
})
bindEvent(body,'click',function(e){
	alert('取消');
})
//事件冒泡的应用：代理
var div1=document.getElementById('div1');//div标签里有多个a标签，且会不定时增加更多
div1.addEventListener('click',function(e){
	var target=e.target;
	if(target.nodeName==='A'){
		alert(target.innerHTML);
	}
})

//完善通用绑定事件的函数
function bindEvent(elem,type,selector,fn){
	//如果只有三个参数，即不使用代理，将selector给fn
	if(fn==null){
		fn=selector;
		selector=null;
	}
	elem.addEventListener(type,function(e){
		var target;
		if(selector){
			target=e.target;
			if(target.matches(selector)){
				fn.call(target,e)
			}
		}else{
			fn(e);
		}
	})
}
//使用代理
var div1=document.getElementById('div1');
bindEvent(div1,'click','a',function(e){
	console.log(this.innerHTML);
})
//不用代理
var a=document.getElementById('a1');
bindEvent(a,'click',function(e){
	console.log(a.innerHTML);
})

//Ajax(XMLHttpRequest状态码说明，跨域)
//不依赖第三方库写一个ajax
var xhr=new XMLHttpRequest();//注意：IE低版本使用ActiveXObject
xhr.open('GET','/api',false);//false代表异步请求
xhr.onreadystatechage=function(){
	//readyState标识XHR对象的状态，有五个值：0初始化，1载入，2载入完成，3解析，4完成
	if(xhr.readyState==4){
		//status表示响应的HTTP状态码
		if(xhr.status==200){
			alert(xhr.responseText);
		}
	}
}
xhr.send(null);
//跨域（协议、域名、端口有一个不同就算跨域）
//浏览器有同源策略，不允许ajax访问其他域接口
/*可跨域加载资源的标签：<img src="">、<link href="">、<script src="">
<img>用于打点统计，统计网站可能是其他域
<link><script>可以使用CDN，CDN也是其他域
<script>可以用于JSONP*/

//存储
/*cookie:
本身用于客户端和服务器端的通信
但是它有本地存储的功能，于是就被“借用”
使用document.cookie=...获取和修改即可
*/
/*cookie用于存储的缺点:
1、存储量太小，只有4KB
2、所有http请求都带着，会影响获取资源效率
3、API简单，需要封装才能用
*/
/*localStorage和sessionStorage
1、HTML5专门为存储而设计的，最大容量5M(不用在请求中带着)
2、API简单易用
3、localStorage.setItem(key,value);localStorage.getItem(key);
*/
/*cookie、localStorage和sessionStorage区别
1、容量
2、是否会携带到ajax中
3、API易用性
*/

