# 🧾 API – Sistema Aluno Online

## 📘 Descrição do Projeto

Esta é uma **API REST** desenvolvida por **Kayo Brenno**, como **projeto de conclusão das disciplinas de Tecnologia para Back-End e Banco de Dados Avançado**, com foco em construção de serviços RESTful utilizando **Java com Spring Boot** e integração com **PostgreSQL**.

O objetivo da API é **gerenciar o fluxo acadêmico do aluno no sistema Aluno Online**, permitindo operações como:

- Cadastro e gerenciamento de **alunos** e **professores**
- Cadastro e gerenciamento de **disciplinas**
- **Matrícula** de alunos em disciplinas
- **Atualização de notas** e **emissão de histórico escolar**
- Operações de **trancamento de matrícula**

Todo o consumo da API foi testado via **Insomnia**, e o banco de dados é acompanhado pelo **DBeaver**.

---

## ⚙️ Tecnologias Utilizadas

- **Java 17**
- **Spring Boot**
- **Maven**
- **Banco de Dados:** PostgreSQL

**Ferramentas de Apoio:**

- **Insomnia** → Teste das requisições HTTP  
- **DBeaver** → Visualização e manipulação das tabelas do banco de dados

---

## 🧩 Visão Geral dos Módulos da API

| Módulo            | Descrição geral                                                                 |
|-------------------|---------------------------------------------------------------------------------|
| **Alunos**        | CRUD completo de alunos                                                         |
| **Professores**   | CRUD completo de professores                                                    |
| **Disciplinas**   | CRUD completo de disciplinas ofertadas                                          |
| **Matrículas**    | Matrícula de alunos em disciplinas, trancamento de matrícula e atualização de notas |
| **Histórico**     | Emissão do histórico acadêmico consolidado do aluno                            |

> O histórico acadêmico é emitido a partir das informações de matrícula, disciplinas e notas do aluno.

---

## 🧠 Endpoints Principais (Resumo)

Abaixo um resumo dos endpoints organizados por módulo.  
As seções seguintes detalham exemplos de requisição e prints das chamadas no Insomnia.

### 👨‍🎓 Módulo Alunos

Base: `/alunos`

| Método   | Rota             | Descrição                         |
|:--------:|------------------|-----------------------------------|
| `POST`   | `/alunos`        | Cadastra um novo aluno            |
| `GET`    | `/alunos`        | Lista todos os alunos             |
| `GET`    | `/alunos/{id}`   | Busca um aluno específico pelo ID |
| `PUT`    | `/alunos/{id}`   | Atualiza os dados de um aluno     |
| `DELETE` | `/alunos/{id}`   | Remove um aluno pelo ID           |

---

### 👨‍🏫 Módulo Professores

Base: `/professores`

| Método   | Rota                   | Descrição                                   |
|:--------:|------------------------|---------------------------------------------|
| `POST`   | `/professores`         | Cadastra um novo professor                  |
| `GET`    | `/professores`         | Lista todos os professores                  |
| `GET`    | `/professores/{id}`    | Busca um professor específico pelo ID       |
| `PUT`    | `/professores/{id}`    | Atualiza os dados completos de um professor |
| `DELETE` | `/professores/{id}`    | Remove um professor pelo ID                 |

---

### 📚 Módulo Disciplinas

Base: `/disciplinas`

| Método   | Rota                    | Descrição                             |
|:--------:|-------------------------|---------------------------------------|
| `POST`   | `/disciplinas`          | Cadastra uma nova disciplina          |
| `GET`    | `/disciplinas`          | Lista todas as disciplinas            |
| `GET`    | `/disciplinas/{id}`     | Busca uma disciplina específica pelo ID |
| `PUT`    | `/disciplinas/{id}`     | Atualiza os dados de uma disciplina   |
| `DELETE` | `/disciplinas/{id}`     | Remove uma disciplina pelo ID         |

---

### 🎓 Módulo Matrículas & Histórico

Base: `/matriculas`

