$(function() {
	$(".add-car-team").click(function(evevt) {
		var e = window.target || evevt;
		if($(".add-car-wrapper-content").hasClass("click")) {
			$(".add-car-wrapper-content").removeClass("click").stop().slideUp(200);
		} else {
			$(".add-car-wrapper-content").addClass("click").stop().slideDown(200);
		}
		clearContent();
		e.stopPropagation();
	})
	//取消
	$(".cancel").click(function(evevt) {
		var e = window.target || evevt;
		$(".add-car-wrapper-content").removeClass("click")
		$(".add-car-wrapper-content").stop().slideUp(200);
		clearContent();
		e.stopPropagation();
	})
	$("body").on("click", ".cancels", function(evevt) {
		var e = window.target || evevt;
		$(this).parent().parent().parent().parent().parent().prev().removeClass("bgcolor")
		$(this).parent().parent().parent().stop().slideUp(200, function() {
			$(this).parent().remove();
		})
		e.stopPropagation();
	})
	var a;
	$("body").on("click", "#message", function(evevt) {
		//				if($(this).next('tr').children().children(".add-car-wrapper").hasClass("click")) {
		//					$(this).next('tr').children().children(".add-car-wrapper").removeClass("click").stop().slideUp(200, function() {
		//						$(this).parent().parent().remove();
		//					});
		//				}
		var e = window.target || evevt;
		var str = updateMessage();
		if($(this).next('tr').children().children(".add-car-wrapper").hasClass("click")) {
			if(typeof $(this).next('tr').children().children(".add-car-wrapper").find("input").attr("disabled") == "undefined") {
				$(this).next('tr').children().children(".add-car-wrapper").find("input").attr("disabled", true);
				$(this).next('tr').children().children(".add-car-wrapper").find("select").attr("disabled", true);
				return false;
			}
			$(this).removeClass("bgcolor")
			$(this).next('tr').children().children(".add-car-wrapper").removeClass("click").stop().slideUp(200, function() {
				$(this).parent().parent().remove();
			});
		} else {
			$(this).addClass("bgcolor");
			$(this).after(str);
			$(this).next('tr').children().children(".add-car-wrapper").addClass("click").stop().slideDown(200);
		}
		$(this).next('tr').children().children(".add-car-wrapper").find("input").attr("disabled", true);
		$(this).next('tr').children().children(".add-car-wrapper").find("select").attr("disabled", true);
		e.stopPropagation();
	})
	//更新
	$("body").on("click", ".update", function(evevt) {

		//				if($(this).parent().parent().next('tr').children().children(".add-car-wrapper").hasClass("clicks")) {
		//					$(this).parent().parent().next('tr').children().children(".add-car-wrapper").removeClass("clicks").stop().slideUp(200, function() {
		//						$(this).parent().parent().remove();
		//					});
		//				}
		var e = window.target || evevt;
		var str = updateMessage();
		if($(this).parent().parent().next('tr').children().children(".add-car-wrapper").hasClass("click")) {
			if($(this).parent().parent().next('tr').children().children(".add-car-wrapper").find("input").attr("disabled") == "disabled") {
				$(this).parent().parent().next('tr').children().children(".add-car-wrapper").find("input").attr("disabled", false);
				$(this).parent().parent().next('tr').children().children(".add-car-wrapper").find("select").attr("disabled", false);
				return false;
			}
			$(this).parent().parent().removeClass("bgcolor");
			$(this).parent().parent().next('tr').children().children(".add-car-wrapper").removeClass("click").stop().slideUp(200, function() {
				$(this).parent().parent().remove();
			});
		} else {
			$(this).parent().parent().addClass("bgcolor");
			$(this).parent().parent().after(str);
			$(this).parent().parent().next('tr').children().children(".add-car-wrapper").addClass("click").stop().slideDown(200);
		}
		$(this).parent().parent().next('tr').children().children(".add-car-wrapper").find("input").attr("disabled", false);
		$(this).parent().parent().next('tr').children().children(".add-car-wrapper").find("select").attr("disabled", false);
		e.stopPropagation();
	})

	//点击非区域块
	$(document).on("click", function(e) {
		var target = $(e.target);
		if(target.closest(".add-car-wrapper-content").length == 0) {
			$(".add-car-wrapper-content").stop().slideUp(200);
			$(".add-car-wrapper-content").removeClass("click")
		}
	})
	//删除
	$("body").on("click", ".delete", function(evevt) {
		var e = window.target || evevt;
		if($(this).parent().parent().next('tr').children().children(".add-car-wrapper:first").hasClass("click") || $(this).parent().parent().next('tr').children().children(".add-car-wrapper:first").hasClass("clicks")) {
			$(this).parent().parent().next('tr').children().children(".add-car-wrapper:first").remove();
			$(this).parent().parent().next('tr').remove();
		}
		$(this).parent().parent().remove();
		e.stopPropagation();
	})
	//保存信息
	$("body").on("click", ".submit", function() {

		$(this).parent().parent().parent().parent().parent().stop().slideUp(200, function() {
			DX.option($(this).prev());

		});
		if($(this).parent().parent().parent().parent().parent().prev().hasClass("bgcolor")) {
			$(this).parent().parent().parent().parent().parent().prev().removeClass("bgcolor")
		} else {
			alert("a")
			$(this).parent().parent().parent().parent().parent().prev().removeClass("bgcolor")
		}

	})
	$(".submits").click(function() {
		$(".add-car-wrapper-content").removeClass("click");
		$(".add-car-wrapper-content").stop().slideUp(200);
		var obj = {
			carTel: $("#carTel").val(),
			carAmount: $("#carAmount").val(),
			carName: $("#carName").val(),
			carPhone: $("#carPhone").val(),
			carVehicleOwner1: $("#carVehicleOwner1").val(),
			carVehicleOwnerPhone1: $("#carVehicleOwnerPhone1").val(),
			carVehicleOwner2: $("#carVehicleOwner2").val(),
			carVehicleOwnerPhone2: $("#carVehicleOwnerPhone2").val(),
			shifts1: $("#shifts1 option:selected").val(),
			shifts2: $("#shifts2 option:selected").val()
		}
		var str = getCarAndUserMessage(obj);
		$("#table tbody").append(str);
	})
})

