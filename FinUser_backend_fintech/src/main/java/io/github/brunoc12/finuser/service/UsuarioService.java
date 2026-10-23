package io.github.brunoc12.finuser.service;



import io.github.brunoc12.finuser.model.Usuario;
import io.github.brunoc12.finuser.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario salvar(Usuario usuario) {
        return usuarioRepository.save(usuario);

    }



        public Usuario buscarPorId(Long id) {
            Optional<Usuario> usuario = usuarioRepository.findById(id);

            if (usuario.isPresent()) {
                return usuario.get();
            } else {
                throw new RuntimeException("Usuário não encontrado!");
            }
        }

    public List<Usuario> buscarTodos(){
        return usuarioRepository.findAll();
    }

    public void excluir(Long id) {
        Optional<Usuario> usuario = usuarioRepository.findById(id);
        if (usuario.isPresent()) {
            usuarioRepository.deleteById(id);
        } else {
            throw new RuntimeException("Usuário não encontrado!");
        }

    }
    public Usuario atualizar(Long id, Usuario usuario) {
        Optional<Usuario> usuarioAtual = usuarioRepository.findById(id);

        if (usuarioAtual.isPresent()) {
            Usuario usuarioExistente = usuarioAtual.get();
            usuarioExistente.setNome(usuario.getNome());
            usuarioExistente.setEmail(usuario.getEmail());
            return usuarioRepository.save(usuarioExistente);
        } else {
            throw new RuntimeException("Usuário não encontrado!");
        }
    }
}



