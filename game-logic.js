var game = {

	generateSequence : function(number, sections, min){
		// TODO:
		// all the code that is required
		// to generate a sequence.
			var ary = [];
			var i = 0;
			while ( number >= 0 ) {
				if (!ary[i % sections]) ary[i % sections] = 0;
				if ( number >= min ) {
					number -= min;
					ary[i % sections] += min;
					min++;
				}
				else {
					ary[i % sections] += number;
					break;
				}
				// Randomize here
				if (i > sections) {
					i += Math.floor(Math.random() * 3);
				}
				else {
					i++;
				}
			}
			return ary;
	},

	level :0 ,
	isthere : [],
	totalWeightInPanOne : 0,
	totalWeightInPanTwo : 0,

	numberSet : function(levelRange,set1,set2,minimum) {							/*(Math.random() * (max - min + 1)) + min;*/
		console.log(this.level);
		console.log(levelRange);

		/********************* BEGINNER STAGE **************************/

		if(levelRange<=33) {
			if(levelRange<=5) {
				panOne = parseInt(Math.random() * ((levelRange+10)-10+1) + 10, 10);  //10-15
				panTwo = panOne-2;
			}
			else if (levelRange<=16) {
				panOne = parseInt(Math.random() * ((levelRange+14)-20+1) + 20, 10);  //20-40
				panTwo = panOne-2;
			}
			else if (levelRange<=30) {
				panOne = parseInt(Math.random() * ((levelRange+40)-42+1) + 42, 10);  //42-70
				panTwo = panOne-2;
			}
			else if (levelRange<=33) {
				panOne = parseInt(Math.random() * ((levelRange+67)-72+1) + 72, 10);  //72-100
				panTwo = panOne-2;
			}
		}

		/********************* PRO STAGE **************************/

		else if(levelRange<=66) {
			if(levelRange<=38) {
				panOne = parseInt(Math.random() * ((levelRange+82)-110+1) + 110, 10);  //110-120
				panTwo = panOne-2;
			}
			else if (levelRange<=49) {
				panOne = parseInt(Math.random() * ((levelRange+501)-300+1) + 300, 10);  //300-550
				panTwo = panOne-2;
			}
			else if (levelRange<=63) {
				panOne = parseInt(Math.random() * ((levelRange+137)-168+1) + 168, 10);  //168-200
				panTwo = panOne-2;
			}
			else if (levelRange<=66) {
				panOne = parseInt(Math.random() * ((levelRange+117)-100+1) + 100, 10);  //200-230
				panTwo = panOne-2;
			}
		}

		/********************* FREAK STAGE **************************/

		else if(levelRange<=99) {
			if(levelRange<=71) {
				panOne = parseInt(Math.random() * ((levelRange+199)-240+1) + 240, 10);  //240-270
				panTwo = panOne-2;
			}
			else if (levelRange<=82) {
				panOne = parseInt(Math.random() * ((levelRange+268)-290+1) + 290, 10);  //290-350
				panTwo = panOne-2;
			}
			else if (levelRange<=96) {
				panOne = parseInt(Math.random() * ((levelRange+364)-380+1) + 380, 10); //380-460
				panTwo = panOne-2;
			}
			else if (levelRange<=99) {
				panOne = parseInt(Math.random() * ((levelRange+501)-500+1) + 500, 10); //500-600
				panTwo = panOne-2;
			}
		}

		/********************* INSANE STAGE **************************/

		else if(levelRange==100) {
			panOne = parseInt(Math.random() * ((levelRange+1900)-1500+1) + 1500, 10);  //1500-2000
			panTwo = panOne-2;
		}

		if(this.level<=33){
			if(this.level<=5) {
				for(var i=0; i<7; i++){
					$(".weight-sets").append('<div class="draggable"></div>');
				}
			}
			else if(this.level<=16) {
				for(var i=0; i<10; i++){
					$(".weight-sets").append('<div class="draggable"></div>');
				}
			}
			else if(this.level<=30) {
				for(var i=0; i<15; i++){
					$(".weight-sets").append('<div class="draggable"></div>');
				}
			}
			else if(this.level<=33) {
				for(var i=0; i<20; i++){
					$(".weight-sets").append('<div class="draggable"></div>');
				}
			}
		}
		else if(this.level<=66){
			if(this.level<=38) {
				for(var i=0; i<24; i++){
					$(".weight-sets").append('<div class="draggable"></div>');
				}
			}
			else if(this.level<=49) {
				for(var i=0; i<30; i++){
					$(".weight-sets").append('<div class="draggable"></div>');
				}
			}
			else if(this.level<=63) {
				for(var i=0; i<35; i++){
					$(".weight-sets").append('<div class="draggable"></div>');
				}
			}
			else if(this.level<=66) {
				for(var i=0; i<0; i++){
					$(".weight-sets").append('<div class="draggable"></div>');
				}
			}
		}
		else if(this.level<=99){
			if(this.level<=71) {
				for(var i=0; i<42; i++){
					$(".weight-sets").append('<div class="draggable"></div>');
				}
			}
			else if(this.level<=82) {
				for(var i=0; i<55; i++){
					$(".weight-sets").append('<div class="draggable"></div>');
				}
			}
			else if(this.level<=96) {
				for(var i=0; i<60; i++){
					$(".weight-sets").append('<div class="draggable"></div>');
				}
			}
			else if(this.level<=99) {
				for(var i=0; i<70; i++){
					$(".weight-sets").append('<div class="draggable"></div>');
				}
			}
		}
		else if(this.level==100){
			for(var i=0; i<100; i++){
					$(".weight-sets").append('<div class="draggable"></div>');
			}
		}

		p1=this.generateSequence(panOne,set1,minimum);
		p2=this.generateSequence(panTwo,set2,minimum);

		var sequence = p1.concat(p2);
		var  j=0;

		$(".draggable").each(function(){
			$(this).html(sequence[j]);
			j++;
		});

		$(".draggable").draggable();

		$("#pan-one").droppable({

			drop: function(event, ui) {
				var weightAddedInPanOne = parseInt($(ui.draggable).text(),10);
				game.totalWeightInPanOne += weightAddedInPanOne;
				console.log("panone " + game.totalWeightInPanOne);
			},
			out: function(event,ui) {
				var weightSubtractedFromPanOne = parseInt($(ui.draggable).text(),10);
				game.totalWeightInPanOne -= weightSubtractedFromPanOne;
			}
		});

		$("#pan-two").droppable({
			drop: function(event, ui) {
				var weightAddedInPanTwo = parseInt($(ui.draggable).text(),10);
				game.totalWeightInPanTwo += weightAddedInPanTwo;
				console.log("pantwo " + game.totalWeightInPanTwo);
			},
			out: function(event,ui) {
				var weightSubtractedFromPanTwo = parseInt($(ui.draggable).text(),10);
				game.totalWeightInPanTwo -= weightSubtractedFromPanTwo;
			}
		});

        $('#numberSet').html(sequence.join(','));

		this.result = (panOne+panTwo)/2;
		console.log(this.result);

		if(game.isthere.indexOf(this.result) == -1)
			game.isthere.push(this.result);

		else if(game.isthere.indexOf(this.result) !== -1) {
			game.isthere.push(this.result);
			game.isthere.splice(game.isthere.length-1,1);
			this.numberSet(levelRange,set1,set2,minimum);
		}
	},

	gameFunction : function() {
		// params : number : the number entered by user,
		// balanceType : where the number was entered (left / right)
		// TODO:
		// everytime a user enters a number in any weight

		game.level++;
		game.result = 0;

		$('#level').html("LEVEL : "+game.level);

		/************* BEGINNER STAGE ***************/

		if(this.level<=33){

			if(this.level<=5){
				game.numberSet(5,4,3,2);
			}
			else if(this.level<=16){
				game.numberSet(16,5,5,2);
			}
			else if(this.level<=30){
				game.numberSet(30,7,8,4);
			}
			else if(this.level<=33){
				game.numberSet(33,10,10,5);
			}
		}

		/************* PRO STAGE ***************/

		else if(this.level<=66){

			if(this.level<=38){
				game.numberSet(38,12,12,8);
			}
			else if(this.level<=49){
				game.numberSet(49,15,15,12);
			}
			else if(this.level<=63){
				game.numberSet(63,17,18,14);
			}
			else if(this.level<=66){
				game.numberSet(66,20,20,16);
			}

		}

		/************* FREAK STAGE ***************/

		else if(this.level<=99){

			if(this.level<=71){
				game.numberSet(71,22,22,16);
			}
			else if(this.level<=82){
				game.numberSet(82,27,28,16);
			}
			else if(this.level<=96){
				game.numberSet(96,30,30,18);
			}
			else if(this.level<=99){
				game.numberSet(99,35,35,20);
			}

		}

		/************* INSANE STAGE ***************/
		else if(this.level==100){
			game.numberSet(100,50,50,20);
		}

		/************* GAME OVER ***************/
		else {
			console.log("Game Over!");
		}
	},

	winCondition : function(){
		// TODO :
		// Check weather a game is won, lost or needs to continue
		// should return true for win, false for continue.

		if(game.totalWeightInPanOne == this.result && game.totalWeightInPanTwo==this.result) {

			game.totalWeightInPanOne = 0;
			game.totalWeightInPanTwo = 0;

			$('#result').html("You Won!!");
			$('.draggable').remove();
			$('.draggable').remove();
			setTimeout(function(){
				$('#result').html('');
				game.gameFunction();
			},2000);
			return false;
		}
		else
			$('#result').html("Try Again!");
	}
};

