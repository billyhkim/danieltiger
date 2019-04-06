$(document).ready(initializeApp);
var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var match_counter = 0;
var can_click_card = true;
var images = ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png', '9.png'];

function initializeApp() {
  shuffle(images);  
  randomize_generate_cards();
    $('.card').click(card_clicked);
}

function randomize_generate_cards(){
  debugger;
  var doubleImages = images.concat(images);
    
  //randomize images
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

function shuffle(array) {
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

//jquery get src from image
function card_clicked() {
  if(can_click_card === false) {
    return;
  }
  //show card
  if (first_card_clicked === null) { //this is the first card that was clicked
    first_card_clicked = $(this);
    first_card_clicked.find('.back').addClass('hide');
    //assign first card clicked = to the htmlDOM that was clicked
    return;
  } else {  //this is the sevond card that was clicked
    second_card_clicked = $(this);
    second_card_clicked.find('.back').addClass('hide');
    var first_card_src = first_card_clicked.find('.front img').attr('src');
    var second_card_src = second_card_clicked.find('.front img').attr('src');
    if (first_card_src === second_card_src) {
      match_counter++;
      if(match_counter === total_possible_matches){
        alert('you won');
      }
      first_card_clicked = null;
      second_card_clicked = null;
      //wait for the next card click
      return; //Display a message to the user they have won
    } else {
      can_click_card = false;
      setTimeout(hideBothCards, 2000)
    }
  }
}

function hideBothCards(){
  first_card_clicked.find('.back').removeClass('hide');
  second_card_clicked.find('.back').removeClass('hide');
  first_card_clicked = null;
  second_card_clicked = null;
  can_click_card = true;
}

/*
<div class="cardContainer">
  <div class="card">
    <div class="front">
      <img src="images/acura.jpg" class="imageMod">
    </div>
    <div class="back"></div>
  </div>
</div>
 */