| Método  | Rota                                      | Descrição                                                      |
|:-------:|-------------------------------------------|----------------------------------------------------------------|
| `POST`  | `/matriculas`                             | Realiza a matrícula de um aluno em uma disciplina             |
| `PATCH` | `/matriculas/trancar/{id}`                | Tranca a matrícula de um aluno (altera o status da matrícula) |
| `PATCH` | `/matriculas/atualizar-notas/{id}`        | Atualiza as notas de uma matrícula específica                 |
| `GET`   | `/matriculas/emitir-historico/{alunoId}`  | Emite o histórico acadêmico consolidado do aluno              |

> Nos endpoints de matrícula são utilizados métodos `PATCH` para representar atualizações parciais de recursos (ex.: apenas status de matrícula ou notas).

---

## 📬 Testes no Insomnia – CRUD Aluno

### 🔹 `POST /alunos` – Criar Aluno

Exemplo de corpo da requisição para criar um novo aluno:

~~~json
{
  "nomeCompleto": "Juliana Souza de Almeida",
  "email": "juliana.almeida@example.com",
  "cpf": "769.135.402-61"
}
~~~

<details>
  <summary>📸 Clique para ver o print da requisição POST</summary>

  <img width="1919" height="1017" alt="Request Post" src="https://github.com/user-attachments/assets/2b6e8230-d616-4941-a3df-29ef926c0879" />

</details>

---

### 🔹 `GET /alunos` – Buscar Todos os Alunos

Requisição para listar todos os alunos cadastrados.

<details>
  <summary>📸 Clique para ver o print da requisição GET /alunos</summary>

  <img width="1919" height="1021" alt="Request findAll (2)" src="https://github.com/user-attachments/assets/920065e4-0c7e-466c-944c-9ab8d2add77d" />

</details>

---

### 🔹 `GET /alunos/{id}` – Buscar Aluno por ID

Requisição que retorna os dados de um aluno específico, conforme o ID informado na URL.

<details>
  <summary>📸 Clique para ver o print da requisição GET /alunos/{id}</summary>

  <img width="1920" height="1020" alt="Request by Id" src="https://github.com/user-attachments/assets/a1279fe0-e011-4f29-ba38-cb3f5fc215d6" />

</details>

---

## 📊 Banco de Dados – Alunos (PostgreSQL)

O sistema utiliza um banco de dados **PostgreSQL** para persistência dos dados dos alunos.  
A tabela principal criada automaticamente pelo **Spring Data JPA** é chamada `alunos`.

<details>
  <summary>📸 Clique para ver o print da tabela de alunos no DBeaver</summary>

  <img width="1920" height="1020" alt="BD" src="https://github.com/user-attachments/assets/f8f0820b-f583-4d3f-859f-4311e9a46fff" />

</details>

---

## 📬 Testes no Insomnia – CRUD Professor

### 🔹 `POST /professores` – Criar Professor

Exemplo de corpo da requisição para criar um novo professor:

~~~json
{
  "nomeCompleto": "Luciana Martins Cardoso",
  "email": "luciana.cardoso@example.com",
  "cpf": "910.375.284-40"
}
~~~

<details>
  <summary>📸 Clique para ver o print da requisição POST /professores</summary>

  <img width="1920" height="1020" alt="criarProfessor" src="https://github.com/user-attachments/assets/66d4ee98-fc88-4d30-8e2f-217b97dcc714" />

</details>

---

### 🔹 `GET /professores` – Buscar Todos os Professores

Requisição para listar todos os professores cadastrados.

<details>
  <summary>📸 Clique para ver o print da requisição GET /professores</summary>

  <img width="1920" height="1020" alt="buscarTodosProfessores" src="https://github.com/user-attachments/assets/b0e49bdd-453a-4875-b309-c7e15d9bc93f" />

</details>

---

### 🔹 `GET /professores/{id}` – Buscar Professor por ID

Requisição que retorna os dados de um professor específico, conforme o ID informado na URL.

<details>
  <summary>📸 Clique para ver o print da requisição GET /professores/{id}</summary>

  <img width="1920" height="1020" alt="buscarProfessorPorId" src="https://github.com/user-attachments/assets/89e9f41d-c7c8-4645-ae1a-204b923d3d05" />

</details>

---

### 🔹 `PUT /professores/{id}` – Atualizar Professor

Requisição que atualiza todos os dados de um professor específico, conforme o ID informado na URL.

