var getNewlyMix = (function() {
	var mixDataMessafedetails;
	if(!DX.isEmpty(JSON.parse(GetQueryString("mixDataMessafedetails")))) {
		mixDataMessafedetails = JSON.parse(GetQueryString("mixDataMessafedetails"))[0];
		console.log(mixDataMessafedetails)
		$(".formulaName").val(mixDataMessafedetails.formulaName);
		$(".jfNumber").val(mixDataMessafedetails.jfNumber);
		$(".partName").val(mixDataMessafedetails.partName);
		$(".gasContentfloat").val(mixDataMessafedetails.gasContentfloat);
		$(".waterGluefloat").val(mixDataMessafedetails.waterGluefloat);
		$(".sandRatefloat").val(mixDataMessafedetails.sandRatefloat);
		$(".slumpfloat").val(mixDataMessafedetails.slumpfloat);
		$(".keep-in-reserve").attr("jfid", mixDataMessafedetails.jfid);
		getMixMaterialScienceMessage(mixDataMessafedetails.children);
	}
	//获取参数 
	function GetQueryString(name)   {     
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");     
		var r = window.location.search.substr(1).match(reg);     
		if(r != null) return  decodeURI(r[2]);
		return null;  
	}
	$(".add-fundamental").click(function() {
		$(".raw-stock-type-content div").removeClass("clicked")
		$(".modal").css("visibility", "visible")
	})
	$(".cancel").click(function() {
		$(".raw-stock-type-contents div").removeClass("clicked")
		$(".modal").css("visibility", "hidden")
	})
	$("body").on("click", ".raw-stock-type-contents div", function() {
		if($(this).hasClass("clicked")) {
			$(this).removeClass("clicked")
		} else {
			$(this).addClass("clicked")
		}
	});
	var rawStock = [];
	$(".comfire").click(function() {
		var str = "";
		$(".raw-stock-type-contents >div").filter(".clicked").each(function(i) {
			if($(".raw-stock-title").text().split(":").indexOf($(this).text()) != -1) {
				alert($(this).text() + "材料重复")
				return;
			}
			str += "<div class='raw-stock-content'>" +
				"<label>*</label>" +
				"<span class='raw-stock-title'>" + $(this).text() + ":" +
				"</span>" +
				"<input class='raw-stock-name' placeholder='" + $(this).text() + "' typeId='" + $(this).attr("typeId") + "' typeCode='" + $(this).attr("typeCode") + "' typeName='" + $(this).text() + "'/>" +
				"<img class='remove' width='14px' height='14px' src='static/img/canle.png'/>" +
				"</div>"
		})
		$(".raw-stock-wrapper").append(str);
		$(".modal").css("visibility", "hidden")
	})
	//获取材料信息
	;

	function getMixMaterialScienceMessage(MaterialScienceMessageData) {
		var str = "";
		for(var i = 0; i < MaterialScienceMessageData.length; i++) {
			str += "<div class='raw-stock-content'>" +
				"<label>*</label>" +
				"<span class='raw-stock-title'>" + MaterialScienceMessageData[i].typeName + ":" +
				"</span>" +
				"<input class='raw-stock-name' placeholder='" + MaterialScienceMessageData[i].typeName + "' typeId='" + MaterialScienceMessageData[i].typeId + "'  typeName='" + MaterialScienceMessageData[i].typeName + "' value='" + MaterialScienceMessageData[i].rows + "'/>" +
				"<img class='remove' width='14px' height='14px' src='static/img/canle.png'/>" +
				"</div>"
		}
		$(".raw-stock-wrapper").append(str);
	}
	$(".add-fundamental").click(function() {
		DX.ajax_method({ //权限控制
			'type': 'POST',
			'param': {},
			'change': $(this)[0],
			'url': '/mix/formula/getFormulaType',
			'callBack': function(res) {
				if(res.code == 200) {
					console.log(res.data)
					var str = "";
					for(var i = 0; i < res.data.length; i++) {
						str += "<div class='raw-stock-type' typeId='" + res.data[i].typeId + "' typeCode='" + res.data[i].typeCode + "'>" + res.data[i].typeName + "</div>";
					}
					$(".raw-stock-type-contents").html(str);
				} else {
					confirm(res.msg)
				}

			}
		});

		//		window.history.back(-1);
	})
	$("body").on("click", ".remove", function() {
		$(this).parent().remove();
	})
	$("body").on("mouseenter", ".remove", function() {
		$(this).attr("src", 'static/img/canlered.png')
	})
	$("body").on(" mouseleave", ".remove", function() {
		$(this).attr("src", 'static/img/canle.png')
	})
	$(".cancel-btn").click(function() {
		window.history.back(-1)
	})
	$(".keep-in-reserve").click(function() {
		if(DX.isEmpty($(this).attr("jfid"))){
			//添加配合比
			addDemandMessage($(this));
		}else{
			//修改配合比
			updateMixMessage($(this));
		}
		
	})
	//配合比信息
	function addDemandMessage(prm) {
		//强度等级
		var formulaName = $(".formulaName").val();
		//编号
		var jfNumber = $(".jfNumber").val();
		//含气量
		var gasContentfloat = $(".gasContentfloat").val();
		//部位名字
		var partName = $(".partName").val();
		//坍落度
		var slumpfloat = $(".slumpfloat").val();
		//水胶比
		var waterGluefloat = $(".waterGluefloat").val();
		//体积砂率
		var sandRatefloat = $(".sandRatefloat").val();
		//部位id
		var partId = 1;
		var admixturefloat = 1.0;
		var formulaTypeJson = [];
		$(".raw-stock-name").each(function() {
			formulaTypeJson.push({
				"typeId": $(this).attr("typeId"),
				"typeName": $(this).attr("typeName"),
				"typeCode": $(this).attr("typeCode"),
				"rows": $(this).val()
			})
		})
		DX.ajax_method({ //权限控制
			'type': 'POST',
			'param': {
				formulaName: formulaName,
				jfNumber: jfNumber,
				gasContentfloat: gasContentfloat,
				partName: partName,
				slumpfloat: slumpfloat,
				waterGluefloat: waterGluefloat,
				sandRatefloat: sandRatefloat,
				partId: partId,
				admixturefloat: admixturefloat,
				formulaTypeJson: JSON.stringify(formulaTypeJson)
			},
			'change': prm[0],
			'url': '/mix/formula/addAndGetFormula',
			'callBack': function(res) {
				if(res.code == 200) {
					alert("保存成功")
					window.history.back(-1)
				} else {
					confirm(res.msg)
				}

			}
		});
	}
	function updateMixMessage(prm){
		//强度等级
		var formulaName = $(".formulaName").val();
		//编号
		var jfNumber = $(".jfNumber").val();
		//含气量
		var gasContentfloat = $(".gasContentfloat").val();
		//部位名字
		var partName = $(".partName").val();
		//坍落度
		var slumpfloat = $(".slumpfloat").val();
		//水胶比
		var waterGluefloat = $(".waterGluefloat").val();
		//体积砂率
		var sandRatefloat = $(".sandRatefloat").val();
		//部位id
		var partId = 1;
		var type=1;
		var admixturefloat = 1.0;
		var jfId=prm.attr("jfid");
		var formulaTypeJson = [];
		$(".raw-stock-name").each(function() {
			formulaTypeJson.push({
				"typeId": $(this).attr("typeId"),
				"typeName": $(this).attr("typeName"),
				"typeCode": $(this).attr("typeCode"),
				"rows": $(this).val()
			})
		})
		DX.ajax_method({ //权限控制
			'type': 'POST',
			'param': {
				formulaName: formulaName,
				jfNumber: jfNumber,
				gasContentfloat: gasContentfloat,
				partName: partName,
				slumpfloat: slumpfloat,
				waterGluefloat: waterGluefloat,
				sandRatefloat: sandRatefloat,
				partId: partId,
				admixturefloat: admixturefloat,
				formulaTypeJson: JSON.stringify(formulaTypeJson),
				type:type,
				jfId:jfId
			},
			'change': prm[0],
			'url': '/mix/formula/updateAfterqueryFormula',
			'callBack': function(res) {
				if(res.code == 200) {
					alert("修改成功")
					window.history.back(-1)
				} else {
					confirm(res.msg)
				}

			}
		});
	}
}());