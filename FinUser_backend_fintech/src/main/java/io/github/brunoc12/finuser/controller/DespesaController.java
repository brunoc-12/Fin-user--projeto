package io.github.brunoc12.finuser.controller;


import io.github.brunoc12.finuser.model.Despesa;
import io.github.brunoc12.finuser.model.Renda;
import io.github.brunoc12.finuser.model.Usuario;
import io.github.brunoc12.finuser.repository.DespesaRepository;
import io.github.brunoc12.finuser.service.DespesaService;
import io.github.brunoc12.finuser.service.RendaService;
import io.github.brunoc12.finuser.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


import java.util.List;
@RestController
@RequestMapping("/api/despesas")
public class DespesaController {

    @Autowired
    private DespesaService despesaService;

    // método para salvar uma despesa
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Despesa salvar(@RequestBody Despesa despesa) {
        return despesaService.salvar(despesa);
    }

    //a anotações que devo fazer para buscar
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Despesa buscarPorId(@PathVariable Long id) {
        return despesaService.buscarPorId(id);
    }

    //metodo que devo usar par listar todas minhas rendas
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Despesa> buscarTodos(){
        return despesaService.buscarTodos();
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void excluir(@PathVariable long id){
        despesaService.excluir(id);

    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Despesa atualizar (@PathVariable Long id, @RequestBody Despesa despesa){
        return despesaService.atualizar(id, despesa);

    }
}
