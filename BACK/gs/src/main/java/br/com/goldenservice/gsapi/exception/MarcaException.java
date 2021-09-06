package br.com.goldenservice.gsapi.exception;

public class MarcaException extends Exception{

private static final long serialVersionUID = 1L;
	
	public MarcaException() {
		super();
	}
	
	public MarcaException(String message) {
		super(message);
	}

	public MarcaException(String message, Exception cause) {
		super(message, cause);
	}
	
	public MarcaException(Exception e) {
		super(e);
	}
	
}
