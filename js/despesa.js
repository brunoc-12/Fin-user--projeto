let tabelaDespesas = [
    {nome: "🏠 Aluguel", valor: 1200, data: "01 Jun", tipo: "Moradia"},
    {nome: "📶 Internet", valor: 100, data: "05 Jun", tipo: "Serviços"},
    {nome: "💡 Luz/Energia", valor: 200, data: "10 Jun", tipo: "Serviços"},
    {nome: "🚰 Água", valor: 80, data: "15 Jun", tipo: "Serviços"},
    {nome: "🍽️ Alimentação", valor: 500, data: "20 Jun", tipo: "Alimentação"},
    {nome: "🚌 Transporte", valor: 150, data: "25 Jun", tipo: "Transporte"},
    {nome: "🛒 Mercado", valor: 300, data: "30 Jun", tipo: "Alimentação"},
    {nome: "🎮 Lazer", valor: 200, data: "05 Jul", tipo: "Lazer"}
];

let totalDespesa = document.querySelector("#totalDespesa");

function atualizarTabelaDespesas() {
    let tbody = document.querySelector("#tabelaDespesa");
    let htmlGerado = "";
    let i = 0;
    let somaDespesas = 0;

    while (i < tabelaDespesas.length) {
        let atual = tabelaDespesas[i];
        let cor = 'red';

        htmlGerado += "<tr> <td>" + atual.nome + "</td>" + "<td>" + atual.tipo + "</td>" + "<td>" + atual.data + "</td>" + "<td style='color:" + cor + "'>R$ " + atual.valor + "</td>" + "</tr>";
        somaDespesas += atual.valor;

        i++;
    }

    tbody.innerHTML = htmlGerado;
    totalDespesa.textContent = "R$ " + somaDespesas;
}

atualizarTabelaDespesas();

const botao = document.querySelector("#btnSalvarDespesa");
botao.addEventListener('click', function(evento) {
    evento.preventDefault();

    let valorAluguel = document.querySelector("#aluguel").value;
    if (valorAluguel !== "") {
        tabelaDespesas.push({nome: "Aluguel", valor: parseFloat(valorAluguel), data: "Hoje", tipo: "Moradia"});
    }

    let valorInternet = document.querySelector("#internet").value;
    if (valorInternet !== "") {
        tabelaDespesas.push({nome: "Internet", valor: parseFloat(valorInternet), data: "Hoje", tipo: "Serviços"});
    }

    let valorLuz = document.querySelector("#luz-energia").value;
    if (valorLuz !== "") {
        tabelaDespesas.push({nome: "Luz/Energia", valor: parseFloat(valorLuz), data: "Hoje", tipo: "Serviços"});
    }

    let valorAgua = document.querySelector("#agua").value;
    if (valorAgua !== "") {
        tabelaDespesas.push({nome: "Água", valor: parseFloat(valorAgua), data: "Hoje", tipo: "Serviços"});
    }

    let valorAlimentacao = document.querySelector("#alimentacao").value;
    if (valorAlimentacao !== "") {
        tabelaDespesas.push({nome: "Alimentação", valor: parseFloat(valorAlimentacao), data: "Hoje", tipo: "Alimentação"});
    }

    let valorTransporte = document.querySelector("#transporte").value;
    if (valorTransporte !== "") {
        tabelaDespesas.push({nome: "Transporte", valor: parseFloat(valorTransporte), data: "Hoje", tipo: "Transporte"});
    }

    let valorMercado = document.querySelector("#mercado").value;
    if (valorMercado !== "") {
        tabelaDespesas.push({nome: "Mercado", valor: parseFloat(valorMercado), data: "Hoje", tipo: "Alimentação"});
    }

    let valorLazer = document.querySelector("#lazer").value;
    if (valorLazer !== "") {
        tabelaDespesas.push({nome: "Lazer", valor: parseFloat(valorLazer), data: "Hoje", tipo: "Lazer"});
    }

    atualizarTabelaDespesas();
    document.querySelector("#Resultado").textContent = "Despesas adicionadas com sucesso!";
});