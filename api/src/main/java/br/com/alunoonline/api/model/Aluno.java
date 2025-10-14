package br.com.alunoonline.api.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@NoArgsConstructor // Gera um construtor sem parâmetros (padrão) para a classe.
@AllArgsConstructor // Gera um construtor com todos os atributos da classe como parâmetros.
@Data // Gera automaticamente getters, setters, toString, equals, hashCode e construtores básicos.
@Table(name = "aluno") // Define o nome da tabela no banco de dados associada a esta entidade.
@Entity // Indica que a classe é uma entidade JPA e será mapeada para uma tabela no banco de dados.
public class Aluno {

    @Id // Indica que a variavel abaixo será usado como chave primária (identificador único) da entidade.
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Define que o valor do ID será gerado automaticamente pelo banco de dados (auto-incremento).
    private Long id;

    private String nomeCompleto;

    private String email;

    private String cpf;
}
