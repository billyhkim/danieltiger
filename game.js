class Game {
  constructor() {
    this.firstCardClicked = null;
    this.secondCardClicked = null;
    this.totalPossibleMatches = 9;
    this.matchCounter = 0;
    this.images = ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png', '9.png', '1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png', '9.png'];
    
    this.cardClicked = this.cardClicked.bind(this);
    this.hideBothCards = this.hideBothCards.bind(this);
  }
  renderCards() {
    for (let i = 0; i < this.images.length; i++) {
      let container = $('<div>').addClass('card-container');
      let card = $('<div>').addClass('card');
      let front = $('<div>').addClass('front');
      let back = $('<div>').addClass('back');
      let image = $('<img>').addClass('image-mod').attr('src','images/' + this.images[i]);
      front.append(image);
      card.append(front,back);
      container.append(card);
      $('.game-area').append(container);
    }
  }
  shuffleCards(arr) {
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
  cardClicked() {
    if($(event.target).hasClass('flipped')) {
      return;
    }
    $(event.target).toggle().addClass('flipped');

    if (this.firstCardClicked === null) {
      music.startAudio('click');
      this.firstCardClicked = $(event.target).prev().find('img').attr('src');
    } else {
      music.startAudio('click');
      this.secondCardClicked = $(event.target).prev().find('img').attr('src');
      stats.attempts++;
      if (this.firstCardClicked === this.secondCardClicked) {
        music.startAudio('match');
        stats.matches++;
        this.matchCounter++;
        this.firstCardClicked = null;
        this.secondCardClicked = null;
        stats.accuracyCalculate();
        stats.displayStats();
        $('.flipped').removeClass('flipped back').prev().find('img');
        if(this.matchCounter === this.totalPossibleMatches){ // win
          // stats.gamesPlayed++;
          stats.displayWinModal();
        }
        return;
      } else {
        $('.game-area').off('click', '.back', this.cardClicked);
        stats.accuracyCalculate();
        stats.displayStats();
        setTimeout(this.hideBothCards, 2000)
      }
    }
  }
  hideBothCards() {
    music.startAudio('cardover');
    $('.flipped').toggle().removeClass('flipped');
    this.firstCardClicked = null;
    this.secondCardClicked = null;
    $('.game-area').on('click', '.back', this.cardClicked);
  }
}
