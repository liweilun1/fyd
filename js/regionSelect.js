(function($){
	
	$.enrollRegionSelector = function(options) {
        var defOption = {
            lv : "3",   //3 / 4
            sjSelector : "sj",
            shijSelector : "shij",
            qxjSelector : "qx",
            jdSelector : "jd",

            isEchoSelected : true,
            sjSelectedVal : "520000",
            shijSelectedVal : "520200",
            qxjSelectedVal : "",
            jdSelectedVal : "",

            firstOptionTitle : "请选择",       //第一项标题，只有省
            isShowFirstOptionTitle :true,      //是否展示第一项，只限制省

            selectOne : false,      //是否展示第一项有限值(非请选择)，市、区、街道

            sjCallback : function($this) { sjSelector.chosen()},
            shijCallback : function($this) {shijSelector.chosen()},
            qxCallback : function($this) {qxjSelector.chosen()},
            jdCallback : function($this) {}
        };
		
		options = $.extend({}, defOption, options || {});

        var sjSelector = $("#" + options.sjSelector);
        var shijSelector = $("#" + options.shijSelector);

        sjSelector.append("<option value=''>请选择</option>");
        shijSelector.append("<option value=''>请选择</option>");

        var qxjSelector;
        if("3" === options.lv || "4" === options.lv) {
            qxjSelector = $("#" + options.qxjSelector);
            qxjSelector.append("<option value=''>请选择</option>");
        }

        var jdSelector;
        if("4" === options.lv) {
            jdSelector = $("#" + options.jdSelector);
            jdSelector.append("<option value=''>请选择</option>");
        }

        sjSelector.on("change", function(event) {
            var $this = $(this);
            var currentId = $this.val();
            createSelect(shijSelector, currentId, options.isEchoSelected, options.shijSelectedVal,
                 true, "请选择", "2", options.selectOne, options.shijCallback);
            // $("#" + options.shijSelector + "_chzn").remove();
            // shijSelector.show().removeClass("chzn-done").chosen();
        });

        if("3" === options.lv || "4" === options.lv) {
            shijSelector.on("change", function(event) {
                qxjSelector = $("#" + options.qxjSelector);
                qxjSelector.append("<option value=''>请选择</option>");
                var $this = $(this);
                var currentId = $this.val();
                createSelect(qxjSelector, currentId, options.isEchoSelected, options.qxjSelectedVal,
                     true, "请选择", "3", options.selectOne, options.qxCallback);

            });
        }

        if("4" === options.lv) {
            qxjSelector.on("change", function(event) {
                var $this = $(this);
                var currentId = $this.val();
                createSelect(jdSelector, currentId, options.isEchoSelected, options.jdSelectedVal,
                     true, "请选择", "4", options.selectOne, options.jdCallback);
            });
        }

        createSelect(sjSelector, "0", options.isEchoSelected, options.sjSelectedVal,
            options.isShowFirstOptionTitle, options.firstOptionTitle, "1", options.selectOne, options.sjCallback);
	}

    function createSelect(selector, val, isSelected, id, isShow, firstOptionTitle, lv, selectOne, callback) {
        if(val == null || "" === val) {
            selector.html("");
            selector.next().html("");
            if (isShow) {
                selector.append("<option value=''>" + firstOptionTitle +"</option>");
            }
            selector.trigger("change");
            selector.trigger('chosen:updated');
            callback(selector);
            $( selector.selector + "_chzn").remove();
            selector.show().removeClass("chzn-done").chosen();
        } else {
            var $requestData = {};
            $requestData.parent = val;
            $.post("/enroll/cache/getRegion", $requestData, function(data,status){
                if ("success" === status) {
                    selector.html("");
                    if (isShow) {
                        selector.append("<option value=''>" + firstOptionTitle +"</option>");
                    }
                    $.each(data, function(index, value) {
                        selector.append("<option value='" + value.id + "'>" + value.name + "</option>");
                    });

                    if (isSelected) {
                        selector.val(id);
                    } else if (selectOne) {
                        if (lv != 1) {
                            selector.find("option:nth-child(2)").prop("selected", "selected");
                        }
                    }
                    selector.trigger("change");
                    callback(selector);
                    // selector.next('.chzn-container').remove();
                    $( selector.selector + "_chzn").remove();
                    selector.show().removeClass("chzn-done").chosen();
                }
            });
        }
    }
	
})(jQuery);

