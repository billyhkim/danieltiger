class Stats {
  constructor() {
    this.matches = 0;
    this.attempts = 0;
    this.accuracy = 0;
    this.gamesPlayed = 0;
    this.gameReset = this.gameReset.bind(this);

  }
  displayStats() {
    $('.games-played .value').text(this.gamesPlayed);
    $('.attempts .value').text(this.attempts);
    $('.accuracy .value').text(Math.round(this.accuracy * 100) + '%');
  }
  resetStats() {
    this.matches = 0;
    this.accuracy = 0;
    this.attempts = 0;
    this.displayStats();
  }
  accuracyCalculate(){
    this.accuracy = this.matches / this.attempts;
  }
  displayWinModal() {
    $('#win-modal').css('display', 'block');
  }
  gameReset() {
    game.matchCounter = 0;
    this.gamesPlayed++;
    this.resetStats();
    this.displayStats();
    $('.game-area').empty();
    game.shuffleCards(game.images);
    game.renderCards();
    $('.card').click(game.cardClicked);
    $('#win-modal').css('display', 'none');
  }
}
