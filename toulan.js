var html5webPiano = {};
	
	html5webPiano.isMSIE = /*@cc_on!@*/false; 
	html5webPiano.START_NOTE_NUMBER = 60;
	html5webPiano.END_NOTE_NUMBER = 72;
	html5webPiano.OFFSET = [0,40,60,105,120, 180,220,240,282,300,345,360];

	window.onload = function(){
		var i;
		var pianoArea = document.getElementById('pianoArea');
		
		//准备声音文件
		if(html5webPiano.isMSIE){
			//如果是IE浏览器则使用mp3格式
			html5webPiano.sound = html5webPiano.mp3Sound;
		}else{
			html5webPiano.sound = html5webPiano.oggSound;
		}
		
		//设定钢琴键的事件
		if(document.addEventListener){
			for(i = html5webPiano.START_NOTE_NUMBER; i <= html5webPiano.END_NOTE_NUMBER; i ++){
				setKeyEventListener(i);
			}
		}else if(document.attachEvent){
			for(i = html5webPiano.START_NOTE_NUMBER; i <= html5webPiano.END_NOTE_NUMBER; i ++){
				setKeyAttachEvent(i);
			}
		}
	}
	
	//设置声音文件
	function loadSoundFile(noteNumber, fileType){
		var soundId = 'sound' + noteNumber;
		
		if(html5webPiano.sound){
			html5webPiano.sound[soundId] = new Audio('sound/' + noteNumber + '.' + fileType);
		}
	}
	
	//设定钢琴键的点击事件(EventListener版)
	function setKeyEventListener(noteNumber){
		var keyId = 'key' + noteNumber;
		var key = document.getElementById(keyId);
		if(key){
			key.style.left = getPosition(noteNumber) + 'px';
			key.addEventListener('click', keyClick, false);
		}
	}
	
	//设定钢琴键的点击事件(AttachEvent版)
	function setKeyAttachEvent(noteNumber){
		var keyId = 'key' + noteNumber;
		var key = document.getElementById(keyId);
		if(key){
			key.style.left = getPosition(noteNumber) + 'px';
			key.attachEvent('onclick', keyClick);
		}
	}
	
	//设定钢琴键位置
	function getPosition(noteNumber){
		var left = 0;
		var offset = (noteNumber % 12);
		var octave = Math.floor((noteNumber - 60) / 12);
		left = html5webPiano.OFFSET[offset];
        console.log(left , octave , offset , (noteNumber - 60) / 12 , noteNumber)
		left = left + (octave * 420) + 70;
        console.log(left)
		return left;
	}
	
	//按下钢琴键时
	function keyClick(){
		var that = this;
		var noteNumber = that.id.replace('key','');
		playSound(noteNumber);
	}
	
	//指定发出的声音
	function playSound(noteNumber){
		var soundId = 'sound' + noteNumber;
		var keyId = 'key' + noteNumber;
		var key = document.getElementById(keyId);
		var audio = null;
		
		if(html5webPiano.sound){
			if(html5webPiano.sound[soundId]){
				audio = new Audio(html5webPiano.sound[soundId]);
				audio.play();
			}
		}
		if(key){
			key.style.backgroundColor = '#9cf';
			setTimeout('setOriginColor(' + noteNumber + ')', 100);
		}
	}
	
	//返回原来的钢琴键颜色
	function setOriginColor(noteNumber){
		var keyId = 'key' + noteNumber;
		var key = document.getElementById(keyId);
		var offset = noteNumber % 12;
		if(key){
			switch(offset){
				case 0:
				case 2:
				case 4:
				case 5:
				case 7:
				case 9:
				case 11:
					key.style.backgroundColor = '#eee';
					break;
				case 1:
				case 3:
				case 6:
				case 8:
				case 10:
					key.style.backgroundColor = '#666';
					break;
				default:
					break;
			}
		}
	}
	
	//按下键盘时
	document.onkeydown = function(e) {
		var pressEvent = e || window.event;
		var keyCode = '';
		if(pressEvent.keyCode){
			keyCode = pressEvent.keyCode;
		}else if(pressEvent.charCode){
			keyCode = pressEvent.charCode;
		}else if(pressEvent.which){
			keyCode = pressEvent.which;
		}
		
		switch(keyCode){
			case 65:	// a
			case 97:
			case 81:	// q
			case 113:
			case 90:	// z
			case 122:
				playSound(60);
				break;
			case 87:	// w
			case 119:
				playSound(61);
				break;
			case 83:	// s
			case 115:
			case 88:	// x
			case 120:
				playSound(62);
				break;
			case 69:	// e
			case 101:
				playSound(63);
				break;
			case 67:	// c
			case 99:
			case 68:	// d
			case 100:
				playSound(64);
				break;
			case 70:	// f
			case 102:
			case 82:	// r
			case 114:
			case 86:	// v
			case 118:
				playSound(65);
				break;
			case 84:	// t
			case 116:
				playSound(66);
				break;
			case 66:	// b
			case 98:
			case 71:	// g
			case 103:
				playSound(67);
				break;
			case 89:	// y
			case 121:
				playSound(68);
				break;
			case 72:	// h
			case 104:
			case 78:	// n
			case 110:
				playSound(69);
				break;
			case 85:	// u
			case 117:
				playSound(70);
				break;
			case 77:	// m
			case 109:
			case 74:	// j
			case 106:
				playSound(71);
				break;
			case 75:	// k
			case 107:
			case 73:	// i
			case 105:
			case 44:	// ,
			case 188:
				playSound(72);
				break;
			default:
				break;
		}
	}
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?5b89b36a1fd7597ad0e270e7b85b6685";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();