<details>
  <summary>📸 Clique para ver o print da requisição PUT /professores/{id}</summary>

  <img width="1920" height="1020" alt="atualizarProfessorPorId" src="https://github.com/user-attachments/assets/5029318d-2f86-4275-a189-f60414f6958b" />
  <img width="1920" height="1020" alt="nomeAtualizado" src="https://github.com/user-attachments/assets/50d8f61a-8fdb-4032-9956-4b2dc8886cf4" />

</details>

---

### 🔹 `DELETE /professores/{id}` – Deletar Professor

Requisição que deleta os dados de um professor específico, conforme o ID informado na URL.

<details>
  <summary>📸 Clique para ver o print da requisição DELETE /professores/{id}</summary>

  <img width="1920" height="1020" alt="deletarProfessorPorId" src="https://github.com/user-attachments/assets/741a3780-7d88-4a7d-89c3-2d1bae1f1efa" />

</details>

---

## 📊 Banco de Dados – Professores (PostgreSQL)

Tabela `professor` gerenciada pelo **Spring Data JPA**.

<details>
  <summary>📸 Clique para ver o print da tabela de professor no DBeaver</summary>

  <img width="1920" height="1020" alt="BD" src="https://github.com/user-attachments/assets/639a5ddf-3da8-45b8-90ff-96860491c706" />

</details>

---

## 📬 Testes no Insomnia – CRUD Disciplina

### 🔹 `POST /disciplinas` – Criar Disciplina

Exemplo de corpo da requisição para criar uma nova disciplina:

~~~json
{
  "nome": "Engenharia de Software Aplicada",
  "professor": {
    "id": 4
  }
}
~~~

<details>
  <summary>📸 Clique para ver o print da requisição POST /disciplinas</summary>

  <img width="1920" height="1020" alt="criarDisciplina" src="https://github.com/user-attachments/assets/942412bf-e212-43b3-9478-bb063264c16a" />

</details>

---

### 🔹 `GET /disciplinas` – Buscar Todas as Disciplinas

Requisição para listar todas as disciplinas cadastradas.

<details>
  <summary>📸 Clique para ver o print da requisição GET /disciplinas</summary>

  <img width="1920" height="1020" alt="buscarTodasDisciplinas" src="https://github.com/user-attachments/assets/696968d3-a52f-48b4-aa54-1d4a639d143a" />

</details>

---

### 🔹 `GET /disciplinas/{id}` – Buscar Disciplina por ID

Requisição que retorna os dados de uma disciplina específica, conforme o ID informado na URL.

<details>
  <summary>📸 Clique para ver o print da requisição GET /disciplinas/{id}</summary>

  <img width="1920" height="1020" alt="buscarDisciplinaPorId" src="https://github.com/user-attachments/assets/bb985694-a02d-4ca0-85a7-4eefe980644c" />

</details>

---

### 🔹 `PUT /disciplinas/{id}` – Atualizar Disciplina

Requisição que atualiza os dados de uma disciplina específica.

<details>
  <summary>📸 Clique para ver o print da requisição PUT /disciplinas/{id}</summary>

  <img alt="atualizarDisciplinaPorId" width="1920" height="1020" src="https://github.com/user-attachments/assets/10887cfd-8b26-42c3-9524-78794dd4765d" />
  
</details>

---

### 🔹 `DELETE /disciplinas/{id}` – Deletar Disciplina

Requisição que remove uma disciplina específica, conforme o ID informado na URL.

<details>
  <summary>📸 Clique para ver o print da requisição DELETE /disciplinas/{id}</summary>

  <img width="1920" height="1020" alt="deletarDisciplinaPorId" src="https://github.com/user-attachments/assets/e18698d0-efe5-4385-a79c-f5bfe7da163e" />

</details>

---

## 📊 Banco de Dados – Disciplina (PostgreSQL)

Tabela `disciplina` gerenciada pelo **Spring Data JPA**.

<details>
  <summary>📸 Clique para ver o print da tabela de disciplina no DBeaver</summary>

  <img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/3328a72c-43ad-473f-871a-d92d33a3fecb" />

</details>

---

## 📬 Testes no Insomnia – Matrículas & Histórico

### 🔹 `POST /matriculas` – Criar Matrícula

Exemplo de corpo da requisição para matricular um aluno em uma disciplina:

~~~json
{
	"aluno": {
		"id": 1
	},
	"disciplina": {
		"id": 2
	}
}
~~~

