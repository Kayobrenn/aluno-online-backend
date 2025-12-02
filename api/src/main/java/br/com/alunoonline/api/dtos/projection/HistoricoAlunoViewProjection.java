package br.com.alunoonline.api.dtos.projection;

public interface HistoricoAlunoViewProjection {

    Long getMatriculaId();

    Long getAlunoId();
    String getNomeAluno();
    String getEmailAluno();
    String getCpfAluno();

    Long getDisciplinaId();
    String getNomeDisciplina();

    Long getProfessorId();
    String getNomeProfessor();

    Double getNota1();
    Double getNota2();
    Double getMedia();

    String getStatusMatricula();
}