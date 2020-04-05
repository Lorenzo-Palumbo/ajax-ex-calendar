$(document).ready(function(){

    var source = $('#calendar-template').html();
    var template = Handlebars.compile(source);

    var dataIniziale = moment('2018-01-01'); //selezione data partenza
    stampaGiorniMese(dataIniziale);
    stampaFestivi();

    $('.mese-succ').click(function(){
        dataIniziale.add(1, 'months'); //passare al mese successivo
        stampaGiorniMese(dataIniziale);
    });

    function stampaGiorniMese(mese){
        $('#calendar').empty();
        var standardDay = mese.clone();
        var giorniMese = mese.daysInMonth();
        var nomeMese = mese.format('MMMM');
        $('#nome-mese').text(nomeMese); //aggiungere nome mese in cima (span)

        for (var i = 1; i <= giorniMese; i++) {
            var context = {
                day: i + ' ' + nomeMese,
                // dataDay: standardDay.format('YYYY-MM-') + i     Altro modo per vedere tutti i giorni nel mese
                dataDay: standardDay.format('YYYY-MM-DD')
            };
            var html = template(context);
            $('#calendar').append(html);
            standardDay.add(1, 'day');                           //per vedere tutti i giorni nel mese
        }
    };

    function stampaFestivi(){
        $.ajax({
            url: 'https://flynn.boolean.careers/exercises/api/holidays',
            method: 'GET',
            data: {
                year:2018,
                month:0
            },
            success: function(data){
                var giorniFestivi = data.response;
                for (var i = 0; i < giorniFestivi.length; i++) {
                    var giornoFestivo = giorniFestivi[i];
                    var nomeFestivo = giornoFestivo.name;
                    var dataFestivo = giornoFestivo.date;
                    $('#calendar li[data-day="'+ dataFestivo +'"]').addClass('festivo').append(' - ' + nomeFestivo);
                }
            },
            error: function(){
                alert('errore')
            }
        });
    };








});
