let tabelaInvestimento = [
    {nome: "🏛️ Tesouro Selic 202",categoria: "🏛️ Tesouro Selic 2027", valor: 10000, variacao: "+5,2%", rendimento: 520, saldoAtual: 10520 },
    {nome: "Fundo Imobiliário KNSC11", categoria: "Fundo Imobiliário", valor: 7000, variacao: "+8,7%", rendimento: 609, saldoAtual: 7609, },
    {nome: "🟢Ações Petrobras PETR4", categoria: "Ações", valor: 5000, variacao: "+12,3%", rendimento:615, saldoAtual: 5615, },
    {nome: "CDB Banco do Brasil", categoria: "CDB/RDB", valor: 3430, variacao: "+6,1%", rendimento: 243, saldoAtual: 3673 },
    {nome: "Fundo Multimercado XP", categoria: "Fundos Multimercado", valor: 0, variacao: "+0,0%", rendimento:0, saldoAtual: 0, },
    {nome: "🟡Ouro Físico", categoria: "Commodities", valor: 0, variacao: "+0,0%", rendimento: 0, saldoAtual: 0 }

   
];
 console.log(tabelaInvestimento);


  function atualizarTabelaInvestimento() {
 let ul = document.querySelector("#tabelaInvestimento")
 let htmlGerado = "";
 let i = 0;
let somaInvestimento = 0; 


 while (i< tabelaInvestimento.length) {
     let atual = tabelaInvestimento[i];
     let cor = 'blue';


htmlGerado += "<tr> <td>" + atual.nome + "</td>" + "<td>" + atual.categoria + "</td>" + "<td>R$ " + atual.valor + "</td>" + "<td>" + atual.variacao + "</td>" + "<td>R$ " + atual.rendimento + "</td>" + "<td style='color:" + cor + "'>R$ " + atual.saldoAtual + "</td>" + "</tr>";
      somaInvestimento += atual.valor;

console.log(htmlGerado)
 
 i++

 }
ul.innerHTML = htmlGerado;
document.querySelector("#valorTotalInvestido").textContent = "R$ " + somaInvestimento;
}
atualizarTabelaInvestimento();

const botao = document.querySelector("#btn-salvar-investimento");
botao.addEventListener('click', function(evento) {
    evento.preventDefault();

  let fonte = document.querySelector("#novoInvestimento").value;
let valor = document.querySelector("#valor-investimento").value;
if (valor === "") {
    document.querySelector("#resultado").textContent = "Preencha o valor do investimento!";
} else {
    document.querySelector("#resultado").textContent = "Investimento de R$ " + valor + " (" + fonte + ") adicionado com sucesso!";

    let novoInvestimentoObjeto = {nome: "Novo Investimento", valor: parseFloat(valor), data: "Hoje", tipo: fonte};
    tabelaInvestimento.push(novoInvestimentoObjeto);
    atualizarTabelaInvestimento();
    console.log(novoInvestimentoObjeto);
    
}
})

const novoInvestimento = document.querySelector("#novoInvestimento");
novoInvestimento.addEventListener('click', function() {
    document.querySelector("#novoInvestimento").value = "";
    document.querySelector("#valor-investimento").value = "";
    document.querySelector("#resultado").textContent = "";
});


