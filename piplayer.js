document.onload = start();

function start() {
    obj = getFilms("", "nav");
    // document.getElementById("river.mp4").click();
}

function setVisibility(cb) {
    if (cb.checked) {
        getFilms(cb.id, cb.id);
    } else {
        var children = cb.parentElement.children;
        Array.from(children).forEach(div => {
            if (div.nodeName == "DIV") {
                div.style.display = "none";
            }
        });
    }
}

function getFilms(dir, id) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var obj =  JSON.parse(this.responseText);
            document.getElementById(id).innerHTML = tree(obj);
        }
    };
    var req = dir.slice(6);
    xhttp.open("GET", "api?dir=" + req, true);
    xhttp.send();
}

function tree(obj) {
    var ihtml = "";
    for (var item of obj) {
        var newlines = "";
        newlines += "<div class='navItem'>\n";
        if (item.type == "directory") {
            newlines += "<input type='checkbox' onchange='setVisibility(this)' id='" 
                + item.url + "' value='" + item.url + "'></input>\n";
            newlines += "<label class='dirLabel' for='" + item.url + "'>" + item.name + "</label>\n";
        }
        else {
            newlines += "<input type='radio' onchange='selectFilm()' id='" 
                + item.url + "' name='file' value='" + item.url + "'></input>\n";
            newlines += "<label class='fileLabel' for='" + item.url + "'>" + item.name + "</label>\n";
        }
        newlines += "</div>\n";
        ihtml += newlines;
    }
    return ihtml;
}

function selectFilm() {
    filmUrl = document.querySelector('input[name="file"]:checked').value;
    var ihtml = "<video id='video' controls='controls' width='800' height='450' src='" + filmUrl + "' autoplay></video>";
    document.getElementById("player").innerHTML = ihtml;
}
