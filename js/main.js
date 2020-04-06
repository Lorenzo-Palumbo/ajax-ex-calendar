$(document).ready(function(){

    var source = $('#calendar-template').html();
    var template = Handlebars.compile(source);

    var source = $('#days-template').html();
    var template = Handlebars.compile(source);

    var dataIniziale = moment('2018-01-01'); //selezione data partenza
    var limiteIniziale = moment('2018-01-01');
    var limiteFinale = moment('2018-12-31');
    stampaGiorniMese(dataIniziale);
    stampaFestivi(dataIniziale);
    stampaNomeGiorni(dataIniziale);

    $('.mese-succ').click(function(){
        $('.mese-prec').prop('disabled', false);
        if (dataIniziale.isSameOrAfter(limiteFinale)) {
            $('.mese-succ').prop('disabled', true);
        }else {
            dataIniziale.add(1, 'month');
            stampaGiorniMese(dataIniziale);
            stampaFestivi(dataIniziale);
        }

        // if (dataIniziale.month() > 10) {
        //     alert('Anno successivo non presente')
        // }else {
        //     dataIniziale.add(1, 'months'); //passare al mese successivo
        //     stampaGiorniMese(dataIniziale);
        //     stampaFestivi(dataIniziale);
        // }
    });

    $('.mese-prec').click(function(){
        // if (dataIniziale.month() <= 0) {                  //Metodo di controllo inizio e fine anno
        //     alert('Anno precedente non presente')
        // }else {
        //     dataIniziale.subtract(1, 'months'); //passare al mese precedente
        //     stampaGiorniMese(dataIniziale);
        //     stampaFestivi(dataIniziale);
            // }

            $('.mese-succ').prop('disabled', false);
            if (dataIniziale.isSameOrBefore(limiteIniziale)) { //Altro metodo di controllo inizio fine anno
                $('.mese-prec').prop('disabled', true);
            }else {
                dataIniziale.subtract(1, 'months'); //passare al mese precedente
                stampaGiorniMese(dataIniziale);
                stampaFestivi(dataIniziale);
            }
    });

    function stampaNomeGiorni(mese){
        $('#days').empty();
        var nomeGiorno = mese.days();
        console.log(nomeGiorno);
    };

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

    function stampaFestivi(meseCorrente){
        $.ajax({
            url: 'https://flynn.boolean.careers/exercises/api/holidays',
            method: 'GET',
            data: {
                year:2018,
                month:meseCorrente.month()
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
