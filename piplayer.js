window.onload = function() {
    play("media/Films/river.mp4");
    getMedia("nav");
};

function cbClick(cb) {
    if (cb.checked) {
        if (document.getElementById(cb.id).parentElement.lastChild.innerHTML == "") {
            getMedia(cb.id);
        }
        document.getElementById(cb.id).parentElement.lastChild.style.display = "block";
    } else {
        document.getElementById(cb.id).parentElement.lastChild.style.display = "none";
    }
}

function getMedia(dir) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var obj =  JSON.parse(this.responseText);
            if (dir == "nav") {
                document.getElementById("nav").innerHTML = tree(obj);
            } else {
                document.getElementById(dir).parentElement.lastChild.innerHTML = tree(obj);
            }
        }
    };
    req = dir.slice(6);
    xhttp.open("GET", "api?dir=" + req, true);
    xhttp.send();
}

function tree(obj) {
    var ihtml = "";
    for (var item of obj) {
        var id = item.url;
        var name = item.name;

        newlines = "<div class='navItem'>\n";
        if (item.type == "directory") {
            newlines += "<input type='checkbox' onchange='cbClick(this)' id='" 
                + id + "' value='" + id + "'></input>\n";
            newlines += "<label class='dirLabel' for='" + id + "'>" + name + "</label>\n";
            newlines += "<div></div>";
        } else {
            newlines += "<input type='radio' onchange='selectMedia()' id='" 
                + id + "' name='file' value='" + id + "'></input>\n";
            newlines += "<label class='fileLabel' for='" + id + "'>" + name + "</label>\n";
        }
        newlines += "</div>\n";

        ihtml += newlines;
    }
    return ihtml;
}

function selectMedia() {
    url = document.querySelector('input[name="file"]:checked').value;
    play(url);
}

function play(url) {
    var ihtml = "<video id='video' controls='controls' width='800' height='450' src='" + url + "' autoplay></video>";
    document.getElementById("player").innerHTML = ihtml;
}