var audioElement = document.getElementById('meu-audio');
var isAudioPlayed = false; // Verifica se o áudio já foi reproduzido
var isPaused = false;

function playAudioIndex() {
  audioElement.play();

}

// Função para reproduzir o áudio ao passar o mouse sobre a página
function playAudio() {
  if (!isAudioPlayed) {
    audioElement.play();
    isAudioPlayed = true;
    document.querySelector('.pause').style.display = 'block';
    document.querySelector('.play').style.display = 'none';
  }
}

//Controle dos play e pause
function toggleAudio() {
  if (audioElement.paused) {
    audioElement.play();
    isPaused = false; 
    document.querySelector('.pause').style.display = 'block';
    document.querySelector('.play').style.display = 'none';
  } else {
    audioElement.pause();
    isPaused = true; // atualiza a variável de estado
    document.querySelector('.play').style.display = 'block';
    document.querySelector('.pause').style.display = 'none';
  }
}

//Dimunuir volume botão
function diminuir_volume() {
  if (audioElement.volume >= 0 ) {
    audioElement.volume -= 0.2;
  }
  adjustFiltersDiminuir(audioElement);

}

//Função para diminuir o contraste
function adjustFiltersDiminuir(audioElement) {

  if (audioElement.volume >= 0.70 && audioElement.volume >= 0.50) {
    document.querySelector('.AltoTroca').style.filter = 'contrast(0%)';
  } else if (audioElement.volume >= 0.30 && audioElement.volume >= 0.10) {
    document.querySelector('.MedioTroca').style.filter = 'contrast(0%)';
    document.querySelector('.AltoTroca').style.filter = 'contrast(0%)';
  } else if (audioElement.volume >= 0) {
    document.querySelector('.BaixoTroca').style.filter = 'contrast(0%)';
    document.querySelector('.MedioTroca').style.filter = 'contrast(0%)';
    document.querySelector('.AltoTroca').style.filter = 'contrast(0%)';
  }
}


//Aumentar volume botão
function aumentar_volume() {
  if( audioElement.volume <= 1){ 
    audioElement.volume += 0.2;
  }
  adjustFiltersAumentar(audioElement);
  
}

//Função para aumentar o contraste 
function adjustFiltersAumentar(audioElement) {

  if (audioElement.volume > 0.85) {
    document.querySelector('.AltoTroca').style.filter = 'contrast(100%)';
    document.querySelector('.MedioTroca').style.filter = 'contrast(100%)';
    document.querySelector('.BaixoTroca').style.filter = 'contrast(100%)';
    
  } else if (audioElement.volume >= 0.21 && audioElement.volume <= 0.42) {
    document.querySelector('.MedioTroca').style.filter = 'contrast(100%)';
    document.querySelector('.BaixoTroca').style.filter = 'contrast(100%)';
  
  } else if (audioElement.volume >= 0.01 && audioElement.volume <= 0.03) {
    document.querySelector('.BaixoTroca').style.filter = 'contrast(100%)';
  }

}


// Adicionar o manipulador de eventos ao passar o mouse sobre a página
document.addEventListener('mouseover', playAudio);

//Salvando estado atual da musica
window.addEventListener('beforeunload', function() {
  localStorage.setItem('posicao-reproducao', audioElement.currentTime);
  localStorage.setItem('volume-atual', audioElement.volume);
  localStorage.setItem('audio-pausado', isPaused);

});

//Pegando possição de outras telas para a de configuração
var posicaoReproducao1 = localStorage.getItem('posicao-reproducao');
var volumeAtual = localStorage.getItem('volume-atual');
var isPaused1 = localStorage.getItem('audio-pausado');

if (posicaoReproducao1 !== null) {
  audioElement.currentTime = parseFloat(posicaoReproducao1);
  audioElement.volume = parseFloat(volumeAtual);
    if(isPaused1 === "true"){
      isAudioPlayed = true;
      audioElement.pause();
      document.querySelector('.play').style.display = 'block';
      document.querySelector('.pause').style.display = 'none';
    }else{
      isAudioPlayed = false;
      audioElement.play();
      document.querySelector('.pause').style.display = 'block';
      document.querySelector('.play').style.display = 'none';
    }
}
