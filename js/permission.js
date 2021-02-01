function checkPermission(currentUser) {
    var rightPermission = currentUser;
    rightPermission = rightPermission.split(",");

    //招生方案-管理
    var admission_project_admin = false;
    //招生方案-统计
    var admission_project_summary = false;
    //招生方案-查看
    var admission_project_view = false;

    //报名-管理
    var admission_signup_admin = false;
    //报名-审核
    var admission_signup_approve = false;
    //报名-申请
    var admission_signup_apply = false;

    //录取-拟录取
    var admission_enroll_assign = false;
    //录取-复核
    var admission_enroll_recheck = false;
    //录取-终审
    var admission_enroll_sentence = false;

    //注册-管理
    var admission_checkin_admin = false;

    var sa = "sa";
    var admission = "sa:admission";
    var project = "sa:admission:project";
    var signup = "sa:admission:signup";
    var enroll = "sa:admission:enroll";
    var checkin = "sa:admission:checkin";
    for(i in rightPermission) {
        var right = rightPermission[i];
        if(right == "sa:admission:project:admin" || right == project || right == admission || right == sa) {
            admission_project_admin = true;
        }
        if(right == "sa:admission:project:summary" || right == project || right == admission || right == sa) {
            admission_project_summary = true;
        }
        if(right == "sa:admission:project:view" || right == project || right == admission || right == sa) {
            admission_project_view = true;
        }

        if(right == "sa:admission:signup:admin" || right == signup || right == admission || right == sa) {
            admission_signup_admin = true;
        }
        if(right == "sa:admission:signup:approve" || right == signup || right == admission || right == sa) {
            admission_signup_approve = true;
        }
        if(right == "sa:admission:signup:apply" || right == signup || right == admission || right == sa) {
            admission_signup_apply = true;
        }

        if(right == "sa:admission:enroll:assign" || right == enroll || right == admission || right == sa) {
            admission_enroll_assign = true;
        }
        if(right == "sa:admission:enroll:recheck" || right == enroll || right == admission || right == sa) {
            admission_enroll_recheck = true;
        }
        if(right == "sa:admission:enroll:sentence" || right == enroll || right == admission || right == sa) {
            admission_enroll_sentence = true;
        }

        if(right == "sa:admission:checkin:admin" || right == checkin || right == admission || right == sa) {
            admission_checkin_admin = true;
        }
    }

    if (admission_project_admin) {
        $(".admission_project_admin").show();
    } else {
        $(".admission_project_admin").hide();
    }
    if (admission_project_summary) {
        $(".admission_project_summary").show();
    } else {
        $(".admission_project_summary").hide();
    }
    if (admission_project_view) {
        $(".admission_project_view").show();
    } else {
        $(".admission_project_view").hide();
    }

    if (admission_signup_admin) {
        $(".admission_signup_admin").show();
    } else {
        $(".admission_signup_admin").hide();
    }
    if (admission_signup_approve) {
        $(".admission_signup_approve").show();
    } else {
        $(".admission_signup_approve").hide();
    }
    if (admission_signup_apply) {
        $(".admission_signup_apply").show();
    } else {
        $(".admission_signup_apply").hide();
    }

    if (admission_enroll_assign) {
        $(".admission_enroll_assign").show();
    } else {
        $(".admission_enroll_assign").hide();
    }
    if (admission_enroll_recheck) {
        $(".admission_enroll_recheck").show();
    } else {
        $(".admission_enroll_recheck").hide();
    }
    if (admission_enroll_sentence) {
        $(".admission_enroll_sentence").show();
    } else {
        $(".admission_enroll_sentence").hide();
    }

    if (admission_checkin_admin) {
        $(".admission_checkin_admin").show();
    } else {
        $(".admission_checkin_admin").hide();
    }
}
