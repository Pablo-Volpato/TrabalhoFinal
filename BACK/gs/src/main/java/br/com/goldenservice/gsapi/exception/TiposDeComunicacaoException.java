package br.com.goldenservice.gsapi.exception;

public class TiposDeComunicacaoException  extends Exception {

	private static final long serialVersionUID = 1L;
	
	public TiposDeComunicacaoException() {
		super();
	}
	
	public TiposDeComunicacaoException(String message) {
		super(message);
	}

	public TiposDeComunicacaoException(String message, Exception cause) {
		super(message, cause);
	}

	
	public TiposDeComunicacaoException(Exception e) {
		super(e);
	}

	
}
