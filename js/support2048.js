// 获取屏幕的宽度
documentWidth = window.screen.availWidth;
// 定义游戏的大方块的宽度
gridContainerWidth = 0.92*documentWidth;
// 定义小方块的边长
cellSideLength = 0.18*documentWidth;
// 小方块之间的间距
cellSpace = 0.04*documentWidth;
// 获得top
function getPosTop(i,j) {
	return cellSpace+i*(cellSpace+cellSideLength);
}
// 获得left
function getPosLeft(i,j) {
	return cellSpace+j*(cellSpace+cellSideLength);
}
// 设置number-cell的背景色
function getNumberBackgroundColor(number) {
	switch(number){
		case 2:return "#eee4da";break;
		case 4:return "#ede0c8";break;
		case 8:return "#f2b179";break;
		case 16:return "#f59563";break;
		case 32:return "#f67c5f";break;
		case 64:return "#f65e3b";break;
		case 128:return "#edcf72";break;
		case 256:return "#edcc61";break;
		case 512:return "#9c0";break;
		case 1024:return "#33b5e5";break;
		case 2048:return "#09c";break;
		case 4096:return "#a6c";break;
		case 8192:return "#93c";break;
	}
	return "black";
}
// 设置number-cell字体颜色
function getNumberColor(number) {
	if (number<4) {
		return "#776e65";
	}
	return "white";
}

function nospace(board) {
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (board[i][j]==0) {
				return false;
			}
		}
	}
	return true;

}
// 判断是否可以向左移动
function canMoveLeft(board) {
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
			if (board[i][j]!=0) {
				if (board[i][j-1]==0||board[i][j-1]==board[i][j]) {
					return true;
				}
			}
		}
	}
	return false;
}
// 判断是否可以向上移动
function canMoveUp(board) {
	for(var i = 1;i < 4;i++){
		for(var j = 0;j<4;j++){
			if (board[i][j]!=0) {
				if (board[i-1][j]==0||board[i-1][j]==board[i][j]) {
					return true;
				}
			}
		}
	}
	return false;
}
// 判断是否可以向右移动
function canMoveRight() {
	for(var i=0;i<4;i++){
		for(var j=0;j<3;j++){
			if (board[i][j]!=0) {
				if (board[i][j+1]==0||board[i][j+1]==board[i][j]) {
					return true;
				}
			}
		}
	}
	return false;
}
function canMoveDown() {
	for (var i = 0; i < 3; i++) {
		for(var j = 0; j < 4; j++){
			if (board[i][j]!=0) {
				if (board[i+1][j]==0||board[i+1][j]==board[i][j]) {
					return true;
				}
			}
		}
	}
	return false;
}
// 判断水平向左路径上是否有障碍物
function noBlockHorizontal(row,col1,col2,board) {
	for(var i = col1+1;i<col2;i++){
		if (board[row][i]!=0) {
			return false;
		}
	}
	return true;
}
// 判断水平向右路径上是否有障碍物
// function noBlockHorizontalRight(row,col1,col2,board) {
// 	for(var i = col1-1;i>col2;i--){
// 		if (board[row][i]!=0) {
// 			return false;
// 		}
// 	}
// 	return true;
// }
// 判断垂直向上路径上是否有障碍物
function noBlockVertical(row2,row1,col,board) {
	for(var i = row1+1;i<row2;i++){
		if (board[i][col]!=0) {
			return false;
		}
	}
	return true;
}

// function noBlockVerticalDown(row2,row1,col,board) {
// 	for(var i = row1-1;i>row2;i--){
// 		if (board[i][col]!=0) {
// 			return false;
// 		}
// 	}
// 	return true;
// }

// 不能进行任何的移动操作
function nomove(board) {
	if (canMoveLeft(board)||canMoveRight(board)||canMoveUp(board)||canMoveDown(board)) {
		return true;
	}
	return false;
}