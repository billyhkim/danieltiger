$(document).ready(initializeApp);
var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var match_counter = 0;
var can_click_card = true;
var images = ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png', '9.png'];
var matches = 0;
var attempts = 0;
var accuracy = 0;
var games_played = 0;

function initializeApp(){
  shuffle_cards(images);  
  randomize_generate_cards();
  $('.card').click(card_clicked);
  $('#gameMusic').click(game_music);
  $('.gameReset').on('click', game_reset);
  $('body').removeClass('fadeout');
}

function randomize_generate_cards(){
  var doubleImages = images.concat(images);
  for (var i = 0; i < doubleImages.length; i++) {
    var container = $('<div>').addClass('cardContainer');
    var card = $('<div>').addClass('card');
    var front = $('<div>').addClass('front');
    var back = $('<div>').addClass('back');
    var image = $('<img>').addClass('imageMod').attr('src','images/' + doubleImages[i]);
    front.append(image);
    card.append(front,back);
    container.append(card);
    $('#gameArea').append(container);
  }
}

function shuffle_cards(array){
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
  }
  return array;
}

function card_clicked(){
  if(can_click_card === false) {
    return;
  }
  if (first_card_clicked === null) { // 1st clicked
    card_sound();
    first_card_clicked = $(this);
    first_card_clicked.find('.back').fadeOut(300);
    return;
  } else {  // 2nd clicked
    card_sound();
    second_card_clicked = $(this);
    second_card_clicked.find('.back').fadeOut(300);
    attempts++;
    var first_card_src = first_card_clicked.find('.front img').attr('src');
    var second_card_src = second_card_clicked.find('.front img').attr('src');
    if (first_card_src === second_card_src) {
      uggamugga();
      first_card_clicked.off('click');
      $(this).off('click');
      matches++;
      match_counter++;
      if(match_counter === total_possible_matches){
        alert('You Win!');
        $('.card').off('click');
      }
      first_card_clicked = null;
      second_card_clicked = null;
      accuracy_calc();
      display_stats();
      return;
    } else {
      $(this).on('click');
      can_click_card = false;
      accuracy_calc();
      display_stats();
      setTimeout(hide_both_cards, 2000)
    }
  }
}

function hide_both_cards(){
  card_over();
  first_card_clicked.find('.back').fadeIn(250);
  second_card_clicked.find('.back').fadeIn(250);
  first_card_clicked = null;
  second_card_clicked = null;
  can_click_card = true;
}

// stats functions
function display_stats(){
  $('.gamesPlayed .value').text(games_played);
  $('.attempts .value').text(attempts);
  $('.accuracy .value').text(Math.round(accuracy*100) + '%');
}
function reset_stats(){
  matches = 0;
  accuracy = 0;
  attempts = 0;
  display_stats();
}
function accuracy_calc(){
  accuracy = matches/attempts;
}
function game_reset(){
  match_counter = 0;
  games_played++;
  reset_stats();
  display_stats();
  $('#gameArea').empty();
  randomize_generate_cards();
}

// sound functions
function card_sound(){
  var player = new Audio('images/cardflip.wav');
  player.play();
}
function game_music(){
  var player = new Audio('images/playmusic.mp3');
  player.volume = .7;
  player.loop = true;
  player.play();
}
function card_over(){
  var player = new Audio('images/cardover.wav');
  player.play();
}
function uggamugga(){
  var player = new Audio('images/uggamugga.mp3');
  player.play();
}