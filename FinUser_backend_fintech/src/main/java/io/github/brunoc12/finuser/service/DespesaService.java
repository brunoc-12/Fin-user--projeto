package io.github.brunoc12.finuser.service;



import io.github.brunoc12.finuser.model.Despesa;
import io.github.brunoc12.finuser.model.Renda;
import io.github.brunoc12.finuser.model.Usuario;
import io.github.brunoc12.finuser.repository.DespesaRepository;
import io.github.brunoc12.finuser.repository.RendaRepository;
import io.github.brunoc12.finuser.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public class DespesaService {

    @Autowired
    private DespesaRepository despesaRepository;

    public Despesa salvar(Despesa despesa) {
        return despesaRepository.save(despesa);

    }

    public Despesa buscarPorId(Long id) {
        Optional<Despesa> despesa = despesaRepository.findById(id);

        if (despesa.isPresent()) {
            return despesa.get();
        } else {
            throw new RuntimeException("Despesa não encontrado!");
        }
    }

    public List<Despesa> buscarTodos() {
        return despesaRepository.findAll();
    }


    public void excluir(Long id) {
        Optional<Despesa> despesa = despesaRepository.findById(id);
        if (despesa.isPresent()) {
            despesaRepository.deleteById(id);
        } else {
            throw new RuntimeException("Despesa não encontrado!");
        }

    }

    public Despesa atualizar(Long id, Despesa despesa) {
        Optional<Despesa> despesaAtual = despesaRepository.findById(id);

        if (despesaAtual.isPresent()) {
            Despesa despesaExistente = despesaAtual.get();
            despesaExistente.setValor(despesa.getValor());
            despesaExistente.setDescricao(despesa.getDescricao());
            despesaExistente.setDataPagamento(despesa.getDataPagamento());
            return despesaRepository.save(despesaExistente);
        } else {
            throw new RuntimeException("Despesa não encontrado!");
        }

    }
}
