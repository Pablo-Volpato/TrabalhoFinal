package br.com.goldenservice.gsapi.exception;

public class DispositivoException extends Exception {

    private static final long serialVersionUID = 1L;

    public DispositivoException() {
        super();
    }

    public DispositivoException(String message) {
        super(message);
    }

    public DispositivoException(String message, Exception cause) {
        super(message, cause);
    }


    public DispositivoException(Exception e) {
        super(e);
    }


}
