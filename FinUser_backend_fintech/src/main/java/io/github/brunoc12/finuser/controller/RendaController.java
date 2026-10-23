package io.github.brunoc12.finuser.controller;


import io.github.brunoc12.finuser.model.Renda;
import io.github.brunoc12.finuser.model.Usuario;
import io.github.brunoc12.finuser.service.RendaService;
import io.github.brunoc12.finuser.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


import java.util.List;
@RestController
@RequestMapping("/api/rendas")
public class RendaController {

    @Autowired
    private RendaService rendaService;

    //metodo para salvar uma renda
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Renda salvar (@RequestBody Renda renda){
        return rendaService.salvar(renda);

    }

    //a anotações que devo fazer para buscar
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Renda buscarPorId(@PathVariable Long id) {
        return rendaService.buscarPorId(id);
    }


    //metodo que devo usar par listar todas minhas rendas
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Renda> buscarTodos(){
        return rendaService.buscarTodos();
    }


    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void excluir(@PathVariable long id){
        rendaService.excluir(id);

    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Renda atualizar (@PathVariable Long id, @RequestBody Renda renda){
        return rendaService.atualizar(id, renda);

    }

}
