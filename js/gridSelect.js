// 网格节点选择器
(function($) {
    $.enrollGridSelector = function(options) {
        var defOption = {
            lv : "3",   //3=社区，4=网格
            districtSelector : "district",      //区
            streetSelector : "street",          //街道
            communitySelector : "community",    //社区
            gridSelector : "grid",              //网格

            isEchoSelected : false,             //是否回显数据
            districtSelectedVal : "",           //区选中值
            streetSelectedVal : "",             //街道选中值
            communitySelectedVal : "",          //社区选中值
            gridSelectedVal : "",               //网格选中值

            isShowTitle : true,                 //是否展示第一项"全部区域"

            isUseCodeSelected : false,          //是否用code值选中--针对区 option:selected data-code
            districtSelectedCode : "",          //区的code值

            districtCallback : function($this) { districtSelector.chosen()},
            streetCallback : function($this) { streetSelector.chosen()},
            communityCallback : function($this) { communitySelector.chosen()},
            gridCallback : function($this) { gridSelector.chosen()},

            gridChangeCallback : function () { }
        };

        options = $.extend({}, defOption, options || {});

        var districtSelector = $("#" + options.districtSelector);
        var streetSelector = $("#" + options.streetSelector);

        districtSelector.append("<option value=''>全部区域</option>");
        streetSelector.append("<option value=''>全部区域</option>");

        var communitySelector;
        if("3" === options.lv || "4" === options.lv) {
            communitySelector = $("#" + options.communitySelector);
            communitySelector.append("<option value=''>全部区域</option>");
        }

        var gridSelector;
        if("4" === options.lv) {
            gridSelector = $("#" + options.gridSelector);
            communitySelector.append("<option value=''>全部区域</option>");
        }

        //区下拉
        createSelect(districtSelector, "0", "3", options.isEchoSelected, options.districtSelectedVal,
            options.isShowTitle, options.isUseCodeSelected, options.districtSelectedCode, options.districtCallback);

        //街道下拉
        districtSelector.on("change", function(event) {
            var $this = $(this);
            var currentId = $this.val();
            createSelect(streetSelector, currentId, "4", options.isEchoSelected, options.streetSelectedVal,
                options.isShowTitle, false, "", options.streetCallback);
        });

        //社区下拉
        if("3" === options.lv || "4" === options.lv) {
            streetSelector.on("change", function(event) {
                var $this = $(this);
                var currentId = $this.val();
                createSelect(communitySelector, currentId, "5", options.isEchoSelected, options.communitySelectedVal,
                    options.isShowTitle, false, "", options.communityCallback);
            });
        }

        //网格下拉
        if("4" === options.lv) {
            communitySelector.on("change", function(event) {
                var $this = $(this);
                var currentId = $this.val();
                createSelect(gridSelector, currentId, "6", options.isEchoSelected, options.gridSelectedVal,
                    options.isShowTitle, false, "", options.gridCallback);
            });

            gridSelector.on("change", function () {
                var id = $(this).val();
                var name = $(this).find("option:selected").attr("data-name");
                name = name == undefined ? "" : name;
                var mobile = $(this).find("option:selected").attr("data-mobile");
                mobile = mobile == undefined ? "" : mobile;
                var data = {"id":id, "name":name, "mobile":mobile}
                options.gridChangeCallback(data);
            });
        }

    }

    function createSelect(selector, val, lv, isSelected, id, isShow, isUseCode, code, callback) {
        if(val == null || "" === val) {
            selector.html("");
            selector.next().html("");
            if (isShow) {
                selector.append("<option value=''>全部区域</option>");
            }
            selector.trigger("change");
            selector.trigger('chosen:updated');
            callback(selector);
            $(selector.selector + "_chzn").remove();
            selector.show().removeClass("chzn-done").chosen();
        } else {
            var $requestData = {};
            $requestData.parentId = val;
            $requestData.level = lv;
            $.post("/enroll/region/getRegion", $requestData, function(data,status){
                if ("success" === status) {
                    selector.html("");
                    if (isShow) {
                        selector.append("<option value=''>全部区域</option>");
                    }
                    if (lv == 6) {
                        $.each(data, function(index, value) {
                            selector.append("<option value='" + value.id + "' data-code='"  + value.code + "'" +
                                "data-name='" + value.gridmanName + "' " + "data-mobile='" + value.gridmanMobile + "' " +
                                ">" + value.name + "</option>");
                        });
                    } else {
                        $.each(data, function(index, value) {
                            selector.append("<option value='" + value.id + "' data-code='"  + value.code + "'>" + value.name + "</option>");
                        });
                    }
                    if (isSelected) {
                        selector.val(id);
                    }
                    if (isUseCode && code != "") {
                        $(selector.selector + " option[data-code='"+ code +"']").attr("selected", "selected");
                    }
                    selector.trigger("change");
                    callback(selector);
                    $(selector.selector + "_chzn").remove();
                    selector.show().removeClass("chzn-done").chosen();
                }
            });
        }
    }

})(jQuery);