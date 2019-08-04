//兼容ie低版本console对象
(function (){
//创建空console对象，避免JS报错    
	if(!window.console){
		window.console = {};  
		var console = window.console;  
		  
		var funcs = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml',  
					 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd',  
					 'info', 'log', 'markTimeline', 'profile', 'profileEnd',  
					 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];  
		for(var i=0,l=funcs.length;i<l;i++) {  
			var func = funcs[i];  
			if(!console[func])  
				console[func] = function(){};  
		} 
	} 
	// if(!console.memory)  console.memory = {};  
  
})();
 //ie低版本支持classList
 if (!("classList" in document.documentElement)) {
    Object.defineProperty(HTMLElement.prototype, 'classList', {
        get: function() {
            var self = this;
            function update(fn) {
                return function(value) {
                    var classes = self.className.split(/\s+/g),
                        index = classes.indexOf(value);

                    fn(classes, index, value);
                    self.className = classes.join(" ");
                }
            }

            return {
                add: update(function(classes, index, value) {
                    if (!~index) classes.push(value);
                }),

                remove: update(function(classes, index) {
                    if (~index) classes.splice(index, 1);
                }),

                toggle: update(function(classes, index, value) {
                    if (~index)
                        classes.splice(index, 1);
                    else
                        classes.push(value);
                }),

                contains: function(value) {
                    return !!~self.className.split(/\s+/g).indexOf(value);
                },

                item: function(i) {
                    return self.className.split(/\s+/g)[i] || null;
                }
            };
        }
    });
}
 
  // ？ 帮助的显示
 $(document).ready(function(){
 	$('#helpFont').toggle(function(){
 		 $('#helpContext').slideDown();
 	},function(){
 		  $('#helpContext').slideUp();
 	})
 	
 });
 
 // 配置接口地址 前边正式服地址 后边本地服务端口
 var urlConfig = {
	'user':['user.dx185.com',':9001'], 
	'eva':['jh.dx185.com',':9004'], 
	'finance':['cw.dx185.com',':9005'], 
	'materials':['wz.dx185.com',':9003'], 
	'mix':['bhz.dx185.com',':9002'], 
 };

 
/*
 * 常用函数的封装
 */
