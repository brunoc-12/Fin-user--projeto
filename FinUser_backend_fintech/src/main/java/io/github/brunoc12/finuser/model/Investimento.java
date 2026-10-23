package io.github.brunoc12.finuser.model;


import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
@Entity
public class Investimento {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_INVESTIMENTO")
    @SequenceGenerator(name = "SEQ_INVESTIMENTO", sequenceName = "SEQ_INVESTIMENTO", allocationSize = 1)


    private Long id;

    @Column(length = 100, nullable = false)
    private String descricao;



    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal valor;

    @Column(name = "data_investimento", nullable = false)
    private LocalDate dataInvestimento;


    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private InvestCategoria investCategoria;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private objetivoFinanceiro objetivoFinanceiro;

    public LocalDate getDataInvestimento() {
        return dataInvestimento;
    }

    public void setDataInvestimento(LocalDate dataInvestimento) {
        this.dataInvestimento = dataInvestimento;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public InvestCategoria getInvestCategoria() {
        return investCategoria;
    }

    public void setInvestCategoria(InvestCategoria investCategoria) {
        this.investCategoria = investCategoria;
    }

    public objetivoFinanceiro getObjetivoFinanceiro() {
        return objetivoFinanceiro;
    }

    public void setObjetivoFinanceiro(objetivoFinanceiro objetivoFinanceiro) {
        this.objetivoFinanceiro = objetivoFinanceiro;
    }

    public BigDecimal getValor() {
        return valor;
    }

    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }


}
