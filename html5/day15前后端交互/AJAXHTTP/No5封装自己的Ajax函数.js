// <!-- 1. 导入自定义的ajax函数库 -->
// <script src="./itheima.js"></script>

// <script>
//     // 2. 调用自定义的 itheima 函数，发起 Ajax 数据请求
//     itheima({
//         method: '请求类型',
//         url: '请求地址',
//         data: { /* 请求参数对象 */ },
//         success: function(res) { // 成功的回调函数
//             console.log(res)     // 打印数据
//         }
//     })
// </script>


/**
 * 处理data参数
 * @param{data} 需要发送到服务器的数据
 * @return{string} 返回拼接好的查询字符串 name=zs&age=10
 */
function resolveData(data){
    var arr = [];
    for(let k in data){
        let str = k+'='+data[k];
        arr.push(str);
    }
    return arr.join('&');
}
/**
 * myAjax
 */
function myAjax(options){
    var xhr = new XMLHttpRequest();
    //拼接查询字符串
    var qs = resolveData(options.data);

    //判断请求类型
    if(options.method.toUpperCase()==='GET'){
        //发起get请求
        xhr.open('GET',options.url+'?'+qs);
        xhr.send()
    }else if(options.method.toUpperCase()==='POST'){
        //发送post请求
        xhr.open('POST',options.url);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(qs);
    }
    //监听请求状态改变的事件
    xhr.onreadystatechange = function(){
        if(xhr.readyState===4&&xhr.status===200){
            var result = JSON.parse(xhr.responseText);
            options.success(result);
        }
    }
}