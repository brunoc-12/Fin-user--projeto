package io.github.brunoc12.finuser.repository;



import io.github.brunoc12.finuser.model.Renda;
import io.github.brunoc12.finuser.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
public interface RendaRepository extends JpaRepository<Renda, Long> {
}
