import AlunoForm from "../components/AlunoForm"
import { useEffect, useMemo, useState } from "react"
import { listarAlunos, criarAluno, buscarAlunoPorId, atualizarAluno, deletarAluno } from "../api/alunos"

export default function AlunosPage() {
    const [alunos, setAlunos] = useState([])
    const [carregando, setCarregando] = useState(false)
    const [erroPagina, setErroPagina] = useState("")
    const [erroModal, setErroModal] = useState("")
    const [sucesso, setSucesso] = useState("")

    const [nomeCompleto, setNomeCompleto] = useState("")
    const [email, setEmail] = useState("")
    const [cpf, setCpf] = useState("")
    const [editandoId, setEditandoId] = useState(null)
    const [salvando, setSalvando] = useState(false)

    const [filtroId, setFiltroId] = useState("")
    const [filtroCpf, setFiltroCpf] = useState("")
    const [filtroNome, setFiltroNome] = useState("")
    const [alunoEncontrado, setAlunoEncontrado] = useState(null)
    const [msg, setMsg] = useState("")

    const [pagina, setPagina] = useState(1)
    const pageSize = 5

    const [modalAberto, setModalAberto] = useState(false)

    const listaBase = useMemo(() => (alunoEncontrado ? [alunoEncontrado] : alunos), [alunoEncontrado, alunos])
    const total = listaBase.length
    const totalPaginas = Math.max(1, Math.ceil(total / pageSize))
    const inicio = (pagina - 1) * pageSize
    const paginaAtual = listaBase.slice(inicio, inicio + pageSize)

    useEffect(() => {
        if (pagina > totalPaginas) setPagina(totalPaginas) // evita página vazia
    }, [totalPaginas, pagina])

    useEffect(() => {
        carregar()
    }, [])

    useEffect(() => {
        function onKeyDown(e) {
            if (e.key === "Escape") fecharModal()
        }
        if (modalAberto) document.addEventListener("keydown", onKeyDown)
        return () => document.removeEventListener("keydown", onKeyDown)
    }, [modalAberto])

    async function carregar() {
        try {
            setCarregando(true)
            setErroPagina("")
            const data = await listarAlunos()
            setAlunos(Array.isArray(data) ? data : [])
        } catch (e) {
            setErroPagina("Falha ao buscar alunos, tente novamente!")
        } finally {
            setCarregando(false)
        }
    }

    async function handleBuscarPorId() {
        setMsg("")
        const id = filtroId.trim()

        if (!id) {
            setMsg("Informe um ID para buscar.")
            return
        }
        if (!/^\d+$/.test(id)) {
            setMsg("ID deve conter apenas números.")
            return
        }

        try {
            setCarregando(true)
            const aluno = await buscarAlunoPorId(id)
            setAlunoEncontrado(aluno)
            setPagina(1)
        } catch {
            setAlunoEncontrado(null)
            setMsg("Aluno não encontrado.")
        } finally {
            setCarregando(false)
        }
    }

    function handleLimparBusca() {
        setFiltroId("")
        setFiltroCpf("")
        setFiltroNome("")
        setAlunoEncontrado(null)
        setMsg("")
        setPagina(1)
    }

    function abrirModalNovo() {
        setEditandoId(null)
        setNomeCompleto("")
        setEmail("")
        setCpf("")
        setErroModal("")
        setMsg("")
        setModalAberto(true)
    }

    function validarFormulario() {
        const nome = nomeCompleto.trim()
        const mail = email.trim()
        const doc = cpf.trim()

        if (!nome) return "Nome completo é obrigatório."
        if (!mail) return "Email é obrigatório."
        if (!doc) return "CPF é obrigatório."
        if (!mail.includes("@")) return "Email inválido."
        if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf.trim())) return "CPF inválido. Use o formato 000.000.000-00."

        return ""
    }

    async function abrirModalEditar(id) {
        try {
            setErroModal("")
            const aluno = await buscarAlunoPorId(id)
            setEditandoId(id)
            setNomeCompleto(aluno.nomeCompleto ?? "")
            setEmail(aluno.email ?? "")
            setCpf(aluno.cpf ?? "")
            setModalAberto(true)
        } catch {
            setErroModal("Não foi possível carregar o aluno para edição.")
        }
    }

    async function excluirAluno(id, nome) {
        const ok = confirm(`Excluir o aluno ${nome}?`)
        if (!ok) return

        try {
            setErroPagina("")
            setSucesso("")
            await deletarAluno(id)
            await carregar()
            setSucesso("Aluno excluído!")
            setTimeout(() => setSucesso(""), 2000)
        } catch {
            setErroPagina("Não consegui excluir o aluno.")
        }
    }

    function fecharModal() {
        setModalAberto(false)
        setEditandoId(null)
        setNomeCompleto("")
        setEmail("")
        setCpf("")
        setErroModal("")
    }

    return (
        <div style={{ padding: 16, fontFamily: "Arial" }}>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-slate-800">
                    Gerenciamento de Alunos
                </h1>

                <button
                    type="button"
                    onClick={abrirModalNovo}
                    className="inline-flex items-center gap-2 rounded-lg bg-sky-800 px-3 py-2 text-white hover:bg-slate-700"
                    title="Adicionar novo aluno"
                >
                    <span className="text-lg leading-none">+</span>
                    <span>Novo aluno</span>
                </button>
            </div>

            <div className="mt-6 bg-white rounded-xl shadow p-4 flex flex-col gap-3">
                <div className="flex flex-col md:flex-row gap-3">
                    <div className="flex flex-col gap-1 md:w-40">
                        <label className="text-sm text-slate-600">ID</label>
                        <input
                            value={filtroId}
                            onChange={(e) => setFiltroId(e.target.value)}
                            placeholder="Ex: 10"
                            inputMode="numeric"
                            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-300"
                        />
                    </div>

                    <div className="flex flex-col gap-1 md:w-64">
                        <label className="text-sm text-slate-600">CPF (em construção)</label>
                        <input
                            value={filtroCpf}
                            onChange={(e) => setFiltroCpf(e.target.value)}
                            disabled
                            placeholder="000.000.000-00"
                            className="border rounded-lg px-3 py-2 bg-slate-50 text-slate-400 cursor-not-allowed"
                        />
                    </div>

                    <div className="flex flex-col gap-1 flex-1">
                        <label className="text-sm text-slate-600">Nome (em construção)</label>
                        <input
                            value={filtroNome}
                            onChange={(e) => setFiltroNome(e.target.value)}
                            disabled
                            placeholder="Digite o nome"
                            className="border rounded-lg px-3 py-2 bg-slate-50 text-slate-400 cursor-not-allowed"
                        />
                    </div>

                    <div className="flex items-end gap-2">
                        <button
                            type="button"
                            onClick={handleBuscarPorId}
                            className="px-4 py-2 rounded-lg bg-sky-800 text-white hover:bg-slate-700 disabled:opacity-60"
                            disabled={carregando}
                        >
                            Buscar
                        </button>

                        <button
                            type="button"
                            onClick={handleLimparBusca}
                            className="px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-50"
                        >
                            Limpar
                        </button>
                    </div>
                </div>

                {msg && <div className="text-sm text-slate-700 bg-slate-100 rounded-lg px-3 py-2">{msg}</div>}
            </div>

            {sucesso && (
                <div
                    style={{
                        position: "fixed",
                        top: 16,
                        right: 16,
                        padding: "10px 14px",
                        borderRadius: 8,
                        background: "#1f7a1f",
                        color: "white",
                        boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
                        zIndex: 9999,
                    }}
                >
                    {sucesso}
                </div>
            )}

            {carregando && <p>Carregando alunos...</p>}
            {erroPagina && <p style={{ color: "red" }}>{erroPagina}</p>}

            {!carregando && !erroPagina && (
                <div className="mt-6 bg-white rounded-xl shadow p-4">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-slate-600">
                            Mostrando {total === 0 ? 0 : inicio + 1}–{Math.min(inicio + pageSize, total)} de {total}
                        </p>

                        <div className="flex items-center gap-2 text-sm">
                            <button
                                className="px-3 py-1 rounded border hover:bg-slate-50 disabled:opacity-50"
                                onClick={() => setPagina((p) => Math.max(1, p - 1))}
                                disabled={pagina === 1}
                            >
                                Anterior
                            </button>

                            <span className="text-slate-600">
                                Página {pagina} de {totalPaginas}
                            </span>

                            <button
                                className="px-3 py-1 rounded border hover:bg-slate-50 disabled:opacity-50"
                                onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))}
                                disabled={pagina === totalPaginas}
                            >
                                Próxima
                            </button>
                        </div>
                    </div>

                    <div className="mt-4 overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                            <tr className="text-left border-b">
                                <th className="py-3 px-2 w-20">ID</th>
                                <th className="py-3 px-2">Nome completo</th>
                                <th className="py-3 px-2">Email</th>
                                <th className="py-3 px-2 w-44 text-center">CPF</th>
                                <th className="py-3 px-2 w-28 text-center">Ações</th>
                            </tr>
                            </thead>

                            <tbody>
                            {paginaAtual.map((a) => (
                                <tr key={a.id} className="border-b last:border-b-0">
                                    <td className="py-3 px-2">{a.id}</td>
                                    <td className="py-3 px-2">{a.nomeCompleto}</td>
                                    <td className="py-3 px-2">{a.email}</td>
                                    <td className="py-3 px-2 text-center">{a.cpf}</td>
                                    <td className="py-3 px-2">
                                        <div className="flex items-center justify-center gap-3">
                                            <button
                                                title="Editar aluno"
                                                onClick={() => abrirModalEditar(a.id)}
                                                className="text-blue-600 hover:text-blue-800 transition-colors"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="w-5 h-5"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                                    />
                                                </svg>
                                            </button>

                                            <button
                                                title="Excluir aluno"
                                                onClick={() => excluirAluno(a.id, a.nomeCompleto)}
                                                className="text-red-600 hover:text-red-800 transition-colors"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="w-5 h-5"
                                                    aria-hidden="true"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {modalAberto && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={fecharModal}>
                    <div className="w-full max-w-xl rounded-xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-xl font-semibold">{editandoId ? "Editar aluno" : "Cadastrar aluno"}</h2>

                            <button
                                type="button"
                                className="rounded px-2 py-1 hover:bg-slate-100"
                                onClick={fecharModal}
                                aria-label="Fechar"
                            >
                                ✕
                            </button>
                        </div>

                        <AlunoForm
                            editandoId={editandoId}
                            nomeCompleto={nomeCompleto}
                            email={email}
                            cpf={cpf}
                            setNomeCompleto={setNomeCompleto}
                            setEmail={setEmail}
                            setCpf={setCpf}
                            salvando={salvando}
                            erro={erroModal}
                            onCancelar={fecharModal}
                            onSubmit={async (e) => {
                                e.preventDefault()

                                const mensagem = validarFormulario()
                                if (mensagem) {
                                    setErroModal(mensagem)
                                    return
                                }

                                try {
                                    setSucesso("")
                                    setSalvando(true)
                                    setErroModal("")

                                    if (editandoId) {
                                        await atualizarAluno(editandoId, { nomeCompleto, email, cpf })
                                        setEditandoId(null)
                                    } else {
                                        await criarAluno({ nomeCompleto, email, cpf })
                                    }

                                    setNomeCompleto("")
                                    setEmail("")
                                    setCpf("")
                                    await carregar()

                                    setModalAberto(false)
                                    setSucesso("Salvo com sucesso!")
                                    setTimeout(() => setSucesso(""), 2000)
                                } catch (err) {
                                    setErroModal("Não consegui salvar. Verifique os campos e se CPF/email já existem.")
                                } finally {
                                    setSalvando(false)
                                }
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
