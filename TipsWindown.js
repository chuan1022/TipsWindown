/*
 组件说明文档
 * 基本功能：生成弹出层
 * 
 * 配合css文件使用；
 * 
 * 生成实例：
 * tipsWindown=new TipsWindown()
 * tipsWindown1.init({
 * 		传参；
 * })
 * 
 * 可传参数：
 * tipsWindown.init({
			height:100,					//设置内容栏高度，默认值100
			width:300,					//设置内容栏宽度，默认值300
			left:0,						//设置left值，默认值为空
			top:0,						//设置top值，默认值为空
			bottom:0,					//设置bottom值，默认值为空
			right:0,					//设置right值，默认值为空
			tittle:'弹出框1',				//设置标题内容
			section:'弹出框1内容',			//设置内容栏内容	
			ensure：'确定'				//设置按钮内容，默认'确定'
			isMask:false				//是否生成遮罩层,默认false；值为true生成遮罩层
			isMiddle:true				//是否居中,默认false;值为true居中,居中时四个方向值无效
			isFoot:''					//是否隐藏foot栏，默认不隐藏；值为'none'时隐藏
	})	
 * 
 * */
(function(window,undefined){
	//创建对象
	function TipsWindown(){
		this.settings={};
		//生成结构
		this.tipsWindown=document.createElement('div');
		this.close=document.createElement('div');
		this.tittle=document.createElement('div');
		this.section=document.createElement('div');
		this.foot=document.createElement('div');
		this.ensure=document.createElement('input');
		//赋予ID
		this.tipsWindown.id='tipsWindown';
		this.close.id='tipsWindown-close';
		this.tittle.id='tipsWindown-tittle';
		this.section.id='stipsWindown-section';
		this.foot.id='tipsWindown-foot';
		this.ensure.id='tipsWindown-ensure';
		this.ensure.type='button';
		
		//插入元素
		document.body.appendChild(this.tipsWindown);
		this.tipsWindown.appendChild(this.close);
		this.tipsWindown.appendChild(this.tittle);
		this.tipsWindown.appendChild(this.section);
		this.tipsWindown.appendChild(this.foot);
		this.foot.appendChild(this.ensure);
		this.closeDiv();
		this.closeAll();
	}
	
	//初始化参数
	TipsWindown.prototype.init=function(opt){	
		this.settings={
			height:opt.height||100,
			width:opt.width||300,
			
			//isNaN()判断是否传参数
			top:isNaN(opt.top)?'':opt.top,
			bottom:isNaN(opt.bottom)?'':opt.bottom,
			left:isNaN(opt.left)?'':opt.left,
			right:isNaN(opt.right)?'':opt.right,
			
			tittle:opt.tittle||'标题',
			ensure:opt.ensure||'确定',
			section:opt.section||'内	容',
			isFoot:opt.isFoot||'',
			isMiddle:opt.isMiddle||'',
			isMask:opt.isMask||''
		}
		
		//设置参数	
			//位置
		this.tipsWindown.style.top=this.settings.top+'px';
		this.tipsWindown.style.left=this.settings.left+'px';
		this.tipsWindown.style.bottom=this.settings.bottom+'px';
		this.tipsWindown.style.right=this.settings.right+'px'; 	
			//宽高
		this.tipsWindown.style.width=this.settings.width+'px';
		this.tipsWindown.style.height=this.settings.height+this.foot.offsetHeight*2	+'px';
		this.section.style.height=this.settings.height+'px';	
			//内容
		this.tittle.innerHTML=this.settings.tittle;
		this.ensure.value=this.settings.ensure;
		this.close.innerHTML='x';
		this.section.innerHTML=this.settings.section;
		
		//设置隐藏foot功能
		if(this.settings.isFoot=='none'){
			this.noFoot()
		}
		//设置遮罩层
		if(this.settings.isMask){
			this.mask()
		}	
		//设置居中
		if(this.settings.isMiddle){
			this.middle();		
		}
	}
	
	//取消其他弹出框，仅保留当前弹出框功能
	TipsWindown.prototype.closeAll=function(){
		var tipsWindowns=document.querySelectorAll('div[id=tipsWindown]');
		for(var i=0;i<tipsWindowns.length;i++){
			document.body.removeChild(tipsWindowns[i])
		}
		document.body.append(this.tipsWindown)
	}
	
	//居中功能
	TipsWindown.prototype.middle=function(){
		this.tipsWindown.style.top=0;
		this.tipsWindown.style.left=0;
		this.tipsWindown.style.bottom=0;
		this.tipsWindown.style.right=0; 
		this.tipsWindown.style.margin='auto';
	}
	
	//foot隐藏功能
	TipsWindown.prototype.noFoot=function(){
		this.tipsWindown.removeChild(this.foot)
	}
	
	//关闭功能
	TipsWindown.prototype.closeDiv=function(){
		var This=this;
		this.close.onclick=function(){
			This.tipsWindown.style.display='none';	
		}
		this.ensure.onclick=function(){
			This.tipsWindown.style.display='none';
		}	
	}
	
	//遮罩层功能
	TipsWindown.prototype.mask=function(){
		var This=this;
		//生成遮罩层
		this.maskDiv=document.createElement('div');
		this.maskDiv.id='tipsWindown-mask';
		this.maskDiv.style.height=document.documentElement.clientHeight+'px';
		this.maskDiv.style.width=document.documentElement.clientWidth+'px';
		document.body.appendChild(this.maskDiv)
		//取消遮罩层
		this.close.onclick=function(){
			This.tipsWindown.style.display='none';
			document.body.removeChild(This.maskDiv)
		}
		this.ensure.onclick=function(){
			This.tipsWindown.style.display='none';
			document.body.removeChild(This.maskDiv)
		}
		this.maskDiv.onclick=function(){
			This.tipsWindown.style.display='none';
			document.body.removeChild(This.maskDiv)
		}
	}
	window.TipsWindown=TipsWindown;
})(window,undefined);

