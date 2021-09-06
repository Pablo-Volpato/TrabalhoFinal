package br.com.goldenservice.gsapi.exception;

public class CorException extends Exception{

	private static final long serialVersionUID = 1L;
	
	public CorException() {
		super();
	}
	
	public CorException(String message) {
		super(message);
	}

	public CorException(String message, Exception cause) {
		super(message, cause);
	}
	
	public CorException(Exception e) {
		super(e);
	}
	
}
