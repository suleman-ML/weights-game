var level=1;
var result;
var panOne;
var panTwo;

var game = function () {
if(level<=33){
    panOne = parseInt(Math.random() * (50) + 11, 10);       /*(Math.random() * (max - min + 1)) + min;*/
    panTwo = parseInt(Math.random() * (50) + 11, 10);
}
else if(level<=66){
    panOne = parseInt(Math.random() * (121) + 60, 10);       /*(Math.random() * (max - min + 1)) + min;*/
    panTwo = parseInt(Math.random() * (121) + 60, 10);
}

else if(level<=99){
    panOne = parseInt(Math.random() * (321) + 180, 10);       /*(Math.random() * (max - min + 1)) + min;*/
    panTwo = parseInt(Math.random() * (321) + 180, 10);
}
else {
    panOne = parseInt(Math.random() * (501) + 1000, 10);
    panTwo = parseInt(Math.random() * (501) + 1000, 10);
}
/********** Generating value set ******************/

function split(number, sections, min) {
    var ary = [];
    var i = 0;
    while ( number >= 0 ) {
        if (!ary[i % sections]) ary[i % sections] = 0;
        if ( number >= min ) {
           number -= min;
           ary[i % sections] += min;
           min++;
        } else {
            ary[i % sections] += number;
            break;
        }
        // Randomize here
        if (i > sections) {
            i += Math.floor(Math.random() * 3);
        } else {
            i++;
        }
    }
    return ary;
}
/********** For fractional cases ,verification *********************/
	
if(panOne%2 !== 0)
	panOne++;
if(panTwo%2 !== 0)
	panTwo++;

result = (panOne+panTwo)/2;

/************* displaying together ********************/
/*assign a variable at sections so it could varry depending upon the level state.*/
p1=split(panOne, 4, 2);
p2=split(panTwo, 3, 2);

gameArray = p1.concat(p2);
usedArray = [];

$('#numberSet').html(JSON.stringify(gameArray));

};
/********** Retrieving user inputed values *****************/
game();

$(document).ready(function(){
   $("#box1,#box2").keypress(function(event){
    if(event.which == 32){
        var a = $(this).val().split(' ');
        var number = parseInt(a[a.length-1]);
        var index = gameArray.indexOf(number);
        if(index !== -1){
            gameArray.splice(index,1);
            usedArray.push(number);
            $('#numberSet').html(JSON.stringify(gameArray));
            $('#used').html(JSON.stringify(usedArray));

        }
    }
   });
$('#chk').click(function(){
	var boxOne = $('#box1').val();
	var boxTwo = $('#box2').val();
	var b1=0;
	var b2=0;

	var boxOneValue = boxOne.split(" ");
	for(var i=0; i < boxOneValue.length;i++)
		b1+=parseInt(boxOneValue[i],10);

	var boxTwoValue = boxTwo.split(" ");
	for(var i=0; i < boxTwoValue.length;i++)
		b2+=parseInt(boxTwoValue[i],10);



	if( b1===result && b2 === result) {
		console.log("You WIN!!");
        $('#box1').val("");
        $('#box2').val("");
        game();
        level++;
    }
	else
		console.log("naah!! Try again!! May be you havent used all the given sets");
        


});
});