/*
 *工具类Tool
 *support方法：判断浏览器是否支持tranform
 *setOpcity方法：设置IE透明度
 */
define(function(require, exports, module) {
	exports.pubClass = {
		support: function(style) {
			var browsers = ['', 'Webkit', 'Moz', 'O', 'Ms'],
				flag = [],
				item,
				tag = false;
			for (var i = 0; i < browsers.length; i++) {
				item = browsers[i] + style;
				flag.push(false || (item in document.documentElement.style));
			}
			for (var j = 0; j < flag.length; j++) {
				if (flag[j]) {
					tag = flag[j];
				}
			}
			return tag;
		},
		setOpcity: function(obj, value) {
			var isMSIE = (navigator.appName == "Microsoft Internet Explorer");
			if (isMSIE) {
				obj.style.filter = "alpha(opacity=" + value * 100 + ")";
			} else {
				obj.style.opacity = value;
			}
		}
	};
});