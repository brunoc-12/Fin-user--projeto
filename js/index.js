javascript
let saldoDashboard = 2000;

let receitaDashboard = 5000;

let gastosDashboard = 2100;

let investimentosDashboard = 550;

const valorMaximo = 100;
let saudeFinanceira = 78;

// vou escrever minha meta 

 let minhaMeta = "macbook air m2";
let  valorMeta = 5000;
let valorAtual = 2500;
let elementoSaldo = document.querySelector("#valorSaldo");
elementoSaldo.textContent = "R$ " + saldoDashboard;


let elementoReceita = document.querySelector("#valorReceita");
elementoReceita.textContent = "R$ " + receitaDashboard;

let elementoGastos = document.querySelector("#valorGastos");
elementoGastos.textContent = "R$" +gastosDashboard;

let elementoInvestimentos = document.querySelector("#valorInvestimentos");
elementoInvestimentos.textContent = "R$ " +investimentosDashboard;

let porcentagem = (valorAtual / valorMeta) *100;
console.log(porcentagem);


let metaAlcancada = valorAtual >= valorMeta;
console.log(metaAlcancada);

if (metaAlcancada){
    document.querySelector("#mensagemMeta").textContent = "Parabéns! Você alcançou sua meta.";
} else {
    document.querySelector("#mensagemMeta").textContent = "Ainda faltam R$ " + (valorMeta - valorAtual) + " para você chegar lá!";
}

let scoreFinanceiro = document.querySelector("#pontoScore");
scoreFinanceiro.textcontent = saudeFinanceira + "/100";

let pontoScore =document.querySelector("#pontoScore");
pontoScore.textContent = saudeFinanceira + "/100";

let progressScore = document.querySelector("#progressScore");
progressScore.value = saudeFinanceira;

let mensagemScore = document.querySelector("#mensagemScore");
if (saudeFinanceira >= 80 ) {
    mensagemScore.textContent = "Exelente! você está no caminho certo!";
    
}else if (saudeFinanceira >= 61 && saudeFinanceira <= 79){
    mensagemScore.textContent = "Bom! Continue assim, mas ainda dá pra melhorar!";
} else {
    mensagemScore.textContent = "Atenção! Sua saúde financeira precisa de cuidado urgente.";
}