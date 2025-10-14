package br.com.alunoonline.api.service;

import br.com.alunoonline.api.model.Aluno;
import br.com.alunoonline.api.repository.AlunoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service // Indica que a classe abaixo é um componente de serviço do Spring, responsável pela regra de negócio.
public class AlunoService {

    @Autowired // Injeta automaticamente o repositório gerenciado pelo Spring
    AlunoRepository alunoRepository;

    // Salva um novo aluno no banco de dados.
    public void criarAluno(Aluno aluno){
        alunoRepository.save(aluno);
    }

    // Busca todos os aluno no banco de dados.
    public List<Aluno> buscarTodosAlunos(){
        return alunoRepository.findAll();
    }

    // Busca um aluno no banco de dados.
    public Optional<Aluno> buscarAlunoPorId(long id){
        return alunoRepository.findById(id);
    }
}
