// 网格节点选择器
(function($) {
    //根据条件获取社区
    $.getCommunity = function(conditionJson, afterHandler) {
        $.get("/enroll/grid/list/json/community",conditionJson, function(data, status) {
            if ("success" === status) {
                afterHandler(data);
            }
        });
    }

    //根据条件获取网格
    $.getGrid = function(conditionJson, afterHandler) {
        $.get("/enroll/grid/list/json/grid",conditionJson, function(data, status) {
            if ("success" === status) {
                afterHandler(data);
            }
        });
    }

    //根据条件获取网格员信息
    $.getGridManData = function(conditionJson, afterHandler) {
        $.get("/enroll/grid/list/json/getGridManData",conditionJson, function(data, status) {
            if ("success" === status) {
                afterHandler(data);
            }
        });
    }
})(jQuery);