package io.github.brunoc12.finuser.controller;



import io.github.brunoc12.finuser.model.Usuario;
import io.github.brunoc12.finuser.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/usuarios")
public class usarioController {


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





}
