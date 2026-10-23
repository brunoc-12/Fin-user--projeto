package io.github.brunoc12.finuser.service;



import io.github.brunoc12.finuser.model.Renda;
import io.github.brunoc12.finuser.model.Usuario;
import io.github.brunoc12.finuser.repository.RendaRepository;
import io.github.brunoc12.finuser.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RendaService {


    @Autowired
    private RendaRepository rendaRepository;

    public Renda salvar(Renda renda) {
        return rendaRepository.save(renda);

    }

    public Renda buscarPorId(Long id) {
        Optional<Renda> renda = rendaRepository.findById(id);

        if (renda.isPresent()) {
            return renda.get();
        } else {
            throw new RuntimeException("Renda não encontrado!");
        }
    }

    public List<Renda> buscarTodos() {
        return rendaRepository.findAll();
    }

    public void excluir(Long id) {
        Optional<Renda> renda = rendaRepository.findById(id);
        if (renda.isPresent()) {
            rendaRepository.deleteById(id);
        } else {
            throw new RuntimeException("Renda não encontrado!");
        }

    }

    public Renda atualizar(Long id, Renda renda) {
        Optional<Renda> rendaAtual = rendaRepository.findById(id);

        if (rendaAtual.isPresent()) {
            Renda rendaExistente = rendaAtual.get();
            rendaExistente.setValor(renda.getValor());
            rendaExistente.setDescricao(renda.getDescricao());
            rendaExistente.setDataRecebimento(renda.getDataRecebimento());
            return rendaRepository.save(rendaExistente);
        } else {
            throw new RuntimeException("Renda não encontrado!");
        }

    }
}

