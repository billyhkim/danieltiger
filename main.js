let game, music, stats;
$(document).ready(startApp);

function startApp(){
  game = new Game();
  music = new Music();
  stats = new Stats();

  game.shuffleCards(game.images);  
  game.renderCards();
  $('.game-area').on('click', '.back', game.cardClicked);
  $('.game-reset').click(stats.gameReset);
  $('body').removeClass('fadeout');

  $('.play').click(music.startAudio('theme'));
  $('.mute').click(music.stopAudio('theme'));
  $('#about-btn').click(() => $('#my-modal').css('display', 'block'));
  $('.close').click(() => $('#my-modal').css('display', 'none'));
}
