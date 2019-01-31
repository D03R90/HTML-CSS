
$(function () {
    $(`#slider-range`).slider({
        range: true,
        min: 0,
        max: 400,
        values: [108, 300],
        slide: function (event, ui) {
            $("#amount").val(ui.values[0] + "$" + "\t\t\t\t\t\t" + ui.values[
                1] + "$");
        }
    });
    $("#amount").val(`${$('#slider-range').slider("values", 0)}$\t\t\t\t\t\t${$('#slider-range').slider("values", 1)}$`);
});