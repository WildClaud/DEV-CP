// NOTICE!! THIS IS REQUIRED TO MAKE YOUR NETO SHOPPING CART WORK
// DO NOT REMOVE UNLESS YOU REALLY KNOW WHAT YOU ARE DOING

(function($) {
	$.extend({
		initPageFuncs: function() {
			// Ajax Wish List
			$.addToWishList({
				'class': 'wishlist_toggle',
				'textclass': 'wishlist_text',
				'htmlon': '<i class="fa fa-thumb-tack tipsy remove" data-toggle="tooltip" data-placement="top" title="Remove from saved"></i>',
				'htmloff': '<i class="fa fa-thumb-tack tipsy" data-toggle="tooltip" data-placement="top" title="Save for later"></i>',
				'tooltip_css': 'whltooltips'
			});
			// Ajax Add To Cart
			$.addToCartInit({
				'cart_id' :  'cartcontents',
				'target_id': 'cartcontentsheader',
				'image_rel': 'itmimg'
			});

			$("a.notify_popup").unbind();
				$("a.notify_popup").fancybox({
				'transitionIn'  :   'elastic',
				'transitionOut' :   'elastic',
				'padding': 0
			});


	// YouTube video buttons
	$("a.ytbutton").click(function() {
	  	var autoplay = '';
	  	if ($(this).attr('rel') == 'autoplay')
	  		autoplay = '&autoplay=1';
	  	$.fancybox({
	    	'padding'             : 0,
	      'autoScale'   				: false,
	      'transitionIn'        : 'elastic',
	      'transitionOut'       : 'elastic',
	      'title'               : false,
	      'width'               : 680,
	      'weight'              : 495,
	      'href'                : this.href.replace(new RegExp("watch\\?v=", "i"), 'v/') + autoplay,
	      'type'                : 'swf',
	      'swf'                 : {'allowfullscreen':'true'}
	     });
	    return false;
	  });



			$(".disp_ajax_templ").unbind();
			$(".disp_ajax_templ").change(function() {
				var sku = $(this).val();
				var rel = $(this).attr('rel');
				$.load_ajax_template(rel, {'sku':sku, 'showloading':true, 'procdata':'n'}, {onLoad: function (){$.initPageFuncs();}});
			});
			// This renders the instant search results - edit design of ajax results here
			$.initSearchField({
				'result_header'		: '<ul class="nav nav-list">',
				'result_body'		: '<li><a href="##url##" search-keyword="##model##"><img border="0" src="##thumb##" width="36" height="36"/><span class="title">##model##</span></a></li>',
				'result_footer'		: '</ul>',
				'category_header'	: '<ul class="nav nav-list">',
				'category_body'		: '<li><a href="##url##"><span class="thumb"><img border="0" src="##thumb##" width="36" height="36"/></span><span class="title">##fullname##</span> <span class="label label-default">##typename##</span></a></li>',
				'category_footer'	: '</ul>'
			});
			// Custom collapse thing
			$('.collapslizzle-btn.inactive').click(function(){
				$('.collapslizzle-content').toggleClass('active');

				$(this).toggleClass('active');
				$(this).toggleClass('inactive');

				if ($(this).hasClass('active')) {
					$(this).children('div').html('Hide <i class="fa fa-chevron-circle-up"></i>');
				}
				else {
					$(this).children('div').html('Show More <i class="fa fa-chevron-circle-down"></i>');
				}
			});
		},

// For child product multi-add to cart function
		checkValidQty: function() {
			var found = 0;
			$("#multiitemadd :input").each(function() {
				if ($(this).attr('id').match(/^qty/)) {
					if ($(this).val() > 0) {
						found = 1;
					}
				}
			});
			if (found == 0) {
				$.fancybox("Please specify a quantity before adding to cart");
				return false;
			}
			return true;
		},

	amend_total: function(ident) {
				var modifier = $("#price"+ident).val();
				var obj = $("#chk"+ident);
				var price = $("#product_price").val();
				var newprice = 0;
				if(obj.is(':checked')) newprice = (price*100 + modifier*100) / 100;
				else newprice = (price*100 - modifier*100) / 100;

				$("#product_price").val(newprice);

				$(".finalprice").html($.formatNumber(newprice, {'pf':'','dp':2,'sp':','}));
				return true;
			},

		modQtyByMulti: function(obj,act) {
			var mul = 1;
			var maxm;
			var minm = 0;
			var objid = obj.replace(/^qty/,'');
			if ($('#qty'+objid).length > 0) {
				if ($('#multiplier_qty'+objid).length > 0) {
					mul = $('#multiplier_qty'+objid).val();
				}
				if ($('#min_qty'+objid).length > 0) {
					minm = $('#min_qty'+objid).val();
				}
				if ($('#max_qty'+objid).length > 0) {
					maxm = $('#max_qty'+objid).val();
				}

				var cur = $('#'+obj).val();
				if (isNaN(cur)) {
					cur = 0;
				}

				if (act == 'add') {
					cur = parseInt(cur) + parseInt(mul);
					if (!isNaN(maxm) && cur > maxm) {
						cur = maxm;
					}
				}
				else if (act == 'subtract') {
					cur = parseInt(cur) - parseInt(mul);
					if (cur < minm) {
						cur = minm;
					}
				}

				$('#qty'+objid).val(cur);
			}



		}

	});
})(jQuery);

