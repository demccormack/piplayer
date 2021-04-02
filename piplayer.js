document.onload = getFilms();

function getFilms() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            films = JSON.parse(this.responseText);
            document.getElementById("nav").innerHTML = tree(films);
            selectFilm();
        }
    };
    xhttp.open("GET", "api", true);
    xhttp.send();
}

function tree(obj) {
    var ihtml = "";
    for (var item of obj) {
        var newlines = "";
        if (typeof item.url == "undefined") {
            newlines += "<div>\n";
            newlines += "<input type='checkbox' id='" + item.name + "' value='" + item.url + "'></input>\n";
            newlines += "<label for='" + item.name + "'>" + item.name + "</label>\n";
            newlines += "<div class='sublist'>\n";
            newlines += tree(item.content);
            newlines += "</div>\n";
            newlines += "</div>\n";
        }
        else {
            newlines += "<input type='radio' onchange='selectFilm()' id='" + item.name + "' name='file' value='" + item.url + "'></input>\n";
            newlines += "<label for='" + item.name + "'>" + item.name + "</label>\n";
        }
        ihtml += newlines;
    }
    return ihtml;
}

function selectFilm() {
    filmUrl = document.querySelector('input[name="file"]:checked').value;
    var ihtml = "<video controls='controls' width='800' height='450' src='" + filmUrl + "'></video>";
    document.getElementById("player").innerHTML = ihtml;
}
