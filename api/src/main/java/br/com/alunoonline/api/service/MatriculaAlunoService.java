package br.com.alunoonline.api.service;

import br.com.alunoonline.api.dtos.AtualizarNotasRequestDTO;
import br.com.alunoonline.api.dtos.DisciplinasAlunoResponseDTO;
import br.com.alunoonline.api.dtos.HistoricoAlunoResponseDTO;
import br.com.alunoonline.api.dtos.projection.HistoricoAlunoViewProjection;
import br.com.alunoonline.api.enums.MatriculaStatusEnum;
import br.com.alunoonline.api.model.MatriculaAluno;
import br.com.alunoonline.api.repository.MatriculaAlunoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class MatriculaAlunoService {

    private static final Double MEDIA_PARA_APROVACAO = 7.0;

    @Autowired
    MatriculaAlunoRepository matriculaAlunoRepository;

    public void matricular(MatriculaAluno matriculaAluno){
        matriculaAluno.setStatus(MatriculaStatusEnum.MATRICULADO);
        matriculaAlunoRepository.save(matriculaAluno);
    }

    public void trancarMatricula(Long id){
        MatriculaAluno matriculaAluno =
                matriculaAlunoRepository.findById(id)
                        .orElseThrow(() ->
                                new ResponseStatusException(HttpStatus.NOT_FOUND,
                                        "Matrícula Aluno não encontrada!"));

        // Se a matrícula do aluno tem o status=Matriculado, Execute o if
        if (matriculaAluno.getStatus().equals(MatriculaStatusEnum.MATRICULADO)) { // O status de matricula aluno é igual MATRICULADO?
            matriculaAluno.setStatus(MatriculaStatusEnum.TRANCADO);
            matriculaAlunoRepository.save(matriculaAluno);
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Só é Possível trancar com o status MATRICULADO!");
        }
    }

    public void atualizarNotas(Long id, AtualizarNotasRequestDTO atualizarNotasRequestDTO){
        // Antes de atualizar, verifica se a matricula existe
        MatriculaAluno matriculaAluno =
                matriculaAlunoRepository.findById(id)
                        .orElseThrow(() ->
                                new ResponseStatusException(HttpStatus.NOT_FOUND,
                                        "Matrícula Aluno não encontrada!"));

        if (atualizarNotasRequestDTO.getNota1() != null) {
            matriculaAluno.setNota1(atualizarNotasRequestDTO.getNota1());
        }

        if (atualizarNotasRequestDTO.getNota2() != null) {
            matriculaAluno.setNota2(atualizarNotasRequestDTO.getNota2());
        }

        // Mudar status da matricula de acordo com a média
        atualizarStatus(matriculaAluno);

        // Agora vamos enviar a matricula atualizada ao BD
        matriculaAlunoRepository.save(matriculaAluno);
    }

    public HistoricoAlunoResponseDTO emitirHistorico(Long alunoId) {
        // Consulta a VIEW vw_historico_aluno via projection, filtrando pelo aluno.
        List<HistoricoAlunoViewProjection> linhas =
                matriculaAlunoRepository.buscarHistoricoPorAluno(alunoId);

        // Garante que exista histórico para o aluno; caso contrário, retorna 404.
        if (linhas.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "Esse aluno não possui matriculas");
        }

        // Usa a primeira linha apenas para obter os dados cadastrais do aluno.
        HistoricoAlunoViewProjection primeiraLinha = linhas.get(0);

        // Monta o DTO principal do histórico com os dados do discente.
        HistoricoAlunoResponseDTO historicoAluno = new HistoricoAlunoResponseDTO();
        historicoAluno.setNomeAluno(primeiraLinha.getNomeAluno());
        historicoAluno.setEmailAluno(primeiraLinha.getEmailAluno());
        historicoAluno.setCpfAluno(primeiraLinha.getCpfAluno());

        // Converte cada linha da VIEW em um DTO de disciplina usando Stream API.
        List<DisciplinasAlunoResponseDTO> disciplinas = linhas.stream()
                .map(this::mapearProjectionParaDisciplinasAlunoResponseDTO)
                .toList();

        // Associa a lista de disciplinas ao histórico e devolve a resposta.
        historicoAluno.setDisciplinas(disciplinas);
        return historicoAluno;
    }

    private void atualizarStatus(MatriculaAluno matriculaAluno) {
        Double nota1 =  matriculaAluno.getNota1();
        Double nota2 =  matriculaAluno.getNota2();

        if (nota1 != null && nota2 != null) {
            Double media = calcularMedia(nota1, nota2); //
            matriculaAluno.setStatus(media >= MEDIA_PARA_APROVACAO ? MatriculaStatusEnum.APROVADO : MatriculaStatusEnum.REPROVADO); //Operador ternário
        }
    }

    private Double calcularMedia(Double nota1, Double nota2){
        return (nota1 != null && nota2 != null) ? (nota1 + nota2 ) / 2 : null;
    };

    private DisciplinasAlunoResponseDTO mapearProjectionParaDisciplinasAlunoResponseDTO(
            HistoricoAlunoViewProjection linha) {

        DisciplinasAlunoResponseDTO response = new DisciplinasAlunoResponseDTO();
        response.setNomeDisciplina(linha.getNomeDisciplina());
        response.setNomeProfessor(linha.getNomeProfessor());
        response.setNota1(linha.getNota1());
        response.setNota2(linha.getNota2());
        response.setMedia(linha.getMedia()); // já vem calculada da VIEW

        if (linha.getStatusMatricula() != null) {
            response.setStatus(MatriculaStatusEnum.valueOf(linha.getStatusMatricula()));
        } else {
            response.setStatus(null);
        }

        return response;
    }
}

