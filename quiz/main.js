
window.addEventListener("load", function () {
    showLoadingScreen();
    

    setTimeout(function () {
        hideLoadingScreen();
    }, 4000);  
});
function showLoadingScreen() {
    document.getElementById("loading-screen").style.display = "flex";  // Show the loading screen
}

// Hide loading screen
function hideLoadingScreen() {
    document.getElementById("loading-screen").style.display = "none";  // Hide the loading screen
}

var fs = document.getElementsByTagName('fieldset');
var n = 0;


function start() {
    const name = document.getElementById("name").value;
    if (!name) {
        alert("Please enter your name before starting the quiz.");
        return;
    }

    document.getElementsByTagName("section")[0].style.display = "none";  
    document.getElementsByTagName("form")[0].style.display = "block";    
    document.getElementsByTagName("audio")[0].play();                 
    document.getElementsByTagName("h3")[0].style.display = "none";       

    fs[n].style.display = "flex";  
    updateButtons();               
}


function prv() {
    if (n > 0) {
        fs[n].style.display = "none";
        fs[n - 1].style.display = "flex";
        n -= 1;
        updateButtons();
    }
}


function nxt() {
    if (n < fs.length - 1) {
        fs[n].style.display = "none";
        fs[n + 1].style.display = "flex";
        n += 1;
        updateButtons();
    }
}


function updateButtons() {
    const prevBtn = document.getElementsByTagName("button")[1];  
    const nextBtn = document.getElementsByTagName("button")[2];  
    const submitBtn = document.getElementById("submit-btn");     

    if (n === 0) {
        prevBtn.style.display = "none";  
    } else {
        prevBtn.style.display = "inline-block"; 
    }

    if (n === fs.length - 1) {
        nextBtn.style.display = "none";         
        submitBtn.style.display = "inline-block"; 
    } else {
        nextBtn.style.display = "inline-block";  
        submitBtn.style.display = "none";        
    }
}

function save(event) {
    event.preventDefault(); 
    showLoadingScreen();     

    let sum = 0;
    for (let i = 0; i < fs.length; i++) {
        let selection = fs[i].querySelector('input[type="radio"]:checked');
        if (selection) {
            sum += parseInt(selection.value);  
        } else {
            alert("Please answer all questions before submitting.");
            hideLoadingScreen();  
            return;
        }
    }

    const characters = [
        { max: 180, name: "Shinobu Kocho" },
        { max: 240, name: "Kyojuro Rengoku" },
        { max: 300, name: "Tengen Uzui" },
        { max: 370, name: "Giyu Tomioka" },
        { max: 420, name: "Muichiro Tokito" },
        { max: 480, name: "Mitsuri Kanroji" }
    ];


    let character = characters.find(c => sum <= c.max)?.name || "Unknown Character";

    
    sessionStorage.setItem("totalScore", sum);
    sessionStorage.setItem("character", character);

    setTimeout(() => {
        hideLoadingScreen();  
        window.location.href = "result/index.html";  
    }, 3000); 
}
