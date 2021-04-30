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
            if (id == "nav") {
                document.getElementById(id).innerHTML = tree(obj);
            } else {
                document.getElementById(id).parentElement.innerHTML = checkBox(id) + tree(obj);
            }
        }
    };
    var req = dir.slice(6);
    xhttp.open("GET", "api?dir=" + req, true);
    xhttp.send();
}

function checkBox(id) {
    var newlines = "<input type='checkbox' onchange='setVisibility(this)' id='" 
        + id + "' value='" + id + "'></input>\n";
    var split = id.toString().split("/");
    var name = split[split.length - 1];
    newlines += "<label class='dirLabel' for='" + id + "'>" + name + "</label>\n";
    newlines += "<div class='child'></div>";
    return newlines;
}

function tree(obj) {
    var ihtml = "";
    for (var item of obj) {
        var newlines = "";
        newlines += "<div class='navItem'>\n";
        if (item.type == "directory") {
            newlines += checkBox(item.url);
        } else {
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
