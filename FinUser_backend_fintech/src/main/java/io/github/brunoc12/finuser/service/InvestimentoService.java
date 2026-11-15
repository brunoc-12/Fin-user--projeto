package io.github.brunoc12.finuser.service;

import io.github.brunoc12.finuser.model.Investimento;
import io.github.brunoc12.finuser.model.Usuario; // <-- 1. Adicionar este import
import io.github.brunoc12.finuser.repository.InvestimentoRepository;
import io.github.brunoc12.finuser.repository.UsuarioRepository; // <-- 2. Adicionar este import
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InvestimentoService {

    @Autowired
    private InvestimentoRepository investimentoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Investimento salvar(Investimento investimento) {
        if (investimento.getUsuarioId() != null) {
            Usuario usuario = usuarioRepository.findById(investimento.getUsuarioId())
                    .orElseThrow(() -> new RuntimeException("Usuário não encontrado!"));
            investimento.setUsuario(usuario);
        }
        return investimentoRepository.save(investimento);
    }

    public Investimento buscarPorId(Long id) {
        Optional<Investimento> investimento = investimentoRepository.findById(id);

        if (investimento.isPresent()) {
            return investimento.get();
        } else {
            throw new RuntimeException("Investimento não encontrado!");
        }
    }

    public List<Investimento> buscarTodos() {
        return investimentoRepository.findAll();
    }

    public void excluir(Long id) {
        Optional<Investimento> investimento = investimentoRepository.findById(id);
        if (investimento.isPresent()) {
            investimentoRepository.deleteById(id);
        } else {
            throw new RuntimeException("Investimento não encontrado!");
        }
    }

    public Investimento atualizar(Long id, Investimento investimento) {
        Optional<Investimento> investimentoAtual =
                investimentoRepository.findById(id);

        if (investimentoAtual.isPresent()) {
            Investimento investimentoExistente = investimentoAtual.get();

            investimentoExistente.setValor(investimento.getValor());
            investimentoExistente.setDescricao(investimento.getDescricao());
            investimentoExistente.setDataInvestimento(
                    investimento.getDataInvestimento());
            investimentoExistente.setInvestCategoria(
                    investimento.getInvestCategoria());


            if (investimento.getObjetivoFinanceiro() != null) {
                investimentoExistente.setObjetivoFinanceiro(investimento.getObjetivoFinanceiro());
            }

            return investimentoRepository.save(investimentoExistente);

        } else {
            throw new RuntimeException("Investimento não encontrado!");
        }
    }
}


