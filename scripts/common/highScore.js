//(function() {
//    let template = Handlebars.compile(solve()());
//
//
//    let highScore = {
//    player: [
//        {
//            name: 'Pesho',
//            score: 25615
//        },
//        {
//            name: 'Tosho',
//            score: 165
//        },
//        {
//            name: 'Gosho',
//            score: 1164
//        },
//        {
//            name: 'Misho',
//            score: 55
//        }]
//};
//
//    let sorted = highScore.player.sort(function(a,b) {
//    return b.score - a.score
//});
//    let sortedAra
//    sorted.forEach(function(player){
//        console.log(player);
//    });
//
//    document.getElementById('highScore-container')
//        .innerHTML = template(sorted);
//}());
//
//function solve() {
//    return function() {
//        let template =
//            '<h1>High Score</h1>'+
//            '<ul>'+
//                '{{#each player}}'+
//                '<li>'+
//                    '<span class="name">'+
//                    '{{name}}'+
//                    '</span>'+
//                    '<span class="score">'+
//                    '{{score}}'+
//                    '</span>'+
//                '{{/each}}'+
//            '</ul>';
//        return template;
//    }
//}


//var templateId = "template";
//var templateHtml = document.getElementById(template).innerHTML;
let template =
    '<h1>High Score</h1>'+
    '<ol>'+
        '{{#each player}}'+
        '<li>'+
            '<span class="name">'+
            '{{name}}'+
            '</span>'+
            '<span class="score">'+
            '{{score}}'+
            '</span>'+
        '</li>'+
        '{{/each}}'+
    '</ol>';

let highScore = {
    player: [
        {
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
        }]
};
function PrintScore(){
    let templateFunc = Handlebars.compile(template);



    let sorted = highScore.player.sort(function(a,b) {
        return b.score - a.score
    });
    let sortedHighScore = {
        player: sorted
    };
    //console.log(sortedHighScore);
    let resultHtml = templateFunc(sortedHighScore);

    document.getElementById("highScore-container").innerHTML = resultHtml;
}
PrintScore();