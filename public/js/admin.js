/**
 * Created by Administrator on 2016/11/8.
 */
$(function(){
    $('.del').click(function(e){
        var target =$(e.target);
        var id = target.data('id');
        var tr = $('.item-id-'+id);

        $.ajax({
            type:'DELETE',
            url:'/admin/movie/list?id='+id
        })
            .done(function (results) {
                if(results.success===1){
                    if(tr.length>0){
                        tr.remove()
                    }
                }
            })
    });
    $('.userdel').click(function(e){
        var target =$(e.target);
        var id = target.data('id');
        var tr = $('.item-id-'+id);

        $.ajax({
            type:'DELETE',
            url:'/admin/uesr/list?id='+id
        })
            .done(function (results) {
                console.log(results.success);
                if(results.success===1){
                    if(tr.length>0){
                        tr.remove()
                    }
                }
            })
    })
});