var ajaxFail = function(ele, addClass){
	addClass = addClass || '';
	ele.before('<div class="' + addClass + '"><p class="message error">Sorry, an error occurred. Please let us know or try again.</p></div>');
};

var contactSuccess = function(form){
	form.addClass('complete');
	$('main').addClass('pageSuccess');
	window.setTimeout(function(){
		success = $('<div style="display:none" class="col-md-6"><p class="message success">Thanks, I\'ll get back to you!</p></div>');
		form.after(success);
		success.slideDown();
	}, 1500); 
};

var sendForm = function(e){
	e.preventDefault();
	var form = $(e.target),
		formData = {};
		
	form.find('input:not([type=submit], [type=hidden], :hidden), textarea').each(function(i, ele){
		//loop thru inputs, and put them in an obj
		ele = $(ele);

		var id = ele.attr('id'),
			val = ele.val();

		formData[id] = val;
	});
		
	$.ajax({
		url:'//formspree.io/aftrama@gmail.com',
		method:'POST',
		data:formData,
		dataType:'json',
		success:function(){
			contactSuccess(form);
		},
		failure: function(a,b,c){
			ajaxFail(form, 'col-md-6');
		}
	});
};

$('form#contact').on('submit', sendForm);