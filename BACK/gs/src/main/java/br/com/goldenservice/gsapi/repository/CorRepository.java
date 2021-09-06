package br.com.goldenservice.gsapi.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.goldenservice.gsapi.entities.Cor;

@Repository
public interface CorRepository extends JpaRepository<Cor, Integer> {
	Page<Cor> findAllByAtivoTrueOrderById(Pageable pageable);
	List<Cor> findAllByAtivoTrue();
	List<Cor>findAllByCorContainingIgnoreCaseAndAtivoTrue(String keyword);
	List<Cor>findAllByIdAndAtivoTrue(Integer id);


}
