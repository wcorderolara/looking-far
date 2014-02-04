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
	$('#fear_single').html($('#fear_post').val());
	$('#aspiration_single').html($('#aspiration_post').val());
	$('#regreat_single').html($('#regret_post').val());
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

function validarEmail( email ) {
    expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if ( !expr.test(email) ){
    	return false;
    }
    return true;
}

$('#email').on('blur', function (e){
	e.preventDefault();
	if( validarEmail($(this).val()) === false ){
		$(this).siblings('p').css('display','block');
		$(this).focus();
	}else{
		$(this).siblings('p').css('display','none');
	}
})

$('#fear_single').on('blur', function (e){
	e.preventDefault();
	if( $(this).val() === "" ){
		$(this).siblings('p').css('display','block');
		$(this).focus();
	}else{
		$(this).siblings('p').css('display','none');
	}
})

$('#aspiration_single').on('blur', function (e){
	e.preventDefault();
	if( $(this).val() === "" ){
		$(this).siblings('p').css('display','block');
		$(this).focus();
	}else{
		$(this).siblings('p').css('display','none');
	}
})

$('#regreat_single').on('blur', function (e){
	e.preventDefault();
	if( $(this).val() === "" ){
		$(this).siblings('p').css('display','block');
		$(this).focus();
	}else{
		$(this).siblings('p').css('display','none');
	}
})

function validarForm(){
	var valida = true;

	if($('#email').val() === ''){
		$('#email').siblings("p").css('display','block');
		$('#email').focus();
		valida = false;
		return valida;
	}else if($('#name').val() === ''){
		$('#name').siblings("p").css('display','block');
		$('#name').focus();
		valida = false;
		return valida;
	}else if($('#city').val() === ''){
		$('#city').siblings("p").css('display','block');
		$('#city').focus();
		valida = false;
		return valida;
	}else if($('#fear_single').val() === ''){
		$('#fear_single').siblings("p").css('display','block');
		$('#fear_single').focus();
		valida = false;
		return valida;
	}else if($('#aspiration_single').val() === ''){
		$('#aspiration_single').siblings("p").css('display','block');
		$('#aspiration_single').focus();
		valida = false;
		return valida;
	}else if($('#regreat_single').val() === ''){
		$('#regreat_single').siblings("p").css('display','block');
		$('#regreat_single').focus();
		valida = false;
		return valida;
	}else{
		valida = true;
	}
	return valida;
}

$('#btnpost_normal').on('click', function (e){
 	if(validarForm() === true){
		$('#frmSinglePost').submit();
	}else{
		return false;
	}
})

$('#email_social').on('blur', function (e){
	e.preventDefault();
	if( validarEmail($(this).val()) === false ){
		$(this).siblings('p').css('display','block');
		$(this).focus();
	}else{
		$(this).siblings('p').css('display','none');
	}
})

$('#fear_social').on('blur', function (e){
	e.preventDefault();
	if( $(this).val() === "" ){
		$(this).siblings('p').css('display','block');
		$(this).focus();
	}else{
		$(this).siblings('p').css('display','none');
	}
})

$('#aspiration_social').on('blur', function (e){
	e.preventDefault();
	if( $(this).val() === "" ){
		$(this).siblings('p').css('display','block');
		$(this).focus();
	}else{
		$(this).siblings('p').css('display','none');
	}
})

$('#regreat_social').on('blur', function (e){
	e.preventDefault();
	if( $(this).val() === "" ){
		$(this).siblings('p').css('display','block');
		$(this).focus();
	}else{
		$(this).siblings('p').css('display','none');
	}
})

function validaSocialForm(){
	var valida = true;

	if($('#email_social').val() === ''){
		$('#email_social').siblings("p").css('display','block');
		$('#email_social').focus();
		valida = false;
		return valida;
	}else if($('#name_social').val() === ''){
		$('#name_social').siblings("p").css('display','block');
		$('#name_social').focus();
		valida = false;
		return valida;
	}else if($('#city_social').val() === ''){
		$('#city_social').siblings("p").css('display','block');
		$('#city_social').focus();
		valida = false;
		return valida;
	}else if($('#fear_social').val() === ''){
		$('#fear_social').siblings("p").css('display','block');
		$('#fear_social').focus();
		valida = false;
		return valida;
	}else if($('#aspiration_social').val() === ''){
		$('#aspiration_social').siblings("p").css('display','block');
		$('#aspiration_social').focus();
		valida = false;
		return valida;
	}else if($('#regreat_social').val() === ''){
		$('#regreat_social').siblings("p").css('display','block');
		$('#regreat_social').focus();
		valida = false;
		return valida;
	}else{
		valida = true;
	}
	return valida;
}

$('#btnpost_social').on('click', function (e){
	if(validaSocialForm() === true){
		$('#frmSocialPost').submit();
	}else{
		return false;
	}
})



