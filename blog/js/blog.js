
	
	window.addEventListener("scroll", HeaderKeep);
	window.addEventListener("scroll", NavContect);
	window.addEventListener("load",SliderMove);
	

	




    //header部分随屏幕滚动高度改变，
	function HeaderKeep() {
		var header = document.getElementsByTagName('header')[0];
	    var toTop = document.getElementById('to-top');
    	var oTop = document.body.scrollTop||document.documentElement.scrollTop||window.pageYOffset;   //chrome/firefox
 		//	console.log(oTop);
		if(oTop > 80) {
			header.style.height = 40 + 'px';
			header.style.lineHeight = 40 + 'px';
			toTop.style.display='block';
		} else {
			header.style.height = 80 + 'px';
			header.style.lineHeight = 80 + 'px';
			toTop.style.display='none';
		}
	    //jq实现返回顶部平滑滚动特效
		toTop.onclick = function(){
			$('html,body').animate({scrollTop: '0px'},800);   //body支持chrome，html支持firefox
	    }
	}
	
	//滚动条滑动导航栏随之定位
	function NavContect() {
		var oPage = document.getElementsByClassName('page');
    	var oTop = document.body.scrollTop||document.documentElement.scrollTop||window.pageYOffset;   //chrome/firefox
		var currentId = '';
		var oNav = document.getElementsByTagName('nav')[0].getElementsByTagName('a');

		for(var i = 0; i < oPage.length; i++) {
			if(oTop > oPage[i].offsetTop-81) {//导航栏距离浏览器顶端80px
				currentId = '#' + oPage[i].id;
				//console.log(aPage[i].id);
			};
			for(var j = 0; j < oNav.length; j++) {
				oNav[j].className = '';
				if(oNav[j].getAttribute('href') == currentId) {
					oNav[j].className = 'current';
				}
			}
		}
	}


//	//鼠标划过时二级导航显示
//	var aNav = document.getElementsByTagName('nav')[0].getElementsByTagName('li');
//	for(var i = 0; i < aNav.length; i++) {
//		aNav[i].onmouseover = function() {
//			var aNavLi = this.childNodes;
//			for(var j = 0; j < aNavLi.length; j++) {
//				if(aNavLi[j].className == 'subnav') {
//					aNavLi[j].style.display = 'block';
//				};
//			}
//		}
//		aNav[i].onmouseout = function() {
//				var aNavLi = this.childNodes;
//				for(var j = 0; j < aNavLi.length; j++) {
//					if(aNavLi[j].className == 'subnav') {
//						aNavLi[j].style.display = 'none';
//					};
//				}
//		}
//	}

  
    
    //轮播图
	function SliderMove() {
		var slider = document.getElementById('slider');
		var ban = document.getElementById('banner');
		var circleLi = document.getElementById("circle").getElementsByTagName("span");
		var prev = document.getElementById('prev');
		var next = document.getElementById('next');
		var clickFlag = true; //设置标记位防止连续按
		var interval = 2000;
		var timer;
		var index = 0; //记录图片的下标

		//单张图片平滑滚动动画
		function Animate() {
			var start = ban.offsetLeft; //当前坐标
			var end = -index * slider.offsetWidth; //目标坐标。
			var change = end - start; //偏移量
			var t = 0;
			var speed = 20; //每张图片滚动动画的时间
			var timergo;
			var Go = function() {
				t++;
				if(t >= speed) { //当图片到达终点才能切换
					clearInterval(timergo);
					clickFlag = true;
				}
				ban.style.left = change / speed * t + start + "px";
				//当图片到最后一张时把它瞬间切换回第一张，由于都同一张图片不会影响效果
				if(index == circleLi.length && t >= speed) {
					ban.style.left = 0;
					index = 0;
				}
			}
			timergo = setInterval(Go, speed);
		}

		timer = setInterval(ToRight, interval);

		//左右滑动函数
		function ToRight() {
			index++;
			if(index > circleLi.length) {
				index = 0;
			}
			Animate();
			ShowCircle();
		}
		function ToLeft() {
			index--;
			//当图片下标到第一张让它返回到倒数第二张，left值要变到最后一张才不影响过渡效果
			if(index < 0) {
				index = circleLi.length - 1;
				ban.style.left = -circleLi.length * slider.offsetWidth + "px";
			}
			Animate();
			ShowCircle();
		}

		//箭头点击切换
		prev.onclick = function() {
			if(clickFlag) {
				ToLeft();
			}
			clickFlag = false;
		}
		next.onclick = function() {
			if(clickFlag) {
				ToRight();
			}
			clickFlag = false;
		}

		//鼠标悬停
		slider.onmouseover = function() {
			clearInterval(timer);
		}
		slider.onmouseout = function() {
			timer = setInterval(ToRight, interval);
		}

		//遍历按钮动态清除添加css样式
		function ShowCircle() {
			for(var i = 0; i < circleLi.length; i++) {
				if(circleLi[i].className == 'selected') {
					circleLi[i].className = '';
					break;
				}
			}
			if(index == circleLi.length) {
				circleLi[0].className = "selected";
			}
			circleLi[index].className = 'selected';
		}
		//按钮切换图片
		for(var i = 0; i < circleLi.length; i++) {
			circleLi[i].onclick = function() {
				index = this.innerText - 1;
				Animate();
				ShowCircle();
			}
		}
		
	}
	

		
