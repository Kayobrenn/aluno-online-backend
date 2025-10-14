# 🧾 API – Sistema Aluno Online

## 📘 Descrição do Projeto

Esta é uma **API REST** desenvolvida com **Spring Boot**, parte do projeto **Aluno Online**.
A API tem como objetivo **gerenciar informações de alunos**, permitindo operações de **cadastro, listagem e busca por ID**.

---

## ⚙️ Tecnologias Utilizadas

* **Java 17+**
* **Spring Boot** (Web, Data JPA)
* **Maven**
* **Banco de Dados:** PostgreSQL
* **Ferramentas Utilizadas:**

  * **Insomnia** → Teste das requisições HTTP
  * **DBeaver** → Visualização e manipulação do banco de dados

---

## 🧠 Endpoints Principais

| Método | Rota           | Descrição                         |
| :----: | :------------- | :-------------------------------- |
| `POST` | `/alunos`      | Cadastra um novo aluno            |
|  `GET` | `/alunos`      | Lista todos os alunos             |
|  `GET` | `/alunos/{id}` | Busca um aluno específico pelo ID |

---

## 📬 Testes no Insomnia

### 🔹 **POST – Criar Aluno**

Requisição para criar um novo aluno no sistema:

```json
{
  "nomeCompleto": "Ryan Richard",
  "email": "ryanrichard456@gmail.com",
  "cpf": "020.178.964-78"
}
```

📸 **Print da requisição POST:**

<img width="1918" height="1016" alt="Request Post" src="https://github.com/user-attachments/assets/f4449acb-115d-4341-89a9-4567dc458d1b" />

---

### 🔹 **GET – Buscar Todos os Alunos**

Requisição para listar todos os alunos cadastrados:

📸 **Print da requisição GET `/alunos`:**

<img width="1919" height="1018" alt="Request findAll (2)" src="https://github.com/user-attachments/assets/f361d820-5c17-4b99-a70e-65d805ea11f1" />


---

### 🔹 **GET – Buscar Aluno por ID**

Requisição que retorna os dados de um aluno específico, conforme o ID informado na URL.

📸 **Print da requisição GET `/alunos/{id}`:**

<img width="1919" height="1014" alt="Request by Id" src="https://github.com/user-attachments/assets/6ea3a9c6-be2d-4317-bdce-29aeb61a4076" />

---

### 📊 Banco de Dados (PostgreSQL)

O sistema utiliza um banco de dados PostgreSQL para persistência dos dados dos alunos.
A tabela principal criada automaticamente pelo Spring Data JPA é chamada alunos.

## 📸 Print do banco no DBeaver:

<img width="1919" height="1021" alt="BD" src="https://github.com/user-attachments/assets/f3654d35-e846-4585-9883-8fa8b27da64d" />

## ✅ Observações Finais

* O projeto segue a arquitetura padrão **Spring Boot REST API**.
* As respostas retornam objetos JSON conforme o modelo `Aluno`.
* Todas as requisições foram testadas via **Insomnia** e validadas no banco de dados pelo **DBeaver**.

---
