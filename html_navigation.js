
function change_to_p5() {
    var x = document.getElementById("all");
      x.style.display = "none";
  } 
function show_html() {
    document.getElementById("all").style.display = "block";
}

function about_me() {
    document.getElementById("AM").style.textDecoration = "underline";
    document.getElementById("P").style.textDecoration = "none";
    document.getElementById("about_me").style.display = "block";
    document.getElementById("projects").style.display = "none";
    setup();
    //console.log(document.getElementById("about_me").style.display === "block");
    }

function projects() {
    document.getElementById("AM").style.textDecoration = "none";
    document.getElementById("P").style.textDecoration = "underline";
    document.getElementById("about_me").style.display = "none";
    document.getElementById("projects").style.display = "block";
    setup();
    //onsole.log(document.getElementById("about_me").style.display === "block");
    }
