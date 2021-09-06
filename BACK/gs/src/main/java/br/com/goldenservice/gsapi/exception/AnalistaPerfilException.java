package br.com.goldenservice.gsapi.exception;

public class AnalistaPerfilException extends Exception{

private static final long serialVersionUID = 1L;
	
	public AnalistaPerfilException() {
		super();
	}
	
	public AnalistaPerfilException(String message) {
		super(message);
	}

	public AnalistaPerfilException(String message, Exception cause) {
		super(message, cause);
	}
	
	public AnalistaPerfilException(Exception e) {
		super(e);
	}
	
}
