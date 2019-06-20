let game, music, stats;
$(document).ready(startApp);

function startApp(){
  game = new Game();
  music = new Music();
  stats = new Stats();

  game.shuffleCards(game.images);  
  game.renderCards();
  $('.game-area').on('click', '.back', game.cardClicked);
  $('.reset-btn').click(stats.gameReset);
  $('body').removeClass('fadeout');

  $('.audio-play').click(() => music.startAudio('theme'));
  $('.audio-mute').click(() => music.stopAudio('theme'));
  $('#about-btn').click(() => $('#my-modal').css('display', 'block'));
  $('.close').click(() => $('#my-modal').css('display', 'none'));
}