<details>
  <summary>📸 Clique para ver o print da requisição POST /matriculas</summary>

  <img width="1920" height="1020" alt="matricular" src="https://github.com/user-attachments/assets/9821685a-a8a7-457c-96f0-38edd495bdcd" />

</details>

---

### 🔹 `PATCH /matriculas/atualizar-notas/{id}` – Atualizar Notas da Matrícula

Exemplo de corpo da requisição para atualizar as notas de uma matrícula:

~~~json
{
	"nota1": 7,
	"nota2": 7
}
~~~

<details>
  <summary>📸 Clique para ver o print da requisição PATCH /matriculas/atualizar-notas/{id}</summary>

  <img width="1920" height="1020" alt="atualizarNotas" src="https://github.com/user-attachments/assets/75c16398-7684-451f-a8ea-99bec5c9853f" />

</details>

---

### 🔹 `PATCH /matriculas/trancar/{id}` – Trancar Matrícula

Requisição responsável por alterar o status da matrícula para **TRANCADA** (ou equivalente na regra de negócio).

<details>
  <summary>📸 Clique para ver o print da requisição PATCH /matriculas/trancar/{id}</summary>

  <img width="1920" height="1020" alt="trancarMatricula" src="https://github.com/user-attachments/assets/7b303f12-955f-45fd-a788-30b097e3c1ae" />

</details>

---

### 🔹 `GET /matriculas/emitir-historico/{alunoId}` – Emitir Histórico do Aluno

Requisição que consolida as matrículas, disciplinas e notas do aluno e retorna seu histórico acadêmico.

<details>
  <summary>📸 Clique para ver o print da requisição GET /matriculas/emitir-historico/{alunoId}</summary>

  <img width="1920" height="1020" alt="emitirHistorico" src="https://github.com/user-attachments/assets/e43821f2-e047-4593-8e58-0f1d0f118523" />

</details>

---

## 📊 Banco de Dados – matricula_aluno (PostgreSQL)

Tabela `matricula_aluno` gerenciada pelo **Spring Data JPA**.

<details>
  <summary>📸 Clique para ver o print da tabela de disciplina no DBeaver</summary>

  <img width="1920" height="1020" alt="image" src="https://github.com/user-attachments/assets/ed2395b0-9f1d-4296-b265-6f535884bb29" />

</details>

---

## 📊 View – vw_historico_aluno

A view `vw_historico_aluno` foi criada para centralizar e facilitar a emissão dos **históricos acadêmicos dos alunos**, reunindo informações de matrícula, notas, disciplinas e professores em uma única consulta.
Seu acesso e gerenciamento são realizados por meio do **Spring Data JPA**, garantindo integração eficiente com a camada de persistência do sistema.
```sql
CREATE VIEW vw_historico_aluno AS
SELECT
    ma.id                  AS matricula_id,
    a.id                   AS aluno_id,
    a.nomecompleto         AS nome_aluno,
    a.email                AS email_aluno,
    a.cpf                  AS cpf_aluno,
    d.id                   AS disciplina_id,
    d.nome                 AS nome_disciplina,
    p.id                   AS professor_id,
    p.nomecompleto         AS nome_professor,
    ma.nota1               AS nota1,
    ma.nota2               AS nota2,
    (ma.nota1 + ma.nota2) / 2.0 AS media,
    ma.status              AS status_matricula
FROM matricula_aluno ma
JOIN aluno a        ON a.id = ma.aluno_id
JOIN disciplina d   ON d.id = ma.disciplina_id
JOIN professor p    ON p.id = d.professor_id;
```
<details>
  <summary>📸 Clique para ver o print da view no DBeaver</summary>

  <img width="1920" height="1020" alt="image_view" src="https://github.com/user-attachments/assets/890663db-43ae-49c2-9ad8-54a2a125a8f9" />

</details>

---

## ✅ Observações Finais

- O projeto segue a arquitetura padrão de uma **Spring Boot REST API**.  
- As respostas são retornadas em **JSON**, de acordo com os modelos (`Aluno`, `Professor`, `Disciplina`, `Matricula`, etc.).  
- Toda a API foi testada via **Insomnia** e os dados confirmados no **DBeaver**.  
