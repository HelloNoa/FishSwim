export const Score = new class Score {
    private _score: number;

    constructor() {
        this.score = 0;
    }

    get score() {
        return this._score;
    }

    set score(score) {
        this._score = score;
    }
}