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
}

function init() {
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			var gridCell = $('#grid-cell-'+i+'-'+j);
			// 对gridCell的位置进行计算,使用两个新的函数
			gridCell.css('top',getPosTop(i,j));
			gridCell.css('left',getPosLeft(i,j));
		}
	}
}