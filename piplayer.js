document.onload = getFilms();

function getFilms() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            films = JSON.parse(this.responseText);
            document.getElementById("nav").innerHTML = tree(films);
            document.getElementById("river.mp4").click();
        }
    };
    xhttp.open("GET", "api", true);
    xhttp.send();
}

function tree(obj) {
    var ihtml = "";
    for (var item of obj) {
        var newlines = "";
        newlines += "<div class='navItem'>\n";
        if (typeof item.url == "undefined") {
            newlines += "<input type='checkbox' onchange='setVisibility(this)' id='" 
                + item.name + "' value='" + item.url + "'></input>\n";
            newlines += "<label for='" + item.name + "'>" + item.name + "</label>\n";
            newlines += tree(item.content);
        }
        else {
            newlines += "<input type='radio' onchange='selectFilm()' id='" 
                + item.name + "' name='file' value='" + item.url + "'></input>\n";
            newlines += "<label for='" + item.name + "'>" + item.name + "</label>\n";
        }
        newlines += "</div>\n";
        ihtml += newlines;
    }
    return ihtml;
}

function setVisibility(cb) {
    var children = cb.parentElement.children;
    Array.from(children).forEach(div => {
        if (div.nodeName == "DIV") {
            if (cb.checked) {
                div.style.display = "block";
            } else {
                div.style.display = "none";
            }
        }
    });
}

function selectFilm() {
    filmUrl = document.querySelector('input[name="file"]:checked').value;
    var ihtml = "<video controls='controls' width='800' height='450' src='" + filmUrl + "'></video>";
    document.getElementById("player").innerHTML = ihtml;
}
