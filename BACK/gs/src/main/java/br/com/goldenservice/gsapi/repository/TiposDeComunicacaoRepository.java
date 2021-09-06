package br.com.goldenservice.gsapi.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.goldenservice.gsapi.entities.TiposDeComunicacao;

@Repository
public interface TiposDeComunicacaoRepository extends JpaRepository<TiposDeComunicacao, Integer> {
	Page<TiposDeComunicacao> findAllByAtivoTrueOrderById(Pageable pageable);
	List<TiposDeComunicacao> findAllByAtivoTrue();
	List<TiposDeComunicacao> findAllByNomeContainingIgnoreCaseAndAtivoTrue(String keyword);
	List<TiposDeComunicacao> findAllByIdAndAtivoTrue(Integer id);
}
