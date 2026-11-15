package io.github.brunoc12.finuser.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "tbl_renda")
public class Renda {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_RENDA")
    @SequenceGenerator(name = "SEQ_RENDA", sequenceName = "SEQ_RENDA", allocationSize = 1)
    private Long id;

    @Column(length = 100, nullable = false)
    private String descricao;

    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal valor;

    @Column(name = "DATA_RENDA", nullable = false)
    private LocalDate dataRenda;


    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    @Transient
    private Long usuarioId;

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public BigDecimal getValor() {
        return valor;
    }

    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }

    public LocalDate getDataRenda() {
        return dataRenda;
    }

    public void setDataRenda(LocalDate dataRecebimento) {
        this.dataRenda = dataRecebimento;
    }
}