$('#check').on('click',function(){
	game.winCondition();
});

game.gameFunction();







/********** TRASH ************/
//Windcondition : function...
// var sum1=0;
		// var sum2=0;

		// var set1 = $('#box1').val();
		// var set2 = $('#box2').val();

		// var set1Arr = set1.split(',');
		// var set2Arr = set2.split(',');

		// for(var i=0; i < set1Arr.length; i++) {
		// 	sum1+=parseInt(set1Arr[i]);
		// }

		// for(var i=0; i < set2Arr.length; i++) {
		// 	sum2+=parseInt(set2Arr[i]);
		// }

		// if(sum1==this.result && sum2==this.result) {
		// 	$('#box1').val('');
		// 	$('#box2').val('');
		// 	$('#result').html("You have won, genius!");
		// 	setTimeout(function(){
		// 		$('#result').html('');
		// 		game.gameFunction();
		// 	},2000);
		// }
		// else
		// 	$('#result').html("Try Again!!");
/********************************************************************/
		// $("#pan-one").draggable({
		// 	drag: function(event,ui) {
		// 		weightSubtracted = parseInt($(".draggable").text(),10);
		// 		console.log(weightSubtracted);
		// 		game.totalWeightInPanOne -= weightSubtracted;
		// 	}
		// });
		// $("#pan-two").draggable({
		// 	drag: function(event,ui) {
		// 		weightSubtracted = parseInt($(".draggable").text(),10);
		// 		game.totalWeightInPanTwo -= weightSubtracted;
		// 	}
		// });