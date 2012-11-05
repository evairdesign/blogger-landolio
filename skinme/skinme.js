/*
 * Create HTML SkinMe
 */
var skinme = '' +
	'<div class="skinme">' +
		'<section>' +
			'<div class="headline">Colors skins</div>' +

			'<ul class="predefined">' +
				'<li><a href="?theme=1" title="Default theme"><span></span><span></span><span class="last-child"></span></a></li>' +
				'<li><a href="?theme=2" title="Theme2"><span></span><span></span><span class="last-child"></span></a></li>' +
				'<li><a href="?theme=3" title="Theme3"><span></span><span></span><span class="last-child"></span></a></li>' +
				'<li><a href="?theme=4" title="Theme4"><span></span><span></span><span class="last-child"></span></a></li>' +
			'</ul>' +
		'</section>' +

		'<a href="?theme=1">Reset to default</a>' +

		'<div class="btn icon-cogs"></div>' +
	'</div>' +

	'<link rel="stylesheet" href="skinme/skinme.css">';



/*
 * Append
 */
$( skinme ).appendTo('body');



/*
 * Mai functionality
 */
var btn = $('.btn');
var wrap = $('.skinme');
var opened = false;



/*
 * Open / close
 */
btn.click(function() {
	if ( !opened ) {
		wrap.animate({ 'left': '-20px' });
		opened = true;
	}
	else {
		wrap.animate({ 'left': '-225px' });
		opened = false;
	}
});
