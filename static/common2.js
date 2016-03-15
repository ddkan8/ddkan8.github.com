$.fn.textScroll = function () {
    var p = $(this),
        c = p.children(),
        speed = 3000;// 值越大，速度越小
    var cw = c.width(), pw = p.width();
    var t = (cw / 100) * speed;
    var f = null, t1 = 0;
    function ani(tm) {
        counttime();
        c.animate({ left: -cw }, tm, "linear", function () {
            c.css({ left: pw });
            clearInterval(f);
            t1 = 0;
            t = ((cw + pw) / 100) * speed;
            ani(t);
        });
    }
    function counttime() {
        f = setInterval(function () {
            t1 += 10;
        }, 10);
    }
    p.on({
        mouseenter: function () {
            c.stop(false, false);
            clearInterval(f);
            //console.log(t1);
        },
        mouseleave: function () {
            ani(t - t1);
            //console.log(t1);
        }
    });
    ani(t);
}
// $(document).ready(function () {
//     $("#top-s").textScroll();
// });

$.fn.tabs = function (control) {
    var element = $(this);
    control = $(control);
    element.delegate("li", "click", function () {
        var tabName = $(this).attr("data-tab");
        element.trigger("change.tabs", tabName);
    });

    element.bind("change.tabs", function (e, tabName) {
        element.find("li").removeClass("current");
        element.find(">[data-tab='" + tabName + "']").addClass("current");
    });
    element.bind("change.tabs", function (e, tabName) {
        control.find(">[data-tab]").addClass("hidden");
        control.find(">[data-tab='" + tabName + "']").removeClass("hidden");
    });

    var firstName = element.find("li:first").attr("data-tab");
    element.trigger("change.tabs", firstName);

    return this;
};
// $(document).ready(function () {
//     $("ul#tabs").tabs("#tabsContent");
// });