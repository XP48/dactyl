document.getElementById("cool-pol").addEventListener("focus", function(event) {
    document.getElementById("phrase").style.filter = 'blur(3px)';
    document.getElementById("focus").style.display = 'flex';
});

document.getElementById("cita-select").addEventListener("focus", function(event) {
    document.getElementById("phrase").style.filter = 'blur(3px)';
    document.getElementById("focus").style.display = 'flex';
});

document.getElementById("cool-fond").addEventListener("focus", function(event) {
    document.getElementById("phrase").style.filter = 'blur(3px)';
    document.getElementById("focus").style.display = 'flex';
});

document.getElementById("cool-pol").addEventListener("blur", function(event) {
    document.getElementById("phrase").style.filter = 'blur(0)';
    document.getElementById("focus").style.display = 'none';
    console.log("8")
});

document.getElementById("cita-select").addEventListener("blur", function(event) {
    document.getElementById("phrase").style.filter = 'blur(0)';
    document.getElementById("focus").style.display = 'none';
});

document.getElementById("cool-fond").addEventListener("blur", function(event) {
    document.getElementById("phrase").style.filter = 'blur(0)';
    document.getElementById("focus").style.display = 'none';
});
