(function ($) {
	"use strict";
	var extcf7_show_animation = {
	  "height": "show",
	  "marginTop": "show",
	  "marginBottom": "show",
	  "paddingTop": "show",
	  "paddingBottom": "show"
	};

	var extcf7_hide_animation = {
	  "height": "hide",
	  "marginTop": "hide",
	  "marginBottom": "hide",
	  "paddingTop": "hide",
	  "paddingBottom": "hide"
	};
	
	var extcf7_animation_status = extcf7_conditional_settings.animitation_status;
	var extcf7_animation_intime = parseInt(extcf7_conditional_settings.animitation_in_time);
	var extcf7_animation_out_time = parseInt(extcf7_conditional_settings.animitation_out_time);
	var condition_depends_field = [];

	// initiliaze the all form field.
	function extcf7_global(){
		$('.wpcf7-form').each(function(){
		    var options_element = $(this).find('input[name="_extcf7_conditional_options"]').eq(0);


		    if (!options_element.length || !options_element.val()) {
		        return false;
		    }

		    var form_options = JSON.parse(options_element.val());

		    form_options.conditions.forEach(function(form_item,i){
		        var rule_applied_field =$('[data-id="'+form_item.rule_applied_field+'"]');
		        form_item.and_condition_rules.forEach(function(rules,j){

		        	if(!condition_depends_field.includes(rules.if_field_input)){
		        		condition_depends_field.push(rules.if_field_input);
		        	}

		        	var from_field_selector = extcf7_input_checkbox_name(rules.if_field_input);
		        	var tag = from_field_selector.get(0);

		        	extcf7_check_condition(form_item.and_condition_rules, rule_applied_field);

		        	if( tag.tagName == 'INPUT' ){
		        		var input_attr_type = from_field_selector.attr('type');
		        		if(input_attr_type == 'text'){
				        	from_field_selector.on('keyup',function(){
				        		extcf7_check_condition(form_item.and_condition_rules,rule_applied_field);
				        	});
				        }else if(input_attr_type == 'email'){
				        	from_field_selector.on('keyup',function(){
				        		extcf7_check_condition(form_item.and_condition_rules,rule_applied_field);
				        	});
				        }else if(input_attr_type == 'radio'){
				        	from_field_selector.on('change',function(){
				        		extcf7_check_condition(form_item.and_condition_rules,rule_applied_field);
				        	});
				        }else if(input_attr_type == 'checkbox'){
				        	from_field_selector.on('change',function(){
				        		extcf7_check_condition(form_item.and_condition_rules,rule_applied_field);
				        	});
				        }
			        }else if( tag.tagName == 'SELECT' ){
			        	from_field_selector.on('change',function(){
				        	extcf7_check_condition(form_item.and_condition_rules,rule_applied_field);
				        });	
			        }else if( tag.tagName == 'TEXTAREA' ){
			        	from_field_selector.on('keyup',function(){
				        	extcf7_check_condition(form_item.and_condition_rules,rule_applied_field);
				        });	
			        }

		        });
		    });

		});
	}

	// show hide field based on conditional value
	function extcf7_check_condition(coditions_rules,rule_applied_field){
		var condition_status = extcf7_is_condition_ok(coditions_rules);
    	if(condition_status){
    		if('on' == extcf7_animation_status){
    			rule_applied_field.animate(extcf7_show_animation, extcf7_animation_intime);
    		}else{
    			rule_applied_field.show();
    		}
    	}else{
			if(rule_applied_field.data('clear') !== undefined){
				clear_fied_on_hide(rule_applied_field);
			}
    		if('on' == extcf7_animation_status){
    			rule_applied_field.animate(extcf7_hide_animation, extcf7_animation_out_time);
    		}else{
    			rule_applied_field.hide();
    		}
    	}
	}
    
    //check input type checkbox name
	function extcf7_input_checkbox_name(from_field_selector){
		var input_tag =$(`[name="${from_field_selector}"]`);
		if( typeof input_tag.get(0) === "undefined"){
    		input_tag = $(`[name="${from_field_selector}[]"]`);
    	}
    	return input_tag;
	}

	//check applied condition is true or flase basen on field value
	function extcf7_is_condition_ok(conditions){

		var condition_status;
		var conditon_length = conditions.length;
		var pre_input_val;
		var current_input_val;
		var pre_cnd;
		var current_cnd;
		var next_input_val;
		var next_cnd;

		for (var k = 0; k < conditon_length; k++){

			if('and' == conditions[k].if_type_input || 'or' == conditions[k].if_type_input){
				pre_input_val 	  = extcf7_get_input_val(conditions[k-1]);
				current_input_val = extcf7_get_input_val(conditions[k]);
				pre_cnd 		  = extcf7_compare_condition(conditions[k-1], pre_input_val);
				current_cnd 	  = extcf7_compare_condition(conditions[k], current_input_val);
				if( k < conditon_length - 1 ){
					next_input_val = extcf7_get_input_val(conditions[k+1]);
					next_cnd 	   = extcf7_compare_condition(conditions[k+1], next_input_val);
				}
			}

			if(!conditions[k].if_type_input){
				var if_field_input_value = extcf7_get_input_val(conditions[k]);
				var field_value_status 	 = extcf7_compare_condition(conditions[k],if_field_input_value);
				
				if( conditon_length > 1 ){
					condition_status = extcf7_1st_cnd_method(conditions,field_value_status);
					return condition_status;
					break;
				}else{
					condition_status = field_value_status;
				}

			}else if('and' == conditions[k].if_type_input){
				
				if(conditions[k+1].if_type_input == 'and'){
					condition_status = pre_cnd && current_cnd && next_cnd ? true : false;
				}else{
					condition_status = (pre_cnd && current_cnd) || next_cnd ? true : false;
				}

			}else if('or' == conditions[k].if_type_input){

				if(conditions[k+1].if_type_input == 'and'){
					condition_status = (pre_cnd || current_cnd) && next_cnd ? true : false;
				}else{
					condition_status = (pre_cnd || current_cnd) || next_cnd ? true : false;
				}

			}
		}
		return condition_status;
	}

	// compare conditonal logic for the very fast if condition
	function extcf7_1st_cnd_method(conditions,first_value_status){
		var cnd_status = first_value_status;
		var input_value;
		var value_status;
		for (var i = 1; i < conditions.length; i++) {
			input_value = extcf7_get_input_val(conditions[i]);
			value_status = extcf7_compare_condition(conditions[i],input_value);
			if(conditions[i].if_type_input == 'and'){
				cnd_status = cnd_status && value_status;
			}else{
				cnd_status = cnd_status || value_status;
			}
		}

		return cnd_status;
	}

	// compare the input field value with conditional field value
	function extcf7_compare_condition(rules,input_value){
		if(rules.operator_input == "equal"){
			if(input_value == rules.if_value_input){
				return true;
			}
		}else if(rules.operator_input == "not-equal"){
			if(input_value != rules.if_value_input){
				return true;
			}
		}

		return false;	
	}

	// get the form input field value
	function extcf7_get_input_val(rules){

		var if_input_value;
		var if_input_selector = extcf7_input_checkbox_name(rules.if_field_input);

		if(if_input_selector.get(0).tagName == 'INPUT' && if_input_selector.attr('type') == 'checkbox'){
			if(if_input_selector.prop("checked") == true){
				if_input_value = "checked"
			}else if(if_input_selector.prop("checked") == false){
				if_input_value = "unchecked"
			}
		}else if(if_input_selector.get(0).tagName == 'INPUT' && if_input_selector.attr('type') == 'radio'){
			var radio_selector = $(':input[value="'+rules.if_value_input+'"]');
			if(radio_selector.prop("checked")){
				if_input_value = radio_selector.val();
			}
		}else{
			if_input_value = if_input_selector.val();
		}

		return if_input_value;
	}

	//clear field on hide
	function clear_fied_on_hide(rule_applied_field ){
		var $inputs = $(':input', rule_applied_field).not(':button, :submit, :reset, :hidden');
        $inputs.each(function(){
            var $this = $(this);
            $this.val(this.defaultValue);
            $this.prop('checked', this.defaultChecked);
            if(condition_depends_field.includes($this.attr('name'))){
            	$this.trigger("change");
            	$this.trigger("keyup");
            }
        });

        $('textarea', rule_applied_field).each(function() {
            var $this = $(this);
            $this.val(this.defaultValue);
            if(condition_depends_field.includes($this.attr('name'))){
            	$this.trigger("keyup");
            }
        });

        $('select', rule_applied_field).each(function() {
            var $this = $(this);
            if ($this.val() === null) {
                $this.val($("option:first",$this).val());
                if(condition_depends_field.includes($this.attr('name'))){
	            	$this.trigger("change");
	            }
            }
        });
	}

	extcf7_global();

	if ( 'true' === extcf7_conditional_settings.elementor_editor_mode ) {
        $( window ).on( 'elementor/frontend/init', function () {
            elementorFrontend.hooks.addAction( 'frontend/element_ready/widget', function ( $scope, $ ) {
                extcf7_global();
            } );
        } );
    }

})(jQuery);