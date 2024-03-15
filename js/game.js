const gamerForm = document.getElementById('gamerName');

gamerForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let gamerName = event.target[0].value;
    let gamerPass = event.target[1].value;

    let isUser = false;
    for (const gamer of gamersData) {
        if (gamer.name == gamerName) {
            if (gamerPass == gamer.password) {
                localStorage.setItem('Gamer', JSON.stringify(gamer));
                isUser = true;
                alert("Welcome " + gamer.name + "!");
                window.location.reload();
            } else {
                alert('Wrong password');
            }
        } else {
            isUser = false;
        }
    }

    if (!isUser) {
        let isRegistered = confirm('Do you want to create a new gamer?');

        if (isRegistered) {
            let newGamer = new gamerData(gamerName, gamerPass);
            newGamer.save();
        }
    }
})

function logout() {
    localStorage.removeItem('Gamer');
    window.location.reload();
}

// ---------------------------------------------------------------------
// Variables ----------------------------------------------------------------
const checkNumber = document.querySelector('.check');
const guess = document.querySelector('.guess');
const message = document.querySelector('.message');
const scoreTag = document.querySelector('.score');
const highscore = document.querySelector('.highscore');
const hiddenNum = document.querySelector('.number');
// --------------------------------------------------------------------

// Game Start Function {}
function gameStart() {
    // Compyuter number
    const computerNumber = Math.floor(Math.random() * 20) + 1;
    console.log(computerNumber);
    // Default value
    let score = 20;
    highscore.innerHTML = Gamer.highscore;
    scoreTag.innerHTML = score;

    // Check number
    checkNumber.addEventListener('click', () => {
        let gamerNumber = Number(guess.value);

        if (gamerNumber) {
            if (gamerNumber === computerNumber) {
                message.innerHTML = "🎉 Correct Number";

                gamerData.changeScore(Gamer.id, score);
                gamerData.addWins(Gamer.id);
                Gamer = gamersData[Gamer.id];
                localStorage.setItem('Gamer', JSON.stringify(Gamer));

                hiddenNum.innerHTML = computerNumber;
                highscore.innerHTML = Gamer.highscore;
                checkNumber.setAttribute('disabled', 'true');
            }

            if (gamerNumber > computerNumber) {
                message.innerHTML = "📈 Too high!"
                score--;
                scoreTag.innerHTML = score;
            }

            if (gamerNumber < computerNumber) {
                message.innerHTML = "📉 Too low!"
                score--;
                scoreTag.innerHTML = score;
            }
        }
    });
}

gameStart();

// Again button
const again = document.querySelector('.again');
again.addEventListener('click', () => {
    guess.value = '';
    message.innerHTML = 'Start guessing...';
    hiddenNum.innerHTML = '?';
    checkNumber.removeAttribute('disabled');
    gameStart();
})