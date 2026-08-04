let valorRenda = 5000;

let totalRendaMes = document.querySelector("#totalRendaMes");
totalRendaMes.textContent = "R$ " + valorRenda;

let dateRenda = document.querySelector("#dateRenda");
dateRenda.textContent = "Junho de 2026";

let maisRenda = 12;

let variacaoRenda = document.querySelector("#variacaoRenda");
variacaoRenda.textContent = "+ " + maisRenda;

let valorvariacao = 540;

let valorVariacao = document.querySelector("#valorVariacao");
valorVariacao.textContent = "R$ " + valorvariacao;

let valorMedia = 4460;

let valorMediaMensal = document.querySelector("#valorMediaMensal");
valorMediaMensal.textContent = "R$ " + valorMedia;

let tabelaRenda = [
    {nome: "💼 Salário - Empresa XPTO", valor: 4000, data: "14 Jun", tipo: "Salario" },
    {nome: "📚 Aula particular ", valor: 200, data: "01 Jul", tipo: "Freela"},
    {nome: "🖥️ Manutenção de site", valor: 350, data: "15 Jun", tipo: "Freela"},
    {nome: "💳 Cashback cartão", valor: 35, data: "16 Jun", tipo: "Outros"},
    {nome: "🛒 Venda de item usado", valor: 180, data: "17 Jun", tipo: "Outros"},
    {nome: "📈 Dividendos investimento", valor: 90, data: "17 Jun", tipo:"Investimentos"}

   
];
 console.log(tabelaRenda);

 function atualizarTabelaRenda() {
 let ul = document.querySelector("#tabelaRenda")
 let htmlGerado = "";
 let i = 0;
let somaRenda = 0; 


 while (i< tabelaRenda.length) {
     let atual = tabelaRenda[i];
     let cor = 'blue';


      htmlGerado += "<tr> <td>" + atual.nome + "</td>" + "<td>" + atual.tipo + "</td>" + "<td>" + atual.data + "</td>" + "<td style='color:" + cor +  "'>R$ " + atual.valor + "</td>" + "</tr>" ;
      somaRenda += atual.valor;

console.log(htmlGerado)


   
  
    

    i++

 }
ul.innerHTML = htmlGerado;
totalRendaMes.textContent = "R$ " + somaRenda;

}
atualizarTabelaRenda();

const botao = document.querySelector("#btn-salvar");
botao.addEventListener('click', function(evento) {
    evento.preventDefault();

    let fonte =document.querySelector("#fonteRenda").value;
let valor =document.querySelector("#valorRenda").value;
   
if (valor === "") {
    document.querySelector("#resultado").textContent = "Preencha o valor da renda!";
} else {
    document.querySelector("#resultado").textContent = "Renda de R$ " + valor + " (" + fonte + ") adicionada com sucesso!";

    let novaRendaObjeto = {nome: "Nova Renda", valor: parseFloat(valor), data: "Hoje", tipo: fonte};
    tabelaRenda.push(novaRendaObjeto);
    atualizarTabelaRenda();
    console.log(novaRendaObjeto);
    
}
})

const novaRenda = document.querySelector("#novaRenda");
novaRenda.addEventListener('click', function() {
    document.querySelector("#fonteRenda").value = "";
    document.querySelector("#valorRenda").value = "";
    document.querySelector("#resultado").textContent = "";
});


