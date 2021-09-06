package br.com.goldenservice.gsapi.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.goldenservice.gsapi.entities.AnalistasdePerfil;

@Repository
public interface AnalistasdePerfilRepository extends JpaRepository<AnalistasdePerfil, Integer> {
	Page<AnalistasdePerfil> findAllByAtivoTrueOrderById(Pageable pageable);
	List<AnalistasdePerfil> findAllByAtivoTrue();
	List<AnalistasdePerfil>findAllByNomeContainingIgnoreCaseAndAtivoTrue(String keyword);
	List<AnalistasdePerfil>	findAllByIdAndAtivoTrue(Integer id);

}
