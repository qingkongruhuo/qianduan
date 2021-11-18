// 解决兼容性问题：让所有浏览器显示的一致
// 让所有浏览器都输出3，忽略这些换行符
function getNodes(dom) {
    // 返回包含所有节点的数组
    var arr = [];
    // 定义正则
    var reg = /^\s*$/
    // 遍历所有的节点，过滤掉换行符文本节点
    for (var i = 0; i < dom.childNodes.length; i++) {
        // 如果是文本阶段，要过滤掉换行符
        if (dom.childNodes[i].nodeType === 3) {
            // 判断文本的内容， data或者nodeValue
            // console.log(reg.test(dom.childNodes[i].data), dom.childNodes[i].data);
            if (!reg.test(dom.childNodes[i].data)) {
                // 不是换行符，存储节点
                arr.push(dom.childNodes[i])
            }
        } else {
            // 其它类型节点，直接存储节点
            arr.push(dom.childNodes[i])
        }
    }
    // 返回结果
    return arr;
}


/**
 * 在元素后面插入元素 
 * @parent      父元素
 * @child       插入的子元素
 * @next        参考元素
 **/
function insertAfter(parent, child, next) {
    // 插入
    return parent.insertBefore(child, next.nextSibling)
}
/**
 * 在子元素前面插入元素
 * @parent      父元素
 * @child       插入的元素
 **/ 
function prependChild(parent, child) {
    // 在所有元素的前面插入： 在第一个元素的前面插入
    return parent.insertBefore(child, parent.firstChild);
}


// dom2的后面插入dom1
function after(dom1, dom2) {
    // 找到dom2的父元素
    // 找到dom2的下一个兄弟元素
    dom2.parentNode.insertBefore(dom1, dom2.nextSibling)
}

// dom2前面插入dom1
function before(dom1, dom2) {
    // insertBefore, appendChild
    // 1 找到dom2的父元素，
    // 使用insertBefore插入
    dom2.parentNode.insertBefore(dom1, dom2)
}


/***
 * 封装一个getStyle方法，可以在不同浏览器下获取样式
 * @obj         元素对象
 * @key         属性名称
 * return       获取的样式
 **/
function getStyle(obj, key) {
    // 能力检测：判断浏览器的能力，能做什么就做什么
    // 浏览器是否支持getComponent方法，支持就使用
    if (window.getComputedStyle) {
        // 通过该方法获取
        // 已经确定了该方法存在，就可以直接使用了
        // 方法一
        return getComputedStyle(obj)[key];
        // 方法二
        // 将key转成横杠法      borderLeftColor => border-left-color
        // key = key.replace(/([A-Z])/g, function(match, $1) {
        //     // 返回的是
        //     return '-' + $1.toLowerCase();
        // })
        // return getComputedStyle(obj).getPropertyValue(key);
    } else {
        var style = obj.currentStyle;
        // 如果有样式，可以获取
        if (style) {
            // 将横杠法转成驼峰式命名法    border-left-color => borderLeftColor
            key = key.replace(/-([a-z])?/g, function(match, $1) {
                return $1.toUpperCase();
            })
            // 返回样式
            return style[key]
        } else {
            // 没有样式，要提示
            alert('你的浏览器不支持获取计算样式功能。')
        }
    }
}

/***
 * 实现bindEvent
 * @dom     元素
 * @type    事件类型
 * @fn      事件回调函数
 **/
