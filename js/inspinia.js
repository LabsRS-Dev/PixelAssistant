/*
 *
 *   INSPINIA - Responsive Admin Theme
 *   version 2.4
 *
 */


$(document).ready(function () {


    // Add body-small class if window less than 768px
    if ($(this).width() < 769) {
        $('body').addClass('body-small')
    } else {
        $('body').removeClass('body-small')
    }

    // MetsiMenu
    $('#side-menu').metisMenu();

    // Collapse ibox function
    $('.collapse-link').click(function () {
        var ibox = $(this).closest('div.ibox');
        var button = $(this).find('i');
        var content = ibox.find('div.ibox-content');
        content.slideToggle(200);
        button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
        ibox.toggleClass('').toggleClass('border-bottom');
        setTimeout(function () {
            ibox.resize();
            ibox.find('[id^=map-]').resize();
        }, 50);
    });

    // Close ibox function
    $('.right-sidebar-toggle').click(function () {
        $('#right-sidebar').toggleClass('sidebar-open');
    });

    // Fullscreen ibox function
    $('.fullscreen-link').click(function () {
        var ibox = $(this).closest('div.ibox');
        var button = $(this).find('i');
        $('body').toggleClass('fullscreen-ibox-mode');
        button.toggleClass('fa-expand').toggleClass('fa-compress');
        ibox.toggleClass('fullscreen');
        setTimeout(function () {
            $(window).trigger('resize');
        }, 100);
    });

    // Close menu in canvas mode
    $('.close-canvas-menu').click(function () {
        $("body").toggleClass("mini-navbar");
        SmoothlyMenu();
    });

    // Run menu of canvas
    $('body.canvas-menu .sidebar-collapse').slimScroll({
        height: '100%',
        railOpacity: 0.9
    });

    // Open close right sidebar
    $('.right-sidebar-toggle').click(function () {
        $('#right-sidebar').toggleClass('sidebar-open');
    });

    // Initialize slimscroll for right sidebar
    $('.sidebar-container').slimScroll({
        height: '100%',
        railOpacity: 0.4,
        wheelStep: 10
    });

    // Open close small chat
    $('.open-small-chat').click(function () {
        $(this).children().toggleClass('fa-comments').toggleClass('fa-remove');
        $('.small-chat-box').toggleClass('active');
    });

    // Initialize slimscroll for small chat
    $('.small-chat-box .content').slimScroll({
        height: '234px',
        railOpacity: 0.4
    });

    // Small todo handler
    $('.check-link').click(function () {
        var button = $(this).find('i');
        var label = $(this).next('span');
        button.toggleClass('fa-check-square').toggleClass('fa-square-o');
        label.toggleClass('todo-completed');
        return false;
    });

    // Append config box / Only for demo purpose
    // Uncomment on server mode to enable XHR calls


    // Minimalize menu
    $('.navbar-minimalize').click(function () {
        $("body").toggleClass("mini-navbar");
        SmoothlyMenu();

    });

    // Tooltips demo
    $('.tooltip-demo').tooltip({
        selector: "[data-toggle=tooltip]",
        container: "body"
    });

    // Move modal to body
    // Fix Bootstrap backdrop issu with animation.css
    $('.modal').appendTo("body");

    // Full height of sidebar
    function fix_height() {
        var heightWithoutNavbar = $("body > #wrapper").height() - 61;
        $(".sidebard-panel").css("min-height", heightWithoutNavbar + "px");

        var navbarHeigh = $('nav.navbar-default').height();
        var wrapperHeigh = $('#page-wrapper').height();

        if (navbarHeigh > wrapperHeigh) {
            $('#page-wrapper').css("min-height", navbarHeigh + "px");
        }

        if (navbarHeigh < wrapperHeigh) {
            $('#page-wrapper').css("min-height", $(window).height() + "px");
        }

        if ($('body').hasClass('fixed-nav')) {
            if (navbarHeigh > wrapperHeigh) {
                $('#page-wrapper').css("min-height", navbarHeigh - 60 + "px");
            } else {
                $('#page-wrapper').css("min-height", $(window).height() - 60 + "px");
            }
        }

    }

    fix_height();

    // Fixed Sidebar
    $(window).bind("load", function () {
        if ($("body").hasClass('fixed-sidebar')) {
            $('.sidebar-collapse').slimScroll({
                height: '100%',
                railOpacity: 0.9
            });
        }
    });

    // Move right sidebar top after scroll
    $(window).scroll(function () {
        if ($(window).scrollTop() > 0 && !$('body').hasClass('fixed-nav')) {
            $('#right-sidebar').addClass('sidebar-top');
        } else {
            $('#right-sidebar').removeClass('sidebar-top');
        }
    });

    $(window).bind("load resize scroll", function () {
        if (!$("body").hasClass('body-small')) {
            fix_height();
        }
    });

    $("[data-toggle=popover]")
        .popover();

    // Add slimscroll to element
    $('.full-height-scroll').slimscroll({
        height: '100%'
    })
});


