var getCarAndMessage = (function() {
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
			// confirm("请先保存信息")
			return;
		}
		$(".second").text(59);
		$(".minute").text(4);

	})
	//删除安排车辆
	;
	$("body").on("click", ".delete", function() {
		if($(this).parent().parent().parent().find("tr").length <= 1) {
			var str = "";
			str += "<tr class='moudle'>" +
				"<td colspan='9' style='border: 1px solid #FFFFFF;'>" +
				"<div style='width: 100%;height: 294px;line-height: 294px;background-color: #FFFFFF;'>暂无车辆安排" +
				"</div>" +
				"</td>" +
				"</tr>"
			$(this).parent().parent().parent().append(str)
		}
		$(this).parent().parent().remove();
	})
	//安排车辆
	$("body").on("click", ".arrange", function() {
		$(this).parent().parent().parent().parent().parent().next(".deman-pooling-wrapper-right").children("table").children("tbody").children(".moudle").remove();
		var str = "";
		str += "<tr>" +
			"<td>1</td>" +
			"<td>张三</td>" +
			"<td>12345678910</td>" +
			"<td>8</td>" +
			"<td>1</td>" +
			"<td>张三</td>" +
			"<td>2019/01/01</td>" +
			"<td>等待装车</td>" +
			"<td><span class='delete'>删除</span></td>" +
			"</tr>";
		$(this).parent().parent().parent().parent().parent().next(".deman-pooling-wrapper-right").children("table").children("tbody").append(str)
	})
	$("body").on("click", "table >tbody>tr", function() {
		DX.clickTr($(this), "table >tbody>tr");
	})
}());