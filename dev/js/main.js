$(document).ready(function(){
	const ratingNodes = $('.rating')
	ratingNodes.each((index, item) => {
		const rating = $(item).prev().text()
		$(item).width((rating / 5 * 137) + 'px')
	})
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
		// $('.overlay').toggleClass('overlay_active');
		$(".mobile-menu").toggleClass('mobile-menu_active');
	});
	$('.mobile-menu__close').click(function(){
		// $('.overlay').removeClass('overlay-active');
		$(".mobile-menu").removeClass('mobile-menu-active');
	});
	$('.overlay').click(function(){
		// $('.overlay').removeClass('overlay-active');
		$(".mobile-menu").removeClass('mobile-menu-active');
	});
	$('.mobile-menu__tab').click((event) => {
		const target = event.target.dataset.href
		event.preventDefault()
		$('.mobile-menu-content').removeClass('mobile-menu-content_active')
		$(`.mobile-menu-content[data-content = ${target}]`).addClass('mobile-menu-content_active')
	})
	/*------------------------------------------------*/
	/*---------------------Шапка---------------------*/
	function headerChange() {
		const offset = window.pageYOffset,
			topHeight = $('.top').innerHeight(),
			headerHeight = $('.header').innerHeight(),
			windowHeight = window.innerHeight
		if(offset > 70) {
			$('.header').addClass('scroll')
			$('.mobile-menu').css('top', headerHeight)
			$('.mobile-menu').height(windowHeight - headerHeight)
		} else {
			$('.header').removeClass('scroll')
			$('.mobile-menu').css('top', headerHeight + topHeight)
			$('.mobile-menu').height(windowHeight - headerHeight - topHeight)
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
	$(document).click((event) => {
		if(event.target.closest('.location') && !event.target.closest('.dropdown-cities__close')) {
			$('.dropdown-cities').addClass('dropdown_active')
		} else {
			$('.dropdown-cities').removeClass('dropdown_active')
			$('#city-search').val('')
			$('.dropdown-cities__item').show()
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
	const videoSliderConfig = {
		dots: false,
		nav: false,
		loop: true,
		responsive: {
			0: {
				items: 1
			},
			1200: {
				items: 2
			},
		}
	}
	const sliders = {
		videoSlider: $('.reviews-video'),
		mapSlider: $('.map-slider'),
		exampleSlider: $('.examples-slider'),
		advantagesSlider: $('.advantages-slider'),
		addressesSlider: $('.addresses-slider'),
		reviewsSlider: $('.video-slider'),
		statSlider: $('.stat-slider')
	}
	sliders.videoSlider.owlCarousel(config)
	sliders.mapSlider.owlCarousel(config)
	sliders.exampleSlider.owlCarousel(exampleSliderConfig)
	sliders.advantagesSlider.owlCarousel(advantagesSliderConfig)
	sliders.addressesSlider.owlCarousel(advantagesSliderConfig)
	sliders.reviewsSlider.owlCarousel(videoSliderConfig)
	sliders.statSlider.owlCarousel(advantagesSliderConfig)
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
	$('.reviews-items .review__descr').readmore({
		collapsedHeight: 165,
		moreLink: '<a href="#" class="link review-readmore">Показать полностью</a>',
		lessLink: '<a href="#" class="link review-readmore">Скрыть</a>'
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
	/*-----------------Cities-filter-----------------*/
	$('#city-search').keyup((event) => {
		const value = event.target.value
		$('.dropdown-cities__item a').each((i, item) => {
			$(item).parent().hide()
			if(item.text.toLowerCase().includes(value.toLowerCase())) {
				$(item).parent().show()
			}
		})
	})
	/*-----------------------------------------------*/
	$("#quiz-tel").inputmask("+7 (999) 999-99-99")
});