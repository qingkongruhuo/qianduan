function Game(snake, map, food, block) {
    // 存储属性
    this.snake = snake;
    this.map = map;
    this.food = food;
    this.block = block;
    // 初始化
    this.init();
}
// 初始化方法
Game.prototype.init = function() {
    // 将地图初始化
    // this.map.init();
    this.renderMap();
    // 渲染食物
    this.renderFood();
    // 绘制障碍物
    this.renderBlock();
    // 绘制蛇
    this.renderSnake();
}
// 渲染地图
Game.prototype.renderMap = function() {
    this.map.init();
}
// 渲染食物
Game.prototype.renderFood = function() {
    // 根据食物的横纵坐标，在地图中找到对应的元素，设置其背景图片
    this.map.arr[this.food.y][this.food.x].style.backgroundImage = 'url(' + this.food.img + ')';
    // console.log(this.map, this.food);
    console.log(this.map.arr[this.food.y][this.food.x]);
}
// 渲染障碍物
Game.prototype.renderBlock = function() {
    // 遍历障碍物成员，将其一一绘制
    for (var i = 0, len = this.block.arr.length; i < len; i++) {
        // 将其渲染
        // 缓存障碍物坐标
        var item = this.block.arr[i]
        // y对应的是行，x对应的是列
        this.map.arr[item.y][item.x].style.backgroundImage = 'url(' + this.block.img + ')'
    }
}
// 渲染蛇
Game.prototype.renderSnake = function() {
    // 特殊绘制头和尾
    var head = this.snake.arr[0];
    var tail = this.snake.arr[this.snake.arr.length - 1];
    // 绘制头
    this.map.arr[head.y][head.x].style.backgroundImage = 'url(' + this.snake.headImage + ')';
    // 绘制身体： 从第二张，绘制到倒数第二张
    for (var i = 1, len = this.snake.arr.length - 1; i < len; i++) {
        // 缓存身体元素
        var body = this.snake.arr[i];
        // 绘制身体
        this.map.arr[body.y][body.x].style.backgroundImage = 'url(' + this.snake.bodyImage + ')'
    }
    // 绘制尾部
    this.map.arr[tail.y][tail.x].style.backgroundImage = 'url(' + this.snake.tailImage + ')';
}

// window.onkeydown = function(e) {
//     console.log(e.keyCode);
// }