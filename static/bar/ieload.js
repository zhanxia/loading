/*
*条形加载类Load
*参数说明
container:存放加载块的容器
numcontainer:存放加载条和数值的总容器
styleopts：用于自定义加载块样式，可自定义参数说明：
	lines：加载块数目
	length：加载块长度
	width：加载块高度
	border：加载块圆角大小
	ringColor:加载块颜色
	opacity:加载块透明度
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
		this.numcontainer=null;
		this.lines=styleopts.lines||20;
		this.length=styleopts.length||'20px';
		this.width=styleopts.width||'2px'; 
		this.border=styleopts.border||'5px';
		this.ringColor=styleopts.ringColor||'#fff';
		this.opacity=styleopts.opacity||0.5;

		this.schedule=numopts.schedule||100;
		this.speed=numopts.speed||500;
		this.numflag=numopts.flag||true;
		this.numColor=numopts.numColor||'#fff';

		//存放加载数值的容器声明
		this.numcontainer=null;
		//存放当前加载条实际应该加载个数
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
		//计算每个loading块宽
		this.rBase=Math.round(parseInt(this.length)/this.lines);
		//存放每个实际旋转角度
		this.rItems=[];

		//初始化条的位置
		var topy=Math.round(this.container.parent().height()/2-parseInt(this.width)/2);
		//初始化container样式
		this.container.css({
			'position':'relative',
			'overflow':'hidden',
			'width':this.length,
			'height':this.width,
			'margin':topy+'px auto 5px auto',
			'border':'1px solid '+this.ringColor,
			'border-radius':this.border
		})

		return this;
	}
	//动态添加 加载块方法
	Load.prototype.add=function(){
		this.layout();
		for(var i=0;i<this.lines;i++){
			this.container.append('<div style="'+
				'position:absolute;'+
				'width:'+this.rBase+'px;'+
				'height:'+this.width+';'+
				'top:0;'+'left:'+this.rItems[i]+'px;'+
				'background-color:'+this.ringColor+';'+
				'opacity:'+this.opacity+';'+
			'"></div>');
		}
		//loading块第一个和最后一个设置圆角
		var items=this.container.children();
		for(var i in items){
			if(i==0){
				items[i].style['border-top-left-radius']=this.border;
				items[i].style['border-bottom-left-radius']=this.border;
			}
			if(i==items.length-1){
				items[i].style['border-top-right-radius']=this.border;
				items[i].style['border-bottom-right-radius']=this.border;
			}
		}
		
		//判断是否显示加载数字
		if(this.numflag=='true'){
			this.outer.append('<div id="loadnum"></div>');
			this.numcontainer=$('#loadnum');
			//初始化加载数值的位置和数值
			this.numcontainer.css({
				'height':this.width,
				'width':this.length,
				'margin':'0 auto',
				'text-align':'center',
				'font-size':this.width,
				'line-height':this.width,
				'color':this.numColor

			});
			this.numcontainer.html('0%');
		}

		return this;
	}
	//计算方法，用于计算每个加载块应该旋转的角度
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
})