// Minimalize menu when screen is less than 768px
$(window).bind("resize", function () {
    if ($(this).width() < 769) {
        $('body').addClass('body-small')
    } else {
        $('body').removeClass('body-small')
    }
});

// Local Storage functions
// Set proper body class and plugins based on user configuration
$(document).ready(function () {
    if (localStorageSupport) {

        var collapse = localStorage.getItem("collapse_menu");
        var fixedsidebar = localStorage.getItem("fixedsidebar");
        var fixednavbar = localStorage.getItem("fixednavbar");
        var boxedlayout = localStorage.getItem("boxedlayout");
        var fixedfooter = localStorage.getItem("fixedfooter");

        var body = $('body');

        if (fixedsidebar == 'on') {
            body.addClass('fixed-sidebar');
            $('.sidebar-collapse').slimScroll({
                height: '100%',
                railOpacity: 0.9
            });
        }

        if (collapse == 'on') {
            if (body.hasClass('fixed-sidebar')) {
                if (!body.hasClass('body-small')) {
                    body.addClass('mini-navbar');
                }
            } else {
                if (!body.hasClass('body-small')) {
                    body.addClass('mini-navbar');
                }

            }
        }

        if (fixednavbar == 'on') {
            $(".navbar-static-top").removeClass('navbar-static-top').addClass('navbar-fixed-top');
            body.addClass('fixed-nav');
        }

        if (boxedlayout == 'on') {
            body.addClass('boxed-layout');
        }

        if (fixedfooter == 'on') {
            $(".footer").addClass('fixed');
        }
    }
});

// check if browser support HTML5 local storage
function localStorageSupport() {
    return (('localStorage' in window) && window['localStorage'] !== null)
}

// For demo purpose - animation css script
function animationHover(element, animation) {
    element = $(element);
    element.hover(
        function () {
            element.addClass('animated ' + animation);
        },
        function () {
            //wait for animation to finish before removing classes
            window.setTimeout(function () {
                element.removeClass('animated ' + animation);
            }, 2000);
        });
}

function SmoothlyMenu() {
    if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
        // Hide menu in order to smoothly turn on when maximize menu
        $('#side-menu').hide();

        // For smoothly turn on menu
        setTimeout(
            function () {
                $('#side-menu').fadeIn(400);
          }, 200);
    } else if ($('body').hasClass('fixed-sidebar')) {
        $('#side-menu').hide();

        setTimeout(
            function () {
                $('#side-menu').fadeIn(400);
            }, 100);
    } else {
        // Remove all inline style from jquery fadeIn function to reset menu state
        $('#side-menu').removeAttr('style');
    }
}

// Dragable panels
function WinMove() {
    var element = "[class*=col]";
    var handle = ".ibox-title";
    var connect = "[class*=col]";
    $(element).sortable(
        {
            handle: handle,
            connectWith: connect,
            tolerance: 'pointer',
            forcePlaceholderSize: true,
            opacity: 0.8
        })
        .disableSelection();
};


ctx=mycanvas.getContext('2d');

