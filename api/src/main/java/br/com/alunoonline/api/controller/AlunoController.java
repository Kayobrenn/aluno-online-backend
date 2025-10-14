package br.com.alunoonline.api.controller;

import br.com.alunoonline.api.model.Aluno;
import br.com.alunoonline.api.service.AlunoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController // Define a classe como um controlador REST que responde requisições HTTP.
@RequestMapping("/alunos") // Define o endpoint base para as requisições HTTP relacionadas a alunos.
public class AlunoController {

    @Autowired // Injeta automaticamente o Service gerenciado pelo Spring
    AlunoService alunoService;


    @PostMapping // Indica que o metodo abaixo é um POST
    @ResponseStatus(HttpStatus.CREATED)
    public void criarAluno(@RequestBody Aluno aluno) { // A anotação transforma o JSON recebido na requisição em um objeto Java.
        alunoService.criarAluno(aluno);
    }

    @GetMapping// Indica que o metodo abaixo é um GET
    @ResponseStatus(HttpStatus.OK)
    public List<Aluno> buscarTodosAlunos() {
        return alunoService.buscarTodosAlunos();
    }

    @GetMapping("/{id}")// Indica que o metodo abaixo é um GET por {id}
    @ResponseStatus(HttpStatus.OK)
    public Optional<Aluno> buscarAlunoPorId(@PathVariable long id){ // A anotação indica que a variavel está no caminho!
        return alunoService.buscarAlunoPorId(id);
    }

}
