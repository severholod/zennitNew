$(document).ready(function(){
	/*------------------Попапы--------------------*/
	$('.popup-sm').fancybox({
		maxWidth: 465,
		padding: 0,
		helpers: {
			overlay: {
				closeClick: true,
				locked: false
			}
		}
	});
	$('.popup-md').fancybox({
		maxWidth: 600,
		padding: 0,
		helpers: {
			overlay: {
				closeClick: true,
				locked: false
			}
		}
	});
	$('.popup-lg').fancybox({
		maxWidth: 790,
		padding: 0,
		helpers: {
			overlay: {
				closeClick: true,
				locked: false
			}
		}
	});
	$('.popup-xl').fancybox({
		maxWidth: 1160,
		padding: 0,
		helpers: {
			overlay: {
				closeClick: true,
				locked: false
			}
		}
	});
	/*--------------------------------------------*/
	/*----------------Мобильное меню-------------*/
	$('.burger').click(function(){
		$(this).toggleClass('burger_active')
		$('.overlay').toggleClass('overlay_active');
		$(".mobile-menu").toggleClass('mobile-menu_active');
	});
	$('.mobile-menu__close').click(function(){
		$('.overlay').removeClass('overlay-active');
		$(".mobile-menu").removeClass('mobile-menu-active');
	});
	$('.overlay').click(function(){
		$('.overlay').removeClass('overlay-active');
		$(".mobile-menu").removeClass('mobile-menu-active');
	});
	/*------------------------------------------------*/
	/*---------------------Шапка---------------------*/
	var header = $('.header')
	function headerChange() {
		offset = window.pageYOffset
		if(offset > 70) {
			$('.header').addClass('scroll')
		} else {
			$('.header').removeClass('scroll')	
		}
	}
	headerChange()
	$(window).scroll(function() {
		headerChange()
	})
	/*-----------------------------------------------*/
	/*-----------------Тогглы-----------------------*/
	$('.toggle-item').click(function() {
		if($(this).hasClass('toggle-item_visible')) {
			$(this).removeClass('toggle-item_visible')
		} else {
			$(this).parent().children('.toggle-item').removeClass('toggle-item_visible')
			$(this).addClass('toggle-item_visible')
		}
	})
	/*-----------------------------------------------*/
	/*--------------------Табы-----------------------*/
	$('.tabs-item').click(function () {
		const ref = this.dataset.ref
		$('.tabs-item').removeClass('tabs-item_active')
		$(this).addClass('tabs-item_active')
		$('.tab-content').removeClass('tab-content_active')
		$(`.tab-content[data-id=${ref}]`).addClass('tab-content_active')
	})
	let quizId = 0,
		content = $('.quiz-content__wrapper')
	$('.quiz-btn_next').click(function (event) {
		event.preventDefault()
		quizId++
		content.removeClass('active')
		$(content[quizId]).addClass('active')
	})
	/*-----------------------------------------------*/
	/*--------------------- Слайдер -----------------*/
	const config = {
		items: 1,
		dots: false,
		nav: false,
		loop: true
	}
	const exampleSliderConfig = {
		dots: false,
		nav: false,
		loop: true,
		responsive: {
			0: {
				items: 1
			},
			992: {
				items: 2
			},
			1350: {
				items: 3
			}
		}
	}
	const advantagesSliderConfig = {
		dots: false,
		nav: false,
		loop: true,
		responsive: {
			0: {
				items: 1
			},
			768: {
				items: 2
			},
		}
	}
	const sliders ={
		videoSlider: $('.reviews-video'),
		mapSlider: $('.map-slider'),
		exampleSlider: $('.examples-slider'),
		advantagesSlider: $('.advantages-slider'),
		addressesSlider: $('.addresses-slider'),
	}
	sliders.videoSlider.owlCarousel(config)
	sliders.mapSlider.owlCarousel(config)
	sliders.exampleSlider.owlCarousel(exampleSliderConfig)
	sliders.advantagesSlider.owlCarousel(advantagesSliderConfig)
	sliders.addressesSlider.owlCarousel(advantagesSliderConfig)
	$('.slider-arrow').click(function() {
		const target = this.dataset.slider
		const event = this.dataset.event
		sliders[target].trigger(`${event}.owl.carousel`, [500])
	})
	/*-----------------------------------------------*/
	/*-------------------Readmore--------------------*/
	$('.info__text').readmore({
		collapsedHeight: 107,
		moreLink: '<a href="#" class="info__readmore">Показать полностью</a>',
		lessLink: '<a href="#" class="info__readmore">Скрыть</a>'
	})
	$('.solution__text').readmore({
		collapsedHeight: 110,
		moreLink: '<a href="#" class="info__readmore">Подробнее</a>',
		lessLink: '<a href="#" class="info__readmore">Скрыть</a>'
	})
	$('.faq-tabs').readmore({
		collapsedHeight: 41,
		moreLink: '<a href="#" class="link faq-readmore">Показать все</a>',
		lessLink: '<a href="#" class="link faq-readmore">Скрыть</a>'
	})
	/*-----------------------------------------------*/
	/*--------------------Quiz-----------------------*/
	$(function() {
		$('#sum-slider').slider({
			range: 'min',
			value: 500000,
			min: 30000,
			max: 5000000,
			step: 1000,
			slide: function (event, ui) {
				const output = `${ui.value === 5000000 ? 'Более ' : ''}${ui.value} ₽`
				$('#sum-output').val(output)
			}
		})
	})
	$(function() {
		$('#income-slider').slider({
			range: 'min',
			value: 0,
			min: 0,
			max: 100000,
			step: 1000,
			slide: function (event, ui) {
				const output = `${ui.value === 100000 ? 'Более ' : ''}${ui.value} ₽`
				if (ui.value === 0) {
					$('#income-output').val('Нет дохода')
				} else {
					$('#income-output').val(output)
				}
			}
		})
	})
	/*-----------------------------------------------*/
	$("#quiz-tel").inputmask("+7 (999) 999-99-99")
});