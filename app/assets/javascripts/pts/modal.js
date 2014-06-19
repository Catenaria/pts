$(document).ready(function(){
    $(".model").click(function(){ // Click to only happen on announce links
        $("#modalModel").val($(this).data('fid'));
        $('#createFormId').modal('show');
    });
});
