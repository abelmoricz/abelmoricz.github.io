function change_to_p5() {
    var x = document.getElementById("all");
      x.style.display = "none";
      

  } 


function about_me() {
    var about_me = document.getElementById("about_me");
    var projects = document.getElementById("projects");
    var AM = document.getElementById("AM");
    var P = document.getElementById("P");

    AM.style.textDecoration = "underline";
    P.style.textDecoration = "none";
    about_me.style.display = "block";
    projects.style.display = "none";
    }

function projects() {
    var about_me = document.getElementById("about_me");
    var projects = document.getElementById("projects");
    var AM = document.getElementById("AM");
    var P = document.getElementById("P");

    AM.style.textDecoration = "none";
    P.style.textDecoration = "underline";
    
    about_me.style.display = "none";
    projects.style.display = "block";
    }
