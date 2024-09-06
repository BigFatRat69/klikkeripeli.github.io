let raha = document.querySelector('.rahaSumma');
let voima = document.querySelector('.voima');
let nopeus = document.querySelector('.nopeus')
let superNopeus = document.querySelector('.superNopeus');
let rpsElementti = document.querySelector('.rahaaSekunnissa')
let voittoNappi = document.querySelector('.voittoNappi');
let modifier = 1;
let nopeusModifier = 1;
let superNopeusModifier = 10;
let rps = 0;

function rahaPerSekuntti(){
    rps = nopeusModifier + superNopeusModifier;
    rpsElementti.innerHTML = Math.round(rps);
    if (rps >= 400 && !document.querySelector('.voitonNappi')){
        luoVoittonappi()
    }
}

function luoVoittonappi(){
    let button = document.createElement('button');
    button.innerHTML = 'Voitto!';
    button.classList.add('voitonNappi');
    button.addEventListener('click', function() {
        alert('VOITIT!!!');
        location.reload();
    });

    voittoNappi.appendChild(button); 
}

function cheat(){
    raha.innerHTML = (parseFloat(raha.innerHTML) + 1000);
}

function rahanLisays(){
    raha.innerHTML = Math.round(parseFloat(raha.innerHTML) + 1 * modifier);
}

function klikkiVoima(){
    let hintaElement = document.querySelector('.voimaHinta');
    let hinta = parseFloat(hintaElement.innerHTML.replace('hinta: ', ''));
    
    if (parseFloat(raha.innerHTML) >= hinta) {
        raha.innerHTML = Math.round(parseFloat(raha.innerHTML) - hinta);
        modifier *= 1.5;
        voima.innerHTML = (parseFloat(voima.innerHTML) + 1);
        let newHinta = Math.round(hinta * 1.5);
        hintaElement.innerHTML = 'hinta: ' + newHinta;
    }
}

function autoKlikkeri() {
    let hintaElement = document.querySelector('.nopeusHinta');
    let hinta = parseFloat(hintaElement.innerHTML.replace('hinta: ', ''));

    if (parseFloat(raha.innerHTML) >= hinta) {
        raha.innerHTML = Math.round(parseFloat(raha.innerHTML) - hinta);
        nopeusModifier *= 1.5
        let newHinta = Math.round(hinta * 1.5);
        hintaElement.innerHTML = 'hinta: ' + newHinta;
        nopeus.innerHTML = (parseFloat(nopeus.innerHTML) + 1);
        setInterval(function() {
            raha.innerHTML = Math.round(parseFloat(raha.innerHTML) + 1 * nopeusModifier);
        }, 1000);

        rahaPerSekuntti();
    }
}

function superAutoKlikkeri() {
    let hintaElement = document.querySelector('.superNopeusHinta');
    let hinta = parseFloat(hintaElement.innerHTML.replace('hinta: ', ''));

    if (parseFloat(raha.innerHTML) >= hinta) {
        raha.innerHTML = Math.round(parseFloat(raha.innerHTML) - hinta);
        superNopeusModifier *= 1.6
        let newHinta = Math.round(hinta * 1.5);
        hintaElement.innerHTML = 'hinta: ' + newHinta;
        superNopeus.innerHTML = (parseFloat(superNopeus.innerHTML) + 1);
        setInterval(function() {
            raha.innerHTML = Math.round(parseFloat(raha.innerHTML) + 1 * superNopeusModifier);
        }, 1000);
    }
        rahaPerSekuntti();
}
