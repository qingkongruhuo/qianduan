function Snake(img) {
    // 存储坐标
    this.arr = [
        // { x: 8, y: 4 },
        // { x: 7, y: 4 },
        { x: 6, y: 4 },
        { x: 5, y: 4 },
        { x: 4, y: 4 },
        // { x: 3, y: 4 },
        // { x: 2, y: 4 },
    ];
    // 存储图片
    this.img = img;
    // this.headImage = img.head;
    // this.tailImage = img.tail;
    // this.bodyImg = img.body;
    // 方向  左：37，   上：38，    右：39，    下：40
    // 根据方向确定头部图片 (direction - 37) 就是数组中，图片的序号
    this.direction = 39;
    this.headImage = this.img.head[this.direction - 37];
    this.bodyImage = this.img.body;
    this.tailImage = this.img.tail[this.direction - 37];
    // 是否可以改变方向，节流锁，避免多次改变方向同时按的情况
    this.lock = false;
}

// 移动蛇
Snake.prototype.move = function() {
    // 获取新的头部位置
    // 复制新的头部，不能直接把原来的拿来用，因为是引用数据类型的。
    var head = { x: this.arr[0].x, y: this.arr[0].y };
    // 判断方向
    switch (this.direction) {
        // 向左移动，x - 1
        case 37:
            head.x -= 1;
            break;
        // 向上移动 y - 1
        case 38:
            head.y -= 1;
            break;
        // 向右移动 x + 1
        case 39:
            head.x += 1;
            break;
        // 向下移动 y + 1
        case 40:
            head.y += 1;
            break;
        default:
            break;
    }
    // 删除尾部，更新头部
    this.arr.pop();
    this.arr.unshift(head)
    // 尾部的图片始终受到倒数二个元素影响
    var tail = this.arr[this.arr.length - 1];
    var second = this.arr[this.arr.length - 2];
    // 判断：根据x和y的比较，确定尾部图片
    if (tail.x === second.x) {
        // 比较垂直方向的
        if (tail.y > second.y) {
            // 向上移动
            this.tailImage = this.img.tail[1]
        } else {
            // 向下移动
            this.tailImage = this.img.tail[3]
        }
    } else {
        // 比较水平方向的x
        if (tail.x > second.x) {
            // 向左移动
            this.tailImage = this.img.tail[0]
        } else {
            // 向右移动
            this.tailImage = this.img.tail[2]
        }
    }
    //蛇移动之后解开节流锁。
    this.lock = false;
}

// 改变方法
Snake.prototype.change = function(code) {
    // 如果锁住了，不能改变
    if (this.lock) {
        return;
    }
    // 锁住，蛇移动之后可以解锁
    this.lock = true;
    // 改变方向
    // 左右移动只能往上下改变方向，上下移动只能往左右改变方向 
    // 获取方向键值之差
    // Math.abs表示取绝对值
    var num = Math.abs(code - this.direction);
    // 同向或者相反方向是不允许的。
    if (num === 0 || num === 2) {
        return;
    }
    // 可以改变方向
    this.direction = code;
    // 更换头部图片方向
    this.headImage = this.img.head[this.direction - 37];
}