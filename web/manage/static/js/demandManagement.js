var getDemandMessage = (function() {
	$("body").on("click", ".demand-wrapper-ul li:last-child>span:nth-child(3)", function() {
		$(this).parent().parent().remove();
	})
	$("body").on("mouseover", ".demand-wrapper-ul", function() {
		$(this).children().css("color", "#ffffff");
	})
	$("body").on("mouseout", ".demand-wrapper-ul", function() {
		$(this).children().css("color", "#000000");
	})
	$("body").on("click", ".delete", function() {
		$(this).parent().parent().remove();
	})
	$("body").on("click", "table >tbody>tr", function() {
		//点击改变
		DX.clickTr($(this), "table >tbody>tr");
	})
	//	getDemandAndMessage();

	//	function getDemandAndMessage() {
	//		var str = "";
	//		for(var i = 0; i <= 4; i++) {
	//			str += "<tr>" +
	//				"<td>1106</td>" +
	//				"<td>白鹿原隧道/ZK57+101-113二村</td>" +
	//				"<td>1#砥柱</td>" +
	//				"<td>332</td>" +
	//				"<td>332</td>" +
	//				"<td>0</td>" +
	//				"<td>C30</td>" +
	//				"<td>C30</td>" +
	//				"<td>张三</td>" +
	//				"<td>2019/4/5 15:34</td>" +
	//				"<td>等待配置配合比</td>" +
	//				"<td><span>补方</span><span>修改</span><span class='delete'>删除</span></td>" +
	//				"</tr>";
	//		}
	//		$("table >tbody").html(str)
	//	}

	DX.ajax_method({ //权限控制
		'type': 'POST',
		'param': {},
		'url': '/mix/formula/getPcMixDemandListByWhere',
		'callBack': function(res) {
			if(res.code == 200) {
				var str = getDemandData(res.data.rows);
				$("table tbody").append(str);
			} else {
				confirm(res.msg)
			}

		}
	});

	function getDemandData(demandData) {
		var str = "";
		for(var i = 0; i < demandData.length; i++) {
			var state=getState(demandData[i].status);
			str += "<tr class='demand-manage-message'>" +
				"<td>" + demandData[i].number + "</td>" +
				"<td>"+demandData[i].partName+"</td>" +
				"<td>"+demandData[i].urgentName+"</td>" +
				"<td>"+demandData[i].planCube+"</td>" +
				"<td>"+demandData[i].cube+"</td>" +
				"<td>"+demandData[i].addCube+"</td>" +
				"<td>"+(DX.isEmpty(demandData[i].jfName)?"订单暂无配方":demandData[i].jfName)+"</td>" +
				"<td>"+demandData[i].fallHighness+"</td>" +
				"<td>"+demandData[i].dutyPerson+"</td>" +
				"<td>"+demandData[i].orderCreateTime+"</td>" +
				"<td>"+state+"</td>" +
				"<td><span>补方</span><span did='" + demandData[i].did + "'>修改</span><span class='delete' did='" + demandData[i].did + "'>删除</span></td>" +
				"</tr>"
		}
		return str;
	}
	
	function getState(state){
		var stateMessage;
		if(state==0){
			stateMessage="下单成功"
		}
		if(state==1){
			stateMessage="等待配置"
		}
		if(state==2){
			stateMessage="配置完成"
		}
		if(state==3){
			stateMessage="调度完成"
		}
		if(state==4){
			stateMessage="运输中"
		}
		return stateMessage;
	}
	$("body").on("click", ".demand-manage-message", function() {
		var str = getDemandManageMessage();
		if($(this).next("tr").children().children(".demand-message").hasClass("clicked")) {
			$(this).next("tr").children().children(".demand-message").removeClass("clicked").stop().slideUp(200, function() {
				$(this).parent().parent().remove();
			});
		} else {
			$(this).after(str);
			$(this).next("tr").children().children(".demand-message").addClass("clicked").stop().slideDown(200);
		}

	});
	$("body").on("click", ".mix-message-title>div", function() {
		if($(this).hasClass("choosed")) {} else {
			$(this).addClass("choosed");
			$(this).siblings("div").removeClass("choosed");
		}
	})

	function getDemandManageMessage() {
		var str = "";
		//		for(var i=0;i<demandMessageData.length;i++){
		str += "<tr class='slide-content'>" +
			"<td colspan='12'>" +
			"<div class='demand-message'>" +
			"<div class='demand-message-title'>" +
			"<div class='demand-message-title-left'><span>单位名称:<span>中国建筑一公司</span></span>" +
			"</div>" +
			"<div class='demand-message-title-right'><span class='mixing-plant'>搅拌站信息:</span><input type='checkbox' /><span>咸阳京霸拌合站</span><input type='checkbox' /><span>咸阳京霸拌合站</span></div>" +
			"</div>" +
			"<div class='mix-message-title'>" +
			"<div class='construction choosed'>施工部位</div>" +
			"<div class='mix'>混凝土信息</div>" +
			"<div class='pour'>浇筑信息</div>" +
			"</div>" +
			"<div class='mix-message'>" +
			"<div class='construction-site'>" +
			"<div class='construction-site-left'>" +
			"<span><label>*</label>浇筑部位</span>" +
			"<select class='select'>" +
			"<option>选择订单类别</option>" +
			"</select>" +
			"<span><label>*</label>位置坐标</span><input class='input' placeholder='输入详细施工位置' />" +
			"</div>" +
			"<div class='construction-site-left'>" +
			"<span><label>*</label>详细部位</span><input class='input detailed-location' placeholder='输入详细施工位置' />" +
			"<span><label>*</label>下单员</span><input class='input' placeholder='输入详细施工位置' />" +
			"</div>" +
			"</div>" +
			"<div class='concrete-Information'>" +
			"<div class='construction-site-left'>" +
			"<span><label>*</label>混凝土标号</span>" +
			"<select class='select'>" +
			"<option>选择混凝土标号</option>" +
			"</select>" +
			"<span><label>*</label>计划方量</span><input class='input' placeholder='请输入计划方量' />" +
			"<span><label></label>坍落度</span><input class='input' placeholder='请输入坍落度' />" +
			"</div>" +
			"<div class='construction-site-left'>" +
			"<span><label>*</label>设计方量</span><input class='input detailed-location' placeholder='请输入设计方量' />" +
			"<span><label></label>环境等级</span><input class='input' placeholder='请输入环境等级' />" +
			"<span><label></label>里程</span><input class='input' placeholder='请输入里程' />" +
			"</div>" +
			"</div>" +
			"<div class='pouring-information'>" +
			"<div class='construction-site-left'>" +
			"<span><label>*</label>浇筑方式</span>" +
			"<select class='select'>" +
			"<option>选择浇筑方式</option>" +
			"</select>" +
			"<span><label>*</label>紧急程度</span>" +
			"<select class='select'>" +
			"<option>选择紧急程度</option>" +
			"</select>" +
			"<span><label>*</label>是否计划</span><span style='width: 20px;'>是</span><input style='width: 12px;min-width: 12px;' type='checkbox' /><span style='width: 20px;'>否</span><input style='width: 12px;min-width: 12px;' type='checkbox' />" +
			"<span style='text-align: center;'><label>*</label>是否商品</span><span style='width: 20px;'>是</span><input style='width: 12px;min-width: 12px;' type='checkbox' /><span style='width: 20px;'>否</span><input style='width: 12px;min-width: 12px;' type='checkbox' />" +
			"</div>" +
			"<div class='construction-site-left'>" +
			"<span><label>*</label>运输方式</span>" +
			"<select class='select'>" +
			"<option>选择运输方式</option>" +
			"</select>" +
			"<span><label>*</label>预计卸料时间</span>" +
			"<select class='select'>" +
			"<option>选择卸料时间</option>" +
			"</select>" +
			"<span><label>*</label>计划时间</span>" +
			"<select class='select'>" +
			"<option>选择计划时间</option>" +
			"</select>" +
			"</div>" +
			"</div>" +
			"</div>" +
			"</div>" +
			"</td>" +
			"</tr>";
		//		}
		
		
		
		return str;
	}
	return {
		//		getDemandAndMessage: getDemandAndMessage
	}
}())