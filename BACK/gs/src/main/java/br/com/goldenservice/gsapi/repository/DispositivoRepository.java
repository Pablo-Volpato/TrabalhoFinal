package br.com.goldenservice.gsapi.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.goldenservice.gsapi.entities.Dispositivo;


@Repository
public interface DispositivoRepository extends JpaRepository<Dispositivo,Integer> {
    Page<Dispositivo> findAllByAtivoTrueOrderById(Pageable pageable);
    List<Dispositivo> findAllByAtivoTrue();
    List<Dispositivo> findAllByNomeContainingIgnoreCaseAndAtivoTrue(String keyword);
    List<Dispositivo>findAllByIdAndAtivoTrue(Integer id);

}
