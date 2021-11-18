//img是一个对象，有三个属性，head，body，tail头身尾
function Snake(img) {
    // 存储坐标，第一个坐标表示头，最后一个表示尾
    this.arr = [
        { x: 6, y: 4 },
        { x: 5, y: 4 },
        { x: 4, y: 4 }
    ];
    // 存储图片
    this.img = img;
    // this.headImage = img.head;
    // this.tailImage = img.tail;
    // this.bodyImg = img.body;
    // 方向  左：37，   上：38，    右：39，    下：40，键盘的键码
    // 根据方向确定头部图片 (direction - 37) 就是数组中图片的序号
    this.direction = 39;
    this.headImage = this.img.head[this.direction - 37];
    this.bodyImage = this.img.body;
    this.tailImage = this.img.tail[this.direction - 37];
}