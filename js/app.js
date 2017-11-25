/*
 * Create a list that holds all of your cards
 */
var totalMoveNum = 0;
var openShowNum = 0;
var matchNum = 0;
var starNum = 0;
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != "function") {
        window.onload = func;
    } else {
        window.onload = function() {
            oldonload();
            func();
        }
    }
}

function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

function setMoveNum(num) {
    var varspan = document.getElementsByTagName('span'); //varspan 是一个list
    var temp = 0;
	if ('moves' == varspan[0].className) {
        console.log('num:' + num);
		if(num > 0)
			temp = num - 1;
		else
			temp = num;
        varspan[0].innerHTML = '' + temp;
    }
    var ul1 = document.getElementById('3stars');
    var list2 = ul1.getElementsByTagName('li');

    if (num < 15) //3 s
    {
        starNum = 3; //nothing
    } else if (num < 30) //2 s
    {
        starNum = 2;
        list2[2].style.display = 'none';
    } else //1 s
    {
        starNum = 1;
        list2[1].style.display = 'none';
        list2[2].style.display = 'none';
    }

}

function setDispNone(u1, u2) {

    //ul_list[i].className = 'card';//ul_list[i] 即this
    //ultemp[ulk].className = 'card';
    u1.setAttribute('class', 'card');
    console.log(u1.getAttribute('id'));
    u2.setAttribute('class', 'card');
    console.log(u2.getAttribute('id'));

    openShowNum = 0;
}

function createAList() {
    var ul = document.getElementById('array_deck');
    var ul_list = ul.getElementsByTagName('li'); //获得li集合
    var arr1 = new Array(16);
    var arr2;


    for (var i = 0; i < ul_list.length; i++) {

        arr1[i] = ul_list[i].getAttribute('id');
        ul_list[i].onclick = function() {
            var showclass = this.className;
            console.log(showclass);
            var flag1 = 0;
            var flag2 = 0;
            var i_tag = this.getElementsByTagName('i');

            //console.log(i_tag[0].className);

            //console.log("totalMoveNum:"+totalMoveNum);

            if (("card" == showclass) && (openShowNum < 2)) {
                totalMoveNum += 1;
                setMoveNum(totalMoveNum);
                var ulk = 0;
                var ultemp = document.getElementById('array_deck').getElementsByTagName('li');
                for (var k = 0; k < ultemp.length; k++) {
                    var clsname = ultemp[k].getAttribute('class');
                    if ('card open show' == clsname) //如果有上一张点开的
                    {
                        var itag1 = ultemp[k].getElementsByTagName('i');
                        console.log(itag1[0].className);
                        flag1 = 1;
                        if (itag1[0].className == i_tag[0].className) //和新点开比较
                        {
                            this.className = 'card match';
                            ultemp[k].className = 'card match';
                            flag1 = 0;
                            flag2 = 1; //配对ok
                            openShowNum = 0;
                            matchNum++;
                            if (8 == matchNum) //游戏结束
                            {
                                console.log('game over');
                                stop();
                                this.parentNode.style.display = 'none'; //console.log(this.parentNode);//整个ul class='deck' id='array_deck'

                                var divlist = document.getElementsByTagName('div');
                                var flag3 = 0;
                                for (p = 0; p < divlist.length; p++) {
                                    if ('success' === divlist[p].id) {
                                        flag3 = 1;
                                        divlist[p].style.display = '';
                                    }
                                }
								var txt1 = document.getElementById('timetext');
                                if (0 === flag3) //无success div
                                {
                                    var vdiv1 = document.createElement('div');
                                    this.parentNode.parentNode.appendChild(vdiv1);
                                    vdiv1.setAttribute('id', 'success');
                                    var vh1 = document.createElement('h1');
                                    vh1.innerHTML = 'Congratulations!You Won!';
                                    vh4 = document.createElement('h4');
                                    vh4.innerHTML = 'With ' + (totalMoveNum-1) + ' moves' + ' and ' +
                                        starNum + ' stars. ' + 'Time: ' + txt1.value;
                                    var td1 = document.createElement("td");
                                    td1.innerHTML = '<input type="button" value="Play again" onclick="RestartButton();" />'; //

                                    vdiv1.appendChild(vh1);
                                    vdiv1.appendChild(vh4);
                                    vdiv1.appendChild(td1);
                                }
								else
								{
									var vh4 = document.getElementsByTagName('h4');
									vh4.innerHTML = 'With ' + (totalMoveNum-1) + ' moves' + ' and ' +
                                        starNum + ' stars. ' + 'Time: ' + txt1.value;
								}
                                
								var sect = document.getElementById('scor');
                                sect.style.display = 'none';

                            }
                            break;
                        } else {
                            flag2 = 0;
                        }
                        ulk = k;
                    }
                }

                if (('card' == this.className) && (0 == flag1)) {
                    this.className = 'card open show';
                    openShowNum++;
                }
                //else if(0 == flag2)
                //	ultemp[ulk].setAttribute('class','card');// = 'card';
                else if (0 == flag2) {
                    if (openShowNum < 2) {
                        openShowNum++;
                        //this.className = 'card open show';//ul_list[i].className
                        this.setAttribute('class', 'card open show');
                        //ultemp[ulk].className = 'card open show';
                        var u1 = this;
                        var u2 = ultemp[ulk];
                        setTimeout(setDispNone, 1000, u1, u2); //最后两个是调用函数的参数1, 2
                    }

                }
            }
        }
    }

    var div_list = document.getElementsByTagName('div');


    for (var i = 0; i < div_list.length; i++) {
        console.log(div_list[i].className);
        if ('restart' === div_list[i].className) //when click restart
        {

            div_list[i].onclick = //RestartButton();//ul,ul_list,arr1,arr2);
                function() {
                    ul.style.display = ''; //"none";
                    totalMoveNum = 0;
                    matchNum = 0;
                    openShowNum = 0;
                    setMoveNum(totalMoveNum);
                    for (var i = 0; i < ul_list.length; i++) {
                        arr1[i] = ul_list[i].getAttribute('id');
                    }
                    arr2 = shuffle1(arr1); //执行完后arr1被清成null

                    for (var k = 0; k < 16; k++) {
                        var li;

                        var idx = arr2[k].split('-');
                        console.log(idx);

                        var j = parseInt(idx[1], 10) - 1;
                        console.log(j);
                        console.log(ul_list[j]); //得到一整个<li>
                        //然后把当前的ul_list[] 逐个插入到ul中即可  先删光<li>?
                        li = ul_list[j]; //整个li赋值

                        li.className = 'card';
                        ul.appendChild(li);

                    }

                    for (var k = 0; k < 16; k++) {
                        if ('card' != ul_list[k].className)
                            ul_list[k].className = 'card';

                    }
                    Reset();
                    start();
                    var ul1 = document.getElementById('3stars');
                    var list2 = ul1.getElementsByTagName('li');
                    list2[0].style.display = '';
                    list2[1].style.display = '';
                    list2[2].style.display = '';

                    var divlist = document.getElementsByTagName('div');

                    for (p = 0; p < divlist.length; p++) {
                        if ('success' === divlist[p].id) {
                            divlist[p].style.display = 'none';
                        }
                    }
                }
        }
    }
    Reset();
    start();
}

