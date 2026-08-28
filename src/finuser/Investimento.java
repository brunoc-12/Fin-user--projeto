package finuser;

public class Investimento extends Transacao implements notificacao{
    private double valorInvestido;
    private String nomeInvestimento;
    private String descricaoInvestimento;
    private String dataInvestimento;
    private String categoriaInvestimento;




    public Investimento(double valorInvestido, String nomeInvestimento, String descricaoInvestimento, String dataInvestimento, String categoriaInvestimento) {
        this.valorInvestido = valorInvestido;
        this.nomeInvestimento = nomeInvestimento;
        this.descricaoInvestimento = descricaoInvestimento;
        this.dataInvestimento = dataInvestimento;
        this.categoriaInvestimento = categoriaInvestimento;

    }


    public void valorInvestido (){
        System.out.println("Esse é o seu valor investido: " + valorInvestido);
    }

    public void nomeInvestimento (){
        System.out.println("Seu investimento é: " +nomeInvestimento);
    }

    public void descricaoInvestimento (){
        System.out.println("Sobre seu investimento: " +descricaoInvestimento);
    }
    public void dataInvestimento (){
        System.out.println("A data do investimento foi:" );

    }

    public void CategoriaInvestimento(){
        System.out.println("seu Investimento pertence a: ");
    }

    public void exibirInformacoes(){
        System.out.println("Seu saldo investido é: " + valorInvestido + "\n" +
                "Nome do investimento é: " + nomeInvestimento + "\n" +
                "Sobre seu investimento: " + descricaoInvestimento);
    }


    @Override
    public void exibirNotificacao(){
        System.out.println("Investimento feito com sucesso");
    }

    @Override
    public void infoTransacao(){
        nomeInvestimento();
        descricaoInvestimento();

    }


}
