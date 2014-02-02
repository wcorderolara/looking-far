var sticky = document.querySelector('#menu');
//var origOffsetY = sticky.offsetTop;
var origOffsetY = 240;

function onScroll(e) {
  window.scrollY >= origOffsetY ? sticky.classList.add('fixed') :
                                  sticky.classList.remove('fixed');
}

document.addEventListener('scroll', onScroll);

function soloNumeros(evt) {
    // NOTE: Backspace = 8, Enter = 13, '0' = 48, '9' = 57
    var key = evt.keyCode ? evt.keyCode : evt.which;
    return (key <= 40 || (key >= 48 && key <= 57));
}


$('#pull-menu').on('click', function(e){
	e.preventDefault();
	$("#menu ul").slideToggle();
})

function remind(obj,objTxt){
	//debugger;
	objTxt.value = obj.value;
}

function removePost(postId){
	debugger;
	var xhr = $.ajax({
		type : 'PUT',
		url : '/panel/delete/' + postId,
		async : true,
		crossDomain : true
	});

	xhr.done(function(){
		alert("the post has been deleted");
	})

	location.reload();
}


$(document).ready(function(){
	for(var x = 1; x <= 100; x++){
		$("<option value = " + x + ">" + x + "</option>").appendTo("#age");
	}
})

$(document).ready(function(){
	for(var x = 1; x <= 100; x++){
		$("<option value = " + x + ">" + x + "</option>").appendTo("#age_social");
	}

	for(var x = 1; x <= 100; x++){
		$("<option value = " + x + ">" + x + "</option>").appendTo("#age");
	}
})

$('#btnpost_network').on('click',function (){
	$('#fear_social').html($('#fear').val());
	$('#aspiration_social').html($('#aspiration').val());
	$('#regreat_social').html($('#regret').val());
})

$('#btnpost').on('click',function (){
	$('#fear').html($('#fear_post').val());
	$('#aspiration').html($('#aspiration_post').val());
	$('#regreat').html($('#regret_post').val());
})

$('#fear_post').on('blur',function (e){
	e.preventDefault();
	if($(this).val() == ""){
		alert("Please add your fear");
		$(this).focus();
		return  false;
	}
})

$('#aspiration_post').on('blur',function (e){
	e.preventDefault();
	if($(this).val() == ""){
		alert("Please add your aspiration");
		$(this).focus();
		return  false;
	}
})

$('#regret_post').on('blur',function (e){
	e.preventDefault();
	if($(this).val() == ""){
		alert("Please add your regret");
		$(this).focus();
		return  false;
	}
})

$('#fear').on('blur',function (e){
	e.preventDefault();
	if($(this).val() == ""){
		alert("Please add your fear");
		$(this).focus();
		return  false;
	}
})

$('#aspiration').on('blur',function (e){
	e.preventDefault();
	if($(this).val() == ""){
		alert("Please add your aspiration");
		$(this).focus();
		return  false;
	}
})

$('#regret').on('blur',function (e){
	e.preventDefault();
	if($(this).val() == ""){
		alert("Please add your regret");
		$(this).focus();
		return  false;
	}
})




