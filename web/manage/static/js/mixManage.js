var getMixMessage = (function() {
	$(".add-mix").click(function() {
		window.location.href = "newlyMix.html";
	});
	$("body").on("click", ".delete", function() {
		if($(this).parent().parent().next().children().children("div").hasClass("clicked")) {
			$(this).parent().parent().next().children().children("div").remove();
			$(this).parent().parent().next('tr').remove();
		}
		$(this).parent().parent().remove();
	})

	function getMixMessageDetails(mixDataMessage) {
		var str = "";
		var str1 = "";
		for(var i = 0; i < mixDataMessage.length; i++) {
			str1 += "<div class='mix-content' typeId='" + mixDataMessage[i].typeId + "' typeCode='" + mixDataMessage[i].typeCode + "'>" +
				"<span>" + mixDataMessage[i].typeName + "</span>" +
				"<span>" + mixDataMessage[i].rows + "</span>" +
				"<span>(kg/m3)</span>" +
				"</div>";
		}
		str += "<tr style='display: table-row;'>" +
			"<td colspan='10'>" +
			"<div class='tip-content'>" +
			"<div class='fundamental-message-title'>" +
			"<span></span>" +
			"<span>基础信息</span>" +
			"</div>" +
			"<div class='mix-message-content'>" +
			str1 +
			"</div>" +
			"</div>" +
			"</td>" +
			"</tr>";
		return str;
	}
	$("body").on("click", ".mix-messages", function(e) {
		if($(this).parent().parent().next().children().children("div").hasClass("clicked")) {
			$(this).parent().parent().next().children().children("div").removeClass("clicked").stop().slideUp(200, function() {
				$(this).parent().parent().remove();
			});
			$(this).parent().parent().removeClass("bgcolor")
		} else {
			var _this = $(this).parent();
			DX.ajax_method({ //权限控制
				'type': 'POST',
				'param': {
					jfId: $(this).attr("jfId")
				},
				'url': '/mix/formula/getFormulaTypeJson',
				'callBack': function(res) {
					if(res.code == 200) {
						console.log(res)
						var str = getMixMessageDetails(res.data);
						_this.parent().addClass("bgcolor")
						_this.parent().after(str);
						_this.parent().next().children().children("div").addClass("clicked").slideDown(200);
					} else {
						confirm(res.msg)
					}
				}
			});
		}
	});
	$("body").on("click", "table >tbody>tr", function() {
		DX.clickTr($(this), "table >tbody>tr");
	});

	//强的等级
	var formulaName="";
	//关键词语
	var keyword="";
	//监听改变
	$(".mix-type").change(function() {
		formulaName = $(".mix-type").find("option:selected").attr("jfId");
	})
	
	//获取配方列表
	getMixMessageData();
	//获取配方列表
	function getMixMessageData() {
		DX.ajax_method({ //权限控制
			'type': 'POST',
			'param': {
				//			formulaName:formulaName
				//			keyword:keyword
			},
			'url': '/mix/formula/getFormulaByUserId',
			'callBack': function(res) {
				if(res.code == 200) {
					getMixMessage(res.data.rows)
				} else {
					confirm(res.msg)
				}

			}
		});
	}
	
	//获取配方列表
	function getMixMessage(mixData) {
		var str = "";
		for(var i = 0; i < mixData.length; i++) {
			str += "<tr>" +
				"<td>" + mixData[i].jfNumber + "</td>" +
				"<td>" + mixData[i].partName + "</td>" +
				"<td>" + mixData[i].jfNumber + "</td>" +
				"<td>" + mixData[i].formulaName + "</td>" +
				"<td>" + mixData[i].sandRatefloat + "</td>" +
				"<td>" + mixData[i].waterGluefloat + "</td>" +
				"<td>" + mixData[i].slumpfloat + "</td>" +
				"<td>" + mixData[i].gasContentfloat + "</td>" +
				"<td>" +
				"<a class='mix-messages'  jfId='" + mixData[i].jfid + "'>查看配合比</a>" +
				"</td>" +
				"<td><span class='update' jfId='" + mixData[i].jfid + "'>修改</span><span class='delete' jfId='" + mixData[i].jfid + "'>删除</span></td>" +
				"</tr>"
		}
		$(".table>tbody").empty();
		$(".table>tbody").append(str)
	}
	//更改配置信息
	$("body").on("click", ".update", function() {
		DX.ajax_method({ //权限控制
			'type': 'POST',
			'param': {
				jfId: $(this).attr("jfId")
			},
			'change': $(this)[0],
			'url': '/mix/formula/getFormulaByjfId',
			'callBack': function(res) {
				if(res.code == 200) {
					window.location.href = "newlyMix.html?mixDataMessafedetails=" + encodeURI(JSON.stringify(res.data));
				} else {
					confirm(res.msg)
				}
			}
		});
	})
	//删除配置信息
	;
	$("body").on("click", ".delete", function() {
		DX.ajax_method({ //权限控制
			'type': 'POST',
			'param': {
				jfId: $(this).attr("jfId")
			},
			'change': $(this)[0],
			'url': '/mix/formula/delFormulaByJfid',
			'callBack': function(res) {
				if(res.code == 200) {
					console.log(res)
					confirm(res.data)
				} else {
					confirm(res.msg)
				}
			}
		});
	})
	/**
	 *获取强度等级 
	 * @param {Object} strongData
	 */
	;

	function getStrong(strongData) {
		var str = "";
		for(var k = 0; k < strongData.length; k++) {
			str += "<option jfId='" + strongData[k].jfId + "' jfName='" + strongData[k].formulaName + "'>" + strongData[k].formulaName + "</option>"
		}
		return str;
	}
	//获取制单员权限的等级
	;
	DX.ajax_method({ 
		'type': 'POST',
		'param': {},
		'url': '/mix/formula/getFormulaNames',
		'callBack': function(res) {
			if(res.code == 200) {
				var str = getStrong(res.data);
				$(".mix-type").append(str)
			} else {
				confirm(res.msg)
			}
		}
	});
	
	
	
	
	
	//点击查询获取配合比信息
	$(".query").click(function(){
		formulaName=$(".mix-type").find("option:selected").attr("jfId");
		DX.ajax_method({ //权限控制
			'type': 'POST',
			'param': {
				curPage:1,
				pageSize:20,
				formulaId:formulaName,
				keyword:$(".inquire").val()
			},
			'url': '/mix/formula/getFormulaByUserId',
			'callBack': function(res) {
				if(res.code == 200) {
					getMixMessage(res.data.rows)
				} else {
					confirm(res.msg)
				}

			}
		});
	})
}());