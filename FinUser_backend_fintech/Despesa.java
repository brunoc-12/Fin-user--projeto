type backend\Investimento.javapackage finuser;

public class Despesa extends Transacao implements notificacao{
    private double saldoDespesa;
    private String nomeDespesa;
    private String descricaoDespesa;
    private String categoriaDespesa;


    public Despesa( double valor, String descricao, String nome) {
        this.descricaoDespesa = descricaoDespesa;
        this.nomeDespesa = nomeDespesa;
        this.saldoDespesa = saldoDespesa;
    }

    public double getSaldoDespesa(){
        return saldoDespesa;
    }

    public String getNomeDespesa(){
        return nomeDespesa;
    }

    public String getDescricaoDespesa (){
        return descricaoDespesa;
    }

    public String getDataLimite() {return dataLimite;}

    public String getCategoriaDespesa() {
        return categoriaDespesa;
    }


    public void setSaldoDespesa(double saldoDespesa) {
        this.saldoDespesa = saldoDespesa;
    }

    public void setNomeDespesa(String nomeDespesa) {
        this.nomeDespesa = nomeDespesa;
    }

    public void setDescricaoDespesa(String descricaoDespesa) {
        this.descricaoDespesa = descricaoDespesa;
    }

    public void setCategoriaDespesa(String categoriaDespesa) {
        this.categoriaDespesa = categoriaDespesa;
    }

    public void exibirInformacoes(){
        System.out.println("Seu saldo da Despesa  é: " + saldoDespesa + "\n" +
                "Essa Despesa é: " + nomeDespesa + "\n" +
                "Mais informação da Despesa: " + descricaoDespesa);
    }


    @Override
    public void exibirNotificacao(){
        System.out.println("Despesa adicionada com sucesso");
    }
    @Override
    public  void infoTransacao(){
        nomeDespesa();
        descricaoDespesa();


    }


}
