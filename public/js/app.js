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