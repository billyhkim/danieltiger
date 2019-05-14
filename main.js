let game;
let music;
let stats;
$(document).ready(startApp);

function startApp(){
  game = new Game();
  music = new Music();
  stats = new Stats();

  setTimeout(music.startAudio('gamemusic'), 500)
  game.shuffleCards(game.images);  
  game.renderCards();
  $('.card').click(game.cardClicked);
  $('.game-reset').click(stats.gameReset);
  $('body').removeClass('fadeout');

  $('#my-btn').click(function() {
    $('#my-modal').css('display', 'block');
  });
  $('.close').click(function() {
    $('#my-modal').css('display', 'none');
  });
}
