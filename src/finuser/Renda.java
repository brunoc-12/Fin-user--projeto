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
    public void saldoRenda (){
        System.out.println("Esse é o seu valor de Renda: " + saldoRenda);
    }

    public void nomeRenda (){
        System.out.println("Nome De Renda : " +nomeRenda);
    }

    public void descricaoRenda (){
        System.out.println("Descrição de Renda: " +descricaoRenda);
    }

    public void categoriaRenda () {System.out.println("Categoria da Renda: " + saldoRenda);}

    public void DataRenda  () {System.out.println("Data da renda adicionada': " + saldoRenda);}

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
