/* *********************************************************************************************************************
 * Global variables
 */
var ie8 = ( $.browser.msie && $.browser.version == '8.0') ? true : false;



/* *********************************************************************************************************************
 * Main func
 */
jQuery(function() {

    /*
     * Flex slider
     */
	var fs = $('.flexslider');

	if ( fs.length > 0 ) {
		fs.flexslider({
			animation: 'fade',
			directionNav: true,
			controlNav: true,
			prevText: "<i class='icon-chevron-left'></i>",
			nextText: "<i class='icon-chevron-right'></i>",
			useCSS: true
		});

        $(window).resize(function() {
            // Hide all and show only on hover
            var fsch= fs.find('.flex-caption, .flex-direction-nav, .flex-control-nav');

            if ( $(window).width() > 768 ) {
                var del = 250;
                var to = 0;

                fsch.css('opacity', to);

                fs.hover(function() {
                    fsch.stop().fadeTo(del, 1);
                }, function() {
                    fsch.stop().fadeTo(del, to)
                });
            }
            else {
                fsch.fadeTo(1, 1);
                fs.hover(function() {
                    fsch.stop().fadeTo(del, 1);
                }, function() {
                    fsch.stop().fadeTo(del, 1)
                });
            }
        });
	}



	/*
	 * Main navigation -> dropdown
	 */
	var mainnav = $('#main-nav');

	if ( mainnav.length > 0 ) {
		mainnav.multipleDropDown();
	}



	/*
	 * Responsive main navigation - selectnav
	 */
	selectnav('main-nav', {
		label: 'Main navigation',
		nested: true,
		indent: '-'
	});



	/*
	 * Logo size responsive | When logo image is bigger than screen
	 */
	var logoImg = $('.main-logo img');

	if ( logoImg.length > 0 ) {
		$(window).resize(function() {
			if ( logoImg.attr('width') > logoImg.parent().width() ) logoImg.width('100%');
			else logoImg.width('auto');
		}).resize();
	}



	/*
	 * Isotope home
	 */
	var homeIsotope = $('.home-isotope');

	if ( homeIsotope.length > 0 ) {

		// Init Isotope
		homeIsotope.isotope({
			masonry: {
				columnWidth: 1
			},
			animationEngine: 'none',
			resizable: false,
			itemSelector : '.is-item',
			onLayout: function() {
				homeIsotope.show();
			}
		});

		// resize images
		$(window).resize(function() {

			var ration;

			if ( $(window).width() > 1260 ) ratio = 1;
			if ( $(window).width() < 1260 ) ratio = 1243 / 1000;
			if ( $(window).width() < 1000 ) ratio = ( 1275 / 703 );
			if ( $(window).width() < 768 )  ratio = ( 1275 / 986 );

			// Go through all
			homeIsotope.find('img').each(function() {
				var _t = $(this);

				_t.css({
					'width': _t.attr('width') / ratio
				});

				homeIsotope.isotope( 'reLayout' );
			});

		}).resize();
	}



	/*
	 * Isotope portfolio / blog
	 */
	var portfolioIsotope = $('.portfolio-isotope, .blog-isotope');

	if ( portfolioIsotope.length > 0 ) {

		// Show isotope container
		portfolioIsotope.fadeIn(750);

		// Isotope
		portfolioIsotope.isotope({
			masonry: {
				columnWidth: 1
			},
			animationEngine: 'best-available',
			itemSelector : portfolioIsotope.children('div')
		});

		// filter items when filter link is clicked
		var menu = $('.pfilter a, .bfilter a');

		// Set all active
		menu.eq(0).addClass('active');

		menu.click(function(){
			var selector = $(this).attr('data-filter');

			portfolioIsotope.isotope({
				filter: selector
			});

			menu.removeClass('active');
			$(this).addClass('active');

			return false;
		});

	}



	/*
	 * Item hover +
	 */
	var item = $('.item');

	if ( item.length > 0 ) {
		if ( !ie8 ) {
			var plus = $('<span class="plus">+</span>');

			item.prepend(plus);

			$(window).resize(function() {
				item.each(function() {
					var _t = $(this);
					_t.find('.plus').css({
						'height': _t.find('img').height() / 2,
						'padding-top': _t.find('img').height() / 2
					});
				});
			}).resize();
		}
	}



	/*
	 * Twitter widget
	 */
	var widgetTwitter = $('.widget-twitter');

	if ( widgetTwitter.length > 0 ) {
		widgetTwitter.each( function(){
			var me = $(this);
			var user = me.attr('data-user-name');
			var count = me.attr('data-count');

			$(this).liveTwitter(  ( user ? user : 'MattImling' ) , {
				limit: count,
				refresh: false,
				timeLinks: true,
				showAuthor: false,
				showTime: true,
				tweetPrepend: '',
				mode: 'user_timeline'
			});
		});
	}



	/*
	 * Dribbble widget
	 */
	var widgetDribbble = $('.widget-dribbble');

	if ( widgetDribbble.length > 0 ) {
		$.jribbble.getShotsByPlayerId( (widgetDribbble.attr('data-user-name') ? widgetDribbble.attr('data-user-name') : 'MattImling') , function(playerShots) {
			var html = '';

			html += '<ul>';

			$.each(playerShots.shots, function(i, shot) {
				html += '<li><a href="' + shot.url + '" target="_blank">';
				html += '<img src="' + shot.image_teaser_url +'" alt="' + shot.title + '">';
				html += '</a></li>';
			});

			html += '</ul>';

			widgetDribbble.html(html);
		}, {
			page: 1,
			per_page: widgetDribbble.attr('data-count')
		});
	}



	/*
	 * Flickr widget
	 */
	var widgetFlickr = $('.widget-flickr');

	if ( widgetFlickr.length > 0 ) {
		var userid = widgetFlickr.attr('data-user-name');
		var count = widgetFlickr.attr('data-count');
		var api = 'http://api.flickr.com/services/feeds/photos_public.gne?lang=en-us&format=json&jsoncallback=?';
		var cinit = 0;

		widgetFlickr.append('<ul/>');

		if (userid != '') api += '&id=' + userid;

		// Send request
		$.getJSON(api, function(data){

			$.each(data.items, function(i,item){

				if ( cinit < count ) {
					$("<img/>").attr("src", item.media.m).appendTo( widgetFlickr.children('ul') ).wrap("<li><a href='" + item.link + "' target=\"_blank\"></a></li>");

					cinit++;
				}

			});

		});
	}



    /*
     * Validate forms form
     */

	// Contact form
    var conform = $('.contact-form');

    if ( conform.length > 0 ) {

	    conform.validate({
		    errorPlacement: function (error, element) {
			    element.attr('placeholder', error.text());
		    },
		    submitHandler: function(form) {

			    /*
			     * Ajax send
			     */
			    var _name = conform.find('input[name="yourname"]').val();
			    var _email = conform.find('input[name="youremail"]').val();
			    var _phone = conform.find('input[name="yourphone"]').val();
			    var _message = conform.find('textarea').val();

			    var dataString = 'name=' + _name + '&email=' + _email + '&phone=' + _phone + '&message=' + _message;

			    $.ajax({
				    type: "POST",
				    url: "send.php",
				    data: dataString,
				    success: function() {
					    onSubmitForm('Thank you, your message has been successfully sent', false);
				    },
				    error: function() {
					    onSubmitForm('Error: Something goes wrong, please try it again.', true);
				    }
			    });

			    //return false;
		    }
        });



	    // Thank you / Error function call
	    function onSubmitForm( message, error ) {
		    if ( error ) var isError = "class='error'";

		    conform.find('fieldset').fadeOut(500, function() {
			    $("<div class='col9'><h2 " + isError + ">" + message + "</h2></div>").appendTo(conform).hide().fadeIn(500);
		    });
	    }
    }

	// Validate add comment form
	var commform = $('form.comments-list');

	if ( commform.length > 0 ) {

		commform.validate({
			errorPlacement: function (error, element) {
				element.attr('placeholder', error.text());
			}
		});

	}

	// Override default validation messages
	/*jQuery.extend(jQuery.validator.messages, {
		required: "This field is required",
		email: "Please enter a valid email address"
	});*/

});





/* *********************************************************************************************************************
 * Functions
 */