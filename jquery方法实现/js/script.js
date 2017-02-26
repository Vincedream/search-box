$(document).ready(function () {
	$(".text").bind('keyup',function () {
		
		var searchText=$('.text').val();  //获取输入框的值，
		$.get('http://api.bing.com/qsonhs.aspx?q='+searchText,function (d) {  //Ajax调用函数第一个是api地址，第二个回调函数，第三个json数据形式                                                                
			var d=d.AS.Results[0].Suggests;   //Ajax数据数组
			var html='';    //html保存返回来所需要的数据
			for(var i=0;i<d.length;i++){   //遍历数据
				html+='<li>'+d[i].Txt+'</li>';
			}
			$('#show').html(html);     //将所需要的数据遍历到li当中
			$(".suggest").show().css({  //设置弹出框的css
			top:$('.text').offset().top+$('.text').height(),
			left:$('.text').offset().left,
			position:'absolute'
		});
		},'json');
			
		
	});
	//当鼠标点别的地方，提示弹出框隐藏
	$(document).bind('click',function () {
		$(".suggest").hide();
	})
	//因为li是不确定性的内容，因此需要用“事件代理”第一个参数表示代理目标，第二个为目标的绑定事件，第三个为回调函数
	$(document).delegate('li','click',function () {
		var keyword=$(this).text();   //获取li的内容
		location.href='http://cn.bing.com/search?q='+keyword;  location跳转到指定href
	});
	//定义点击按钮事件
	$('.submit').bind('click',function () {
		var searchTxt=$('.text').val();
		location.href='http://cn.bing.com/search?q='+searchTxt;
	})

});