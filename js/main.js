var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


var wpOffset = 60;


var player;
var layout =  {
	doneAnimateSkill : false,
	init : function() {
		this.initStickyMenu();
		this.initClickScrollTo();

	},

	initStickyMenu: function() {
		//Sticky menu

		$(document).scroll(function() {
			var $menu 		= $('#menu');
		    var $header 	= $('header');
			var origOffsetY = $menu.offset().top;


			if ($(window).scrollTop() >= origOffsetY) {
				$menu.find('nav').addClass('navbar-fixed-top');
			} else {
				$menu.find('nav').removeClass('navbar-fixed-top');
			}

		});
		$(document).trigger('scroll');
	},
	initClickScrollTo : function() {
		$('#menu nav a, .s-menu a').click(function(e){
			e.preventDefault();

			var id = $(this).attr('href');
			$('#menu-content').collapse('hide');
			var second = $(window).width() > 767 ? 0 : 500;

			setTimeout(function(){
				if (id != '#') {
					$(id).ScrollTo({
						duration: 1000,
						offsetTop: getScrollOffset()
					});
				} else {
					$('#head').ScrollTo({
						duration: 1000
					});
				}
			},second);
		});

		$(window).scroll(function(){
			var find = false
			$('#menu .navbar-right a').each(function(){

				var $section = $($(this).attr('href'));
				if (isScrolInsideSection($section, getScrollOffset())) {
					if (!$(this).parents('li').is($('#menu nav li.active'))) {
						$('#menu nav li').removeClass('active');
						$(this).parents('li').addClass('active');
						find = true;
					}
				}
			});
			if (!find) {
				if (isScrolInsideSection($('#head'))) {
					$('#menu nav li').removeClass('active');
				}
			}
		});
	}
};
$(document).ready(function() {
	layout.init();
});

function isScrolInsideSection($section, offset) {
	var offset = (offset == undefined) ? 0 : offset;
	var wPos = $(window).scrollTop();
	if (wPos >= $section.offset().top - offset && wPos <= $section.offset().top + $section.innerHeight() - offset) {
		return true;
	}
	return false;
}
function getScrollOffset() {
	return $('#menu .navbar').innerHeight();
}
function resizeVideoModal($modal) {
	console.log($modal);
	var pWidth = $modal.find('iframe').attr('width');
	var pHeight = $modal.find('iframe').attr('height');

	var width 	= $modal.find('.modal-body').width();
	var height 	= width * pHeight / pWidth;
	$modal.find('iframe').width(width);
	$modal.find('iframe').height(height);
}
function onYouTubeIframeAPIReady() {
	player = new YT.Player('vid', {
	  events: {
	    // 'onReady': onPlayerReady,
	    // 'onStateChange': onPlayerStateChange
	  }
	});
}
function isMobileDevice() {
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
