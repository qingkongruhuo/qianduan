var num = 10;
var Color;
(function (Color) {
    Color[Color["red"] = 0] = "red";
    Color[Color["green"] = 1] = "green";
    Color[Color["blue"] = 2] = "blue";
})(Color || (Color = {}));
//通过索引值访问
console.log(Color[0]); //red
//通过.语法访问
console.log(Color.red); //red
//改变索引值
var Color1;
(function (Color1) {
    Color1[Color1["red"] = 0] = "red";
    Color1[Color1["blue"] = 5] = "blue";
    Color1[Color1["green"] = 6] = "green";
})(Color1 || (Color1 = {}));
console.log(Color1[0]); //red
console.log(Color1[5]); //blue 
