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

	gameFunction : function(){
		// params : number : the number entered by user,
		// balanceType : where the number was entered (left / right)
		// TODO:
		// everytime a user enters a number in any weight
		
		game.level+=1;
		game.result = 0;

		if(this.level<=33){

			if(this.level<=10){
				panOne = parseInt(Math.random() * (16) + 10, 10);
				panTwo = panOne-2;
				
				p1=this.generateSequence(panOne, 3, 2);
				p2=this.generateSequence(panTwo, 4, 2);
				
				var sequence = p1.concat(p2);
				$('#numberSet').html(sequence.join(','));
				
				this.result = (panOne+panTwo)/2;
				console.log(this.result);

			}
			
			if(this.level<=16){

			}
			if(this.level<=24){

			}
			if(this.level<=33){

			}

		else if(this.level<=66){
			panOne = parseInt(Math.random() * (121) + 60, 10);       /*(Math.random() * (max - min + 1)) + min;*/
			panTwo = parseInt(Math.random() * (121) + 60, 10);

			if(panOne%2 !== 0)
				panOne++;
			if(panTwo%2 !== 0)
				panTwo++;

			result = (panOne+panTwo)/2;

			p1=this.generateSequence(panOne, 10, 2);
			p2=this.generateSequence(panTwo, 10, 2);
			var sequence = p1.concat(p2);
			console.log(sequence);
		}

		else if(this.level<=99){
			panOne = parseInt(Math.random() * (321) + 180, 10);       /*(Math.random() * (max - min + 1)) + min;*/
			panTwo = parseInt(Math.random() * (321) + 180, 10);

			if(panOne%2 !== 0)
				panOne++;
			if(panTwo%2 !== 0)
				panTwo++;

			result = (panOne+panTwo)/2;

			p1=this.generateSequence(panOne, 15, 2);
			p2=this.generateSequence(panTwo, 15, 2);
			var sequence = p1.concat(p2);
			console.log(sequence);
		}
		else if(this.level==100){
			panOne = parseInt(Math.random() * (501) + 1000, 10);
			panTwo = parseInt(Math.random() * (501) + 1000, 10);

			if(panOne%2 !== 0)
				panOne++;
			if(panTwo%2 !== 0)
				panTwo++;

			result = (panOne+panTwo)/2;

			p1=this.generateSequence(panOne, 20, 2);
			p2=this.generateSequence(panTwo, 20, 2);
			var sequence = p1.concat(p2);
			console.log(sequence);
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
		console.log(sum1);

		for(var i=0; i < set2.length; i++) {
			sum2+=set2[i];
		}
		console.log(sum2);

		if(sum1==this.result && sum2==this.result) {
			console.log("You WIN!!");
			this.gameFunction();
		}
		else
			console.log("naah!! Try again!! May be you havent used all the given sets");
	}
};

game.gameFunction();