function bindEvent(dom, type, fn) {
    // 判断火狐浏览器： 通过ua判断
    if (type === 'mousewheel' && /firefox/i.test(navigator.userAgent)) {
        // 针对火狐浏览器，修改事件名称
        type = 'DOMMouseScroll';
    }
    // 能力检测：判断方法是否存在，存在的话使用，不存在不使用
    if (dom.addEventListener) {
        // dom2级绑定方式, 都在冒泡阶段触发
        dom.addEventListener(type, fn);
    } else if (dom.attachEvent) {
        // 针对ie绑定事件
        dom.attachEvent('on' + type, function(e) {
            // 兼容性
            e.target = e.srcElement;
            e.currentTarget = this;
            // this指向元素
            fn.call(dom, e)
        });
    } else {
        // 缓存
        var oldFn = dom['on' + type];
        // dom0级绑定方式
        dom['on' + type] = function(e) {
            // 如果已经绑定过，先执行之前的
            oldFn && oldFn(e || window.event);
            // 再执行新的
            fn(e || window.event);
        }
    }
}
// 移除事件
function removeEvent(dom, type, fn) {
    // console.log(dom, type, fn);
    // 判断火狐浏览器： 通过ua判断
    if (type === 'mousewheel' && /firefox/i.test(navigator.userAgent)) {
        // 针对火狐浏览器，修改事件名称
        type = 'DOMMouseScroll';
    }
    // 能力检测
    if (dom.removeEventListener) {
        // DOM2
        dom.removeEventListener(type, fn)
    // IE
    } else if (dom.detachEvent) {
        dom.detachEvent('on' + type, fn)
    } else {
        // DOM0
        dom['on' + type] = null;
    }
}

// 基于操作，封装防抖(节流)函数
function throttle_event(fn) {
    // 清除定时器，
    clearTimeout(fn.__timebar);
    // 执行定时器
    // 函数也属于对象，因此可以添加属性
    fn.__timebar = setTimeout(fn, 200);
}

// 基于时间，节流器方法
function throttle(fn, time) {
    // 在函数自身添加锁
    if (fn.__lock) {
        // 被锁住了就不能执行
        return;
    }
    // 添加锁
    fn.__lock = true;
    // 执行函数
    fn();
    // 1秒之后解锁
    setTimeout(function() {
        fn.__lock = false;
    }, time || 1000)
}

// 获取属性单位
function p(key) {
    return key === 'opacity' ? '' : 'px';
}
function animate(dom, obj, time, callback) {
    // 思路：在规定时间内，移动到某一个位置，假设30毫秒移动一次
    // 每次移动的距离：步长 = 移动的总距离 / 移动的总次数
    // 移动的总次数 = 总时长 / 移动的间隔
    // 已经移动的次数
    var count = 0;
    // 计算总次数, 不取整不影响结果
    var total = parseInt((time || 1000) / 30);
    // 总距离的获取必要条件是：最终的样式与当前的样式
    // 当前样式通过元素获取
    // 最终样式：通过obj参数获取
    // 获取当前样式
    var style = {}
    // 遍历需要获取的样式
    for (var key in obj) {
        // 存储当前样式
        // 计算方便，存储数字，而不是字符串
        style[key] = parseInt(getStyle(dom, key))
    }
    // 获取每一个样式的步长
    var step = {};
    // 遍历需要获取步长的样式
    for (var key in obj) {
        // 存储步长
        step[key] = (parseInt(obj[key]) - style[key]) / total;
    }
    // console.log(step);
    // 制动动画就是执行setInterval,当达到总次数的时候，终止动画的执行
    // 定义动画句柄
    var timebar;
    // 启动定时器
    timebar = setInterval(function() {
        // 更新次数
        count++;
        // 修改样式
        for (var key in step) {
            // 修改元素的样式
            dom.style[key] = style[key] + step[key] * count + p(key);
        }
        // 判断终止条件
        if (count >= total) {
            // 修正样式
            for (var key in obj) {
                // 判断属性值是否是字符串，是字符串直接赋值，不是则加上单位
                dom.style[key] = typeof obj[key] === 'string' ? obj[key] : obj[key] + p(key);
            }
            // 清空定时器
            clearInterval(timebar)
            // 传递了callback要执行callback
            // if (callback) {
            //     callback();
            // }
            callback && callback();
        }
    }, 30)
}


// 封装一个设置样式的方法
// 两种用法  css(dom, width, '200px')  css(dom, { color: 'red', width: '200px' })
function css(dom, key, value) {
    // 判断key是对象还是字符串
    if (typeof key === 'string') {
        // 设置样式
        dom.style[key] = value;
    } else {
        // 遍历每组样式
        for (var name in key) {
            // name表示属性名称, key[name]表示样式值，递归
            css(dom, name, key[name])
        }
    }
}


