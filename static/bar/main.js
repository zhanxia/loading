/*
 *主函数main
 */
define(function(require) {
	var $ = require('jquery'),
		Exp = require('./load'),
		Ie = require('./ieload'),
		Tool = require('../lib/tool');
	/*
	 *页面加载完初始化参数
	 */
	$(function() {
		/*
		 *初始化参数
		 *styleopts是加载条的样式参数集
		 *numopts是加载数值的样式参数集
		 *e存储实例化的加载条函数
		 */
		var Styleopts = {
			lines: $('#lineNum').val(),
			length: $('#lengthNum').val() + 'px',
			width: $('#widthNum').val() + 'px',
			radius: $('#radiusNum').val() + 'px',
			border: $('#borderNum').val() + 'px',
			ringColor: $('#colorNum').val(),
			opacity: $('#opacityNum').val()
		},
			Numopts = {
				schedule: $('#loadTotal').val(),
				speed: $('#loadSpeed').val(),
				flag: null,
				numColor: $('#loadColor').val()
			}, E = null;
		//初始化是否选择显示加载数值
		if ($('#loadFlagYes').attr("checked")) {
			Numopts.flag = 'true';
		} else {
			Numopts.flag = 'false';
		}

		//动态改变环条数
		$('#lineNum').change(function() {
			$(this).next().html($(this).val());
			Styleopts.lines = $(this).val();
		});
		//动态改变环条长
		$('#lengthNum').change(function() {
			$(this).next().html($(this).val());
			Styleopts.length = $(this).val() + 'px';
		});
		//动态改变环条高
		$('#widthNum').change(function() {
			$(this).next().html($(this).val());
			Styleopts.width = $(this).val() + 'px';
		});
		//动态改变环半径
		$('#radiusNum').change(function() {
			$(this).next().html($(this).val());
			Styleopts.radius = $(this).val() + 'px';
		});
		//动态改变环条圆角
		$('#borderNum').change(function() {
			$(this).next().html($(this).val());
			Styleopts.border = $(this).val() + 'px';
		});
		//动态改变环条颜色
		$('#colorNum').bind('input', function() {
			$(this).next().html($(this).val());
			Styleopts.ringColor = $(this).val();
		});
		//动态改变环条透明度
		$('#opacityNum').change(function() {
			$(this).next().html($(this).val());
			Styleopts.opacity = $(this).val();
		});

		//动态改变加载总进度
		$('#loadTotal').change(function() {
			$(this).next().html($(this).val());
			Numopts.schedule = $(this).val();
		});
		//动态改变加载速度
		$('#loadSpeed').change(function() {
			$(this).next().html($(this).val());
			Numopts.speed = $(this).val();
		});
		//监听是否显示加载数值
		$("#opts input[type='radio']").click(function() {
			if ($(this).attr("checked")) {
				Numopts.flag = $(this).val();
			}
		});
		//动态改变数值颜色
		$('#loadColor').bind('input', function() {
			$(this).next().html($(this).val());
			Numopts.numColor = $(this).val();
		});

		/*
		 *控制器
		 *判断浏览器是否支持transform
		 *支持则运行环形加载类
		 *否则运行条形加载类
		 */
		$('#run').click(function() {
			if (Tool.pubClass.support('Transform')) {
				if (E) {
					E.destory();
				}
				E = new Exp('#preouter', '#preview', Styleopts, Numopts);
				E.init(); //初始化实例
				E.add(); //向实例中添加预设的加载条数
				E.render(); //渲染该实例
			} else {
				if (E) {
					E.destory();
				}
				E = new Ie('#preouter', '#preview', Styleopts, Numopts);
				E.init();
				E.add();
				E.render();
			}
		});
	});

});