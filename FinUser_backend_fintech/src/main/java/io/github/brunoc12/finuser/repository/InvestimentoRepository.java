package io.github.brunoc12.finuser.repository;


import io.github.brunoc12.finuser.model.Investimento;
import org.springframework.data.jpa.repository.JpaRepository;
public interface InvestimentoRepository extends JpaRepository<Investimento, Long> {
}
