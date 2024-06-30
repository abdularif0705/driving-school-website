(function ($) {
	"use strict";

	var redirection_enable = 'off';
	var redirection_url = '';
	var page_form_id ='';
	var redirect_form_id ='';
	var redirect_options ='';

	document.addEventListener( 'wpcf7submit', function( event ) {
		page_form_id 	= $(event.target).find('input[name="_wpcf7"]').eq(0).val();
		var get_options = $(event.target).find('input[name="_extcf7_redirect_options"]').eq(0).val();

		if(get_options){
			var option_values   = JSON.parse(get_options);
			redirect_form_id    = option_values.form_id;
			redirect_options 	= option_values.redirect_options;
			if(redirect_options){
				redirection_enable  = redirect_options.redirection_enable;
				redirection_url     = 'off' == redirect_options.custom_url_enable ? redirect_options.redirect_page : extcf7_get_custom_url( redirect_options.custom_urle );
			}
		}

	}, false );

	document.addEventListener('wpcf7mailsent', function (event) {
		var redirect_delay  =  parseInt(extcf7_redirection_settings.redirection_delay);

		setTimeout(function(){ 

			if( 'off' == redirection_enable && page_form_id == redirect_form_id ){
				return;
			}

			if('on' == redirect_options.js_action){
				if(redirect_options.javascript_code){
					eval(redirect_options.javascript_code);
				}
			}

			if('off' == redirect_options.redirect_new_tab){
			 	window.location = redirection_url;
			}else{
				window.open(redirection_url);
			}

		}, redirect_delay);

	}, false);

	function extcf7_get_custom_url(url){

		var url_input = /\[(.*?)\]/g.test(url);

		if(!url_input){
			return url;
		}

		var redirect_url = "";
		var url_inputs = url.match(/\[(.*?)\]/g);
		var url_inputs_names = [];
		var i = 0;

		url_inputs.forEach(function(item, index){
			url_inputs_names.push(item.replace("[", "").replace("]", ""));
		});

		url_inputs_names.forEach(function(item, index){
			var inputs_val;
			var inputs_tag = $(`[name="${item}"]`).get(0).tagName;

			if(inputs_tag == 'INPUT'){
				var input_attr_type = $(`[name="${item}"]`).attr('type');

				if(input_attr_type == 'text'){
					inputs_val = $('input[name="'+item+'"]').val();
				}else if(input_attr_type == 'radio'){
					inputs_val = $('input[name="'+item+'"]:checked').val();
				}
			}else if(inputs_tag == 'SELECT'){
				inputs_val = $('select[name="'+item+'"] option').filter(':selected').val();
			}

			redirect_url = url.replace( url_inputs[i], inputs_val );
			url = redirect_url;
			i++;
		});

		return url;
	}

})(jQuery);