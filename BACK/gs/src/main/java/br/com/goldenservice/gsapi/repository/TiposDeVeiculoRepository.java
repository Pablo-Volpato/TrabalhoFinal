package br.com.goldenservice.gsapi.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.goldenservice.gsapi.entities.TiposDeVeiculos;

@Repository
public interface TiposDeVeiculoRepository extends JpaRepository<TiposDeVeiculos, Integer> {
	Page<TiposDeVeiculos> findAllByAtivoTrueOrderById(Pageable pageable);
	List<TiposDeVeiculos> findAllByAtivoTrue();
	List<TiposDeVeiculos> findAllByNomeContainingIgnoreCaseAndAtivoTrue(String keyword);
	List<TiposDeVeiculos> findAllByIdAndAtivoTrue(Integer id);
}
