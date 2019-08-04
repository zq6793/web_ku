var scree = $(window).width();
//窗口突然变化 百分比改变页面
// $(window).resize(function(){
// 	scree = $(window).width();
// 	
// 	// leftScale();
// 	var minscree = (scree - 20)/scree *100 +'%';
// 	var maxscree = (scree - 180)/scree*100 +'%';
// 	var maxscree1 = (scree - 160)/scree*100 +'%';
// 	
// 	if($('.leftBox').css('left') != '0px'){
// 		$('.leftBox').css({'left':'-160px'});
// 		$('.rightBox1').css({'width':minscree});
// 		$('.rightBox1 header').css({'width':'100%'});
// 	}else{		
// 		// $('.leftBox').css('left','0');
// 		$('.leftBox').css({'left':'0px'});
// 		$('.rightBox1').css({'width':maxscree1});
// 		$('.rightBox1 header').css({'width':maxscree1});
// 		
// 	}
// 		
// })

//退出登录
$('#loginout').click(function(){
	DX.ajax_method({
		'type':'POST',
		'url':'/user/login/loginout',
		'callBack':function(res){
			if(res.code == '200'){
				DX.deleteCookie('token');
				window.location.href = 'hr/login.html';
			}
		}
	})
})
// 左边菜单的收缩
$('#scale').click(function(){
	leftScale();		
});
//左边菜单栏收缩 百分比计算
function leftScale(){
	var minscree = (scree - 20)/scree *100 +'%';
	var maxscree = (scree - 180)/scree*100 +'%';
	var maxscree1 = (scree - 160)/scree*100 +'%';
	if($('.leftBox').css('left') == '0px'){
		$('#scale').css({'background':'url(static/img/left2.png) no-repeat','left': '159px'});
		$('#scale').removeClass('none');
		$('.leftBox').animate({'left':'-160px'});
		$('.rightBox1').animate({'width':minscree});
		$('.rightBox1 header').animate({'width':'100%'});
	}else{
		$('#scale').css({'background':'url(static/img/left1.png) no-repeat','left': '139px'});
		$('#scale').addClass('none');
		// $('.leftBox').css('left','0');
		$('.leftBox').animate({'left':'0px'});
		$('.rightBox1').animate({'width':maxscree1});
		$('.rightBox1 header').animate({'width':maxscree1});
		
	}
}

// 一级菜单点击
$('.leftBox .title').click(function(){
	// $('#message').removeClass('active');
	if($(this).hasClass('active')){
		$(this).removeClass('active');
		$(this).css('background','none');
		$(this).next('.personList').slideUp(100);return;
	}
	// $(this).css('background','#F0EFEF').siblings('.title').css('background','none');
	$(this).css('background','#F0EFEF');
	// $(this).addClass('active').siblings('.title').removeClass('active');
	$(this).addClass('active');
	// $(this).next('.personList').slideDown(100).siblings('.personList').slideUp();
	$(this).next('.personList').slideDown(100);
	
})
//二级菜单点击
$('.leftBox .personList li').click(function(){
	if($(this).next('ul').css('display') == 'block'){
		// console.log(111);
		$(this).next('ul').slideUp(100);
		$(this).children('span').removeClass('active');
		return;
	}
	$('.leftBox .personList li span').removeClass('active');
	$(this).children('span').addClass('active');
	$(this).next('ul.threeMenu').slideDown(100);
})
//三级菜单点击
$('.leftBox .threeMenu p').click(function(){
	// $('#message').removeClass('active');
	// console.log(111);
	// $('.leftBox .threeMenu').css('display','none');
	$(this).parent().css('display','block');
	// $('.leftBox .personList li span').removeClass('active');
	// $(this).parent().prev().children('span').addClass('active');
	$('.leftBox .threeMenu p').removeClass('active');
	$(this).addClass('active');
})

