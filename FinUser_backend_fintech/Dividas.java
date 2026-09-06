package finuser;


public class Dividas extends Transacao implements Notificacao {
    private  double valorDivida;
    private String nomeDivida;
    private String descricaoDivida;
    private String dataDivida;
    private String categoriaDivida;


    public Dividas(double valorDivida, String nomeDivida, String descricaoDivida, String dataDivida, String categoriaDivida) {
        this.valorDivida = valorDivida;
        this.nomeDivida = nomeDivida;
        this.descricaoDivida = descricaoDivida;
        this.dataDivida = dataDivida;
        this.categoriaDivida = categoriaDivida;
    }

    public double getValorDivida(){
        return valorDivida;
    }

    public String getNomeDivida(){
        return nomeDivida;
    }

    public String getDescricaoDivida (){
        return descricaoDivida;
    }

    public String getDataDivida() {return dataDivida;}

    public String getCategoriaDivida() {return categoriaDivida;}

    public void setValorDivida(double valorDivida) {
        this.valorDivida = valorDivida;
    }

    public void setNomeDivida(String nomeDivida) {
        this.nomeDivida = nomeDivida;
    }

    public void setDescricaoDivida(String descricaoDivida) {
        this.descricaoDivida = descricaoDivida;
    }

    public void setDataDivida(String dataDivida) {
        this.dataDivida = dataDivida;
    }

    public void setCategoriaDivida(String categoriaDivida) {
        this.categoriaDivida = categoriaDivida;
    }

    public void exibirInformacoes(){
        System.out.println("Valor a sua Divida: " + valorDivida + "\n" +
                "Nome a sua Divida: " + nomeDivida + "\n" +
                "Descrição a sua Divida: " + descricaoDivida + "\n" + "Data da sua Divida: " + dataDivida + "\n" + "Categoria da sua Divida: " +categoriaDivida);
    }
    @Override
    public void exibirNotificacao(){
        System.out.println("Divida adicionado com sucesso");
    }
    @Override
    public void infoTransacao(){
        valorDivida();
       nomeDivida();
        descricaoDivida();
        categoriaDivida();
        dataDivida();
    }
}