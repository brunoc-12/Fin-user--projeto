package io.github.brunoc12.finuser.controller;



import io.github.brunoc12.finuser.model.Despesa;
import io.github.brunoc12.finuser.model.Investimento;
import io.github.brunoc12.finuser.service.DespesaService;
import io.github.brunoc12.finuser.service.InvestimentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/investimentos")
public class investimentoController {

    @Autowired
    private InvestimentoService investimentoService;

    // método para salvar uma despesa
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Investimento salvar(@RequestBody Investimento investimento) {
        return investimentoService.salvar(investimento);
    }

    //a anotações que devo fazer para buscar
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Investimento buscarPorId(@PathVariable Long id) {
        return investimentoService.buscarPorId(id);
    }

    //metodo que devo usar par listar todas minhas rendas
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Investimento> buscarTodos(){
        return investimentoService.buscarTodos();
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void excluir(@PathVariable long id){
        investimentoService.excluir(id);

    }


    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Investimento atualizar (@PathVariable Long id, @RequestBody Investimento investimento){
        return investimentoService.atualizar(id, investimento);

    }
}
