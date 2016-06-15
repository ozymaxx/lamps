!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="https://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
var appid = '341581059326257';
$.getScript('http://connect.facebook.net/en_UK/all.js', function(){
	FB.init({
		appId      : appid, // App ID
		status     : true,    // check login status
		cookie     : true,    // enable cookies to allow the
							// server to access the session
		xfbml      : true,     // parse page for xfbml or html5
							// social plugins like login button below
		version        : 'v2.0',  // Specify an API version
	});
});

var timeElapsed = 0;
var angle = 270;
var timer;
var marked = 0;
var pos1Stack = new Array();
var pos2Stack = new Array();
var posCenterStack = new Array();
var st1Stack = new Array();
var st2Stack = new Array();
var stCenterStack = new Array();
var pos = -1;
var soundOn = true;
var solverIndex = 1;
var solverTimer = null;
var solverTimer2 = null;
var endYellow;
var shape = 0;

function playClickSound() {
	if ( soundOn) {
		document.getElementById('winSound').play();
	}
}

function playWinSound() {
	if ( soundOn) {
		document.getElementById('clickSound').play();
	}
}

function switchSound() {
	if ( soundOn) {
		soundOn = false;
		$( '#soundSwitch').val( 'SOUND OFF');
	}
	else {
		soundOn = true;
		$( '#soundSwitch').val( 'SOUND ON');
	}
}

function changeAngle() {
	if ( angle == 90) {
		angle = 180;
	}
	else if ( angle == 180) {
		angle = 270;
	}
	else if ( angle == 270) {
		angle = 360;
	}
	else {
		angle = 90;
	}
	
	playClickSound();
	$( '#symButton').attr( 'src', 'sym' + angle + '.png');
}

function checkUndo() {
	if ( pos == -1) {
		$( '#goBack').attr( 'disabled', 'disabled');
	}
	else if ( $( '#goBack').attr( 'disabled') == 'disabled' ) {
		$( '#goBack').removeAttr( 'disabled');
	}
}

function incrementSeconds() {
	timeElapsed++;
	$( "#telapsed").html( timeElapsed);
}

function initHoles() {
	pos1Stack = new Array();
	pos2Stack = new Array();
	posCenterStack = new Array();
	st1Stack = new Array();
	st2Stack = new Array();
	stCenterStack = new Array();
	pos = -1;
	var max = 3;
	var inserted1 = 1;
	var inserted2 = 1;
	var inserted3 = 1;
	for ( i = 1; i <= 81; i++) {
		$( '#b' + i).removeAttr( 'class');
	}
	for ( i = 1; i <= 81; i++) {
		$( '#b' + i).attr( 'class', '');
	}
	for ( var i = 1; i <= 23; i++) {
		var num = Math.floor( Math.random() * 20 );
		if ( num <= 4 && num >= 0 && inserted1 <= max) {
			$( '#b' + i).attr( 'class', 'closed');
			inserted1++;
		}
		else if ( num > 4 && num <= 9 && inserted2 <= max) {
			$( '#b' + i).attr( 'class', 'step2');
			inserted2++;
		}
		else if ( num > 9 && num <= 14 && inserted3 <= max) {
			$( '#b' + i).attr( 'class', 'step1');
			inserted3++;
		}
	}
	inserted1 = 1;
	inserted2 = 1;
	inserted3 = 1;
	for ( var i = 24; i <= 45; i++) {
		var num = Math.floor( Math.random() * 20 );
		if ( num <= 4 && num >= 0 && inserted1 <= max) {
			$( '#b' + i).attr( 'class', 'closed');
			inserted1++;
		}
		else if ( num > 4 && num <= 9 && inserted2 <= max) {
			$( '#b' + i).attr( 'class', 'step2');
			inserted2++;
		}
		else if ( num > 9 && num <= 14 && inserted3 <= max) {
			$( '#b' + i).attr( 'class', 'step1');
			inserted3++;
		}
	}
	inserted1 = 1;
	inserted2 = 1;
	inserted3 = 1;
	for ( var i = 46; i <= 67; i++) {
		var num = Math.floor( Math.random() * 20 );
		if ( num <= 4 && num >= 0 && inserted1 <= max) {
			$( '#b' + i).attr( 'class', 'closed');
			inserted1++;
		}
		else if ( num > 4 && num <= 9 && inserted2 <= max) {
			$( '#b' + i).attr( 'class', 'step2');
			inserted2++;
		}
		else if ( num > 9 && num <= 14 && inserted3 <= max) {
			$( '#b' + i).attr( 'class', 'step1');
			inserted3++;
		}
	}
	max = 1;
	inserted1 = 1;
	inserted2 = 1;
	inserted3 = 1;
	for ( var i = 68; i <= 81; i++) {
		var num = Math.floor( Math.random() * 20 );
		if ( num <= 4 && num >= 0 && inserted1 <= max) {
			$( '#b' + i).attr( 'class', 'closed');
			inserted1++;
		}
		else if ( num > 4 && num <= 9 && inserted2 <= max) {
			$( '#b' + i).attr( 'class', 'step2');
			inserted2++;
		}
		else if ( num > 9 && num <= 14 && inserted3 <= max) {
			$( '#b' + i).attr( 'class', 'step1');
			inserted3++;
		}
	}
}

