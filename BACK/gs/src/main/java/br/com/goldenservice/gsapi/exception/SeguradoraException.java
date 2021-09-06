package br.com.goldenservice.gsapi.exception;

public class SeguradoraException extends Exception {

    private static final long serialVersionUID = 1L;

    public SeguradoraException() {
        super();
    }

    public SeguradoraException(String message) {
        super(message);
    }

    public SeguradoraException(String message, Exception cause) {
        super(message, cause);
    }

    public SeguradoraException(Exception e) {
        super(e);
    }

}