var DX = {

	/**
	 * 本地开发ip
	 */
	ip:function(){
		return '192.168.88.66';
		
	},
	/**
	 * 判断是那个环境
	 */
	switchs:function(){ 
		var back = 0;//默认开发环境
		var index = window.location.hostname.indexOf("dx185.com");
		var index1 = window.location.hostname.indexOf("itest.dx185.com");
		if(index != -1 && index1 == -1){//线上
			back = 1;
		}else if(index1 != -1){//测试
			back = 2;
		}
		// else{
		// 	back = 0;
		// }
		return back;
	},
	/**
	 * soket 地址
	 */
	soket:function(key){
		var pro = "";
		if(window.location.protocol=="https:"){pro = "s";}		
		var hostName = this.domain(key).split('//')[1];
		return 'ws'+pro+'://'+hostName;		
	},
	/**
	 * 接口请求地址
	 * @param {type} key调用服务后台服务的第一级目录名 
	 */
	domain:function(key){
		var api='';
		if(this.switchs()==1){
			api = window.location.protocol+'//'+urlConfig[key][0];
		}else if(this.switchs()==2){	
			api = window.location.protocol+'//itest-'+urlConfig[key][0];	
		}else{
			api ='http://'+this.ip()+urlConfig[key][1];
		}
		return api;
	},
	/**
	 * @param {Object} fid 文件预览
	 */
	preview:function(key,fid){
		var pro = "";
		if(window.location.protocol=="https:"){pro = "ssl=1&";}
		return 'http://ow365.cn/?'+pro+'i=18600&furl='+this.domain(key)+'/user/file/download?fid=' + fid;
	},
	/**
	 * 获取token
	 */
	getToken:function(){
		var token = this.getCookie('token');
		var tokens = token ? token : '';
		return tokens;
	},
	/**
	 * 加密参数DX
	 */
	getDX:function(){
		var date = new Date(); 
		var month = date.getMonth()+1;
		var day = date.getDate();
		var hour = date.getHours();
		var minute = date.getMinutes();
		var second  = date.getSeconds();
		var sum =  month + day + hour + minute + second;
		// console.log( month +' '+ day+' ' + hour+' ' + minute+' ' + second);
		var str = this.PrefixInteger(month + sum % 9,2).toString();
			str+= this.PrefixInteger(sum,3).toString();
			str+= this.PrefixInteger(day + sum % 6,2).toString();
			str+= this.PrefixInteger(hour + sum % 3,2).toString();
			str+= this.PrefixInteger(minute + sum % 11,2).toString();
			str+= this.PrefixInteger(second,2).toString();
		return str;	
		
	},
	/**补零函数(数字前边加0)
	 * @param {Object} num 原数字
	 * @param {Object} n	位数
	 */
	PrefixInteger:function(num, n) {
		return (Array(n).join(0) + num).slice(-n);
	},
	/**
	 * 截取文字 超出...
	 * str 字符串
	 * number 截取多少位
	 */
	ellText:function (str,number){
		var res = str.substr(0,number);
		
		if(str.length > number){
			res += '...';
		}
		return res;
	},
	/**
	 * 获取input和select的值 必须有name属性
	 * @param {Object} arr 数组 需要获取值的name
	 */
	getInput:function(){
		var obj = {};
		var arr = $('input');
		var arr1 = $('select');
		$.each(arr,function(i,val){
			var name = $(this).attr('name');
			if(name == undefined){ return true};
			obj[name] = $(this).val();
		})
		$.each(arr1,function(i,val){
			var name = $(this).attr('name');
			if(name == undefined){ return true};
			obj[name] = $(this).val();
		})
		return obj;
	},
	/*****************************************验证类型*********************************************************/
	/* 
	 * 长度6到11
	 * param string
	 * return boolean 是 true 否false
	 */
	verPassword: function(string) {
		// var d = /^(?=.*[0-9])(?=.*[a-zA-Z])(.{8,20})$/;密码验证 包含数字和字母 长度8到20
		if (string.length >= 6 && string.length <= 11) {
			return true;
		}
		// return d.test(string);	
		return false; 
	},
	
	/*
	 * 手机号验证
	 * param string
	 * return boolean 是 true 否false
	 */
	verPhone: function(string) {
		var mobile = /^[1][0-9]{10}$/;
		return mobile.test(string);
	},
	/*
	 * 验证身份证号
	 * param number
	 * return boolean 是 true 否false
	 */
	verIdCard: function(string) {
		var cp = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
		return cp.test(string);
	},
	/*
	 * 验证值为空或者都是空格
	 * param string
	 * return boilean true为空格或空
	 */
	isNull: function(str) {
		if (str == undefined || str == "" || str == null) return true;
		var regu = "^[ ]+$";
		var re = new RegExp(regu);
		return re.test(str);
	},
	/**验证是否中文 是 true 否false
	 * @param {Object} str 需要验证的字符串
	 */
	isName:function(str){
		var reg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
		return reg.test(str);
	},
	/*
	 * 验证邮箱格式
	 * param string
	 * return boolean 格式正确为true
	 */
	isEmail: function(email) {
		var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
		return reg.test(email);
	},
	/* 判断数据类型
	 * param elem需要判断的值
	 * return 类型
	 */
	type: function(elem) {
		if (elem == null) {
			return elem + '';
		}
		return toString.call(elem).replace(/[\[\]]/g, '').split(' ')[1].toLowerCase();
	},
	/* 判断是否为数字
	 * param val需要判断的值
	 * return boolean 是 true 否false
	 */
	isNumber: function(val) {

		var regPos = /^\d+(\.\d+)?$/; //非负浮点数
		var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
		if (regPos.test(val) || regNeg.test(val)) {
			return true;
		} else {
			return false;
		}

	},
	/* 判断是否为数字 非负数小数后两位
	 * param val需要判断的值
	 * return boolean 是 true 否false
	 */
	floatTwo: function(val) {

		var regPos = /^\d+(\.\d+)?$/; //非负浮点数
		// var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
		if (regPos.test(val)) {
			if (!val.toString().split(".")[1]) {
				return true;
			}
			if (val.toString().split(".")[1].length <= 2) {
				return true;
			} else {
				return false;
			}

		} else {
			return false;
		}

	},
	/* 判断是否为数字且小于等于8位(不包括小数点后边的)
	 * param val需要判断的值
	 * return boolean 是 true 否false
	 */
	isFloat8: function(val) {

		var regPos = /^\d+(\.\d+)?$/; //非负浮点数
		// var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数

		if (regPos.test(val)) {
			if (val.toString().split(".").length == 2) {
				if (val.toString().split(".")[1].length <= 8) {
					return true;
				}
				return false;
			}
			if (val.toString().split(".").length == 1) {
				return true;
			}
			return false;

		} else {
			return false;
		}

	},
	/* 正整数
	 * param val需要判断的值
	 * return boolean 是 true 否false
	 */
	isInt: function(val) {
		var reg = /(^[1-9]\d*$)/;
		/*	
		”^\\d+$” //非负整数（正整数 + 0）
		“^[0-9]*[1-9][0-9]*$” //正整数
		“^((-\\d+)|(0+))$” //非正整数（负整数 + 0）
		“^-[0-9]*[1-9][0-9]*$” //负整数
		“^-?\\d+$” //整数
		“^\\d+(\\.\\d+)?$” //非负浮点数（正浮点数 + 0）
		“^(([0-9]+\\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\\.[0-9]+)|([0-9]*[1-9][0-9]*))$” //正浮点数
		“^((-\\d+(\\.\\d+)?)|(0+(\\.0+)?))$” //非正浮点数（负浮点数 + 0）
		“^(-?\\d+)(\\.\\d+)?$” //浮点数
		*/
		if (reg.test(val)) {
			return true;
		}
		return false;
	},
	/**
	 * 检测是否有特殊字符
	 * str:待检测字符串
	 * @return {boolean} 是 true 否false
	 */
	checkStr: function(str) {
		var myReg = /[~!@#$%^&*()/\|,.<>?"'();:_+-=\[\]{}]/;
		// if (myReg.test(str)) {
		// 	return true;
		// }
		return myReg.test(str);
	},
	/**
	 * 科学计数法转换
	 * num 需要转换的值
	 */
	toNonExponential:function (num) {
		var m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/);
		// return num.toFixed(Math.max(0, (m[1] || '').length - m[2]));
		var result= num.toFixed(Math.max(0, 8));
		if(result==0){
			return 0;
		}else{
			return result;
		}
	},
	/**搜索結果高亮展示
	 * @param {Object} str搜索的結果 rep搜索的條件 
	 */
	replaceStr:function(str,rep){
		var subStr=new RegExp(rep);//创建正则表达式对象
		var res = '<span style="color:red">'+rep+'</span>';
		var result=str.replace(subStr,res);
		return result;
	},
	/********************************************http请求类******************************************************/

	/* ajax请求 依赖jquery param option对象
	 * type              请求的方式  默认为get
	 * url               发送请求的地址
	 * param             发送请求的参数(要求为Object或String类型的参数)
	 * callBack          请求的回调函数
	 */
	request: function(option) {
		var type = option.type || "get";
		var url = this.domain() + option.url;
		var param = option.param || {};
		var callBack = option.callBack;

		// console.log(param);return;
		// console.log(url);return;
		$.ajax({
			type: type,
			url: url,
			data: param,
			// 			dataType:'JSON',
			// 			crossDomain: true,
			xhrFields: {
				withCredentials: true
			},
			success: function(res) {
				if (res != null && res != "") {
					if (callBack) {
						if (Object.prototype.toString.call(callBack) === "[object Function]") { //Object.prototype.toString.call方法--精确判断对象的类型
							callBack(res);
						} else {
							console.log("callBack is not a function");
						}
					}
				}
			},
			error: function(res) {
				console.log('请求失败');
			}
		});
	},
	/** 请求函数
	 * @param {type} 默认get
	 * @param {url} 请求地址
	 * @param {param} 请求参数
	 * @param {callBack} 回调函数
	 * @param {change} 按钮变灰 没响应之前不再请求 传递的参数需要到  classList的上一级对象 
	 */
	ajax_method: function(obj) {
		var that = this;
		var pid = getPid(window);
		var proid = this.getCookie('proid');
		if(pid != -1 && proid != undefined && pid != proid){
			
			alert('您已切换项目部');
			location.reload();
		}
		// 异步对象
		var ajax = new XMLHttpRequest();
		var method = obj.type || "GET";
		var key = obj.url.split('/');
		var url = this.domain(key[1]) + obj.url;
		
		var param = obj.param || {};
		var success = obj.callBack;
		
		if(obj.change){//按钮变灰
		
			var thats = obj.change;
			
			if(thats.classList.contains('clickChangeColor')) return;
			thats.classList.add('clickChangeColor');
		}
		
		// +';JSESSIONID='+DX.getSessionId()
		
		var data = formatParams(param);
	
		// get 跟post  需要分别写不同的代码
		if (method == 'GET') {
			// get请求
			if (data) {
				// 如果有值
				url += '?';
				url += data;
			} 
			
			// 设置 方法 以及 url
			ajax.open(method, url);
			
			// ajax.setRequestHeader("Token",token);
			// ajax.setRequestHeader("DX",daxi);
			//token
//			xmlhttp.setRequestHeader("token","header-token-value");
			// send即可
			ajax.send();
		} else {
			// post请求
			// post请求 url 是不需要改变
			
			ajax.open(method, url);

			// 需要设置请求报文
			// ajax.setRequestHeader("Token",token);
			// ajax.setRequestHeader("DX",daxi);
			ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			
			// var pid = getPid(window);
			// console.log(pid);
			// ajax.setRequestHeader("token_projectid", pid);

			// 判断data send发送数据
			if (data) {
				// 如果有值 从send发送
				ajax.send(data);
			} else {
				// 木有值 直接发送即可
				ajax.send();
			}
		}

		// 注册事件
		ajax.onreadystatechange = function() {
			// 在事件中 获取数据 并修改界面显示
			if (ajax.readyState == 4 && ajax.status == 200) {
				// 当 onreadystatechange 调用时 说明 数据回来了
				// ajax.responseText;
				
				if(obj.change){
					thats.classList.remove('clickChangeColor');
				}
				
				// 如果说 外面可以传入一个 function 作为参数 success
				var returnData = JSON.parse(ajax.responseText);
				
				if(returnData.code == 100){
					var urlPath = window.location.pathname;
					if(urlPath.split('/')[1] == "web"){
						window.location.href = '/web/hr/login.html';
					}else{
						window.location.href = '/hr/login.html';
						
					}
				}else{
					success(returnData);
				}
				
			}
		}

		//格式化参数{}
		function formatParams(data) {
			var arr = [];
			for (var name in data) {
				arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
			}
			
			
			var token = that.getToken();
			// var daxi = that.getDX();
			arr.push('Token='+token);
			// arr.push('DX='+daxi);
			arr.push(('v=' + Math.random()).replace('.', ''));
			
			return arr.join('&');
		}
		
		// 递归找pid
		function getPid(w){
			var model = w.loginName;
			var pid =$(model).attr('pid');
			if(pid){
				return pid;
			}else{
				if(w.parent && w.parent != w){
					return getPid(w.parent);
				}else{
					return -1;
				}
			}
		}
	},
	/**计时函数
	 * @param {Object} callback 回调函数
	 * @param {Object} time 轮询时间 单位s秒
	 */
	setInterval:function(callBack,time){
		callBack();
		setInterval(callBack,time*1000);
	},
	/**上传文件
	 * @param {Object} obj 
	 * id 选中文件id
	 * url 上传地址
	 * phone 可选电话
	 * year 年 可选
	 * callBack 回调函数
	 */
	uplaodFile: function(obj) {
		var key = obj.url.split('/');
		var url = this.domain(key[1]) + obj.url;
		var file = document.getElementById(obj.id).files[0];
		// var img = "<img src='/static/img/gif.gif' style='position: absolute;left: 48%;top: 45%;' />";
		// img += "<div style='backgrade'></div>";
		var model = window.parent.showModel;
		$(model).css('display','block');
		
		var formData = new FormData();
		formData.append('file', file);
		if(obj.phone){
			formData.append('phone', obj.phone);
		}
		if(obj.year){
			formData.append('year_quarter', obj.year);
		}
		var DX = this.getDX();
		var token = this.getToken();
		formData.append('DX', DX);
		formData.append('Token', token);
		
		var req = new XMLHttpRequest();
		// req.withCredentials = true;
		req.open("post", url, true);

		req.onload = function() {
			$(model).css('display','none');
			var red = JSON.parse(req.responseText);
			if(red.code != '200'){
				var message = red.msg == "" ? '上传失败' : red.msg;
				alert(message);
			}
			obj.callBack(red);
		}

		req.send(formData);
	},
	/********************************************cookie******************************************************/

	/*
	 * 设置cookie
	 * param key存储的key val对应的值 time存储时间（单位天）
	 */
	setCookie: function(key, val, time) {
		var date = new Date();
		var expiresDays = time;
		date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000);
		// console.log(key+"  v"+val+' t'+date);
		document.cookie = key + "=" + val + ";expires=" + date.toGMTString()+";path=/";
	},
	/*获取cookie
	 * 
	 */
	getCookie: function(key) {
		var getCookie = document.cookie.replace(/[ ]/g, ""); //获取cookie，并且将获得的cookie格式化，去掉空格字符
		var arrCookie = getCookie.split(";")
		var tips; //声明变量tips
		for (var i = 0; i < arrCookie.length; i++) {
			var arr = arrCookie[i].split("=");
			if (key == arr[0]) {
				tips = arr[1];
				break;
			}
		}
		return tips;
	},
	/*删除cookie方法
	 * param key cookie的key
	 */
	deleteCookie: function(key) {
		var date = new Date();
		date.setTime(date.getTime() - 10000);
		document.cookie = key + "=v; expires =" + date.toGMTString()+";path=/";
	},
	/*
	 * 获取jsessionid(java)
	 */
	getSessionId: function() {
		var c_name = 'JSESSIONID';
		if (document.cookie.length > 0) {
			c_start = document.cookie.indexOf(c_name + "=");
			if (c_start != -1) {
				c_start = c_start + c_name.length + 1;
				c_end = document.cookie.indexOf(";", c_start);
				if (c_end == -1) c_end = document.cookie.length;
				return unescape(document.cookie.substring(c_start, c_end));
			}
		}
	},

	/********************************************功能型******************************************************/

	/*清除字符串中的所有空格
	 * param string
	 * return string
	 */
	trim: function(str) {
		// 去除所有空格:   
		str = str.replace(/\s+/g, "");
		// 去除两头空格:   
		// str   =   str.replace(/^\s+|\s+$/g,"");
		// 去除左空格：
		// str=str.replace( /^\s*/, '');
		// 去除右空格：
		// str=str.replace(/(\s*$)/g, "");
		return str;
	},
	/*随机数 生成[n,m]的随机整数
	 * param n m 整数
	 */
	ran: function(n, m) {
		return parseInt(Math.random() * (m - n) + n);
	},
	/*解析json字符串
	 * param json字符串
	 * return json 传参错误会抛异常
	 */
	parseJson: function(str) {
		try {
			return JSON.parse(str);
		} catch (e) {
			return eval('(' + str + ')');
		}
	},
	/* 13位时间戳转日期
	 * param nS 13时间戳
	 * return 时间格式
	 */
	getLocalTime: function(nS) {
		//return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/,' ');
		var date = new Date(nS);
		var Y = date.getFullYear() + '/';
		var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
		var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
		var h = date.getHours() + ':';
		var m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()) + ' ';
		//var s = date.getSeconds();
		return Y + M + D + h + m;
	},
	/**
	 * 千分位显示 常用于价格
	 * @param {Number} num
	 */
	toThousands: function(num) {
		return parseFloat(num).toFixed(2).replace(/(\d{1,3})(?=(\d{3})+(?:\.))/g, "$1,");
	},

	/********************************************其他******************************************************/

	/*
	 * 跳转函数
	 * param
	 * url 跳转地址
	 * param 参数 string(a=1&b=5)
	 */
	toUrl: function(url, param) {
		window.location.href = url + "?" + param;
	},
	/* 获取网址的get参数
	 * param string 参数名
	 * return 参数值 不存在反回null
	 */
	getParam: function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return (r[2]);
		return null;
	},
	/*
	 * 获取存储LocalStorage
	 * parm string name 
	 */
	getLocalStorage: function(name) {
		if (!window.localStorage) {
			alert("浏览器不支持localstorage");
		} else {
			var storage = window.localStorage;
			//第二种方法读取
			return storage[name];
		}
	},
	/*
	 * 存储LocalStorage
	 * param string name value
	 */
	setLocalStorage: function(name, value) {
		if (!window.localStorage) {
			alert("浏览器不支持localstorage");
			return false;
		} else {
			var storage = window.localStorage;
			//写入a字段
			storage[name] = value;

		}
	},
	/*
	 * 删除LocalStorage
	 */
	delLocalStorage: function(name) {
		var storage = window.localStorage;
		storage.removeItem(name);
		//  storage.clear();清除所有
	},
	/*
	 * 打印
	 * @page {size: auto;margin: 0mm;} 打印内容{margin-top: 20mm;margin-left: 15mm;} 
	 * 不需要打印的加样式@media print {.noprint{display: none;}
	 */
	print: function() {

		if (!!window.ActiveXObject || "ActiveXObject" in window) { //是否ie
			//设置网页打印的页眉页脚为空
			var hkey_root, hkey_path, hkey_key;
			hkey_root = "HKEY_CURRENT_USER";
			hkey_path = "\\Software\\Microsoft\\Internet Explorer\\PageSetup\\";

			try {
				var RegWsh = new ActiveXObject("WScript.Shell")
				hkey_key = "header"
				RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, "")
				hkey_key = "footer"
				RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, "")
			} catch (e) {}
		}

		// bdhtml = window.document.body.innerHTML; //获取当前页的html代码  
		// sprnstr = "<!--startprint-->"; //设置打印开始区域  
		// eprnstr = "<!--endprint-->"; //设置打印结束区域  
		// prnhtml = bdhtml.substring(bdhtml.indexOf(sprnstr) + 18); //从开始代码向后取html  
		// prnhtml = prnhtml.substring(0, prnhtml.indexOf(eprnstr)); //从结束代码向前取html
		// // prnhtml = prnhtml.replace('&amp;','&');
		// window.document.body.innerHTML = prnhtml;
		
		window.print();
		location.reload();
	},
	/*
	* websoket连接 {'send':{'message':111},'message':callBack,'url':""}
	*/
	webSoket:function(obj){
		// var that = this;
		
		var sock = '';
		var lockReconnect = false;
		var count = 0;
		var send = obj.send ? '' : obj.send ;//发送消息的数据
		var message = obj.message;//接受消息的回调函数
		var url;
		if(obj.url){
			var key  = obj.url.spilt('/');
			url = this.soket(key[1])+obj.url;
		}else{
			url = this.soket('user')+'/user/dxsocket';
		}
		
		// var url = obj.url ? this.soket(key[1])+obj.url : this.soket('user')+'/dxsocket';//后台服务地址
		
		createWebSocket();
		window.onbeforeunload = function () { 
			sock.close(); 
		};
		//创建连接
		function createWebSocket(){
			// console.log(111111);
			count +=1;
			try {
				if ('WebSocket' in window) {
					sock = new WebSocket(url); 
				} else {
					sock = new SockJS(url);
				}
				init();
			} catch (e) {
				console.log('Ceate WebSocket Error ! Tring To RestConnection !'+e);
				restConnect();
			}
			
		}
		
		function init(){
			//连接成功回调
			sock.onopen = function (e) {
				sock.send(send);
				console.debug(" WebSocket Connection Success ! ");
			};
			//接受消息的回调
			sock.onmessage = function (e) {
				if(e.data==""){
					return false;
				}
				var datas = JSON.parse(e.data);
				console.log(datas);
				message(datas);
				// var socketMSG=JSON.parse(e.data);
		// 				if(e.data == 'SUCCESS'){
		// 					console.log('成功');
		// 				}
			};
			//失败的回调
			sock.onerror = function (e) {
				console.error(" WebSocket Connection Failure ! Tring To RestConnect !"+e);
				restConnect();
			};
			//关闭的回调
			sock.onclose = function (e) {
				console.warn(" WebSocket Connection Close ! Tring To RestConnect !"+e);
				restConnect();
			}
		}
		//重新连接
		function restConnect(){
			// lockReconnect 为true 则不重新连接
			if(lockReconnect){
				return;
			}
			if(count<=3){
				createWebSocket();//创建连接
				lockReconnect=true;
			}else{
				console.error('WebSocket Connection Timeout!');
			}	
		}
		
	},
	/*===================下载文件
	 * options:{
	 * url:'',  //下载地址
	 * download 下载文件 不是必须
	 * }
	 */
	DownLoadFile:function (options) {
		var a = document.createElement('a');
		
		var DX = this.getDX();
		var token = this.getToken();
		
		var key = options.url.split('/');
		
		a.href = this.domain(key[1]) + options.url+'&DX='+DX+'&Token='+token;
		
		document.body.appendChild(a);
		if(options.download){
			a.download = options.download;
		}
		
		
		a.click();
		document.body.removeChild(a);
	},
	/** tr点击变色 ctrl加点击多选
	 * @param  obj $(this) 当前对象
	 * @param  option [] 子集元素标签 可选
	 */
	clickTr:function(obj,option){
		
		var bol = ctrl();
		
		if(obj.hasClass('trclick') && bol){
			obj.removeClass('trclick');
			
			if(Object.prototype.toString.call(option) === "[object Array]"){
				for(var i=0;i<option.length;i++){
					// obj.siblings('tr').find(option[i]).css('background','none');
					obj.find(option[i]).removeClass('trclick');
				}
			}
		}else{
			if(bol){
				obj.addClass('trclick');	
			}else{
				if(obj.hasClass('trclick')){
					obj.removeClass('trclick');
				}else{
					obj.addClass('trclick').siblings('tr').removeClass('trclick');	
				}
				
			}
			children(option,bol);
		}
		
		function ctrl(){
		 	var ctrl = false;
		 	if(window.event.ctrlKey){
		 		ctrl=window.event.ctrlKey
		 	}
		 	return ctrl;
		}
		
		function children(option,bol){
			if(Object.prototype.toString.call(option) === "[object Array]"){
				for(var i=0;i<option.length;i++){
					if(!bol){obj.siblings('tr').find(option[i]).css('background','none');}
					obj.find(option[i]).addClass('trclick');
				}
			}
		}

	},
	/** vue 点击变色
	 * @param {Object} objs
	 * @param {Object} options
	 */
	vueClickTr:function(objs,options){
		var that = this;
		setTimeout(function(){
			$('table tbody tr').click(function(){
				var obj = objs == undefined ? $(this) : objs;
				var option = options == undefined ? [] : options;
				
				that.clickTr(obj,option);
			})
		},100)
	},
	/**
	 * @param {Object} userAgent 获取ie版本 传userAgent字符串，用来判断其他浏览器的版本
	 */
	IETester:function (userAgent){
		var UA =  userAgent || navigator.userAgent;
		if(/msie/i.test(UA)){
			return UA.match(/msie (\d+\.\d+)/i)[1];
		}else if(~UA.toLowerCase().indexOf('trident') && ~UA.indexOf('rv')){
			return UA.match(/rv:(\d+\.\d+)/)[1];
		}
		return false;
	},
	/** table 操作的时候tr提示
	 * @param {Object} obj 当前tr 操作对象
	 * @param {Object} errmsg 操作失败的提示 可选 对的时候不传
	 */
	option:function(obj,errmsg){
		if(obj.next().attr('class')){
			if(obj.next().attr('class').indexOf("option_show") != -1) return;
		}
		
		var msg = '操作成功！';
		if(errmsg){
			msg = errmsg;
		}
		var col = obj.find('td').length;
		var rand = this.ran(0,1000);
		
		var str = '<td class="option_show'+rand+'" colspan="'+col+'"><div class="option"><p>'+msg+'</p></div></td>';
		obj.after(str);
		
		setTimeout(function(){
			$('.option_show'+rand).find('.option').slideUp(500,function(){
				$('.option_show'+rand).remove();
			})
		},2000);
	}

};


 // 线上重写 console
 if(DX.switchs() != 0){
	console.log=function(){};  
 }
