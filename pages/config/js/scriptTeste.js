var audioElement = document.getElementById('meu-audio');
var volumeAtual = localStorage.getItem('volume-atual');
var posicaoReproducao = localStorage.getItem('posicao-reproducao');
var isPaused = localStorage.getItem('audio-pausado');

if (volumeAtual !== null) {
  audioElement.volume = parseFloat(volumeAtual);
}

if (posicaoReproducao !== null) {
  audioElement.currentTime = parseFloat(posicaoReproducao);
}

if (isPaused !== null && isPaused === "true") {
  audioElement.pause();
}


var audioElement = document.getElementById('meu-audio');
    var tempoAtualElement = document.getElementById('tempo-atual');
    var intervaloTempoAtual;
    
    function toggleAudio() {
      if (audioElement.paused) {
        audioElement.play();
      } else {
        audioElement.pause();
      }
    }
    
    function atualizarTempoAtual() {
      tempoAtualElement.innerHTML = 'Tempo Atual: ' + formatarTempo(audioElement.currentTime);
    }
    
    function formatarTempo(tempo) {
      var minutos = Math.floor(tempo / 60);
      var segundos = Math.floor(tempo % 60);
      
      if (segundos < 10) {
        segundos = '0' + segundos;
      }
      
      return minutos + ':' + segundos;
    }
    
    
    function saveData() {
      localStorage.setItem('posicao-reproducao', audioElement.currentTime);
      localStorage.setItem('volume-atual', audioElement.volume);
      localStorage.setItem('audio-pausado', audioElement.paused);
    }
    
    window.addEventListener('beforeunload', function() {
      saveData();
    });
    
    setInterval(function() {
    }, 5000);
    
    audioElement.addEventListener('play', function() {
      intervaloTempoAtual = setInterval(atualizarTempoAtual, 1000);
    });
    
    audioElement.addEventListener('pause', function() {
      clearInterval(intervaloTempoAtual);
    });