/*
 * Create a list that holds all of your cards
 */

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function addLoadEvent(func)
{
	var oldonload = window.onload;
	if(typeof window.onload != "function")
	{
		window.onload = func;
	}
	else
	{
		window.onload = function(){
			oldonload();
			func();
		}
	}	
}

function insertAfter(newElement,targetElement){
	var parent=targetElement.parentNode;
	if(parent.lastChild==targetElement){
		parent.appendChild(newElement);
	}else{
		parent.insertBefore(newElement,targetElement.nextSibling);
	}
}

function CreateAList()
{
	var ul = document.getElementById('array_deck');
	var ul_list = ul.getElementsByTagName('li');//获得li集合
	var arr1 = new Array(16);
	var arr2 ;
	var ul1;
	console.log('ul list length:'+ul_list.length);//数组成员个数
	//console.log(ul.style.display);
	
	for(var i=0; i < ul_list.length; i++)
	{
		console.log(ul_list[i].getAttribute('id'));
		arr1[i] = ul_list[i].getAttribute('id');
	}
	
	//restartButton(ul_list);
	
	var div_list = document.getElementsByTagName('div');


	console.log('div list length:'+div_list.length);
	for(var i=0; i< div_list.length; i++)
	{
		console.log(div_list[i].className);
		if('restart'==div_list[i].className)//when click restart
		{
			div_list[i].onclick = function(){
				ul.style.display = '';//"none";
				for(var i=0; i < ul_list.length; i++)
				{
					arr1[i] = ul_list[i].getAttribute('id');
				}
				arr2 = shuffle1(arr1);//执行完后arr1被清成null
				//console.log('arr2.length:'+arr2.length);
				//for(var j=0;j<arr2.length;j++)
				//	console.log(j+':'+arr2[j]);
				
				/*if(null == document.getElementById('array_deck1'))
				{
					ul1 = document.createElement('ul');
					ul1.className = 'deck';
					ul1.id = 'array_deck1';
				
				}*/
				
				for(var k=0;k<16;k++)
				{					
					var li = document.createElement("li");
					
					var idx = arr2[k].split('-');
					console.log(idx);
					
					var j = parseInt(idx[1],10)-1;
					
					console.log(ul_list[j]);//得到一整个<li>
					//然后把当前的ul_list[] 逐个插入到ul中即可  先删光<li>?
					//li = ul_list[j];//整个li赋值
					//console.log(li);
					//li.className = 'card open show';
					//ul.appendChild(li);
					ul_list[j].className = 'card open show';
					ul.appendChild(ul_list[j]);
				}
				
				
			/*	for(var k=0;k<16;k++)
				{
					//var firstN = ul.firstChild;
					
					//var li = document.createElement("li");
					//li.id = arr2[k];
					//console.log(li.id);
					var idx = arr2[k].split('-');
					console.log(idx);
					//li.className = ul_list[parseInt(idx[1],10)].getAttribute('class');
					console.log(ul_list[parseInt(idx[1],10)-1]);//得到一整个<li>
					//然后把当前的ul_list[] 逐个插入到ul中即可  先删光<li>?
					//console.log('li.id:'+li.id+'li.className'+li.className);
				}
				 */
			}
		}
	}
}
function shuffle1(arry)
{
	var sortArr = new Array();
	var len = arry.length;//获取数组长度指定随机次数 


	for (var i = 0; i < len;) {
		var index = Math.floor(Math.random() * len);
		if (arry[index] != null) {
			sortArr.push(arry[index]);
			i++;
			arry[index] = null;
		}
	}
	return sortArr;
 
}
function testShuffle()
{
	var testArr = new Array("中国","美国","英国","法国","德国","西班牙","希腊",
"意大利","日本","韩国","尼日利亚","印度");


     var newArr = shuffle1(testArr);
     console.log(newArr);
     
	
}

//js 函数参数 不需要类型 var list 这个var是多余的
function restartButton(list)
{
	var div_list = document.getElementsByTagName('div');
	var arr1 = new Array(16);

	console.log('div list length:'+div_list.length);
	for(var i=0; i< div_list.length; i++)
	{
		console.log(div_list[i].className);
		if('restart'==div_list[i].className)
		{
			div_list[i].onclick = function(){
				//shuffle1(arr1);
				console.log('arr1.length:'+arr1.length);
				for(var j=0;j<arr1.length;j++)
					console.log(j+':'+arr1[j]);
			}
		}
	}
}
addLoadEvent(CreateAList);
//addLoadEvent(testShuffle);

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