function addMove( p1, p2, pC, s1, s2, sC) {
	if ( pos == 49) {
		pos1Stack = new Array();
		pos2Stack = new Array();
		posCenterStack = new Array();
		st1Stack = new Array();
		st2Stack = new Array();
		stCenterStack = new Array();
		pos = -1;
		checkUndo();
	}
	pos++;
	pos1Stack[pos] = p1;
	pos2Stack[pos] = p2;
	posCenterStack[pos] = pC;
	st1Stack[pos] = s1;
	st2Stack[pos] = s2;
	stCenterStack[pos] = sC;
}

function oneStepBack() {
	if ( pos >= 0) {
		$( '#b' + pos1Stack[pos]).attr( 'class', st1Stack[pos]);
		$( '#b' + pos2Stack[pos]).attr( 'class', st2Stack[pos]);
		$( '#b' + posCenterStack[pos]).attr( 'class', stCenterStack[pos]);
		pos--;
		
		playClickSound();
		
		checkUndo();
	}
}

function addEvents() {
	for ( var i = 1; i <= 81; i++) {
		$( '#b' + i).attr( 'onclick', 'klik(' + i + ');');
	}
}
 
function completed() {
	for ( var i = 1; i <= 81; i++) {
		if ( $( '#b' + i).attr( 'class') != 'closed' ) {
			return false;
		}
	}
	
	return true;
}

function enableButtons() {
	for ( var i = 1; i <= 81; i++) {
		$( '#b' + i).removeAttr( 'disabled');
	}
}

function completeGame() {
	for ( var i = 1; i <= 81; i++) {
		$( '#b' + i).attr( "disabled", "disabled");
	}
	
	$( '#secsspan').html( timeElapsed + "");
	clearInterval( timer);
	
	$( '#completed').fadeIn( "slow");
}
 
function change( c) {
	if ( $( '#b' + c ).attr( 'class') == 'closed' ) {
		$( '#b' + c ).attr( 'class', '');
	}
	else if ( $( '#b' + c ).attr( 'class') == 'step2' ) {
		$( '#b' + c ).attr( 'class', 'closed');
	}
	else if ( $( '#b' + c ).attr( 'class') == 'step1' ) {
		$( '#b' + c ).attr( 'class', 'step2');
	}
	else {
		$( '#b' + c ).attr( 'class', 'step1');
	}
}

function klik( c) {
	var coord1 = 0;
	var coord2 = 0;
	
	if ( angle == 90) {
		if ( c == 1 || c == 10 || c == 19 || c == 28 || c == 37 || c == 46 || c == 55 || c == 64 || ( c > 1 && c < 9) ) {
			coord1 = c+1;
			coord2 = c+9;
		}
		else if ( c == 73) {
			coord1 = c-9;
			coord2 = c+1;
		}
		else if ( c == 9) {
			coord1 = c-1;
			coord2 = c+9;
		}
		else {
			coord1 = c-9;
			coord2 = c-1;
		}
	}
	else if ( angle == 180) {
		if ( c == 18 || c == 27 || c == 36 || c == 45 || c == 54 || c == 63 || c == 72 || c == 81) {
			coord1 = c-9;
			coord2 = c-1;
		}
		else if ( c >= 1 && c < 9) {
			coord1 = c+1;
			coord2 = c+9;
		}
		else if ( c == 9) {
			coord1 = c-1;
			coord2 = c+9;
		}
		else {
			coord1 = c-9;
			coord2 = c+1;
		}
	}
	else if ( angle == 360) {
		if ( c == 1 || c == 10 || c == 19 || c == 28 || c == 37 || c == 46 || c == 55 || c == 64 ) {
			coord1 = c+1;
			coord2 = c+9;
		}
		else if ( c >= 73 && c < 81) {
			coord1 = c-9;
			coord2 = c+1;
		}
		else if ( c == 81) {
			coord1 = c-9;
			coord2 = c-1;
		}
		else {
			coord1 = c-1;
			coord2 = c+9;
		}
	}
	else {
		if ( c == 18 || c == 27 || c == 36 || c == 45 || c == 54 || c == 63 || c == 72 || ( c >= 74 && c <= 81 ) ) {
			coord1 = c-1;
			coord2 = c-9;
		}
		else if ( c == 9) {
			coord1 = c-1;
			coord2 = c+9;
		}
		else if ( c == 73) {
			coord1 = c+1;
			coord2 = c-9;
		}
		else {
			coord1 = c+1;
			coord2 = c+9;
		}
	}
	
	addMove( coord1, coord2, c, $( '#b' + coord1).attr( 'class'), $( '#b' + coord2).attr( 'class'), $( '#b' + c).attr( 'class') );
	change( c);
	change( coord1);
	change( coord2);
	
	playClickSound();
	
	checkUndo();
	
	if ( completed() ) {
		playWinSound();
		completeGame();
	}
}

