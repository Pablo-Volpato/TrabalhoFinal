package br.com.goldenservice.gsapi.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.goldenservice.gsapi.entities.GrupoMacroDeVeiculos;

@Repository
public interface GrupoMacroDeVeiculosRepository extends JpaRepository<GrupoMacroDeVeiculos,Integer> {

    Page<GrupoMacroDeVeiculos> findAllByAtivoTrueOrderById(Pageable pageable);
    List<GrupoMacroDeVeiculos> findAllByNomeContainingIgnoreCaseAndAtivoTrue(String keyword);
    List<GrupoMacroDeVeiculos> findAllByAtivoTrue();
    List<GrupoMacroDeVeiculos>findAllByIdAndAtivoTrue(Integer id);

}
