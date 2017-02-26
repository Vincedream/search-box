//根据参数获得元素
 var getDOM=function (id) {
      return document.getElementById(id);
}
 
//设置一个可以添加多个函数的函数
var addEvent=function (id,event,fn) {
    var el=getDOM(id)||document;
    //防止浏览器不兼容添加事件
    if(el.addEventListener){		
        el.addEventListener(event,fn,false);
    }else if(el.attachEvent){    
        el.attachEvent('on'+event,fn);
    }
   
}

var getElementLeft=function (element) {
    var actualLeft=element.offsetLeft;	 //获取当前元素距离上一个父元素的距离
    var parentEle=element.offsetParent;  //获取父元素

    while(parentEle!==null){
        actualLeft+=parentEle.offsetLeft;     //宽+宽
        parentEle=parentEle.offsetParent;
    }
    return actualLeft;
}

var getElementTop=function (element) {
	var actualTop=element.offsetTop;    
    var parentEle=element.offsetParent;

    while(parentEle!==null){
        actualTop+=parentEle.offsetTop;
        parentEle=parentEle.offsetParent;
    }	
   		
    return actualTop;
}
	//利用Ajax从服务器获取json数据
	var ajaxGet=function (url,callback) {
		var getHttp=null;   //设置一个接收参数的对象
		if(window.XMLHttpRequest){   //如果是非IE浏览器
			getHttp=new window.XMLHttpRequest();  
		}else if(window.ActiveXObject){  //如果是IE浏览器
			getHttp=new ActiveXObject("Msxml2.XMLHTTP");
		}
		getHttp.onreadystatechange=function () {
			if(getHttp.readyState==4 && getHttp.status==200){
				callback(JSON.parse(getHttp.responseText));
			}
		}
		getHttp.open('get',url,false);
		
	}

//设置suggest的css样式
addEvent('text-id','keyup',function () {
	var suggest=getDOM('suggest-id');
	var text=getDOM('text-id');
	var textVal=text.value;
	var show=getDOM('show-id');
	ajaxGet('http://api.bing.com/qsonhs.aspx?q='+textVal,function (d) {
		
		var d=d.AS.Results[0].Suggests;
		var html='';
		for(var i=0;i<d.length;i++){
			html='<li>'+d[i].Txt+'</li>';
		}
		show.innerHTML=html;
		suggest.style.left=getElementLeft(text)+'px';
	 	suggest.style.top=getElementTop(text)+50+'px';
	 	suggest.style.display='block';
	})
 	
});