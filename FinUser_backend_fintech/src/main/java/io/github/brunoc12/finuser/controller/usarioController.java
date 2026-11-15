package io.github.brunoc12.finuser.controller;





import io.github.brunoc12.finuser.dto.LoginRequest;
import io.github.brunoc12.finuser.dto.LoginResponse;
import io.github.brunoc12.finuser.model.Usuario;
import io.github.brunoc12.finuser.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
public class UsarioController {


    @Autowired
    private UsuarioService usuarioService;

    //MÉTODO RESPONSAVEL POR CRIAR UM NOVO PRODUTO AO SERVIDOR
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Usuario salvar (@RequestBody Usuario usuario){
        return usuarioService.salvar(usuario);

    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Usuario buscarPorId(@PathVariable Long id) {
        return usuarioService.buscarPorId(id);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Usuario> buscarTodos(){
        return usuarioService.buscarTodos();
    }


    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void excluir(@PathVariable long id){
        usuarioService.excluir(id);

    }
    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Usuario atualizar (@PathVariable Long id, @RequestBody Usuario usuario){
        return usuarioService.atualizar(id, usuario);

    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest dados) {
        Optional<Usuario> usuario = usuarioService.login(dados.email(), dados.senha());

        if (usuario.isPresent()) {
            Usuario u = usuario.get();
            return ResponseEntity.ok(new LoginResponse(u.getId(), u.getNome()));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email ou senha inválidos");
    }





}
