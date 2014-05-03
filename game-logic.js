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

	numberSet : function(levelRange) {							/*(Math.random() * (max - min + 1)) + min;*/
		game.level+=1;

		panOne = parseInt(Math.random() * ((levelRange+15)-10+1) + 10, 10);
		panTwo = panOne-2;
								
		p1=this.generateSequence(panOne, 4, 2);
		p2=this.generateSequence(panTwo, 3, 2);

		var sequence = p1.concat(p2);
        $('#numberSet').html(sequence.join(','));
							
		this.result = (panOne+panTwo)/2;
		// console.log(this.result);

		if(game.isthere.indexOf(this.result) !== -1) {
			game.isthere.splice(game.level-1,1);
			game.level--;
			return;
		}

		game.isthere.push(this.result);
		// console.log(game.isthere);s
	},

	gameFunction : function() {
		// params : number : the number entered by user,
		// balanceType : where the number was entered (left / right)
		// TODO:
		// everytime a user enters a number in any weight
		
		game.result = 0;

		if(this.level<=33){

			if(this.level<=10){
				game.numberSet(10);
			}
			else if(this.level<=16){
				game.numberSet(16);
			}
			else if(this.level<=24){
				game.numberSet(24);
			}
			else if(this.level<=33){
				game.numberSet(33);
			}

		}
		else if(this.level<=66){
			game.numberSet();
		}

		else if(this.level<=99){
			game.numberSet();
		}
		else if(this.level==100){
			game.numberSet();
		}
		else {
			console.log("Game Over!");
		}
	},

	winCondition : function(set1,set2){
		// TODO :
		// Check weather a game is won, lost or needs to continue
		// should return true for win, false for continue.
		var sum1=0;
		var sum2=0;

		for(var i=0; i < set1.length; i++) {
			sum1+=set1[i];
		}

		for(var i=0; i < set2.length; i++) {
			sum2+=set2[i];
		}

		if(sum1==this.result && sum2==this.result) {
			console.log("You WIN!!");
			this.gameFunction();
		}
		else
			console.log("naah!! Try again!! May be you havent used all the given sets");
	}
};

game.gameFunction();
