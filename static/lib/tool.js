/*
*工具类Tool
*判断浏览器是否支持tranform
*/
define(function(require,exports,module){
	exports.Support=function(style,normal){
		var browsers=['','Webkit','Moz','O','Ms'],flag=[],item,tag=false;
		for(var i=0;i<browsers.length;i++){
			item=browsers[i]+style;
			flag.push(false||(item in document.documentElement.style));
		}
		 for(var i=0;i<flag.length;i++){
		 	if(flag[i]){
		 		tag=flag[i];
		 	}
		}
		return tag;
	};
})