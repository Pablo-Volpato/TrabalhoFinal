package br.com.goldenservice.gsapi.exception;

public class NaoConformidadeException extends Exception{

    private static final long serialVersionUID = 1L;

    public NaoConformidadeException() {
        super();
    }

    public NaoConformidadeException(String message) {
        super(message);
    }

    public NaoConformidadeException(String message, Exception cause) {
        super(message, cause);
    }

    public NaoConformidadeException(Exception e) {
        super(e);
    }

}
