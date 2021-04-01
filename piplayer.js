document.onload = getFilms();

function getFilms() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            films = JSON.parse(this.responseText);
            var ihtml = "";
            for (var film of films) {
                var newline = "<option value='" + film["url"] + "'>" + film["name"] + "</option>\n";
                ihtml += newline;
            }
            document.getElementById("cb").innerHTML = ihtml;
            selectFilm();
        }
    };
    xhttp.open("GET", "api", true);
    xhttp.send();
}

function selectFilm() {
    var filmUrl = document.getElementById("cb").value;
    var ihtml = "<video controls='controls' width='800' height='450' src='" + filmUrl + "'></video>";
    document.getElementById("player").innerHTML = ihtml;
}


var app = angular.module("ppApp", []); 
app.controller("ppCtrl", function($scope) {
    $scope.firstName = "John";
    $scope.lastName = "Doe";
  });