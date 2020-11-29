const gameOverDialog = document.querySelector('.game-over-dialog');
const gameOverMessage = gameOverDialog.querySelector('.game-over-message');
const restartButton = gameOverDialog.querySelector('.restart-button');


let simon;

restartButton.addEventListener('click', startGame);


function startGame(){
    simon = new Simon();
}

function sorteiaPosicao(){
    return Math.round((Math.random() * 3) + 1);
}

async function delay(ms) {
    await new Promise(resolve => setTimeout(()=> resolve(), ms));
}

class Simon {
    constructor() {
        this.rodada = 0;
        this.tentativa = [];
        let primeiro = sorteiaPosicao();
        this.correto = [primeiro];
        hideGameOverDialog();
    }

    estaCorreto(){
        for (let i = 0; i < this.tentativa.length; i++){
            if(this.tentativa[i] !== this.correto[i]){
                return false;
            }
        }
        return true;
    }

    async tentar(posicao){
        // Guardar posição
        this.tentativa.push(posicao);
        console.log(this.tentativa);
        // Comparar correto
        if(this.estaCorreto()){
            await this.pintar(posicao);
            this.rodada = Math.max(this.rodada, this.tentativa.length);
            document.getElementById("rodada").innerHTML=this.rodada;
        } else {
            showGameOverDialog(`Você perdeu`);
            this.tentativa = [];
            this.correto = [sorteiaPosicao()];
        }
        if(this.tentativa.length === this.correto.length){
            this.tentativa = [];
            this.correto.push(sorteiaPosicao());
            await delay(500);
            this.mostrarCorreto();
        }
    }
    
    async pintar(posicao){
        let celula;
        if (posicao === 1){
            celula = document.getElementById("casa1");
            celula.style["background-color"] = "#33bb18";
            await delay(300);
            celula.style["background-color"] = "#080"
        } else if (posicao === 2){
            celula = document.getElementById("casa2");
            celula.style["background-color"] = "#f00";
            await delay(300);
            celula.style["background-color"] = "#9c0101"
        } else if (posicao === 3){
            celula = document.getElementById("casa3");
            celula.style["background-color"] = "#00f";
            await delay(300);
            celula.style["background-color"] = "#060686"
        } else {
            celula = document.getElementById("casa4");
            celula.style["background-color"] = "#ff0";
            await delay(300);
            celula.style["background-color"] = "#a3a304"
        }
        await delay(500);
    }

    async mostrarCorreto(){
        for(let posicao of this.correto){
            console.log(`Posição ${posicao}`);
            await this.pintar(posicao);
            await delay(200);
        }
    }
}

function showGameOverDialog(message){
    gameOverMessage.innerText = message;
    gameOverDialog.setAttribute('open', 'true');
}

function hideGameOverDialog(){
    gameOverDialog.removeAttribute('open');
}



startGame();