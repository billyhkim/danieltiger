class Game {
  constructor(){
    this.firstCardClicked = null;
    this.secondCardClicked = null;
    this.totalPossibleMatches = 9;
    this.matchCounter = 0;
    this.canClickCard = true;
    this.images = ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png', '9.png', '1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png', '9.png'];
    
    this.cardClicked = this.cardClicked.bind(this);
    this.hideBothCards = this.hideBothCards.bind(this);
  }

  renderCards(){
    for (let i = 0; i < this.images.length; i++) {
      let container = $('<div>').addClass('card-container');
      let card = $('<div>').addClass('card');
      let front = $('<div>').addClass('front');
      let back = $('<div>').addClass('back');
      let image = $('<img>').addClass('image-mod').attr('src','images/' + this.images[i]);
      front.append(image);
      card.append(front,back);
      container.append(card);
      $('#game-area').append(container);
    }
  }
  
  shuffleCards(arr){
    let currentIndex = arr.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = arr[currentIndex];
        arr[currentIndex] = arr[randomIndex];
        arr[randomIndex] = temporaryValue;
    }
    return arr;
  }
  
  cardClicked(){
    if(this.canClickCard === false) {
      return;
    }
    if (this.firstCardClicked === null) { // 1st clicked
      music.startAudio('click');
      this.firstCardClicked = $(event.currentTarget);
      this.firstCardClicked.find('.back').fadeOut(300);
      this.firstCardClicked.off('click');
      return;
    } else {  // 2nd clicked
      music.startAudio('click');
      this.secondCardClicked = $(event.currentTarget);
      this.secondCardClicked.find('.back').fadeOut(300);
      stats.attempts++;
      let firstCardSrc = this.firstCardClicked.find('.front img').attr('src');
      let secondCardSrc = this.secondCardClicked.find('.front img').attr('src');
      if (firstCardSrc === secondCardSrc) {
        music.startAudio('match');
        this.firstCardClicked.off('click');
        $(event.currentTarget).off('click');
        stats.matches++;
        this.matchCounter++;
        if(this.matchCounter === this.totalPossibleMatches){
          alert('You Win!');
          $('.card').off('click');
        }
        this.firstCardClicked = null;
        this.secondCardClicked = null;
        stats.accuracyCalculate();
        stats.displayStats();
        return;
      } else {
        $(event.currentTarget).on('click');
        this.canClickCard = false;
        stats.accuracyCalculate();
        stats.displayStats();
        setTimeout(this.hideBothCards, 2000)
      }
    }
  }
  
  hideBothCards(){
    music.startAudio('cardover');
    this.firstCardClicked.find('.back').fadeIn(250);
    this.secondCardClicked.find('.back').fadeIn(250);
    this.firstCardClicked = null;
    this.secondCardClicked = null;
    this.canClickCard = true;
  }
}
