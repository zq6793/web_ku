// 分页
var pages = {
	
	contant:[],//查询条件的字段
	checkeds:[],//查询条件的输入框id '#sss'
	url:'',//请求接口地址
	type:'GET',
	callBack:function(res){
		
	},//回调函数
	/**
	 * @param {Object} res
	 * key 查询条件的字段 可选[]
	 * value 查询条件的值 可选[]
	 * url 请求地址
	 * type 请求方式 默认get
	 * callBack 回调函数
	 */
	init:function(res) {
		
		if(res.key){
			this.contant = res.key;
		}
		if(res.value){
			this.checkeds =res.value; 
		}
		if(res.type){
			this.type =res.type; 
		}
		this.url = res.url;
		this.callBack = res.callBack;
		var that = this;
		
		var html = '';
		html += '<ul class="pages1 clearfix"><li class="page_first">首页</li><li class="page_pre">上一页</li><li class="page_next">下一页</li><li class="page_last">尾页</li></ul>';
		html += '<div class="show1 clearfix">';
		html +=		'<span class="page_index">第 <input type="number" value="1" > 页</span>';
		html +=		'<span class="page_count">/ 共1页</span>';
		html +=		'<span class="page_count1">共0条</span>';
		html +=		'<span>每页</span>';
		html +=		'<input type="number"  id="page_number" value="20" class="fl" />';
		html +=		'<span>条</span>';
		html +=	'</div>';
		
			//<!-- 当前页码 -->
		html +=	'<input type="hidden" name="" id="page_index" value="1">';
			//上一页
		html +=	'<input type="hidden" name="" id="page_pre" value="1">';
			//下一页
		html +=	'<input type="hidden" name="" id="page_next" value="1">';			
			//<!-- 共多少页 -->
		html +=	'<input type="hidden" name="" id="page_last" value="1" />';
		
		$('.page1').html(html);
		
		//初始化调用
		var page = {'curPage':1,'pageSize':$('#page_number').val()};
		that.select(page);
		
		 // 点击首页
		$('.page_first').click(function(){
		    // $('.pages1 li').removeClass('page_active');
		    var obj = that.pageValue();
		    if(Number(obj.page_index) > 1) {
				var page = {'curPage':1,'pageSize':obj.page_number};
				that.select(page);	
			}
			// else{
			// 	 $('.page_next').addClass('page_active');
			// }
		   
		    // $('.page_first').addClass('page_active');
		    // $('.page_pre').addClass('page_active');
		});
		// 点击上一页
		$('.page_pre').click(function(){
		    // $('.pages1 li').removeClass('page_active');
		    var obj = that.pageValue();
		    if(Number(obj.page_index) > 1) {
		        var page = {'curPage':obj.page_pre,'pageSize':obj.page_number};
		        that.select(page);	
		    }
		    if(Number(obj.page_index) <= 2){
				$('.page_first').addClass('page_active');
				$('.page_pre').addClass('page_active');
			}
		    // $('.first').addClass('page_active');
		    
		})
		// 点击下一页
		$('.page_next').click(function(){
			console.log(11111);
		    // $('.pages1 li').removeClass('page_active');
		    var obj = that.pageValue();
		    if(Number(obj.page_index) < Number(obj.page_last)) {
				var page = {'curPage':obj.page_next,'pageSize':obj.page_number};
				that.select(page);
		    }
			console.log(obj);
		//    if(Number(obj.page_index) >= Number(obj.page_last)-1) {
		// 	   $('.page_last').addClass('page_active');
		// 	   $('.page_next').addClass('page_active');
		//    }
		    
		    
		})
		// 点击尾页
		$('.page_last').click(function(){
		    // $('.pages1 li').removeClass('page_active');
		    var obj = that.pageValue();
			if(Number(obj.page_index) < Number(obj.page_last)){
				var page = {'curPage':obj.page_last,'pageSize':obj.page_number};
				that.select(page);
			}
			// else{
			// 	$('.page_pre').addClass('page_active'); 
			// }
			
			
			// $(this).addClass('page_active');
			// $('.page_next').addClass('page_active'); 
		})
		
		//input 回车
		$('.show1 input').keydown(function(e){
			that.keyDown(e);
		})
		
	},
	/* 获取分页value
	* page_index 当前页码
	* page_number 显示数量
	* page_last 共多少页
	*/
	pageValue:function(){
	    var page_index = $('#page_index').val();
	    var page_number = $('#page_number').val();
	    var page_last = $('#page_last').val();
	    var page_pre = $('#page_pre').val();
	    var page_next = $('#page_next').val();
	    return obj = {"page_index":page_index,"page_number":page_number,"page_last":page_last,
	    'page_pre':page_pre,'page_next':page_next}
	},
	/**
	 * @param {Object} event 回车调用接口
	 */
	keyDown:function(event){
		
		if (event.keyCode == 13){
			event.returnValue=false;
			event.cancel = true;
			var page_index = $('.page_index input').val();
			var obj = this.pageValue();
			var page = {'curPage':page_index,'pageSize':obj.page_number};
			
			this.select(page);
		}
	},
	//请求函数
	select:function(obj){
		var that = this;
		// 
		// if(that.contant){//需要查询再拼接条件
		// 	obj[contant] = checkeds;
		// }
		
		for (var i=0;i<that.contant.length;i++) {
			obj[that.contant[i]] = that.checkeds[i];
		}
		
	    DX.ajax_method({
	        'type':that.type,
	        'url':that.url,
	        'param':obj,
	        'callBack':that.selectcall
	    });
	},
	//分页处理函数
	selectcall:function(res){
		
		if(res.code != '200'){
			console.log('数据错误');return;
		}
		$('.page_index input').val(res.data.pageNum);
		$('.page_count').html('/ 共'+res.data.pages+'页');
		$('.page_count1').html('共'+res.data.total+'条');
		
		$("#page_index").val(res.data.pageNum);
		$("#page_last").val(res.data.pages);
		$("#page_pre").val(res.data.prePage);
		$("#page_next").val(res.data.nextPage);
		
		$('.pages1 li').removeClass('page_active');
		if(res.data.pages<=1){
			$('.page_first').addClass('page_active');
			$('.page_next').addClass('page_active');
			$('.page_pre').addClass('page_active');
			$('.page_last').addClass('page_active');
		}
		if(res.data.pageNum == 1){
			console.log(22);
			$('.page_first').addClass('page_active');
			$('.page_pre').addClass('page_active');
		}
		if(res.data.pageNum == res.data.pages){
			$('.page_next').addClass('page_active');
			$('.page_last').addClass('page_active');
		}
		
		pages.callBack(res);
	},
	
}
