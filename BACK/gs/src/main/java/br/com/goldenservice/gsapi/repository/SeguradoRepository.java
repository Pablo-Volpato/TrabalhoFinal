package br.com.goldenservice.gsapi.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.goldenservice.gsapi.entities.Seguradora;

@Repository
public interface SeguradoRepository extends JpaRepository<Seguradora, Integer> {
	Page<Seguradora> findAllByAtivoTrueOrderById(Pageable pageable);
	List<Seguradora> findAllByAtivoTrue();
	List<Seguradora> findAllByNomeContainingIgnoreCaseAndAtivoTrue(String keyword);
	List<Seguradora> findAllByIdAndAtivoTrue(Integer id);
}
