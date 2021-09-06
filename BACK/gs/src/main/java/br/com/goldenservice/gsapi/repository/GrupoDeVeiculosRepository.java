package br.com.goldenservice.gsapi.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import br.com.goldenservice.gsapi.entities.GrupoDeVeiculos;
import br.com.goldenservice.gsapi.entities.GrupoMacroDeVeiculos;

public interface GrupoDeVeiculosRepository extends JpaRepository<GrupoDeVeiculos, Integer>{
	Page<GrupoDeVeiculos> findAllByAtivoTrueOrderById(Pageable pageable);
	List<GrupoDeVeiculos> findAllByAtivoTrue();
	List<GrupoDeVeiculos> findAllByNomeContainingIgnoreCaseAndAtivoTrue(String keyword);
	List<GrupoDeVeiculos> findAllByGrupoMacroDeVeiculos(GrupoMacroDeVeiculos grupoMacroDeVeiculos);
	List<GrupoDeVeiculos>findAllByIdAndAtivoTrue(Integer id);

}
