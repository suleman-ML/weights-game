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
			var j = Math.floor(Math.random() * (i + 1));
			var temp = items[i];
			items[i] = items[j];
			items[j] = temp;
		}

		return items;
	},

	level: 0,
	strikeOffLevel: 21,
	result: 0,
	resultsGenerated : [0], //stores the results generated throughout the game to maintain uniqueness
	MaxNumber : 0,
	setOfFirstNumber : 2,
	setOfSecondNumber : 3,
	totalWeightInPanOne : 0,
	totalWeightInPanTwo : 0,

	numberSet : function(level,set1,set2,minimum) {
		game.MaxNumber += 20;
		var previousNumber = game.resultsGenerated[game.resultsGenerated.length-1];
		previousNumber += 41;
		var panOne = parseInt(Math.random() * (game.MaxNumber - previousNumber + 1),10) + previousNumber;

		var p1 = this.generateSequence(panOne,set1,minimum);
		var p2 = this.generateSequence(panOne,set2,minimum);

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
			$(".weight-sets").append('<div class="draggable"><span>' + sequence[wIndex] + '</span></div>');
		}

		$(".draggable").draggable({
			revert : "invalid"
		});
		$("#panone, #pantwo").droppable({
			tolerance : "fit"
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
		$('#level').html("LEVEL : " + game.level + '<p> Timer : <span id="timer"></span></p>');
	},

	sumUpTheWeightsInPans : function() {

		var panOneWeights = [];
		var panTwoWeights = [];

		var panOneLeftBorder = $('#panone').offset().left;
		var panOneRightBorder = $('#panone').offset().left + $('#panone').outerWidth();
		var panOneTopBorder = $('#panone').offset().top;
		var panOneBottomBorder = $('#panone').offset().top + $('#panone').outerHeight();

		var panTwoLeftBorder = $('#pantwo').offset().left;
		var panTwoRightBorder = $('#pantwo').offset().left + $('#pantwo').outerWidth();
		var panTwoTopBorder = $('#pantwo').offset().top;
		var panTwoBottomBorder = $('#pantwo').offset().top + $('#pantwo').outerHeight();

		var draggableWidth = $('.draggable').outerWidth();
		var draggableHeight = $('.draggable').outerHeight();


		$(".draggable").each(function(){
			if(($(this).offset().left > panOneLeftBorder) && ($(this).offset().left + draggableWidth < panOneRightBorder)) {
				if(($(this).offset().top > panOneTopBorder) && ($(this).offset().top + draggableHeight < panOneBottomBorder))
					panOneWeights.push(parseInt($(this).text(),10));
			}
			else if (($(this).offset().left + draggableWidth > panOneRightBorder) && ($(this).offset().left > panTwoLeftBorder) && ($(this).offset().left + draggableWidth < panTwoRightBorder)) {
				if(($(this).offset().top > panTwoTopBorder) && ($(this).offset().top + draggableHeight < panTwoBottomBorder))
					panTwoWeights.push(parseInt($(this).text(),10));
			}
		});

		for(var i=0; i < panOneWeights.length; i++) {
			game.totalWeightInPanOne += panOneWeights[i];
		}

		for(var j=0; j < panTwoWeights.length; j++) {
			game.totalWeightInPanTwo += panTwoWeights[j];
		}
	},

	winCondition : function(){

		game.sumUpTheWeightsInPans();

		if(game.totalWeightInPanOne == this.result && game.totalWeightInPanTwo == this.result) {

			$('#result').html("Nice!!");
			$('.draggable').remove();

			setTimeout(function(){
				$('#result').html('');
				game.gameFunction();
			},1000);

		}
		else{
			game.totalWeightInPanOne = 0;
			game.totalWeightInPanTwo = 0;
			$('#result').html("Try Again!");
			setTimeout(function(){
				$('#result').html('');
			},1000);
		}
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
});
game.gameFunction();