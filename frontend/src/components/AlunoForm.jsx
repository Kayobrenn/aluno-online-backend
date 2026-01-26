export default function AlunoForm({
                                      editandoId,
                                      nomeCompleto,
                                      email,
                                      cpf,
                                      setNomeCompleto,
                                      setEmail,
                                      setCpf,
                                      onSubmit,
                                      onCancelar,
                                      salvando,
                                  }) {
    const titulo = editandoId ? "Editar aluno" : "Cadastrar aluno"

    return (
        <div className="mt-2">
            <h2 className="sr-only">{titulo}</h2>

            <form onSubmit={onSubmit} className="grid gap-3">
                <div className="grid gap-1">
                    <label className="text-sm text-slate-700">Nome completo</label>
                    <input
                        placeholder="Digite o nome completo"
                        value={nomeCompleto}
                        onChange={(e) => setNomeCompleto(e.target.value)}
                        disabled={salvando}
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 disabled:bg-slate-100"
                    />
                </div>

                <div className="grid gap-1">
                    <label className="text-sm text-slate-700">Email</label>
                    <input
                        placeholder="Digite o email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={salvando}
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 disabled:bg-slate-100"
                    />
                </div>

                <div className="grid gap-1">
                    <label className="text-sm text-slate-700">CPF</label>
                    <input
                        placeholder="CPF (somente números)"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        disabled={salvando}
                        inputMode="numeric"
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 disabled:bg-slate-100"
                    />
                </div>

                <div className="mt-2 flex items-center gap-2">
                    <button
                        type="submit"
                        disabled={salvando}
                        className="rounded-lg bg-sky-700 px-4 py-2 text-white hover:bg-slate-700 disabled:opacity-60"
                    >
                        {salvando ? "Salvando..." : editandoId ? "Salvar alterações" : "Cadastrar"}
                    </button>

                    <button
                        type="button"
                        onClick={onCancelar}
                        disabled={salvando}
                        className="rounded-lg border border-slate-300 px-4 py-2 hover:bg-slate-50 disabled:opacity-60"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    )
}