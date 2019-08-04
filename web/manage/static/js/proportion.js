$("body").on("click", ".keep-in-reserve", function() {
	getProportionMessage.keepInReserveMessage($(this));
})

var getProportionMessage = (function() {
	//倒计时间
	//监听input值得变化
	var state = 1;
	setInterval(function() {
		var times = $(".second").text();
		var minute = $(".minute").text();
		times -= 1;
		if(times == 0) {
			minute -= 1;
			$(".minute").text(minute);
			times = 60;
			if(minute < 0) {
				$(".fresh").click();
			}
		}
		$(".second").text(times);
	}, 1000);

	$(".fresh").click(function() {
		if(state != 1) {
			return;
		}
		//获取订单信息
		getProportionMessage();
		$(".second").text(59);
		$(".minute").text(4);

	})
	//获取订单信息
	getProportionMessage();
	// });

	$("body").on("mouseover", ".search-nore", function() {
		$(this).children('div').stop().slideDown(200);
	})
	$("body").on("mouseout", ".search-nore", function() {
		$(this).children('div').stop().slideUp(200);
	})

	$("body").on("click", ".newly-mix", function() {
		window.location.href = "newlyMix.html"
	})

	//储存混凝土信息
	;

	function keepInReserveMessage(that) {
		state = 1;
		//		alert(that.parent().parent().parent().parent().parent().attr("did"))
		DX.ajax_method({ //权限控制
			'type': 'POST',
			'param': {
				did: that.parent().attr("did"),
				jfId: that.siblings("select").find("option:selected").attr("jfId"),
				jfName: that.siblings("select").find("option:selected").attr("jfName"),
				listerName: that.parent().attr("listerName"),
				formulaTime: that.parent().attr("orderCreateTime"),
				listerId: that.parent().next("table").attr("listerId")
			},
			'url': '/mix/formula/upDemand',
			'callBack': function(res) {
				if(res.code == 200) {
					alert("保存成功")
					getProportionMessage();
				} else {
					confirm(res.msg)
				}

			}
		});
	}

	//获取订单
	function getProportionMessage() {
		DX.ajax_method({ //权限控制
			'type': 'POST',
			'param': {},
			'url': '/mix/formula/getFormulaList',
			'callBack': function(res) {
				if(res.code == 200) {
					console.log(res);
					getMessage(res.data.rows)
				} else {
					confirm(res.msg)
				}

			}
		});
	}

	/**
	 *获取强度等级 
	 * @param {Object} strongData
	 */
	function getStrong(strongData) {
		var str4 = "";
		for(var k = 0; k < strongData.length; k++) {
			str4 += "<option jfId='" + strongData[k].jfId + "' jfName='" + strongData[k].formulaName + "'>" + strongData[k].formulaName + "</option>"
		}
		return str4;
	}
	var str4;
	//获取制单员权限的等级
	DX.ajax_method({ //权限控制
		'type': 'POST',
		'param': {},
		'url': '/mix/formula/getFormulaNames',
		'callBack': function(res) {
			if(res.code == 200) {
				str4 = getStrong(res.data);
			}
		}
	});
	/**
	 * 获取订单信息
	 * @param {Object} obj
	 */
	function getMessage(obj) {
		var str = "";
		for(var i = 0; i < obj.length; i++) {
			var states;
			if(obj[i].status == 0) {
				states = "下单成功"
			} else if(obj[i].status == 1) {
				states = "等待配置"
			} else {
				states = "配置完成"
			}
			var str1 = "";
			var str2 = "";
			for(var j = 0; j < obj[i].children.length; j++) {
				if(j % 2 == 0) {
					str1 += "<td><span>" + obj[i].children[j].typeName + "</span></td>" +
						"<td><input typeId='" + obj[i].children[j].typeId + "' value='" + obj[i].children[j].rows + "' /></td>"
				} else {
					str2 += "<td><span>" + obj[i].children[j].typeName + "</span></td>" +
						"<td><input typeId='" + obj[i].children[j].typeId + "' value='" + obj[i].children[j].rows + "' /></td>"
				}
			}
			str += "<div class='proportion-content-wrapper'>" +
				"<div class='proportion-content-wrapper-1'>" +
				"<div class='proportion-content-wrapper-left'>" +
				"<div><label>需求编号:</label><span class='num'>" + obj[i].orderNumber + "</span><label>状态:</label><span class='proportion-state'>" + states + "</span></div>" +
				"<div><label>联系人/电话:</label><span class='connect-name'>" + obj[i].dutyPerson + "</span><span class='connect-tel'>" + obj[i].orderNumber + "</span><label>订单类别:</label><span class='order-type'>营业线天窗施工</span></div>" +
				"<div><label>施工部位:</label><span class='adress'>" + obj[i].partName + "</span><span class='search-nore'>查看更多</span></div>" +
				"<div class='proportion-wrapper-footer'>" +
				"<div class='proportion-wrapper-footer-title'>" +
				"<span class='strength-grade'>" + (DX.isEmpty(obj[i].formulaName) ? "暂无配方" : obj[i].formulaName) + "</span><span>" + obj[i].planCube + "</span><span>" + obj[i].cube + "</span><span>" + obj[i].addCube + "</span><span>" + (DX.isEmpty(obj[i].slumpfloat) ? "暂无配方" : obj[i].slumpfloat) + "</span>" +
				"</div>" +
				"<div class='proportion-wrapper-footer-content'>" +
				"<span>强度等级</span><span>设计放量</span><span>需求放量</span><span>补方方量</span><span>坍落度</span>" +
				"</div>" +
				"</div>" +
				"</div>" +
				"<div class='proportion-content-wrapper-right'>" +
				"<div class='proportion-right'>" +
				"<div class='proportion-right-head' jfid='" + obj[i].jfid + "' did='" + obj[i].did + "' listerName='" + obj[i].dutyPerson + "' orderCreateTime='" + obj[i].orderCreateTime + "' listerId='" + obj[i].userId + "'>" +
				"<label>强度等级:</label>" +
				"<select class='intensity select' value='" + obj[i].formulaName + "'>" +
				"<option>请选择强度</option>"+
				str4 +
				"</select>" +
				"<button type='button' class='btns btn-1 newly-mix' jfid='" + obj[i].jfid + "'>新建配合比</button>" +
				"<button type='button' class='btnBlue save-message'>保存</button>" +
				"<button type='button' class='btnBlue keep-in-reserve'>提交</button>" +
				"</div>" +
				"<table class='customize' width='800px' height='100px'>" +
				"<tr>" +
				str1 +
				"</tr>" +
				"<tr>" +
				str2 +
				"</tr>" +
				"</table>" +
				"</div>" +
				"</div>" +
				"</div>" +
				"</div>"
		}
		$(".wrapper").html(str);

		//input的监听值改变
		$("table tr td:nth-child(2n)>input").bind('input porpertychange', function() {
			state = 0;
		})
		//阻止点击跳转
		$("body", parent.document).find('.leftBox').on("click", function(e) {
			var target = $(e.target);
			if(target.closest(".proportion-right").length == 0) {
				if(state != 1) {
					confirm("资料尚未保存");
					return false;
				}
			}
		})
		$(document).on("click", function(e) {
			var target = $(e.target);
			if(target.closest(".proportion-right").length == 0) {
				if(state != 1) {
					confirm("资料尚未保存")
					return;
				}
			}
		})
	}
	//根据等级获取
	$("body").on("change", ".intensity", function() {
		var _this = $(this);
		DX.ajax_method({ //权限控制
			'type': 'POST',
			'param': {
				jfId: _this.find("option:selected").attr("jfId")
			},
			'url': '/mix/formula/getFormulaByjfId',
			'callBack': function(res) {
				if(res.code == 200) {
					var str11 = "";
					var str22 = "";
					for(var j = 0; j < res.data[0].children.length; j++) {
						if(j % 2 == 0) {
							str11 += "<td><span>" + res.data[0].children[j].typeName + "</span></td>" +
								"<td><input typeId='" + res.data[0].children[j].typeId + "' value='" + res.data[0].children[j].rows + "' /></td>"
						} else {
							str22 += "<td><span>" + res.data[0].children[j].typeName + "</span></td>" +
								"<td><input typeId='" + res.data[0].children[j].typeId + "' value='" + res.data[0].children[j].rows + "' /></td>"
						}
					}
					var str44 = "<table class='customize' width='800px' height='100px' jfid='" + res.data[0].jfid + "' listerId='" + res.data[0].userId + "'>" +
						"<tr>" +
						str11 +
						"</tr>" +
						"<tr>" +
						str22 +
						"</tr>" +
						"</table>";
					_this.parent().next("table").remove("");
					console.log(_this)
					_this.parent().after(str44);
				} else {
					confirm(res.msg)
				}

			}
		});
	});
	//	function getMixDetail(jfId){
	//		DX.ajax_method({ //权限控制
	//				'type': 'POST',
	//				'param': {
	//					jfId:jfId
	//				},
	//				'url': '/mix/formula/getFormulaByjfId',
	//				'callBack': function(res) {
	//					if(res.code == 200) {
	//						var str11 = "";
	//						var str22 = "";
	//						for(var j = 0; j < res.data[0].children.length; j++) {
	//							if(j % 2 == 0) {
	//								str11 += "<td><span>" + res.data[0].children[j].typeName + "</span></td>" +
	//									"<td><input typeId='" + res.data[0].children[j].typeId + "' value='" + res.data[0].children[j].rows + "' /></td>"
	//							} else {
	//								str22 += "<td><span>" + res.data[0].children[j].typeName + "</span></td>" +
	//									"<td><input typeId='" + res.data[0].children[j].typeId + "' value='" + res.data[0].children[j].rows + "' /></td>"
	//							}
	//						}
	//						var str44 = "<table class='customize' width='800px' height='100px' jfid='" + res.data[0].jfid + "' listerId='" + res.data[0].userId + "'>" +
	//							"<tr>" +
	//							str11 +
	//							"</tr>" +
	//							"<tr>" +
	//							str22 +
	//							"</tr>" +
	//							"</table>";
	//						$("table").remove("");
	//						$(".proportion-right-head").after(str44);
	//					}else{
	//						confirm(res.msg)
	//					}
	//
	//				}
	//			});
	//	}

	function saveProportionMessage() {}
	return {
		//储存混凝土信息
		keepInReserveMessage: keepInReserveMessage
	}
}());