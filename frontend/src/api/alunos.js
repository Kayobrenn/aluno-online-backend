import { http } from "./http"

export async function listarAlunos() {
    const response = await http.get("/alunos")
    return response.data
}

export async function criarAluno(payload) {
    const response = await http.post("/alunos", payload)
    return response.data
}

export async function buscarAlunoPorId(id) {
    const response = await http.get(`/alunos/${id}`)
    return response.data
}

export async function atualizarAluno(id, payload) {
    const response = await http.put(`/alunos/${id}`, payload)
    return response.data
}

export async function deletarAluno(id) {
    await http.delete(`/alunos/${id}`)
}