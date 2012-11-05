/*
 * Path to vendor (3rd party) libraries
 */
var jsPathVendor = jsPath + 'vendor/';



yepnope([
	/*
	 * Load Flexslider if .flexslider exist
	 */
	{
		test: $('.flexslider').length,
		yep: jsPathVendor + 'jquery.flexslider-min.js'
	},

	/*
	 * Load Isotope if .isotope exist
	 */
	{
		test: $('.isotope').length,
		yep: jsPathVendor + 'jquery.isotope.min.js'
	},

	/*
	 * Load LiveTwitter if .widget-twitter exist
	 */
	{
		test: $('.widget-twitter').length,
		yep: jsPathVendor + 'jquery.livetwitter.min.js'
	},

	/*
	 * Load jRibbble if .widget-dribbble exist
	 */
	{
		test: $('.widget-dribbble').length,
		yep: jsPathVendor + 'jquery.jribbble.min.js'
	},

    /*
     * Load Validate if .validate exist
     */
    {
        test: $('.contact-form, form.comments-list').length,
        yep: jsPathVendor + 'jquery.validate.min.js'
    },

	/*
	 * Load main user file
	 */
	{
		load: [
			jsPathVendor + 'jquery.selestnav.min.js',
			jsPath + 'plugins.js',
			jsPath + 'main.js',
			'assets/user/user.js',
			'skinme/skinme.js'
		]
	}
]);