var init=function() {
    ctx.clearRect(0,0,mycanvas.width,mycanvas.height);
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.fillRect(136, 64, 512, 268);
    ctx.stroke();
    ctx.beginPath();
    var rgrd = ctx.createRadialGradient(300, 150, 5, 300, 150, 300);
    rgrd.addColorStop(0, "black");
    rgrd.addColorStop(1, "#b2b2b2");
    ctx.fillStyle = rgrd;
    ctx.fillRect(150, 80, 485, 237);
    if (xxx1 == true) {
        inch();
    }
    if(xxx2 == true){
        wid();
    }
    if(hei+3 == true) {
        hei();
    }
}
$(window).bind("resize load", function () {
    var cc=document.querySelector('.cc');
    var w1=window.getComputedStyle(cc).width;

    w1=w1.slice(0,-2);
    mycanvas.style.width=w1+"px";
    init();
});
$(".fa-list").click(function() {

    $("#no").resize(function () {
        var elem = $(this);
        //改变Canvas的大小
        $('#mycanvas').prop({width: elem.width(), height: elem.height()});
    })
})
var xxx1,xxx2,xxx3;
function inch(){
    ctx.moveTo(136,64);
    ctx.lineTo(648,332);
    ctx.strokeStyle="red";
    ctx.stroke();
    ctx.font=(20)+"px Georgia";
    ctx.fillStyle="red";
    var x=ctx.measureText("21.5").width;
    ctx.fillText("21.5",(392-x),208);
    xxx1=true;
    $(this).unbind("click");
};
$("tbody>tr:nth-child(1)").click(inch);
$("tbody>tr:nth-child(1)").dblclick(function(){
    xxx1=false;
    init();
    $(this).bind('click',inch);
});
function wid(){
    ctx.moveTo(136,54);
    ctx.lineTo(648,54);
    ctx.strokeStyle="red";
    ctx.stroke();
    ctx.font=(20)+"px Georgia";
    ctx.fillStyle="red";
    var x=ctx.measureText("5120").width;
    ctx.fillText("5120",(136+512/2-x),54);
    xxx2=true;
    $(this).unbind("click");
}
$("tbody>tr:nth-child(3)").click(wid);
$("tbody>tr:nth-child(3)").dblclick(function(){
    xxx2=false;
    init();
    $(this).bind('click',wid);
});
function hei(){
    ctx.moveTo(126,64);
    ctx.lineTo(126,332);
    ctx.strokeStyle="red";
    ctx.stroke();
    ctx.font=(20)+"px Georgia";
    ctx.fillStyle="red";
    ctx.fillText("2680",(136),54+268/2+10);
    xxx3=true;
    $(this).unbind("click");
}
$("tbody>tr:nth-child(4)").click(hei);
$("tbody>tr:nth-child(4)").dblclick(function(){
    xxx3=false;
    init();
    $(this).bind('click',hei);
});

$(document).on("mousewheel DOMMouseScroll", function (e) {


    var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) ||  // chrome & ie
        (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));              // firefox
    ctx.clearRect(0,0,mycanvas.width,mycanvas.height);

    if (delta > 0) {
        // 向上滚
        ctx.translate(-mycanvas.width/2,-mycanvas.height/2);
        ctx.scale(2,2);
       init();

    } else if (delta < 0) {
        // 向下滚
        ctx.translate(mycanvas.width/4,mycanvas.height/4);
        ctx.scale(0.5,0.5);
       init();
    }
});

$.get("mac.json",function(data){
    $.each(data[0].brand,function(i,v){
        var n=0;
        $("#s1").append("<option value="+i+">"+v+"</option>");

    });
});

$("#s1").change(function(){
    s2.innerHTML="<option>Select production</option>";
    if(s1.value==""){
        s2.innerHTML="<option>Select production</option>";
        s3.innerHTML="<option>Select type</option>";
        s4.innerHTML="<option>Select resolution</option>";
    }else{
    $.get("mac.json", function (data) {
        $.each(data[0].type[$("#s1 option:selected").val()], function (i, v) {
            var n = 0;
            $("#s2").append("<option value=" + i + ">" + v + "</option>");
        });
    })}
})
$("#s2").change(function(){
    s3.innerHTML="<option>Select type</option>";
    if(s2.value=="Select production"){
        s3.innerHTML="<option>Select type</option>";debugger;
        s4.innerHTML="<option>Select resolution</option>";

    }else{
    $.get("mac.json", function (data) {
        $.each(data[0].made[$("#s1 option:selected").val()][$("#s2 option:selected").val()], function (i, v) {
            var n = 0;
            $("#s3").append("<option value=" + i + ">" + v + "</option>");
        });
    })}
})
$("#s3").change(function(){
    s4.innerHTML="<option>Select resolution</option>";
    if(s3.value=="Select type"){
        s4.innerHTML="<option>Select resolution</option>";
    }else{
    $.get("mac.json", function (data) {
        $.each(data[0].resolution[$("#s1 option:selected").val()][$("#s2 option:selected").val()][$("#s3 option:selected").val()], function (i, v) {
            var n = 0;
            $("#s4").append("<option value=" + i + ">" + v + "</option>")
        });
    })}
})
$("#s4").change(function(){
    if ($("#s4 option:selected").val()!=="") {
        retable(this.options[this.selectedIndex].text);
    }
})
function retable(res) {
        var reg = /\*/;
        var REN = reg.exec(res);
        var a = res.slice(0, REN.index);
        var b = res.slice(REN.index + 1, -2);
        console.log(a, b);
        widt.innerHTML =a;
        heig.innerHTML =b;

}

