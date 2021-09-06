package br.com.goldenservice.gsapi.exception;

public class GrupoMacroDeVeiculosException extends Exception{

    private static final long serialVersionUID = 1L;

    public GrupoMacroDeVeiculosException() {
        super();
    }

    public GrupoMacroDeVeiculosException(String message) {
        super(message);
    }

    public GrupoMacroDeVeiculosException(String message, Exception cause) {
        super(message, cause);
    }

    public GrupoMacroDeVeiculosException(Exception e) {
        super(e);
    }

}
