
$(function() {
			$(".add-account-btn").click(function(evevt) {
				var e = window.target || evevt;
				if($(".add-account-content").hasClass("clicked")) {
					$(".add-account-content").removeClass("clicked").stop().slideUp(200);
				} else {
					$(".add-account-content").addClass("clicked").stop().slideDown(200);
				}
				e.stopPropagation();
			});
			//点击非区域块
			$(document).on("click", function(e) {
				var target = $(e.target);
				if(target.closest(".add-account-content").length == 0) {
					$(".add-account-content").stop().slideUp(200);
					$(".add-account-content").removeClass("clicked")
				}
			})
		})