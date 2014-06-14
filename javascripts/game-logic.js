var game = {

	generateSequence : function(number, sections, min){
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

		shuffle: function(items) {
			var i = items.length;
			while (--i) {
			  var j = Math.floor(Math.random() * (i + 1))
			  var temp = items[i];
			  items[i] = items[j];
			  items[j] = temp;
			}

			return items;
		},

	level: 0 ,
	strikeOffLevel: 21,
	panone : 0, // total weight for Pan 1
	pantwo : 0, // total weight for Pan 2
	result: 0,
	resultsGenerated : [0], //stores the results generated throughout the game to maintain uniqueness
	MaxNumber : 0,
	setOfFirstNumber : 2,
	setOfSecondNumber : 3,

	numberSet : function(level,set1,set2,minimum) {
		game.MaxNumber += 20;
		var previousNumber = game.resultsGenerated[game.resultsGenerated.length-1];
		previousNumber += 41;
		var panOne = parseInt(Math.random() * (game.MaxNumber - previousNumber + 1),10) + previousNumber;

		var p1 = this.generateSequence(panOne,set1,minimum);
		var p2 = this.generateSequence(panOne,set2,minimum);

		//console.log(p1, p2);

		var sequence = game.shuffle(p1.concat(p2));

		this.result = panOne;

		if(this.resultsGenerated.indexOf(this.result) == -1)
			this.resultsGenerated.push(this.result);

		else if(this.resultsGenerated.indexOf(this.result) !== -1) {
			this.resultsGenerated.push(this.result);
			this.resultsGenerated.splice(this.resultsGenerated.length-1,1);
			sequence = [];
			this.numberSet(level,set1,set2,minimum);
		}

		for(var wIndex in sequence) {
			$(".weight-sets").append('<div class="draggable">' + sequence[wIndex] + '</div>');
		}

		$(".draggable").draggable();
		$("#panone, #pantwo").droppable({
			over: function(event, ui) {
				var idOfPan = $(this).attr('id');

				if(typeof $(ui.draggable).attr('weight-in-pan') === "undefined" ||
				$(ui.draggable).attr('weight-in-pan') != idOfPan) {
					$(ui.draggable).attr('weight-in-pan', idOfPan);
					game[idOfPan] += parseInt($(ui.draggable).text(),10);
				}
			},
			out: function(event,ui) {
				var idOfPan = $(this).attr('id');
				$(ui.draggable).removeAttr('weight-in-pan');
				game[idOfPan] -= parseInt($(ui.draggable).text(),10);
			}
		});
	},

	gameFunction : function() {

		game.strikeOffLevel--;
		game.level++;										//Track the last level user played

		if(game.level == 21) {
			game.gameOver();
		}
		game.numberSet(game.level,game.setOfFirstNumber,game.setOfSecondNumber,2);

		game.setOfFirstNumber += 1;
		game.setOfSecondNumber += 1;

		$("#strike-off").html(game.strikeOffLevel);
		$('#level').html("LEVEL : " + game.level);
	},

	winCondition : function(){

		if(game.panone == this.result && game.pantwo==this.result) {

			game.panone = 0;
			game.pantwo = 0;

			$('#result').html("You Won!!");
			$('.draggable').remove();

			setTimeout(function(){
				$('#result').html('');
				game.gameFunction();
			},1000);
			return false;
		}
		else
			$('#result').html("Try Again!");
	},

	gameOver : function () {
		var endingNote = "Thanks for playing, please send your feedback at Martketlytics.";
		$("#container").html(endingNote);
	},
};

$('#check').click(function() {		//Track no. of times user has clicked "check" on each level.
	game.winCondition();
});
$("#reset").click(function () {
    $(".draggable").animate({
        top: "0px",
        left: "0px"
    });
    game.panone = 0;
    game.pantwo = 0;
});
game.gameFunction();















	// generateSets : function(level) {
	// 	var set1 = 2;
	// 	var set2 = 1;
	// 	game.numberSet(glevel,set1,set2,2);
	// },
	// generateWeight: function(from, to) {
	// 	return parseInt(Math.random() * (to - from + 1) + from, 10); /*(Math.random() * (max - min + 1)) + min;*/
	// },
	/************* BEGINNER STAGE ***************/

		// if(this.level<=33){

		// if(this.level<=5){
		//	game.numberSet(5,4,3,2);
		// }
		// else if(this.level<=16){
		//	game.numberSet(16,5,5,2);
		// }
		// else if(this.level<=30){
		//	game.numberSet(30,7,8,4);
		// }
		// else if(this.level<=33){
		//	game.numberSet(33,10,10,5);
		// }
		// }

		/************* PRO STAGE ***************/

		// else if(this.level<=66){

		// 	if(this.level<=38){
		// 		game.numberSet(38,12,12,8);
		// 	}
		// 	else if(this.level<=49){
		// 		game.numberSet(49,15,15,12);
		// 	}
		// 	else if(this.level<=63){
		// 		game.numberSet(63,17,18,14);
		// 	}
		// 	else if(this.level<=66){
		// 		game.numberSet(66,20,20,16);
		// 	}
		// }

		/************* FREAK STAGE ***************/

		// else if(this.level<=99){

		// 	if(this.level<=71){
		// 		game.numberSet(71,22,22,16);
		// 	}
		// 	else if(this.level<=82){
		// 		game.numberSet(82,27,28,16);
		// 	}
		// 	else if(this.level<=96){
		// 		game.numberSet(96,30,30,18);
		// 	}
		// 	else if(this.level<=99){
		// 		game.numberSet(99,35,35,20);
		// 	}
		// }

		/************* INSANE STAGE ***************/
		// else if(this.level==100){
		// game.numberSet(100,50,50,20);
		// }

		/************* GAME OVER ***************/
		// else {
		// 	$("#container").empty();
		// 	$("#container").html("GAME OVER !!!");
		// }