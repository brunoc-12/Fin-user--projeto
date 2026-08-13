package finuser.model;

public class Main {
    public static void main(String[] args) {
        double valorRenda = 1000;
        String fonte = "salario";
        renda minaRenda = new renda();




        if (valorRenda > 0 && !fonte.isEmpty()) {
            System.out.println("Renda Válida");

            String tipo;
            String estabilidade;
                switch (minaRenda.tipo){
                    case "Salario":
                    estabilidade = "Fixa";
                    break;

                    case "Freela":
                    estabilidade = "variavel";

                    case "Outros":
                    estabilidade = "variavel";
                    break;

                    case "investimentos":
                    estabilidade = "Passiva";
                    break;

                    default: estabilidade = "Não Classificada";



                }
            System.out.println(minaRenda.nome + " -> " + estabilidade);




        }
        }
    }
