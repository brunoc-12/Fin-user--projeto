package finuser;

public class Renda extends Transacao implements  notificacao{
    private double saldoRenda;
    private String nomeRenda;
    private String descricaoRenda;
    private String dataRenda;
    private String categoriaRenda;

    public Renda(double saldoRenda, String nomeRenda, String descricaoRenda, String dataRenda, String categoriaRenda) {
        this.saldoRenda = saldoRenda;
        this.nomeRenda = nomeRenda;
        this.descricaoRenda = descricaoRenda;
        this.dataRenda = dataRenda;
        this.categoriaRenda = categoriaRenda;
    }
    public double getSaldoRenda(){
        return saldoRenda;
    }

    public String getNomeRenda(){
        return nomeRenda;
    }

    public String getDescricaoRenda (){
        return descricaoRenda;
    }

    public String getDataRenda() {return dataRenda;}

    public String getCategoriaRenda() {return categoriaRenda;}

    public void setSaldoRenda(double saldoRenda) {
        this.saldoRenda = saldoRenda;
    }

    public void setNomeRenda(String nomeRenda) {
        this.nomeRenda = nomeRenda;
    }

    public void setDescricaoRenda(String descricaoRenda) {
        this.descricaoRenda = descricaoRenda;
    }

    public void setDataRenda(String dataRenda) {
        this.dataRenda = dataRenda;
    }

    ´

    public void setCategoriaRenda(String categoriaRenda) {
        this.categoriaRenda = categoriaRenda;
    }

    public void exibirInformacoes(){
        System.out.println("Saldo da Renda: " + saldoRenda + "\n" +
                "Nome da Renda: " + nomeRenda + "\n" +
                "Descrição da Renda: " + descricaoRenda);
    }



    @Override
    public void exibirNotificacao(){
        System.out.println("Renda adicionado com sucesso");
    }
  @Override
    public void infoTransacao(){
     saldoRenda();
     nomeRenda();
     descricaoRenda();
    }


}
