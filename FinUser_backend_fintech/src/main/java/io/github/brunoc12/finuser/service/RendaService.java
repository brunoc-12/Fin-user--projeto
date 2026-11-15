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

    @Autowired private RendaRepository rendaRepository;


    @Autowired
    private UsuarioRepository usuarioRepository; // Não esqueça de injetar este repositório no topo da classe!

    public Renda salvar(Renda renda) {
        // 1. Busca o usuário no banco usando o ID que veio do JSON do Insomnia
        Usuario usuario = usuarioRepository.findById(renda.getUsuarioId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado!"));

        // 2. Associa o objeto usuário completo na renda
        renda.setUsuario(usuario);

        // 3. Salva a renda no banco de dados
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
            rendaExistente.setDataRenda(renda.getDataRenda());

            // Busca e atualiza o usuário caso venha o ID no JSON
            if (renda.getUsuarioId() != null) {
                Usuario usuario = usuarioRepository.findById(renda.getUsuarioId())
                        .orElseThrow(() -> new RuntimeException("Usuário não encontrado!"));
                rendaExistente.setUsuario(usuario);
            }

            return rendaRepository.save(rendaExistente);
        } else {
            throw new RuntimeException("Renda não encontrada!");
        }
    }

    public Renda atualizarParcial(Long id, Renda renda) {
        Optional<Renda> rendaAtual = rendaRepository.findById(id);

        if (rendaAtual.isPresent()) {
            Renda rendaExistente = rendaAtual.get();

            // Atualiza apenas os campos que foram enviados (não nulos)
            if (renda.getDescricao() != null) {
                rendaExistente.setDescricao(renda.getDescricao());
            }
            if (renda.getValor() != null) {
                rendaExistente.setValor(renda.getValor());
            }
            if (renda.getDataRenda() != null) {
                rendaExistente.setDataRenda(renda.getDataRenda());
            }
            if (renda.getUsuarioId() != null) {
                Usuario usuario = usuarioRepository.findById(renda.getUsuarioId())
                        .orElseThrow(() -> new RuntimeException("Usuário não encontrado!"));
                rendaExistente.setUsuario(usuario);
            }

            return rendaRepository.save(rendaExistente);
        } else {
            throw new RuntimeException("Renda não encontrada!");
        }
    }
}

