//游戏数据定义
// 格子数据
var board = new Array();
// 分数
var score = 0;

$(document).ready(function () {
	newgame();
});

function newgame() {
	// 初始化棋盘格
	init();
	// 随机两个格子生成数字
	generateOneNumber();
	generateOneNumber();
}
// 初始化棋盘格
function init() {
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			var gridCell = $('#grid-cell-'+i+'-'+j);
			// 对gridCell的位置进行计算,使用两个新的函数
			gridCell.css('top',getPosTop(i,j));
			gridCell.css('left',getPosLeft(i,j));
		}
	}

	// 将board声明为二维数组
	for (var i = 0; i < 4; i++) {
		board[i]=new Array();
		// 初始化每一项
		for (var j = 0; j < 4; j++) {
			board[i][j] = 0;
		}
	}

	//调用updateBoardView()函数，通知前端更新数据
	updateBoardView();
}
// 根据board的值对前端的number-cell元素进行操作
// 用户每一次操作board值都会发生变化，都要调用这个函数
function updateBoardView() {
	// 删除
	$('.number-cell').remove();
	for(var i = 0;i<4;i++){
		for(var j = 0; j < 4; j++){
			$('#grid-container').append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
			var theNumberCell = $('#number-cell-'+i+'-'+j);

			if (board[i][j]==0) {
				theNumberCell.css({
					'height':'0px',
					'width':'0px',
					'top':getPosTop(i,j)+50,
					'left':getPosLeft(i,j)+50
				});
			}else{
				theNumberCell.css({
					'height':'100px',
					'width':'100px',
					'top':getPosTop(i,j),
					'left':getPosLeft(i,j),
					'background-color':getNumberBackgroundColor(board[i][j]),
					'color':getNumberColor(board[i][j])
				});
				theNumberCell.text(board[i][j]);
			}
		}
	}
}
// 生成随机数字
function generateOneNumber() {
	// 先判断是能否生成数字
	if (nospace(board)) {
		return false;
	}
	// 随机生成一个格子
	var randx = parseInt(Math.floor(Math.random()*4));
	var randy = parseInt(Math.floor(Math.random()*4));
	// 判断生成的位置是否可用
	while(true){
		if (board[randx][randy]==0) {
			break;
		}
		randx = parseInt(Math.floor(Math.random()*4));
		randy = parseInt(Math.floor(Math.random()*4));
	}
	// 随机生成一个数字
	var randNumber =  Math.random()<0.5?2:4;
	// 在格子上显示数字
	board[randx][randy] = randNumber;
	showNumberWithAnimation(randx,randy,randNumber);
	return true;
}
//游戏向左右上下移动
$(document).keydown(function (event) {
	var keyCode = event.keyCode;
	switch(event,keyCode){
		case 37://left
			if (moveLeft()) {//判断是否可以向左移动
				generateOneNumber();//生成新的随机数
				isgameover();//判断游戏是否结束
			}
			break;
		case 38://up
			if (moveUp()) {
				generateOneNumber();
				isgameover();
			}
			break;
		case 39://right
			if (moveRight()) {
				generateOneNumber();
				isgameover();
			}
			break;
		case 40://down
			if (moveDown()) {
				generateOneNumber();
				isgameover();
			}
			break;
		default://default
			break;
	}
});

function isgameover() {
	
}
// 向左移动
function moveLeft() {
	if (!canMoveLeft(board)) {
		return false;
	}

	// moveLeft
	for (var i = 0; i<4; i++) {
		for(var j = 1; j < 4; j ++){
			if (board[i][j]!=0) {
				for(var k=0;k<j;k++){
					if (board[i][k]==0&&noBlockHorizontal(i,k,j,board)) {
						//move
						showMoveAnimation(i,j,i,k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					}else if(board[i][k]==board[i][j]&&noBlockHorizontal(i,k,j,board)){
						//move
						showMoveAnimation(i,j,i,k);
						//add
						board[i][k]+=board[i][j];
						board[i][j]=0;
						continue;
					}
				}
			}
		}
	}
	updateBoardView();
	return true;
}