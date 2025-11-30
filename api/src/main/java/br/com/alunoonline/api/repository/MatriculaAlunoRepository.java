package br.com.alunoonline.api.repository;

import br.com.alunoonline.api.dtos.projection.HistoricoAlunoViewProjection;
import br.com.alunoonline.api.model.MatriculaAluno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MatriculaAlunoRepository extends JpaRepository<MatriculaAluno, Long> {
    List<MatriculaAluno> findByAlunoId(Long alunoId);

    @Query(value = """
            SELECT
                v.matricula_id      AS matricula_id,
                v.aluno_id          AS aluno_id,
                v.nome_aluno        AS nome_aluno,
                v.email_aluno       AS email_aluno,
                v.cpf_aluno         AS cpf_aluno,
                v.disciplina_id     AS disciplina_id,
                v.nome_disciplina   AS nome_disciplina,
                v.professor_id      AS professor_id,
                v.nome_professor    AS nome_professor,
                v.nota1             AS nota1,
                v.nota2             AS nota2,
                v.media             AS media,
                v.status_matricula  AS status_matricula
            FROM vw_historico_aluno v
            WHERE v.aluno_id = :alunoId
            """,
            nativeQuery = true)
    List<HistoricoAlunoViewProjection> buscarHistoricoPorAluno(@Param("alunoId") Long alunoId);
}