// 获取定位元素在页面中的位置，注意递归到body的，body默认和左上角是有距离的！
function offset(dom) {
    // console.log(dom.offsetParent, dom.parentNode)
    // 获取当前元素的定位值
    var result = {
        left: dom.offsetLeft,
        top: dom.offsetTop
    };
    // console.log(result);
    // 依次遍历每一个元素的定位元素，直到body
    while (dom !== document.body) {
        // 获取当前元素的定位元素
        dom = dom.offsetParent;
        // console.log(dom.offsetLeft, dom.offsetTop, 111, result.left, 222, dom);
        // 累加结果
        // 在高级浏览器下，offsetLeft不包括边框
        result.left += dom.offsetLeft + dom.clientLeft;
        result.top += dom.offsetTop + dom.clientTop;
        // 还可以在这里做兼容性适配  navigator.userAgent
    }
    // 返回结果
    return result;
}



// 将视图绘制出来
function imageZoom(dom, url, width, height) {
    // 创建图片有两种方式：new Image()  document.createElement('img');
    var mask = document.createElement('div');
    // 放下元素
    var big = document.createElement('div');
    // 将元素放到app中
    app.appendChild(mask)
    app.appendChild(big)
    // 设置样式
    css(app, {
        width: width + 'px',
        height: height + 'px',
        position: 'relative',
        backgroundImage: 'url(' + url + ')',
        backgroundSize: 'cover',
        border: '1px solid #ccc',
        // top: '20px',
        // left: '29px'
    })
    // 遮罩层
    css(mask, {
        width: width / 2 + 'px',
        height: height / 2 + 'px',
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'yellow',
        opacity: 0.5,
        cursor: 'move',
        // display: 'none'
    })
    // 设置右侧放大器
    css(big, {
        width: width + 'px',
        height: height + 'px',
        position: 'absolute',
        top: 0,
        left: '100%',
        backgroundImage: 'url(' + url + ')',
        border: '1px solid #ccc'
    })
    // mask显隐交互
    // mouseover,mouseout       mouseenter, mouseleave
    // 冒泡多次执行
    // bindEvent(dom, 'mouseover', function(e) {
    //     console.log(e.target);
    // })
    // 获取元素在页面中的位置
    // console.log(dom.offsetLeft, dom.offsetTop);
    var pos = offset(dom);
    function demo(e) {

        // 鼠标的位置就是mask的位置（中心点）
        // 获取鼠标位置
        var x = e.pageX - pos.left;
        var y = e.pageY - pos.top;
        // console.log(x, y);
        // 将中心点换算到顶点位置
        x -= width / 4;
        y -= height / 4;
        // 边界处理
        if (x < 0) {
            x = 0;
        // 超出右边
        // } else if (x + width / 2 > width) {
        } else if (x > width / 2) {
            // x = width - width / 2;
            x = width / 2;
        }
        if (y < 0) {
            y = 0;
        // 超出底边
        // } else if (y + height / 2 > height) {}
        } else if (y > height / 2) {
            y = height / 2;
        }
        // 设置样式
        css(mask, {
            left: x + 'px',
            top: y + 'px'
        })
        // 大盒子位置
        css(big, {
            backgroundPositionX: x * -2 + 'px',
            backgroundPositionY: y * -2 + 'px',
        })
    }
    // 执行一次
    bindEvent(dom, 'mouseenter', function(e) {
        // console.log(e.target);
        // 显示mask
        css(mask, 'display', 'block')
        css(big, 'display', 'block')
        // 直接绑定鼠标移动事件
        bindEvent(document, 'mousemove', demo)
    })
    bindEvent(dom, 'mouseleave', function(e) {
        // console.log(e.target);
        // 隐藏mask
        css(mask, 'display', 'none')
        css(big, 'display', 'none')
        // 删除事件
        removeEvent(document, 'mousemove', demo)
    })
    // 函数体中局部的变量
    // var x, y, top, left, maskWidth, maskHeight, domWidth, domHeight;
    // 交互
    // bindEvent(dom, 'mousedown', function(e) {
    //     // 获取鼠标位置
    //     x = e.clientX;
    //     y = e.clientY;
    //     // 获取盒子的偏移量
    // })
}


