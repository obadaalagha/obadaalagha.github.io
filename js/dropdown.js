$(document).ready(function() {
    let drop = $(".dropdown");
    $(".btnDrop").click(function(e) {
        if(drop.hasClass("hidden")) {
            drop.removeClass("hidden");
            drop.addClass("flex")
        } else {
            drop.removeClass("flex");
            drop.addClass("hidden");
        }
        e.stopPropagation();
    });
    drop.click(function(e) {
        e.stopPropagation();
    });
    $(document).click(function() {
        drop.removeClass("flex");
        drop.addClass("hidden");
    });
});