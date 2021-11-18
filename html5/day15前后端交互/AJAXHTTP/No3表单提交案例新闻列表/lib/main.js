function getCommenList(){
    $.ajax({
        method:'GET',
        url:'http://www.liulongbin.top:3006/api/cmtlist',
        success: function (res) {
            if(res.status!==200){
                return alert("数据获取失败");
            }
            var rows = [];
            $.each(res.data,function(index,item){
                var str ='<li class="list-group-item"><span class="badge" style="background-color:yellowgreen">评论时间:'+item.time+'</span><span class="badge" style="background-color:blue">评论人:'+item.username+'</span>'+item.content+'</li>' 
                rows.push(str);
            })
            $("#cmt-list").empty().append(rows.join(''));
        }
    });
}
getCommenList(); 

$(function(){
    $('#formAddCmt').submit(function(e){
        e.preventDefault();
        var data = $(this).serialize();
        $.post('http://www.liulongbin.top:3006/api/addcmt',data,function(res){
            if(res.status!==201){
                return alert('发表评论失败');
            }
            getCommenList(); 
        })
    } )

















})