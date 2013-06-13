/*
*圆环加载类Load
*参数说明
container:存放加载条的容器
numcontainer:存放加载条和数值的总容器
styleopts：用于自定义加载条样式，可自定义参数说明：
	lines：加载条数目
	length：加载条长度
	width：加载条高度
	radius：环形加载条的半径
	border：加载条圆角大小
	ringColor:加载条颜色
	opacity:加载条透明度
numopts：用于自定义加载数值样式，可自定义参数说明：
	schedule：打算加载百分比
	speed：加载速度
	flag：是否显示加载数字
	numColor:字的颜色
*/
define(function(require,exports,module){
	var $=require('jquery');
	function Load(container,numcontainer,styleopts,numopts){
		this.container=$(container);
		this.outer=$(numcontainer);
		this.lines=styleopts.lines||20;
		this.length=styleopts.length||'20px';
		this.width=styleopts.width||'2px'; 
		this.radius=styleopts.radius||'40px';
		this.border=styleopts.border||'5px';
		this.ringColor=styleopts.ringColor||'#fff';
		this.opacity=styleopts.opacity||0.5;

		this.schedule=numopts.schedule||100;
		this.speed=numopts.speed||500;
		this.numflag=numopts.flag||true;
		this.numColor=numopts.numColor||'#fff';

		//存放加载数值的容器声明
		this.numcontainer=null;
		//存放当前环实际应该加载个数
		this.trueSche=null;
		//数值变化计时器
		var t=null;
		
	}

	module.exports=Load;
	//渲染方法
	Load.prototype.render=function(){
		this.trueSche=Math.round((this.lines*this.schedule)/100);//计算预加载值
		this.move();
	}
	//初始化方法
	Load.prototype.init=function(){  
		//旋转的平均角度
		this.rBase=360/this.lines;
		//存放每个实际旋转角度
		this.rItems=[];
		//初始化环的origin
		var topy=Math.round(this.container.parent().height()/2);
		var leftx=Math.round(this.container.parent().width()/2);
		//初始化container样式
		this.container.css({
			'position':'absolute',
			'top':topy+'px',
			'left':leftx+'px',
			'transform':'rotate(-90deg)',
			'-webkit-transform':'rotate(-90deg)',
			'-ms-transform':'rotate(-90deg)',
			'-o-transform':'rotate(-90deg)',
			'-moz-transform':'rotate(-90deg)'
		});
		
		return this;
	}
	//动态添加 加载条方法
	Load.prototype.add=function(){
		this.layout();
		for(var i=0;i<this.lines;i++){
			this.container.append(
				'<div style="width:'+this.length+';'+
				'position:absolute;'+
				'height:'+this.width+';'+
				'background-color:'+this.ringColor+';'+
				'opacity:'+this.opacity+';'+
				'border-radius:'+this.border+';'+
				'transform-origin: 0% 0%;'+
				'-webkit-transform-origin: 0% 0%;'+
				'-ms-transform-origin: 0% 0%;'+
				'-o-transform-origin: 0% 0%;'+
				'-moz-transform-origin: 0% 0%;'+
				'transform:rotate('+this.rItems[i]+'deg) '+
				'translate('+this.radius+',0);'+
				'-webkit-transform:rotate('+this.rItems[i]+'deg) '+
				'translate('+this.radius+',0);'+
				'-ms-transform:rotate('+this.rItems[i]+'deg) '+
				'translate('+this.radius+',0);'+
				'-o-transform:rotate('+this.rItems[i]+'deg) '+
				'translate('+this.radius+',0);'+
				'-moz-transform:rotate('+this.rItems[i]+'deg) '+
				'translate('+this.radius+',0);'+
				'"></div>');
		}
		//判断是否显示加载数字
		if(this.numflag=='true'){
			this.outer.append('<div id="loadnum"></div>');
			this.numcontainer=$('#loadnum');
			//初始化加载数值的origin和数值
			var topnum=Math.round(this.container.parent().height()/2-parseInt(this.radius)/2);
			var leftnum=Math.round(this.container.parent().width()/2-parseInt(this.radius)/2);
			this.numcontainer.css({
				'width':this.radius,
				'height':this.radius,
				'margin-top':topnum+'px',
				'margin-left':leftnum+'px',
				'font-size':Math.round(parseInt(this.radius)/2)+'px',
				'line-height':this.radius,
				'color':this.numColor

			});
			this.numcontainer.html('0%');
		}

		return this;
	}
	//计算方法，用于计算每个加载块/条应该旋转的角度
	Load.prototype.layout=function(){
		for(var i=0;i<this.lines;i++){
			this.rItems.push(this.rBase*(i));
		}
		return this;
	}
	//运动方法，更改加载条透明度
	Load.prototype.move=function(){
		var items=this.container.children();
		var self=this,i=0;
		
		t=setInterval(function(){
			if(i>self.trueSche-1){
				//若传入参数为true显示加载成功最后百分数
				if(self.numflag=='true'){
					self.numcontainer.html(self.schedule+'%');
				}
				
				return;
			}
			items[i].style.opacity=1;
			//若传入参数为true显示加载百分数
			if(self.numflag=='true'){
				self.numcontainer.html(Math.round(i*(self.schedule/self.lines))+'%');
			}
			i++;
		},self.speed);

	}
	//销毁方法
	Load.prototype.destory=function(){
		this.container.children().remove();
		if(this.numflag=='true'){
			this.numcontainer.remove();
		}
		
		return this;
	}
});