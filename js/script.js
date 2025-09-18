$(function(){
	$('a.gallery').colorbox();
	var options = {
		'speed' : 500,
		//스피드
		'initTop' : 250,
		// 기본 top 위치
		'alwaysTop' : false,
		//항상고정 true , 이동 false
		'default_x' : '.inner'
		//레이아웃이 가운데 정렬일때 레이어가 붙는 태그명		
	}
	$('#floatdiv').Floater(options);
	
	
	var menu = $('#menuWrap>ul>li');
	var contents = $('#contents>div');
	var btn = $('#floatdiv ul li');
	menu.click(function(){
		var tg = $(this);
		var i = tg.index();
		var section= contents.eq(i-1);
		var tt = section.offset().top;
		$('html,body').stop().animate({scrollTop:tt-120});
		/* menu.removeClass();
		tg.addClass('on');
		btn.removeClass('active');
		btn.eq(i).addClass('active'); */
		
		return false; 
		// return false가 적용되면 주소창 뒤가 바뀌지 않음
	});
	//퀵메뉴
	btn.click(function(){
		var tg = $(this);
		var i = tg.index();
		var section= contents.eq(i);
		var tt = section.offset().top-120; 
		// top값을 받아옴
		$('html,body').stop().animate({scrollTop:tt});
		/* menu.removeClass();
		tg.addClass('on');
		btn.removeClass('active');
		btn.eq(i).addClass('active'); */
		
		return false;
	});
	menu.eq(0).addClass('on');
	$(window).scroll(function(){
			var sct = $(window).scrollTop();
			// scrolltop
			contents.each(function(){
				var tg = $(this);
				var i = tg.index();
				if(tg.offset().top <= sct+120){
					menu.removeClass('on');
					menu.eq(i).addClass('on');
					btn.removeClass('active');
					btn.eq(i).addClass('active');
					/* console.log("content값"+tg.offset().top);
					console.log('현재 위치값'+sct); */
				};
				
			});
			//profile 나타내기
			var profileTop=$('#profile').offset().top;
			if(sct>=profileTop-500){
				$('#profile').animate({opacity:1},2000);
			};
		}); 
	// window에게 scroll이 발생하면 실행하라
	// click 없이 Top값을 받아 그 위치의 버튼을 활성화 시켜줌
	
	//#graphic
	var current = 1;
	var thumbListSize = 5;
	var thumbnail = $('#graphicBox');
	var prev = thumbnail.find('>.left');
	var next = thumbnail.find('>.right');
	var graphicImg = thumbnail.find('.graphicImg>ul'); /* 작은 이미지 상자 */
	var graphicImgWidth = thumbnail.find('.graphicImg').width();
	var thumb = graphicImg.find('>.thumb'); /* 썸네일 li */
	var maxSize = thumb.size();
	var image = $('.graphicImgBox #graphicImage > p'); /* 큰이미지 */
	
	function listMove(){
		var tl = graphicImgWidth * current * -1;
		//0 = 510 * 0 * -1
		//-510 = 510 * 1 * -1
		//-1020 = 510 * 2 * -1
		graphicImg.stop().animate({left:tl},500);
	};
	
	//알림창
	next.click(function(){
			// 0 < 12/4-1
			// 1 < 12/4-1
		if(current < maxSize /thumbListSize-1){
			current++;
		}else{
			alert('페이지의 마지막입니다.');
		};
		listMove();
	});
	
	prev.click(function(){
		if(current > 0){
			current--;
		}else{
			alert('페이지의 처음입니다.');
		};
		listMove();
	});
	
	// 썸네일 클릭
	thumb.click(function(){
		image.css('display','none');
		var i = $(this).index();/* 몇번 째 p태그 인지 */
		image.eq(i).css('display','block');
	});
	
	// 썸네일 호버
	thumb.hover(
		function(){
			var tg = $(this);
			tg.css('opacity','0.3');
		},
		function(){
			var tg = $(this);
			tg.css('opacity','1');
		}
	);
	
	// 텝메뉴
   var tab=$('.tab>li');
	var content=$('.tab_con>div');
	content.hide();
	content.eq(0).show();
	
	tab.click(function(){
		var tg=$(this);
		var i=tg.index();
		
		tab.removeClass('active'); /* 클래스를 받는 함수로 .을 찍지 않음 */
		tg.addClass('active');
		
		content.css('display','none');
		content.eq(i).css('display','block');
		return false;
	});
	
	var visual = $('.slide_banner>ul>li');
	var current = 0;
	//slide
	$('.next').click(function(){
		var n =current+1;
		if(n==visual.size()){n=0};
				visual.eq(current).css('opacity',1).stop().animate({opacity:0},1000);
				visual.eq(n).css('opacity',0).stop().animate({opacity:1},1000);
				current=n;
		return false;
	});

	$('.prev').click(function(){
		var n =current-1;
		if(n<0){n=visual.size()-1};
			visual.eq(current).css('opacity',1).stop().animate({opacity:0},1000);
			visual.eq(n).css('opacity',0).stop().animate({opacity:1},1000);
			current=n;
		return false;
	});
	
	// typingtxt
	var typingBool=false;
	var typingIdx=0;
	var typingtxt=$('.typing_txt').text();
	
	typingtxt=typingtxt.split("");
	if(typingBool==false){ // 타이핑이 진행되지 않았다면 
       typingBool=true; 
       
       var tyInt = setInterval(typing,100); // 반복동작 
     } 
	 
	 function typing(){
		 if(typingIdx<typingtxt.length){
			 $('.typing').append(typingtxt[typingIdx]);
			 
			 typingIdx++;}else{
				 clearInterval(tyInt);
			 }
		 };
});