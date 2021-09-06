package br.com.goldenservice.gsapi.repository;


import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.goldenservice.gsapi.entities.NaoConformidade;
@Repository
public interface NaoConformidadeRepository extends JpaRepository<NaoConformidade,Integer> {
    Page<NaoConformidade> findAllByAtivoTrueOrderById(Pageable pageable);
    List<NaoConformidade> findAllByAtivoTrue();
    List<NaoConformidade> findAllByNaturezaDoEventoContainingIgnoreCaseAndAtivoTrue (String naoConformidade);
    List<NaoConformidade> findAllByIdAndAtivoTrue(Integer id);



}
