

$(window).on('load', function () {
    countrydata();
    worlddata();
});


const formatter = new Intl.NumberFormat();

function worlddata() {
    url = "https://disease.sh/v3/covid-19/all";
    $.getJSON(url, function (data) {
        $('.world-cases').html(formatter.format(data.cases));
        $('.world-deaths').html(formatter.format(data.deaths));
        $('.world-recovered').html(formatter.format(data.recovered));
    });
}

function countrydata() {
    url = "https://disease.sh/v3/covid-19/countries";

    $.getJSON(url, function (data) {

        table = document.getElementById('covid-table');
        for (i = 1; i < (data.length); i++) {
            var x = table.insertRow();

            x.insertCell(0);
            table.rows[i].cells[0].innerHTML = i;

            x.insertCell(1);
            table.rows[i].cells[1].innerHTML = data[i - 1].country;

            x.insertCell(2);
            table.rows[i].cells[2].innerHTML = formatter.format(data[i - 1].cases);
            table.rows[i].cells[2].style.textAlign = "right";


            x.insertCell(3);
            if (data[i - 1].todayCases === 0) {
                table.rows[i].cells[3].innerHTML = "";
            } else {
                table.rows[i].cells[3].innerHTML = "+" + formatter.format(data[i - 1].todayCases);
                table.rows[i].cells[3].style.color = "rgb(255 182 0)";
                table.rows[i].cells[3].style.fontWeight = "900";
            }
            table.rows[i].cells[3].style.textAlign = "right";

            x.insertCell(4);
            table.rows[i].cells[4].innerHTML = formatter.format(data[i - 1].deaths);
            table.rows[i].cells[4].style.textAlign = "right";

            x.insertCell(5);
            table.rows[i].cells[5].innerHTML = formatter.format(data[i - 1].todayDeaths);
            if (data[i - 1].todayDeaths === 0) {
                table.rows[i].cells[5].innerHTML = "";
            } else {
                table.rows[i].cells[5].innerHTML = "+" + formatter.format(data[i - 1].todayDeaths);
                table.rows[i].cells[5].style.color = "red";
                table.rows[i].cells[5].style.fontWeight = "900";
            }
            table.rows[i].cells[5].style.textAlign = "right";

            x.insertCell(6);
            table.rows[i].cells[6].innerHTML = formatter.format(data[i - 1].recovered);
            table.rows[i].cells[6].style.textAlign = "right";

            x.insertCell(7);
            table.rows[i].cells[7].innerHTML = formatter.format(data[i - 1].active);
            if (data[i - 1].active === 0) {
                table.rows[i].cells[7].innerHTML = "";
            }
            table.rows[i].cells[7].style.textAlign = "right";

            x.insertCell(8);
            table.rows[i].cells[8].innerHTML = formatter.format(data[i - 1].critical);
            if (data[i - 1].critical === 0) {
                table.rows[i].cells[8].innerHTML = "";
            }
            table.rows[i].cells[8].style.textAlign = "right";
        }
    });
}
