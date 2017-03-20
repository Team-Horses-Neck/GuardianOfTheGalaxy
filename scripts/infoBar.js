class infoBar{
    constructor(playerLives, playerScore){
        this.playerLives = playerLives;
        this.playerScore = playerScore;
    }

    get playerLives(){
        return this._playerLives;
    }
    set playerLives(value){
        if(value < 0){
            throw new Error("negative lives");
        }
        this._playerLives = value;
    }

    get playerScore(){
        return this._playerScore;
    }
    set playerScore(value){
        if(value < 0){
            throw new Error("negative score");
        }
        this._playerScore = value;
    }
}