function RestartButton() {
    var ul = document.getElementById('array_deck');
    var ul_list = ul.getElementsByTagName('li'); //获得li集合
    var arr1 = new Array(16);
    var arr2;
    ul.style.display = ''; //"none";
    totalMoveNum = 0;
    openShowNum = 0;
    matchNum = 0;
    setMoveNum(totalMoveNum);
    for (var i = 0; i < ul_list.length; i++) {
        arr1[i] = ul_list[i].getAttribute('id');
    }
    arr2 = shuffle1(arr1); //执行完后arr1被清成null

    for (var k = 0; k < 16; k++) {
        var li;
        var idx = arr2[k].split('-');
        console.log(idx);

        var j = parseInt(idx[1], 10) - 1;
        console.log(j);
        console.log(ul_list[j]); //得到一整个<li>
        //然后把当前的ul_list[] 逐个插入到ul中即可  先删光<li>?
        li = ul_list[j]; //整个li赋值

        li.className = 'card';
        ul.appendChild(li);

    }

    for (var k = 0; k < 16; k++) {
        if ('card' != ul_list[k].className)
            ul_list[k].className = 'card';

    }
    var divlist = document.getElementsByTagName('div');

    for (p = 0; p < divlist.length; p++) {
        if ('success' === divlist[p].id) {
            divlist[p].style.display = 'none';
        }
    }
    Reset();
    start();
    var ul1 = document.getElementById('3stars');
    var list2 = ul1.getElementsByTagName('li');
    list2[0].style.display = '';
    list2[1].style.display = '';
    list2[2].style.display = '';

    var sect = document.getElementById('scor');
    sect.style.display = '';

}

function shuffle1(arry) {
    var sortArr = new Array();
    var len = arry.length; //获取数组长度指定随机次数 


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

function testShuffle() {
    var testArr = new Array("中国", "美国", "英国", "法国", "德国", "西班牙", "希腊",
        "意大利", "日本", "韩国", "尼日利亚", "印度");


    var newArr = shuffle1(testArr);
    console.log(newArr);


}

//js 函数参数 不需要类型 var list 这个var是多余的

var hour, minute, second; //时 分 秒
hour = minute = second = 0; //初始化
var millisecond = 0; //毫秒
var int;

function Reset() //重置
{
    window.clearInterval(int);
    millisecond = hour = minute = second = 0;
    document.getElementById('timetext').value = '00hour00min00sec000milisec';
}

function start() //开始
{
    int = setInterval(timer, 50);
}

function timer() //计时
{
    millisecond = millisecond + 50;
    if (millisecond >= 1000) {
        millisecond = 0;
        second = second + 1;
    }
    if (second >= 60) {
        second = 0;
        minute = minute + 1;
    }

    if (minute >= 60) {
        minute = 0;
        hour = hour + 1;
    }
    document.getElementById('timetext').value = hour + '[hour] ' + minute + '[Min] ' + second + '[Sec] ' + millisecond + '[Milisec]';

}

function stop() //暂停
{
    window.clearInterval(int);
}

addLoadEvent(createAList);
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
 *//*
 * Create a list that holds all of your cards
 */
