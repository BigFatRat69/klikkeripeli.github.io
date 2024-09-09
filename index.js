let rahaElement = document.querySelector('.rahaSumma');
let voima = document.querySelector('.voima');
let nopeus = document.querySelector('.nopeus');
let superNopeus = document.querySelector('.superNopeus');
let rpsElementti = document.querySelector('.rahaaSekunnissa');
let voittoNappi = document.querySelector('.voittoNappi');
let modifier = 1;
let nopeusModifier = 1;
let superNopeusModifier = 10;
let rps = 0;

function createCoinSplash() {
    const container = document.querySelector('.coin-splash-container');
    if (!container) return;
  
    const coinCount = 10;
    
    for (let i = 0; i < coinCount; i++) {
        setTimeout(() => {
            const coin = document.createElement('div');
            coin.classList.add('coin');
            
            const angle = Math.random() * Math.PI * 2;
            const distance = 50 + Math.random() * 100;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            
            coin.style.setProperty('--tx', `${tx}px`);
            coin.style.setProperty('--ty', `${ty}px`);
            
            container.appendChild(coin);
            
            coin.addEventListener('animationend', () => {
                coin.remove();
            });
        }, i * 50);
    }
}

function tallennus() {
    localStorage.setItem("rahaAvain", parseFloat(rahaElement.textContent));  
    localStorage.setItem("nopeusAvain", nopeusModifier);  
    localStorage.setItem("superNopeusAvain", superNopeusModifier);  
    localStorage.setItem("klikkiVoimaAvain", modifier);  

    localStorage.setItem("voimaHinta", document.querySelector('.voimaHinta').textContent); 
    localStorage.setItem("nopeusHinta", document.querySelector('.nopeusHinta').textContent); 
    localStorage.setItem("superNopeusHinta", document.querySelector('.superNopeusHinta').textContent); 

    localStorage.setItem("voimaLevel", voima.textContent);
    localStorage.setItem("nopeusLevel", nopeus.textContent);
    localStorage.setItem("superNopeusLevel", superNopeus.textContent);
}

function palautus() {
    let savedRaha = parseFloat(localStorage.getItem("rahaAvain"));
    let savedNopeusModifier = parseFloat(localStorage.getItem("nopeusAvain"));
    let savedSuperNopeusModifier = parseFloat(localStorage.getItem("superNopeusAvain"));
    let savedModifier = parseFloat(localStorage.getItem("klikkiVoimaAvain"));

    if (!isNaN(savedRaha)) rahaElement.textContent = Math.round(savedRaha);
    if (!isNaN(savedNopeusModifier)) nopeusModifier = savedNopeusModifier;
    if (!isNaN(savedSuperNopeusModifier)) superNopeusModifier = savedSuperNopeusModifier;
    if (!isNaN(savedModifier)) modifier = savedModifier;

    let savedVoimaHinta = localStorage.getItem("voimaHinta");
    let savedNopeusHinta = localStorage.getItem("nopeusHinta");
    let savedSuperNopeusHinta = localStorage.getItem("superNopeusHinta");

    if (savedVoimaHinta) document.querySelector('.voimaHinta').textContent = savedVoimaHinta;
    if (savedNopeusHinta) document.querySelector('.nopeusHinta').textContent = savedNopeusHinta;
    if (savedSuperNopeusHinta) document.querySelector('.superNopeusHinta').textContent = savedSuperNopeusHinta;

    let savedVoimaLevel = localStorage.getItem("voimaLevel");
    let savedNopeusLevel = localStorage.getItem("nopeusLevel");
    let savedSuperNopeusLevel = localStorage.getItem("superNopeusLevel");

    if (savedVoimaLevel) voima.textContent = savedVoimaLevel;
    if (savedNopeusLevel) nopeus.textContent = savedNopeusLevel;
    if (savedSuperNopeusLevel) superNopeus.textContent = savedSuperNopeusLevel;

    if (nopeusModifier > 1) {
        setInterval(function () {
            rahanPaivitys(1 * nopeusModifier);
        }, 1000);
    }

    if (superNopeusModifier > 10) {
        setInterval(function () {
            rahanPaivitys(1 * superNopeusModifier);
        }, 1000);
    }

    rahaPerSekuntti();
}

function rahanPaivitys(summa) {
    const currentMoney = parseFloat(rahaElement.textContent);
    const newMoney = currentMoney + summa;
    rahaElement.textContent = Math.round(newMoney);
    createCoinSplash();
    tallennus();  
}

function rahaPerSekuntti() {
    rps = nopeusModifier + superNopeusModifier;
    rpsElementti.innerHTML = Math.round(rps);
    if (rps >= 400 && !document.querySelector('.voitonNappi')) {
        luoVoittonappi();
    }
}



function luoVoittonappi() {
    let button = document.createElement('button');
    button.innerHTML = 'Voitto!';
    button.classList.add('voitonNappi');
    button.addEventListener('click', function() {
        alert('VOITIT!!!');
        window.localStorage.clear();


        setTimeout(function() {
            location.reload();
        }, 100); 
    });
    voittoNappi.appendChild(button);
}

function rahanLisays() {
    rahanPaivitys(1 * modifier);
}

function klikkiVoima() {
    let hintaElement = document.querySelector('.voimaHinta');
    let hinta = parseFloat(hintaElement.innerHTML.replace('hinta: ', ''));
    
    if (parseFloat(rahaElement.textContent) >= hinta) {
        rahaElement.textContent = Math.round(parseFloat(rahaElement.textContent) - hinta);
        modifier *= 1.5;
        voima.innerHTML = (parseFloat(voima.innerHTML) + 1);
        let newHinta = Math.round(hinta * 1.5);
        hintaElement.innerHTML = 'hinta: ' + newHinta;
        tallennus();  
    }
}

function autoKlikkeri() {
    let hintaElement = document.querySelector('.nopeusHinta');
    let hinta = parseFloat(hintaElement.innerHTML.replace('hinta: ', ''));

    if (parseFloat(rahaElement.textContent) >= hinta) {
        rahaElement.textContent = Math.round(parseFloat(rahaElement.textContent) - hinta);
        nopeusModifier *= 1.5;
        let newHinta = Math.round(hinta * 1.5);
        hintaElement.innerHTML = 'hinta: ' + newHinta;
        nopeus.innerHTML = (parseFloat(nopeus.innerHTML) + 1);
        setInterval(function() {
            rahanPaivitys(1 * nopeusModifier);
        }, 1000);
        rahaPerSekuntti();
        tallennus();  
    }
}

function superAutoKlikkeri() {
    let hintaElement = document.querySelector('.superNopeusHinta');
    let hinta = parseFloat(hintaElement.innerHTML.replace('hinta: ', ''));

    if (parseFloat(rahaElement.textContent) >= hinta) {
        rahaElement.textContent = Math.round(parseFloat(rahaElement.textContent) - hinta);
        superNopeusModifier *= 1.6;
        let newHinta = Math.round(hinta * 1.5);
        hintaElement.innerHTML = 'hinta: ' + newHinta;
        superNopeus.innerHTML = (parseFloat(superNopeus.innerHTML) + 1);
        setInterval(function() {
            rahanPaivitys(1 * superNopeusModifier);
        }, 1000);
        rahaPerSekuntti();
        tallennus(); 
    }
}

document.addEventListener('DOMContentLoaded', function() {
    palautus();  
});
