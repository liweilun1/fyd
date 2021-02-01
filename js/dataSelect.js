
//@author 潘维良
//@date 2015-03-25
(function($){
    //根据条件获取招生方案
    $.getAdmission = function(conditionJson, isRule, afterHandler) {
        if(isRule == null || isRule === 'undefined'){
            isRule = true;
        }
        $.get("/enroll/admission/list/json?isRule=" + isRule, conditionJson, function(data, status) {
            if ("success" === status) {
                // data = eval("(" + data + ")");
                afterHandler(data);
            }
        });
    }

    //获取楼层
    $.AdmissionSelector = function(options) {
        var defOption = {
            "selector" : "#admission",
            "isRule" : true,
            "condition" : {
                "isMore" : false
            },
            "selectedVal" : "",
            "afterHandler" : function() {
            },
            "firstOptionTitle" : "请选择",
            "isUseChosen" : true
        };
        options = $.extend({}, defOption, options || {});

        var selector = $(options.selector);
        selector.html("");
        // selector.append("<option value=''>" + options.firstOptionTitle
        //     + "</option>");

        $.getAdmission(options.condition, options.isRule, function(data) {
            $.each(data, function(index, value) {
                selector.append("<option value='" + value.id + "'>"
                    + value.name + "</option>")
            });
            selector.val(options.selectedVal);
            options.afterHandler(selector);
            if (options.isUseChosen == null || options.isUseChosen) {
                // selector.chosen();
            }
        });
    }

})(jQuery);

