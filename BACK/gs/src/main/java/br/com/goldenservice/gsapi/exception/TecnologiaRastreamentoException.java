package br.com.goldenservice.gsapi.exception;

public class TecnologiaRastreamentoException extends Exception{

	private static final long serialVersionUID = 1L;
	
	public TecnologiaRastreamentoException() {
		super();
	}
	
	public TecnologiaRastreamentoException(String message) {
		super(message);
	}

	public TecnologiaRastreamentoException(String message, Exception cause) {
		super(message, cause);
	}

	
	public TecnologiaRastreamentoException(Exception e) {
		super(e);
	}

	
}
