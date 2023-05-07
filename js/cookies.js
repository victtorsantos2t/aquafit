$(document).ready(function () {
    $('#myModal').modal('show');

    $('#acceptCookies').on('click', function () {
        // salva o valor do cookie com a data de expiração
        var cookieExpDays = 30; // defina um valor numérico para a duração do cookie
        var date = new Date();
        date.setTime(date.getTime() + (cookieExpDays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + date.toUTCString();
        document.cookie = "cookies_accepted=true;" + expires + ";path=/";

        // esconde o modal
        $('#myModal').modal('hide');
    });
});
