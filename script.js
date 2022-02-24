//Modell
const Piano = ['c3.mp3', 'c-3.mp3', 'd3.mp3', 'd-3.mp3', 'e3.mp3', 'f3.mp3',
    'f-3.mp3', 'g3.mp3', 'g-3.mp3', 'a4.mp3', 'a-4.mp3', 'b4.mp3', 'c4.mp3'
]
const Piano2 = ['c4.mp3', 'c-4.mp3', 'd4.mp3', 'd-4.mp3', 'e4.mp3', 'f4.mp3',
    'f-4.mp3', 'g4.mp3', 'g-4.mp3', 'a5.mp3', 'a-5.mp3', 'b5.mp3', 'c5.mp3'
]
const Tromme = ['cymbal1.wav', 'cymbal2.wav', 'cymbal3.wav', 'cymbal4.wav',
    'cymbal5.wav', 'cymbal6.wav', 'cymbal7.wav', 'cymbal8.wav', 'kick1.wav',
    'kick2.wav', 'snare1.wav', 'snare2.wav', 'tom1.wav', 'tom2.wav', 'tom3.wav', 'tom4.wav',
]
const TrommeNavn = ['Cymbal1', 'Cymbal2', 'Cymbal3', 'Cymbal4', 'Cymbal5', 'Cymbal6', 'Cymbal7', 'Cymbal8',
    'Kick1', 'Kick2', 'Snare1', 'Snare2', 'Tom1', 'Tom2', 'Tom3', 'Tom4',
]
const PianoNavn = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C']

const Taster = ['a', 'w', 's', 'e', 'd', 'f', 't', 'g', 'y', 'h', 'u', 'j', 'k']
const TrommeTaster = ['1', '2', '3', '4', 'q', 'w', 'e', 'r', 'a', 's', 'd', 'f', 'z', 'x', 'c', 'v'];

let ActiveSound = Piano;
let instrument = 'piano'


//View
show(instrument);

function show(inst) {
    const app = document.getElementById('app');
    app.innerHTML = /*HTML*/ `
    <div class="instrument-select">
        <button class='pianoknapp' onclick="changeInstrument('piano')"></button>
        <button class='trommeknapp' onclick="changeInstrument('launchpad')"></button>
    </div>
    <div id="buttons" ></div>
  `;

    let buttons = document.getElementById('buttons')
    if (inst == "piano") {
        if (buttons.classList.contains('trommer')) {
            buttons.classList.remove('trommer')
        }
        buttons.classList.add('ramme')
            //Går igjennom ActiveSound arrayen og for hver string legger til en button i HTML buttons.
        for (let i = 0; i < ActiveSound.length; i++) {
            const name = PianoNavn[i];
            const button = Piano[i];

            //Hvis stringen er på lengde 7 så legger den til en ekstra class med "black".
            if (button.length === 7) {
                buttons.innerHTML += `<button class="tangent black" onclick="playSound('${i}')">${name}</button>`
            } else {
                buttons.innerHTML += `<button class="tangent" onclick="playSound('${i}')">${name}</button>`
            }
        }
    } else if (inst == 'launchpad') {
        if (buttons.classList.contains('ramme')) {
            buttons.classList.remove('ramme')
        }
        buttons.classList.add('trommer')

        for (let i = 0; i < ActiveSound.length; i++) {
            let first = i % 4 == 0 ? 'first' : ''; // % Modulus || in computing, the modulo operation returns the remainder or signed remainder of a division, after one number is divided by another (called the modulus of the operation).
            buttons.innerHTML += `<button onclick="playSound('${i}')" class="tromme ${first}">${TrommeNavn[i]}</button>`;

        }

    }

}

//Controller
window.addEventListener('keydown', function(e) {
    if (instrument == "piano") {
        if (e.shiftKey) {
            if (ActiveSound == Piano) {
                ActiveSound = Piano2
            }
        }

        if (Taster.includes(e.key.toLowerCase())) {
            playSound(Taster.indexOf(e.key.toLowerCase()))
            let buttons = document.getElementById('buttons').children
            buttons[Taster.indexOf(e.key.toLowerCase())].focus();

        }
    }

    if (instrument == "launchpad") {
        if (TrommeTaster.includes(e.key.toLowerCase())) {
            playSound(TrommeTaster.indexOf(e.key.toLowerCase()))
            let buttons = document.getElementById('buttons').children
            console.log(buttons[TrommeTaster.indexOf(e.key.toLowerCase())])
            buttons[TrommeTaster.indexOf(e.key.toLowerCase())].focus();

        }
    }

})

window.addEventListener('keyup', function(e) {
    document.activeElement.blur()
    if (instrument == 'piano') {
        if (e.key == "Shift") {
            if (ActiveSound == Piano2) {
                ActiveSound = Piano
                console.log(e.key)
            }
        }
    }
})


function playSound(gittIndex) {
    let sound = new Audio(`mp3Notes/${ActiveSound[gittIndex]}`) //<audio src=""></audio> https://stackoverflow.com/questions/9419263/how-to-play-audio
    sound.play()
    document.activeElement.blur();
}

function changeInstrument(inst) {
    instrument = inst;
    if (inst == "launchpad") {
        ActiveSound = Tromme;
    }

    if (inst == "piano") {
        ActiveSound = Piano;
    }
    show(instrument);
}