function shareOnFB() {
	FB.ui({
	  method: 'share',
	  href: 'http://lamps.github.io',
	}, function( response){
		if ( response.error) {
			alert( "Error: " + response.error.message);
		}
	});
}

function findEndYellow() {
	for ( var x = 81; x >= 73; x--) {
		if ( $( '#b' + x).attr( 'class') == 'step1' || $( '#b' + (x-9) ).attr( 'class') == 'step1' ) {
			endYellow = x;
		}
	}
	
	endYellow = 0;
}

function detectShape( x, y, z, t) {
	xc = $( '#b' + x).attr( 'class');
	yc = $( '#b' + y).attr( 'class');
	zc = $( '#b' + z).attr( 'class');
	tc = $( '#b' + t).attr( 'class');
	
	if ( xc == yc && yc == zc && zc == tc && tc == 'step1') {
		return 1;
	}
	else if ( xc == zc && zc == tc && tc == 'step1' && yc == 'closed') {
		return 2;
	}
	else if ( xc == yc && yc == tc && tc == 'step1' && zc == 'closed') {
		return 3;
	}
	else if ( yc == tc && tc == zc && zc == 'step1' && xc == 'closed') {
		return 4;
	}
	else if ( yc == xc && xc == zc && zc == 'step1' && tc == 'closed') {
		return 5;
	}
	else if ( xc == yc && yc == 'step1' && zc == tc && tc == 'closed') {
		return 6;
	}
	else if ( xc == yc && yc == 'closed' && zc == tc && tc == 'step1') {
		return 7;
	}
	else if ( xc == zc && zc == 'closed' && yc == tc && tc == 'step1') {
		return 8;
	}
	else if ( xc == zc && zc == 'step1' && yc == tc && tc == 'closed') {
		return 9;
	}
	else if ( xc == zc && zc == tc && tc == 'closed' && yc == 'step1') {
		return 10;
	}
	else if ( xc == yc && yc == tc && tc == 'closed' && zc == 'step1') {
		return 11;
	}
	else if ( yc == tc && tc == zc && zc == 'closed' && xc == 'step1') {
		return 12;
	}
	else if ( yc == xc && xc == zc && zc == 'closed' && tc == 'step1') {
		return 13;
	}
	else {
		return 14;
	}
}

$( document).ready( function() {
	$.ajaxSetup({ cache: true });
	
	$( '#welcome').fadeIn( 'slow');
	
	timer = setInterval( function() { incrementSeconds(); }, 1000);
	initHoles();
	checkUndo();
	addEvents();
	
	$( '#symButton').attr( 'src', 'sym' + angle + '.png');
	
	$( '#openHelp').click( function() {
		$( '#helpSection').fadeIn( "slow");
	});
	
	$( '#closeHelp').click( function() {
		$( '#helpSection').fadeOut( "slow");
	});
	
	$( '.helpLayer').click( function() {
		$( '.helpLayer').fadeOut( "slow");
	});
	
	$( '#renew').click( function() {
		clearInterval( timer);
		initHoles();
		checkUndo();
		enableButtons();
		timeElapsed = 0;
		timer = setInterval( function() { incrementSeconds(); }, 1000);
	});
	
	$( "body").keyup( function(e) {
		var keycode = e.keyCode || e.which;
		
		if ( keycode == 90) {
			oneStepBack();
		}
		else if ( keycode == 38 || keycode == 87) {
			changeAngle();
		}
		else if ( keycode == 82) {
			clearInterval( timer);
			initHoles();
			checkUndo();
			enableButtons();
			timeElapsed = 0;
			timer = setInterval( function() { incrementSeconds(); }, 1000);
		}
		else if ( keycode == 72) {
			if ( $('.helpLayer').css( 'display') != 'block' ) {
				$( '#helpSection').fadeIn( "slow");
			}
			else if ( $( '#helpSection').css( 'display') == 'block') {
				$( '.helpLayer').fadeOut( "slow");
			}
		}
	});
});
