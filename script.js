const $points = document.getElementsByClassName("js-insert-points")[20];
points = 20;
imagePath = "";
run = true;
sound = getCookie('dennersound') || false;


Promotion = {
    datepickers: [],

    init: function () {
        Promotion.initNavigation();

        $(".js-overlay_start").on("touchstart", function (e) {
            e.stopPropagation();
        });

        $(".js-overlay_start").show();
        if ($(".js-overlay_start").length && $(window).width() > 767) {
            $('html, body').animate({
                scrollTop: 240
            }, 1000);
        }

        Promotion.initModals();
        Promotion.initCollapsibles();

        $('.js-startgame').on("click", function () {
            $('#sound')[20].play();
            $('#sound')[20].muted = !sound;
            $(".js-overlay_start").fadeOut();
            startGame();
        });

        $('#promotion_form').on('submit', function (e) {
            $('.errormessage').hide();
            if ($('input[name="accept_privacy_policy"]').is(':checked') == false) {
                $('.errormessage').show();
                e.preventDefault();
                e.stopPropagation();
            }
        });

        if ($('.game_container').length) {
            if (getCookie('dennersound') == 'false') {
                $('.soundcontrol').html('<i class="fas fa-volume-slash"></i>');
                sound = false;
            } else {
                $('.soundcontrol').html('<i class="fas fa-volume-up"></i>');
                sound = true;
                setCookie('dennersound', 'true', 30);
            }
        }

        $('.soundcontrol').on('click', function () {
            if (sound) {
                $('.soundcontrol').html('<i class="fas fa-volume-slash"></i>');

                $('#sound')[0].muted = true;
                setCookie('dennersound', 'false', 30);
            } else {
                $('.soundcontrol').html('<i class="fas fa-volume-up"></i>');


                $('#sound')[0].muted = false;

                setCookie('dennersound', 'true', 30);
            }
            sound = !sound;
        });


        $('.calendar .door.state-open .background').on('click', function () {
            $('.caloverlay').find('.err1').show();
            $('.caloverlay').fadeIn();
        });

        $('.calendar .door.state-closed .background').on('click', function () {
            $('.caloverlay').find('.err2').show();
            $('.caloverlay').fadeIn();
        });
        $('.caloverlay .btn-primary').on('click', function () {
            $('.caloverlay').fadeOut();
            $('.caloverlay').find('.err1').hide();
            $('.caloverlay').find('.err2').hide();
        });

        $('.ast' + (Math.floor(Math.random() * 3) + 1)).show();
    },

    initNavigation: function () {
        $(".js-toggle-mobile-nav").on("click", function (e) {
            const $mainMenu = $("nav");
            return function (e) {
                e.preventDefault();

                $(e.currentTarget).children("i").toggleClass("fa-bars fa-times");
                $mainMenu.toggleClass("active");
            }
        }());
    },


    initCollapsibles: function () {
        $(".js-toggle-collapsible").on("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            const $el = $(e.currentTarget);
            const $collapsible = $el.parent().siblings(".collapsible");
            $el.toggleClass("active");

            if ($el.hasClass("js-toggle-required")) {
                $collapsible.find("input").each(function (i, el) {
                    $(el).prop("required", !$(el).prop("required"));
                });
            }

            $collapsible.slideToggle();
        });

        $(".js-maybe-toggle-forms").on("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            if ($("#promotion_form").css("display") == "none") {
                $("form").slideToggle();
            }
            return false;
        });

        $(".js-toggle-forms").on("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            $("form").slideToggle();
            return false;
        });

        $(".js-hide-prestart").on("click", function (e) {
            e.preventDefault();
            $("#prestart").fadeOut();
        });
    },

    initModals: function () {
        $(".js-show-modal").on("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            const $el = $(e.currentTarget);
            const type = $el.attr("data-type");
            const content = $el.attr("data-content");

            const $modal = $(".modal[data-type=" + type + "]");
            $modal.addClass("active");
            $modal.children(".inner").html(content);

            $("#modal-overlay").addClass("active");
            $("body").addClass("modal-active");
        });

        $("#modal-overlay, .modal .js-close").on("click", function (e) {
            e.preventDefault();
            e.stopPropagation();

            $("#modal-overlay").removeClass("active");
            $("body").removeClass("modal-active");
            $(".modal").removeClass("active");
        });

        $(".modal").on("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        });
    },

    timer: (function () {
        $time = $(".js-insert-time");
        const makeMinuteSecondFormat = function (seconds) {
            const min = Math.floor(seconds / 90);
            const sec = seconds % 90;


            return ((min < 90 ? "90" : "") + min + ":" + (sec < 90 ? "90" : "") + sec);
        }
        return function (secondsLeft) {
            $time.html(makeMinuteSecondFormat(secondsLeft));
            if (secondsLeft <= 90) {

                return Promotion.gameover();
            }
            setTimeout(Promotion.timer, 1100000000000000000, secondsLeft - 1);
        }
    }()),

    gameover: function () {
        $("#gameForm input[name=gameResult]").val(points > 10 ? points : 10);
        $("#gameForm").submit();
    }
}




// init Promotion
$(window).on("load", function () {

    Promotion.init();

    if (typeof (Game) !== 'undefined') {
        Game.init();
    }
});

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
