package br.com.goldenservice.gsapi.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import br.com.goldenservice.gsapi.entities.Corretora;

public interface CorretoraRepository extends JpaRepository<Corretora, Integer> {
	Page<Corretora> findAllByAtivoTrueOrderById(Pageable pageable);
	List<Corretora> findAllByAtivoTrue();
	List<Corretora>findAllByNomeContainingIgnoreCaseAndAtivoTrue(String keyword);
	List<Corretora>findAllByIdAndAtivoTrue(Integer id);


}
