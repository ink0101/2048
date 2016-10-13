//游戏数据定义
// 格子数据
var board = new Array();
// 分数
var score = 0;
// 去掉叠加bug
var	hasConflicted = new Array();

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
		// 将hasConflicted声明为二维数组
		hasConflicted[i] = new Array();

		// 初始化每一项
		for (var j = 0; j < 4; j++) {
			board[i][j] = 0;
			hasConflicted[i][j]=false;
		}
	}

	//调用updateBoardView()函数，通知前端更新数据
	updateBoardView();

	score = 0;

	updateScore(score);
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

			hasConflicted[i][j] =false;
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
	// event.keyCode
	switch(event.keyCode){
		case 37://left
			if (moveLeft()) {//判断是否可以向左移动
				setTimeout("generateOneNumber()",210);//生成新的随机数
				setTimeout("isgameover()",300);//判断游戏是否结束
			}
			break;
		case 38://up
			if (moveUp()) {
				setTimeout("generateOneNumber()",210);//生成新的随机数
				setTimeout("isgameover()",300);//判断游戏是否结束
			}
			break;
		case 39://right
			if (moveRight()) {
				setTimeout("generateOneNumber()",210);//生成新的随机数
				setTimeout("isgameover()",300);//判断游戏是否结束
			}
			break;
		case 40://down
			if (moveDown()) {
				setTimeout("generateOneNumber()",210);//生成新的随机数
				setTimeout("isgameover()",300);//判断游戏是否结束
			}
			break;
		default://default
			break;
	}
});


// 向左移动
function moveLeft() {
	if (!canMoveLeft(board)) {
		return false;
	}

	// moveLeft
	for (var i = 0; i<4; i++) {
		for(var j = 1; j < 4; j ++){
			if (board[i][j]!=0) {
				// k 代表目的位置
				for(var k=0;k<j;k++){
					if (board[i][k]==0&&noBlockHorizontal(i,k,j,board)) {
						//move
						showMoveAnimation(i,j,i,k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
						//添加hasConflicted判断在i，k位置是否发生过碰撞
					}else if(board[i][k]==board[i][j]&&noBlockHorizontal(i,k,j,board)&&!hasConflicted[i][k]){
						//move
						showMoveAnimation(i,j,i,k);
						//add
						board[i][k]+=board[i][j];
						board[i][j]=0;
						score+=board[i][k];
						updateScore(score);

						hasConflicted[i][k]=true;

						continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()",200);
	return true;
}
// 向上移动
function moveUp() {
	if (!canMoveUp(board)) {
		return false;
	}
	// moveUp
	for(var i = 1;i<4;i++){
		for(var j =0;j<4;j++){
			if (board[i][j]!=0) {
				for(var k = 0;k<i;k++){
					if (board[k][j]==0&&noBlockVertical(i,k,j,board)) {
						// move
						showMoveAnimation(i,j,k,j);
						board[k][j]=board[i][j];
						board[i][j]=0;
						continue;
					}else if(board[k][j]==board[i][j]&&noBlockVertical(i,k,j,board)&&!hasConflicted[k][j]){
						// move
						showMoveAnimation(i,j,k,j);
						board[k][j]+=board[i][j];
						board[i][j]=0;
						// add
						score+=board[k][j];
						updateScore(score);

						hasConflicted[k][j]=true;

						continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()",200);
	return true;
}
// 向右移动
function moveRight() {
	if (!canMoveRight()) {
		return false;
	}
	// moveRight
	for(var i = 0; i < 4;i++){
		for(var j = 2; j >=0;j--){
			if (board[i][j]!=0) {
				for(var k = 3;k>j;k--){
					if (board[i][k]==0&&noBlockHorizontal(i,j,k,board)) {
						// move
						showMoveAnimation(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;
						continue;
					}else if (board[i][k]==board[i][j]&&noBlockHorizontal(i,j,k,board)&&!hasConflicted[i][k]) {
						// move
						showMoveAnimation(i,j,i,k);
						// add
						board[i][k]+=board[i][j];
						board[i][j]=0;
						score+=board[i][k];
						updateScore(score);

						hasConflicted[i][k]=true;

						continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()",200);
	return true;
}
function moveDown() {
	if (!canMoveDown()) {
		return false;
	}
	// moveDown
		// i要递减循环，否则会出现bug：离右边比较远的格子无法移动到预期位置
	for (var i = 2; i >=0; i--) {
		for(var j = 0; j<4; j++){
			if (board[i][j]!=0) {
				for(var k = 3;k>i;k--){
					if (board[k][j]==0&&noBlockVertical(k,i,j,board)) {
						// move
						showMoveAnimation(i,j,k,j);
						board[k][j]=board[i][j];
						board[i][j]=0;
						continue;
					}else if (board[k][j]==board[i][j]&&noBlockVertical(k,i,j,board)&&!hasConflicted[k][j]) {
						//move
						showMoveAnimation(i,j,k,j);
						//add
						board[k][j]+=board[i][j];
						board[i][j]=0;
						
						score+=board[k][j];
						updateScore(score);

						hasConflicted[k][j]=true;

						continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()",200);
	return true;
}
// 判断游戏是否结束
function isgameover() {
	if (nospace(board)&&nomove(board)) {
		gameover();
	}
}
// 游戏结束弹出gameover
function gameover() {
	alert("gameover!");
}