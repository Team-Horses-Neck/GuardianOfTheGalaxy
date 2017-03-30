let template =
    '<h1>High Score</h1>' +
    '<ol>' +
    '{{#each player}}' +
    '<li>' +
    '<span class="name">' +
    '{{name}}' +
    '</span>' +
    '<span class="score">' +
    '{{score}}' +
    '</span>' +
    '</li>' +
    '{{/each}}' +
    '</ol>';

let highScore = {
    player: [{
            name: 'Pesho',
            score: 25615
        },
        {
            name: 'Tosho',
            score: 165
        },
        {
            name: 'Gosho',
            score: 1164
        },
        {
            name: 'Misho',
            score: 55
        }
    ]
};

function PrintScore() {
    let templateFunc = Handlebars.compile(template);

    let sorted = highScore.player.sort(function(a, b) {
        return b.score - a.score
    });
    let sortedHighScore = {
        player: sorted
    };
    //console.log(sortedHighScore);
    let resultHtml = templateFunc(sortedHighScore);

    document.getElementById("highScore-container").innerHTML = resultHtml;
}

function logPlayerData(engine) {
    let name = prompt("Please enter your name");
    if (name === null) {
        name = 'Anonymous';
    }
    let currentPlayer = {
        name: name,
        score: engine.player.totalScore
    };
    highScore.player.push(currentPlayer);
}
PrintScore();
