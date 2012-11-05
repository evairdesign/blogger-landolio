/*
 * Multiple dropdown menu
 */
jQuery.fn.multipleDropDown = function() {

	var nav = this;

	// Check all menu items
	nav.children('li').each(function() {

		// If exist child ul
		if ( $(this).find('ul').length > 0  ) {

			$(this).children('a').click(function(e){
				if ($(this).attr('href') == '#'){
					e.preventDefault();
				}
			});

			// Add arrow for current parent
			var currItem = $(this).children('a');
			currItem.append(' <sup class="icon-chevron-down"></sup>');

			// Show 1st level submenu
			var currChild = $(this).children('ul');
			var hasActive = false;

			// If exists active child mark all parents active
			if ( $(this).find('.active').length > 0  ) {
				$(this).addClass('active');
			}

			// Over
			currItem.parent().hover(function() {

				if ( currItem.parent().hasClass('active') ) {
					hasActive = true;
				}
				else {
					currItem.parent().addClass('active');
				}

				currChild.stop().fadeIn(200);

			}, function() {
				if ( !hasActive ){
					currItem.parent().removeClass('active');
				}

				currChild.stop().fadeOut(200);

				hasActive = false;
			});
		}
	});

};