function updateMessage() {
	var str = "";
	str += "<tr>" +
		"<td colspan='13' id='addmessage'>" +
		"<div class='add-car-wrapper'>" +
		"<div class='add-wrapper-content'>" +
		"<div class='add-wrapper-content-left'>" +
		"<p>车主信息:</p>" +
		"<div>" +
		"<label>车&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号:</label>" +
		"<input id='carTel' class='input' placeholder='请输入车号' />" +
		"</div>" +
		"<div>" +
		"<label>车&nbsp;&nbsp;牌&nbsp;&nbsp;号:</label>" +
		"<input id='carTel' class='input' placeholder='请输入车号' />" +
		"</div>" +
		"<div>" +
		"<label>车&nbsp;&nbsp;载&nbsp;&nbsp;量:</label>" +
		"<input id='carAmount' class='input' placeholder='请输入车载量' />" +
		"</div>" +
		"<div>" +
		"<label>车主姓名:</label>" +
		"<input id='carName' class='input' placeholder='请输入车主姓名' />" +
		"</div>" +
		"<div>" +
		"<label>联系电话:</label>" +
		"<input id='carPhone' class='input' placeholder='请输入联系电话' />" +
		"</div>" +
		"</div>" +
		"<div class='add-wrapper-content-right'>" +
		"<p>驾驶员信息:</p>" +
		"<div>" +
		"<label>驾&nbsp;&nbsp;驶&nbsp;&nbsp;员&nbsp;1:</label>" +
		"<input id='carVehicleOwner1' class='left-input input' placeholder='请输入驾驶员姓名' />" +
		"<label>驾&nbsp;&nbsp;驶&nbsp;&nbsp;员&nbsp;1:</label>" +
		"<input id='carVehicleOwner2' class='right-input input' placeholder='请输入驾驶员姓名' />" +
		"</div>" +
		"<div>" +
		"<label>联&nbsp;系&nbsp;电&nbsp;话:</label>" +
		"<input id='carVehicleOwnerPhone1' class='left-input input' placeholder='请输入联系电话' />" +
		"<label>联&nbsp;系&nbsp;电&nbsp;话:</label>" +
		"<input id='carVehicleOwnerPhone2' class='right-input input' placeholder='请输入联系电话' />" +
		"</div>" +
		"<div>" +
		"<label>请选择班次:</label>" +
		"<select id='shifts1' class='select'>" +
		"<option>请选择班次</option>" +
		"<option>白班</option>" +
		"<option>夜班</option>" +
		"</select>" +
		"<label class='classes'>请选择班次:</label>" +
		"<select id='shifts2' class='select'>" +
		"<option>请选择班次</option>" +
		"<option>白班</option>" +
		"<option>白班</option>" +
		"<option>夜班</option>" +
		"</select>" +
		"</div>" +
		"</div>" +
		"</div>" +
		"<div class='bottom-footer'></div>" +
		"<div class='add-wrapper-footer'>" +
		"<div class='btn-wrapper'>" +
		"<button type='button' class='btnOrange submit'>提交</button>" +
		"<button type='button' class='btnOrange cancels'>取消</button>" +
		"</div>" +
		"</div>" +
		"</div>" +
		"</td>" +
		"</tr>";
	return str;

}
//数据展示
function getCarAndUserMessage(obj) {
	var str = "";
	//			str += "<ul class='car-manage-wrapper-content'>" +
	//				"<li>" + obj.carTel + "</li>" +
	//				"<li>" + obj.carName + "</li>" +
	//				"<li>" + obj.carPhone + "</li>" +
	//				"<li>" + obj.carAmount + "</li>" +
	//				"<li>2019/02/04</li>" +
	//				"<li>" + obj.carVehicleOwner1 + "</li>" +
	//				"<li>" + obj.carVehicleOwnerPhone1 + "</li>" +
	//				"<li>" + obj.shifts1 + "</li>" +
	//				"<li>" + obj.carVehicleOwner2 + "</li>" +
	//				"<li>" + obj.carVehicleOwnerPhone2 + "</li>" +
	//				"<li>" + obj.shifts2 + "</li>" +
	//				"<li>正常运输</li>" +
	//				"<li><span class='update'>修改</span><span class='delete'>删除</span></li>" +
	//				"</ul>";
	str += "<tr id='message'>" +
		"<td>" + obj.carTel + "</td>" +
		"<td>" + obj.carName + "</td>" +
		"<td>" + obj.carPhone + "</td>" +
		"<td>" + obj.carAmount + "</td>" +
		"<td>2019/02/04</td>" +
		"<td>" + obj.carVehicleOwner1 + "</td>" +
		"<td>" + obj.carVehicleOwnerPhone1 + "</td>" +
		"<td>" + obj.shifts1 + "</td>" +
		"<td>" + obj.carVehicleOwner2 + "</td>" +
		"<td>" + obj.carVehicleOwnerPhone2 + "</td>" +
		"<td>" + obj.shifts2 + "</td>" +
		"<td>正常运输</td>" +
		"<td><span class='update'>修改</span><span class='delete'>删除</span></td>" +
		"</tr>";
	return str;
}
//清空数据
function clearContent() {
	$("#carTel").val("");
	$("#carAmount").val("");
	$("#carName").val("");
	$("#carPhone").val("");
	$("#carVehicleOwner1").val("");
	$("#carVehicleOwnerPhone1").val("");
	$("#carVehicleOwner2").val("");
	$("#carVehicleOwnerPhone2").val("");
	$("#shifts1").val("请选择班次");
	$("#shifts2").val("请选择班次");
}