// 游戏类: 负责渲染，游戏交互（判断游戏结束等）
function Game(snake, map, food, block) {
    // 存储属性
    this.snake = snake;
    this.map = map;
    this.food = food;
    this.block = block;
    // 定时器句柄 （是一个是用来标识对象或者项目的标识符，先标识一下timebar）
    this.timebar = null;
    // 循环的事件
    this.time = 1000;
    
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

    // 启动游戏
    this.start();
    // 绑定事件控制蛇的移动
    this.bindEvent();
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
    // console.log(this.map.arr[this.food.y][this.food.x]);
}
// 渲染障碍物
Game.prototype.renderBlock = function() {
    // 遍历障碍物成员，将其一一绘制
    for (var i = 0, len = this.block.arr.length; i < len; i++) {
        // 将其渲染
        // 缓存障碍物
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
// 清空地图
Game.prototype.clear = function() {
    // 通过地图对象清空，在地图的clear里直接把所有背景全删除
    this.map.clear();
}

// 启动游戏
Game.prototype.start = function() {
    // 缓存this，在定时器里调用setInterval的是window
    var me = this;
    // 启动定时器
    this.timebar = setInterval(function() {
        // console.log(this)
        // 移动蛇
        me.snake.move();
        // 清空之后，重新渲染
        me.clear();
        // 渲染墙和食物
        me.renderBlock();
        // 渲染食物
        me.renderFood();
        // 重新渲染
        me.renderSnake();
    }, this.time)
}

// 绑定事件，控制蛇的移动
Game.prototype.bindEvent = function() {
    // 缓存this
    var me = this;
    // 监听键盘事件
    document.onkeydown = function(e) {
        // console.log(e.keyCode)
        // 改变运行方法
        me.snake.change(e.keyCode);
    }
}

// window.onkeydown = function(e) {
//     console.log(e.keyCode);
// }