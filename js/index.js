
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

let movimentacoes = [
    {nome: "Restaurate", valor: 45, data: "14 Jun", tipo: "gasto"},
    {nome: "Salário", valor: 5000, data: "01 Jul", tipo: "receita"},
    {nome: "compra", valor: 120, data: "15 Jun", tipo: "gasto"},
    {nome: "Uber", valor: 30, data: "16 Jun", tipo: "gasto"},
    {nome: "Livro", valor: 50, data: "17 Jun", tipo: "gasto"},
    {nome: "Steraming", valor: 20, data: "17 Jun", tipo:"gasto"}

   
];
 console.log(movimentacoes);
 let ul = document.querySelector("#movimentacoes")
 let htmlGerado = "";
 let i = 0;
 


 while (i< movimentacoes.length) {
     let atual = movimentacoes[i];
   
    let cor;

    if (atual.tipo === "receita"){
        cor = "green";
    } else {
        cor = "red";
    }
    console.log(cor);
    

    i++
htmlGerado += "<li>" + atual.nome + "-" + atual.data + " <span style= 'color:" + cor + "'>" + "R$ "  + atual.valor + "</span>" + "</li>"; 

console.log(htmlGerado)
 }

 ul.innerHTML =htmlGerado;

 let metaOne = document.querySelector("#metaOne");
 metaOne.textContent = minhaMeta;
 console.log(metaOne);

 let precoMeta = document.querySelector("#precoMeta");
 precoMeta.textContent = 'R$ ' + valorAtual + ' de R$ ' + valorMeta;
 console.log(precoMeta);

 let progressoMeta = document.querySelector("#progressoMeta");
 progressoMeta.value = porcentagem;
 console.log(progressoMeta);
 
 