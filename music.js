class Music {
  constructor(){
    this.click = new Audio('audio/cardflip.wav');
    this.cardOver = new Audio('audio/cardover.wav');
    this.theme = new Audio('audio/theme.mp3');
    this.cardMatch = new Audio('audio/match.wav');
    this.startAudio = this.startAudio.bind(this);
    this.stopAudio = this.stopAudio.bind(this);
  }

  startAudio( type ){
    switch( type ){
      case 'click':
      this.click.play();
      break;
      case 'cardover':
      this.cardOver.play();
      break;
      case 'theme':
      this.theme.volume = 0.7;
      this.theme.loop = true;
      this.theme.play();
      break;
      case 'match':
      this.cardMatch.play();
      break;
    }
  }

  stopAudio( type ){
    switch( type ){
      case 'click':
      this.click.pause();
      break;
      case 'cardover':
      this.cardOver.pause();
      break;
      case 'theme':
      this.theme.pause();
      break;
      case 'match':
      this.cardMatch.pause();
      break;
    }
  }
}