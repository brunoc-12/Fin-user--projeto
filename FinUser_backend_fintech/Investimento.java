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

    public double getValorInvestido(){
        return valorInvestido;
    }

    public String getNomeInvestimento(){
        return nomeInvestimento;
    }

    public String getDescricaoInvestimento (){
        return descricaoInvestimento;
    }

    public String getDataInvestimento() {return dataInvestimento;}

    public String getCategoriaInvestimento() {return categoriaInvestimento;}

    public void setValorInvestido(double valorInvestido) {
        this.valorInvestido = valorInvestido;
    }


    public void setCategoriaInvestimento(String categoriaInvestimento) {
        this.categoriaInvestimento = categoriaInvestimento;
    }

    public void setNomeInvestimento(String nomeInvestimento) {
        this.nomeInvestimento = nomeInvestimento;
    }

    public void setDescricaoInvestimento(String descricaoInvestimento) {
        this.descricaoInvestimento = descricaoInvestimento;
    }

    public void setDataInvestimento(String dataInvestimento) {
        this.dataInvestimento = dataInvestimento;
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
