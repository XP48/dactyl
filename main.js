window.addEventListener('load', function() {
    document.getElementById("loader").play()
})

const keysByLetter = {
    'a': 65, 'à': 48, 'b': 66, 'c': 67, 'ç': 57, 'd': 68, 'e': 69, 'é': 50, 'è': 55, 'f': 70, 'g': 71, 'h': 72, 'i': 73, 'j': 74,
    'k': 75, 'l': 76, 'm': 77, 'n': 78, 'o': 79, 'p': 80, 'q': 81, 'r': 82, 's': 83, 't': 84,
    'u': 85, 'v': 86, 'w': 87, 'x': 88, 'y': 89, 'z': 90, 'A': 65, 'B': 66, 'C': 67, 'D': 68,
    'E': 69, 'F': 70, 'G': 71, 'H': 72, 'I': 73, 'J': 74, 'K': 75, 'L': 76, 'M': 77, 'N': 78,
    'O': 79, 'P': 80, 'Q': 81, 'R': 82, 'S': 83, 'T': 84, 'U': 85, 'V': 86, 'W': 87, 'X': 88,
    'Y': 89, 'Z': 90, ' ': 32, ',': 188, '.': 190, ';': 190, '-': 54, '!': 223, '?': 191, "'": 52
  };

function nb_random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

fetch('citations.json').then(reponse => reponse.json()).then(data => {

    let etapes = 0
    let nb_etape = 0
    let animationduration = 0.1
    let started
    let debut = 0
    let exo
    let fautes

    function display(nb_cita) {

        started = false
        nb_etape = 0
        let citation = data[nb_cita]
        exo = citation.citation
        etapes = exo.split('')
        fautes = 0
        
        
        document.getElementById('sujet').innerHTML = '<p class="cit">“</p>'
        for (let nb = 0; nb < (etapes.length); nb++){
            document.getElementById('sujet').innerHTML += `<span id='s${nb}'>${etapes[nb]}</span>`
        }
        document.getElementById('sujet').innerHTML += `<span id='s${etapes.length}'></span>`
        document.getElementById('cita-select').innerHTML = `<option value="">${citation.auteur}</option>`
        for (let nb = 0; nb < data.length; nb++){
            document.getElementById('cita-select').innerHTML += `<option value="${data[nb].auteur}">${data[nb].auteur}</option>`
        }
        document.getElementById('s0').classList.add("cursor")
        document.getElementById('sujet').innerHTML += `<p class="cit">”</p>`
        document.getElementById('infos').textContent = `${citation.auteur} | ${exo.length} caractères`
        document.getElementById('result').textContent = ''
    }

    
    document.addEventListener('keydown', function(event) {
        console.log(event.keyCode)
        if(started == false){
            debut = new Date()
            started = true
            // document.getElementById('s0').classList.remove("cursor")
        }
        if(event.keyCode !== keysByLetter[etapes[0]] && Object.values(keysByLetter).includes(event.keyCode) ){
            document.getElementById('sujet').style.animation = `erreur ${animationduration}s linear 1`
            fautes ++
        }
        document.getElementById("sujet").addEventListener("animationend", function() {
            document.getElementById('sujet').style.animation = null;
        });
        if(event.keyCode === keysByLetter[etapes[0]]){
            document.getElementById(`s${nb_etape}`).style.color = '#f1f1f1'
            document.getElementById(`s${nb_etape}`).classList.remove("cursor")
            document.getElementById(`s${nb_etape+1}`).classList.add("cursor")
            etapes.shift()
            if(etapes.length === 0){
                const fin = new Date()
                const perf = (fin - debut)/60000
                document.getElementById('result').textContent = `${fautes} faute(s) | Vitesse de frappe : ${Math.floor(Math.floor((exo.length)/5) / perf)} mpm`;
            }
            nb_etape++
        }
    });
    
    setTimeout(() => {
        document.getElementById("loader").style.animation = 'disparition 0.7s 1 linear'
        document.getElementById("loading").style.animation = 'disparition 0.7s 1 linear'
        document.getElementById("loading").addEventListener("animationend", function() {
            this.style.display = 'none';
        });
        document.getElementById("loader").addEventListener("animationend", function() {
            this.style.display = 'none';
        });
        display(nb_random(0, data.length))
      }, 4000);

    
    document.addEventListener("input", function(event) {
        if(event.target.name === "couleur-police") {
            document.getElementById("sujet").style.color = event.target.value;            
            document.getElementById("cita-select").style.backgroundColor = event.target.value; 
            document.getElementById('infos').style.color = event.target.value;
            document.getElementById('result').style.color = event.target.value;
        }
        if(event.target.name === "couleur-fond") {
            document.getElementById("container").style.backgroundColor = event.target.value;
            document.getElementById("cita-select").style.color = event.target.value;     
        }
        display(data.findIndex(elem => elem.auteur === event.target.value))
    });

}).catch(error => console.log(error))