package br.com.goldenservice.gsapi.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.goldenservice.gsapi.entities.Marca;

@Repository
public interface MarcaRepository extends JpaRepository<Marca, Integer> {
	Page<Marca> findAllByAtivoTrueOrderById(Pageable pageable);
	List<Marca> findAllByAtivoTrue();
	List<Marca> findAllByMarcaContainingIgnoreCaseAndAtivoTrue (String marca);
	List<Marca>	findAllByIdAndAtivoTrue(Integer id);
	Boolean existsByMarca (String marca);
}
