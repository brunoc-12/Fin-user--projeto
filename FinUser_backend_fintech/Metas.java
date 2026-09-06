package finuser;

public class Metas extends Transacao implements Validavel{

    private String nomeMeta;         //  "MacBook Air M2"
    private double valorMeta;       // valor total a ser alcançado
    private double valorAtual;      // quanto já foi guardado até agora
    private String dataLimite;      // prazo pra alcançar a meta
    private String categoriaMeta;   // ex: "Eletrônicos", "Viagem", "Emergência"




    public Metas(String nomeMeta, double valorMeta, double valorAtual, String dataLimite, String categoriaMeta) {
        this.nomeMeta = nomeMeta;
        this.valorMeta = valorMeta;
        this.valorAtual = valorAtual;
        this.dataLimite = dataLimite;
        this.categoriaMeta = categoriaMeta;
    }

    public String getNomeMeta(){
        return nomeMeta;
    }

    public double getValorMeta(){
        return valorMeta;
    }

    public double getValorAtual (){
        return valorAtual;
    }

    public String getDataLimite() {return dataLimite;}

    public String getCategoriaMeta() {
        return categoriaMeta;
    }

    public void setNomeMeta (String nomeMeta){
        this.nomeMeta = nomeMeta;
    }

    public void setValorMeta(double valorMeta) {
        this.valorMeta = valorMeta;
    }

    public void setValorAtual(double valorAtual) {
        this.valorAtual = valorAtual;
    }

    public void setDataLimite(String dataLimite) {
        this.dataLimite = dataLimite;
    }

    public void setCategoriaMeta(String categoriaMeta) {
        this.categoriaMeta = categoriaMeta;
    }

    public void exibirInformacoes(){
        System.out.println("Nome da Meta: " + nomeMeta + "\n" +
                "Valor da Meta: " + valorMeta + "\n" +
                "Categoria da Meta: " +categoriaMeta);
    }

    @Override
    public boolean validarDados(){
            if (valorMeta >=0 && valorAtual >=0 ) {
            return true;
        }
        return false;
    }
    @Override
    public double calcularProgresso() {
        return (valorAtual / valorMeta) * 100;
    }


    @Override
    public boolean metaAtingida() {
        return valorAtual >= valorMeta;
    }



}