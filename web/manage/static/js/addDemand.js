/**
 * 新增订单
 */
;
var addDemand = (function() {
	//管理重复点击
	var _state = 1;

	var adress = [];
	$(".isplan input").click(function() {
		if($(this).prop("checked")) {
			$(this).siblings("input").prop("checked", false);
		} else {}
	})
	$(".isshop input").click(function() {
		if($(this).prop("checked")) {
			$(this).siblings("input").prop("checked", false);
		} else {}
	})

	//获取紧急程度
	DX.ajax_method({ //权限控制
		'type': 'POST',
		'param': {},
		'url': '/mix/trunk/getUrgentlist',
		'callBack': function(res) {
			if(res.code == 200) {
				var str = "";
				var listData = res.data;
				for(var i = 0; i < listData.length; i++) {
					str += "<option urgentId='" + listData[i].urgentId + "' urgentName='"+listData[i].urgentName+"'>" + listData[i].urgentName + "</option>"
				}
				$(".emergency").append(str)
			}
		}
	});
	//获取浇筑时间
	DX.ajax_method({ //权限控制
		'type': 'POST',
		'param': {},
		'url': '/mix/trunk/getUnloadedTimelist',
		'callBack': function(res) {
			if(res.code == 200) {
				var str = "";
				var listData = res.data;
				for(var i = 0; i < listData.length; i++) {
					str += "<option urgentId='" + listData[i].unloadedTimeId + "'>" + listData[i].unloadedTime + "h</option>"
				}
				$(".unloading-time").append(str)
			}
		}
	});
	DX.ajax_method({ //获取浇筑类型
		'type': 'POST',
		'param': {},
		'url': '/mix/trunk/getDxMixPourType',
		'callBack': function(res) {
			if(res.code == 200) {
				var str = "";
				var listData = res.data;
				for(var i = 0; i < listData.length; i++) {
					str += "<option urgentId='" + listData[i].pourTypeId + "' typeName='"+listData[i].typeName+"'>" + listData[i].typeName + "</option>"
				}
				$(".pouring-method").append(str)
			}
		}
	});

	DX.ajax_method({ //获取浇筑类型
		'type': 'POST',
		'param': {},
		'url': '/mix/trunk/getCarTransType',
		'callBack': function(res) {
			if(res.code == 200) {
				var str = "";
				var listData = res.data;
				console.log(listData)
				for(var i = 0; i < listData.length; i++) {
					str += "<option urgentId='" + listData[i].transTypeId + "' transTypeName='"+transTypeName+"'>" + listData[i].transTypeName + "</option>"
				}
				$(".type-of-shipping").append(str)
			}
		}
	});

	laydate.render({
		elem: '#planing-time', //指定元素
		format: 'yyyy-MM-dd',
		value: new Date
	});
	DX.ajax_method({ //获取浇筑类型
		'type': 'POST',
		'param': {},
		'url': '/mix/formula/getFormulaNames',
		'callBack': function(res) {
			if(res.code == 200) {
				var str = "";
				var listData = res.data;
				for(var i = 0; i < listData.length; i++) {
					str += "<option jfId='" + listData[i].jfId + "'>" + listData[i].formulaName + "</option>"
				}
				$(".concrete-labeling").append(str)
			}
		}
	});
	//获取搅拌站
	DX.ajax_method({
		'type': 'POST',
		'param': {},
		'url': '/mix/trunk/getDxMixStations',
		'callBack': function(res) {
			if(res.code == 200) {
				var str = "";
				var listData = res.data.dxMixStation1;
				console.log(listData)
				for(var i = 0; i < listData.length; i++) {
					str += "<input class='checkbox" + i + " checkbox' type='checkbox' isBool='" + listData[i].isBool + "' value='" + listData[i].stationName + "' mixingstationId='" + listData[i].mixingstationId + "'/>" +
						"<span class='mixing-station' mixingstationId='" + listData[i].mixingstationId + "'>" + listData[i].stationName + "</span>";
				}
				$(".company-contents").html(str);
				$(".checkbox").each(function(i) {
					if($(this).attr("isBool") == 1) {
						$(this).prop("checked", true);
					}
				})
			}
		}
	});
	//提交表单
	$(".submit-message").click(function() {
		addDmeandMessage();
		if(_state == 1) {
			_state = 0;
			if($(".order-category").val() == "选择订单类别") {
				$(".message-tips").text("请选择订单类别");
				tipMessage();
				return;
			}
			if(isEmpty($(".position-coordinates").val())) {
				$(".message-tips").text("请输入位置坐标");
				tipMessage();
				return;
			}
			if(isEmpty($(".detailed-location").val())) {
				$(".message-tips").text("请输入详细部位");
				tipMessage();
				return;
			}
			if(isEmpty($(".player").val())) {
				$(".message-tips").text("请输入下单员");
				tipMessage();
				return;
			}
			if($(".concrete-labeling").val() == "选择标号") {
				$(".message-tips").text("请选择标号");
				tipMessage();
				return;
			}
			if(isEmpty($(".design-quantity").val())) {
				$(".message-tips").text("请输入设计方量");
				tipMessage();
				return;
			}
			if(isEmpty($(".planning-quantity").val())) {
				$(".message-tips").text("请输入计划方量");
				tipMessage();
				return;
			}
			if($(".pouring-method").val() == "选择浇筑方式") {
				$(".message-tips").text("请选择浇筑方式");
				tipMessage();
				return;
			}
			if($(".emergency").val() == "选择紧急程度") {
				$(".message-tips").text("请选择紧急程度");
				tipMessage();
				return;
			}
			if($(".type-of-shipping").val() == "选择运输方式") {
				$(".message-tips").text("请选择运输方式");
				tipMessage();
				return;
			}
			if($(".unloading-time").val() == "选择预定卸料时间") {
				$(".message-tips").text("请选择预定卸料时间");
				tipMessage();
				return;
			}
			if($(".planing-time").val() == "选择计划时间") {
				$(".message-tips").text("请选择计划时间");
				tipMessage();
				return;
			}
			window.location.href = "demandManagement.html";
		} else {
			alert("请勿频繁点击");
			setTimeout(function() {
				_state = 1;
			}, 5000)
			return;
		}

	});
	//	$(".checkbox").each(function(i){
	//		if($(this).attr("isBool")==1){
	//			$(this).prop("checked", true);
	//		}
	//	})

	//预计卸料时间id
	var unloadedTimeId;
	$("body").on("change", ".unloading-time", function() {
		unloadedTimeId = $(this).find("option:selected").attr("urgentId")
	})
	//浇筑方式名称
	var pourTypeName;
	
	//浇筑方式id
	var pourTypeId;
	$("body").on("change", ".pouring-method", function() {
		pourTypeName = $(this).find("option:selected").attr("typeName");
		pourTypeId=$(this).find("option:selected").attr("urgentid")
	})
	//运输方式id
	var transTypeId;
	//运输方式名称
	var transTypeName;
	$("body").on("change", ".type-of-shipping", function() {
		transTypeId = $(this).find("option:selected").attr("transTypeName");
		transTypeName=$(this).find("option:selected").attr("urgentid");
	})
	//紧急程度id
	var urgentId;
	//紧急程度名称
	var urgentName;
	$("body").on("change", ".emergency", function() {
		urgentId = $(this).find("option:selected").attr("urgentid");
		urgentName=$(this).find("option:selected").attr("urgentName");
	})
	function addDmeandMessage() {}

	function isEmpty(str) {
		if("" == str || null == str || "undefined" == str || "object" == str || "null" == str) {
			return true;
		}
		return false;
	}
	//验证信息

	function tipMessage() {
		$(".message-tips").stop().show(200, function() {
			setTimeout(function() {
				$(".message-tips").stop().hide(200)
			}, 2000)
		});
	}

	return {
		isEmpty: isEmpty
	}
}())