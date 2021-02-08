$(function() {
    let h = $(window).height();
    $("#left").height(h - 200);

    $.validator.addMethod(
        "CodNome",
        function(valor, element) {
            var regex = /^Cod:\w+/g;
            return this.optional(element) || regex.test(valor);
        },
        "Prefixo Cod"
    );
    $("#frm").validate({
        rules: {
            txtnome: { CodNome: true },
        },
        messages: {
            txtnome: {},
        },
    });
});