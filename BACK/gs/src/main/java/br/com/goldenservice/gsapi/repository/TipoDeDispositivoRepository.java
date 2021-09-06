package br.com.goldenservice.gsapi.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import br.com.goldenservice.gsapi.entities.TipoDeDispositivo;

public interface TipoDeDispositivoRepository extends JpaRepository<TipoDeDispositivo, Integer>{
	Page<TipoDeDispositivo> findAllByAtivoTrueOrderById(Pageable pageable);
	List<TipoDeDispositivo> findAllByAtivoTrue();
	List<TipoDeDispositivo> findAllByNomeContainingIgnoreCaseAndAtivoTrue(String keyword);
	List<TipoDeDispositivo>	findAllByIdAndAtivoTrue(Integer id);
}
