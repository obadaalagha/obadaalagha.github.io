$(document).ready(function() {
    $(".btnDrop").click(function(e) {
        if($(".dropdown").hasClass("hidden")) {
            $(".dropdown").removeClass("hidden");
            $(".dropdown").addClass("flex")
        } else {
            $(".dropdown").removeClass("flex");
            $(".dropdown").addClass("hidden");
        }
        e.stopPropagation();
    });
    $(".dropdown").click(function(e) {
        e.stopPropagation();
    });
    $(document).click(function() {
        $(".dropdown").removeClass("flex");
        $(".dropdown").addClass("hidden");
    });
});