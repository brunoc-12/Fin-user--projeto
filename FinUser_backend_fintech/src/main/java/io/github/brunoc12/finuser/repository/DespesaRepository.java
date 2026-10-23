package io.github.brunoc12.finuser.repository;


import io.github.brunoc12.finuser.model.Despesa;
import io.github.brunoc12.finuser.model.Renda;
import io.github.brunoc12.finuser.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
public interface DespesaRepository extends JpaRepository<Despesa, Long> {
}