//请求加载页面
function ajaxHtml(url){
	var html = "<iframe src="+url+" id='iframe'></iframe>";
	document.getElementById('rightBox').innerHTML = html;
	//iframe标签被创建之后调用
	$('.openWin').click(function(){openNewWin()});
}

/**
 * 打开新窗口
 */
function openNewWin(){
	var url = getIframUrl('iframe');
	window.open(url)
}
//两个首页的初始化加载
function domReady(){
	DX.ajax_method({//权限控制
		'type':'GET',
		'url':'/user/emp/getUserInfo',
		'callBack':function(res){
			if(res.code == '200'){
				//登录所属机关名称
				$('#loginName').text(res.data.name);
				$('#loginName').attr('pid',res.data.proid);
				DX.setCookie('proid',res.data.proid,1);//存储项目部id
				
				//登录人 部门 姓名加职位
				var userName = res.data.departName+'：'+res.data.userName+'（'+res.data.jobName+')';
				$('#userName').text(userName);
				
				//限制当前所在页面 根据接口返回判断
				var isUnit = window.location.pathname.indexOf('office');//-1不是机关页面
				if(isUnit==-1 && res.data.isUnit){
					window.location.href = 'office.html';
				}
				if(isUnit!=-1 && !res.data.isUnit){//是否机关
					window.location.href = 'index.html';
				}
				
				//三级菜单控制
				permission(res.data.perms,$('.threeMenu p'));
				//二级菜单权限
				permission(res.data.perms,$('.personList li'));
				//一级菜单
				permission(res.data.perms,$('.title'));	
			}
		}
	});
}

//两个首页点击消息的操作
function messageRed(obj){
	//去掉红点
	$('i.roundRed').css('display','none');
	
	if(obj.hasClass('active')){
		obj.removeClass('active');
	}else{
		obj.addClass('active');
	}
	// $('.leftBox .personList').css('display','none');
	$('.leftBox .personList li span').removeClass('active');
	$('.leftBox .threeMenu p').removeClass('active');
}

//拉取项目部列表
function clickProject(){
	DX.ajax_method({
		'type':'GET',
		'url':'/user/emp/findUserProjects',
		'callBack':function(red){
			
			if(red.code = '200'){
				// console.log(red);
				var html1 = '';
				$.each(red.data,function(i,val){
					html1 += '<li id="'+val.projectId+'">'+val.projectName+'</li>';
				})
				
				$('#projectbox').html(html1);
				if(red.data.length>0){
					$('#projectbox').css('display','block');
				}
				$('#projectbox li').click(function(){//点击切换项目部
					changePro($(this).attr('id'));
				})
			}
		}
	})
}

//点击li切换项目部
function changePro(id){
	DX.ajax_method({
		'type':'POST',
		'url':"/user/emp/changeProject",
		'param':{'proid':id},
		'callBack':function(res){
			if(res.code == '200'){
				
				console.log(res.data.proid);
				if(res.data.unitOrProjecct == "project"){
					
					location.reload();//本页面刷新	
				}else{
					window.location.href = 'office.html';
				}
			}
		}
	})
};
//消息回调
function callBackMessage(){
	DX.ajax_method({
		'url':'/user/msg/countUnReadMsg',
		'callBack':function(res){
			if(res.code == 200 && res.data >0){
				$('i.roundRed').css('display','block');
				$('span.message').attr('title',res.msg);
			}
		}
	})
}

/**权限控制显示隐藏
 * @param {Object} per 权限码
 * @param {Object} obj 标签元素 
 */
function permission(per,obj){
	$.each(obj,function(i,val){
		var that =$(this);
		var permission = $(this).attr('data-permission');
		if(permission == "") return true;
		$.each(per,function(index,value){
			if(value.toString() == permission){
				that.css('display','block');
			}
		})
	})
}

/**获取iframe 的当前url
 * @param {Object} id iframe的id
 */
function getIframUrl(id){
	var url = parent.document.getElementById(id).contentWindow.location.href;
	return url;
}