$(document).ready(function() {
	// Popup Credit Card CCV Description At Checkout
	$("#card_ccv").fancybox();

	// Popup Terms At Checkout
	$("#terms").fancybox({
		'width' : 850,
		'height': 650
	});

	// Quick View Popup From Item Thumbnails
	$(".quickview").fancybox({
		'width' : 850,
		'height': 650
	});

	// Jquery Ui Date Picker
	$(".datepicker").datepicker({ dateFormat: "dd/mm/yy" });
	$.initPageFuncs();

	// Carousel
	$('.carousel').carousel();



});

// JCarousel
function mycarousel_initCallback(carousel)
{
	// Disable autoscrolling if the user clicks the prev or next button.
	carousel.buttonNext.bind('click', function() {
		carousel.startAuto(0);
	});

	carousel.buttonPrev.bind('click', function() {
		carousel.startAuto(0);
	});

	// Pause autoscrolling if the user moves with the cursor over the clip.
	carousel.clip.hover(function() {
		carousel.stopAuto();
	}, function() {
		carousel.startAuto();
	});
};

$(".btn-loads").click(function(){
	$(this).button("loading");
	var pendingbutton=this;
	setTimeout(function(){
		$(pendingbutton).button("reset");
	},3000);
});

// Out of Stock Notification
$(document).ready(function() {
	$(".notifymodalactivate").fancybox({
		'type': 'inline', // tell the script to create an iframe
	});
});

// Fancybox
$(document).ready(function() {
	$(".fancybox").fancybox();
});

// Tooltips
$('.tipsy').tooltip({trigger:'hover',placement:'bottom'});

$('.hastip').tooltip();

// AddThis configuration
var addthis_config =
{
	ui_offset_top: -12,
	services_compact: 'facebook,twitter,google_plusone_share,tumblr,linkedin'
}

// Set and keep npurpose
var NETOFacebookPurpose = false;
var NETOFacebookPurposeName = 'facebook';
$.extend({
	addFacebookNPurpose : function() {
		$.addNPurpose(NETOFacebookPurposeName);
		NETOFacebookPurpose = true;
	},
	addNPurpose : function(npur) {
		$("a").each( function() {
			var url = $(this).attr('href');
			if(typeof url == 'string') {
				var tget = $(this).attr('target');
				if(!tget || tget == '') {
					if(!url.match(/^#/) && !url.match(/npurpose=/) && !url.match(/javascript:/)) {
						if(url.match(/\?/)) {
							//url = url + '&npurpose='+npur;
						} else {
							url = url + '?npurpose='+npur;
						}
						$(this).attr('href', url);
					}
				}
			}
		});
		$("form").each( function() {
			var hasnpurpose = false;
			$(':input', this).each( function() {
				if(!hasnpurpose) {
					var name = $(this).attr('name');
					if(typeof name == 'string' && name == 'npurpose') {
						hasnpurpose = true;
					}
				}
			});
			if(!hasnpurpose) {
				$('<input type="hidden" name="npurpose" value="'+npur+'">').appendTo(this);
			}
		});
	}
});

