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