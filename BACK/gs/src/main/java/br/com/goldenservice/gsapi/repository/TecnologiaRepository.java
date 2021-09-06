package br.com.goldenservice.gsapi.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.goldenservice.gsapi.entities.Tecnologia;

@Repository
public interface TecnologiaRepository extends JpaRepository<Tecnologia, Integer> {
	Page<Tecnologia> findAllByAtivoTrueOrderById(Pageable pageable);
	List<Tecnologia> findAllByAtivoTrue();
	List<Tecnologia> findAllByNomeContainingIgnoreCaseAndAtivoTrue(String keyword);
	List<Tecnologia> findAllByIdAndAtivoTrue(Integer id);
}