function dealImage(dom, url) {
    // 创建图片
    var img = new Image();
    // 监听图片加载完成
    img.onload = function() {
        // 图片加载完成就直到它的宽高了
        // console.log(img.width, img.height);
        var width = img.width;
        var height = img.height;
        // 写布局
        var layer = document.createElement('div');
        // 小图片
        var mask = document.createElement('div');
        // 小圆点
        var dot = document.createElement('div');
        // 组装
        dom.appendChild(layer);
        dom.appendChild(mask);
        // 小圆点在mask里面
        mask.appendChild(dot);
        // 设置样式
        css(dom, {
            width: width + 'px',
            height: height + 'px',
            backgroundImage: 'url(' + url + ')',
            position: 'relative',
            top: 0,
            left: 0,
            border: '2px solid pink'
        })
        css(layer, {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#000',
            opacity: 0.5
        })
        // 小图片，默认宽高是150*150
        css(mask, {
            width: '150px',
            height: '150px',
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundImage: 'url(' + url + ')',
            cursor: 'move'
        })
        // 小圆点
        css(dot, {
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: 'red',
            position: 'absolute',
            right: '-5px',
            bottom: '-5px',
            cursor: 'default'
        })
        // 局部变量
        var ox, oy, top, left, domWidth, domHeight, maskLeft, maskTop;
        // 移动小圆点
        function moveDot(e) {
            // 获取鼠标位置
            var dx = e.clientX;
            var dy = e.clientY;
            // 获取新的坐标
            x = dx - ox + left;
            y = dy - oy + top;
            // 处理边界
            if (x < 0) {
                x = 0;
            // 右侧边界
            // 5表示小圆点宽度的一半
            } else if (maskLeft + x > width) {
                x = width - maskLeft;
            }
            if (y < 0) {
                y = 0;
            // 底边边界
            } else if (maskTop+ y > height) {
                y = height - maskTop;
            }
            // console.log(ox, dx, x, maskLeft);
            // 修改样式
            css(mask, {
                width: x + 'px',
                height: y + 'px'
            })
        }
        // 交互
        bindEvent(dot, 'mousedown', function(e) {
            // 阻止冒泡
            e.stopPropagation();
            // 获取它的位置
            ox = e.clientX;
            oy = e.clientY;
            // 小圆点的偏移量就是小图片的宽高
            left = parseInt(getStyle(mask, 'width'));
            top = parseInt(getStyle(mask, 'height'));
            // 获取盒子原来的偏移量
            maskLeft = mask.offsetLeft;
            maskTop = mask.offsetTop;
            // 在页面中拖拽
            bindEvent(document, 'mousemove', moveDot)
        })
        // 鼠标弹起，取消移动
        bindEvent(document, 'mouseup', function(e) {
            // 取消拖拽
            removeEvent(document, 'mousemove', moveDot)
        })
        // 获取鼠标点击的位置
        var mx, my, mw, mh, ml, mt;
        // 移动小图片
        function moveMask(e) {
            // 获取位置
            var ox = e.clientX;
            var oy = e.clientY;
            // 获取移动的距离
            x = ox - mx + ml;
            y = oy - my + mt;
            // 判断边界
            if (x < 0) {
                x = 0;
            // 右侧边界
            } else if (x + mw > width) {
                x = width - mw;
            }
            if (y < 0) {
                y = 0;
            // 底边边界
            } else if (y + mh > height) {
                y = height - mh;
            }
            // 修改背景图片的位置
            css(mask, {
                backgroundPositionX: -x + 'px',
                backgroundPositionY: -y + 'px',
                left: x + 'px',
                top: y + 'px'
            })
        }
        // mask绑定事件，
        bindEvent(mask, 'mousedown', function(e) {
            // 获取当前小圆点位置
            mx = e.clientX;
            my = e.clientY;
            // 获取盒子宽高
            mw = parseInt(getStyle(mask, 'width'));
            mh = parseInt(getStyle(mask, 'height'));
            // 获取原来的偏移量
            // mt = parseInt(getStyle(mask, 'top'));
            // ml = parseInt(getStyle(mask, 'left'));
            mt = mask.offsetTop;
            ml = mask.offsetLeft;
            // console.log(mt, ml);
            // 监听移动的位置
            bindEvent(document, 'mousemove', moveMask)
        })
        // 鼠标弹起来终止移动
        bindEvent(document, 'mouseup', function() {
            // 取消移动
            removeEvent(document, 'mousemove', moveMask)
        })
    }
    // 为图片设置地址
    img.src = url;
}