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
                                      erro,
                                  }) {

    function aplicarMascaraCPF(valor) {
        const n = valor.replace(/\D/g, "").slice(0, 11)
        return n
            .replace(/^(\d{3})(\d)/, "$1.$2")
            .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
            .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d{1,2})$/, "$1.$2.$3-$4")
    }

    function classeInput(valor) {
        return [
            "border rounded-lg px-3 py-2",
            "focus:outline-none focus:ring-2",
            erro && !valor ? "border-red-400 focus:ring-red-200" : "border-slate-300 focus:ring-slate-300",
            salvando ? "bg-slate-50" : "bg-white",
        ].join(" ")
    }

    return (
        <div>

            <form onSubmit={onSubmit} className="grid gap-3">
                <input
                    placeholder="Nome completo"
                    value={nomeCompleto}
                    onChange={(e) => setNomeCompleto(e.target.value)}
                    disabled={salvando}
                    className={classeInput(nomeCompleto.trim())}
                />

                <input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={salvando}
                    className={classeInput(email.trim())}
                />

                <input
                    placeholder="CPF"
                    value={cpf}
                    onChange={(e) => setCpf(aplicarMascaraCPF(e.target.value))}
                    disabled={salvando}
                    className={classeInput(cpf)}
                    onBeforeInput={(e) => {
                        const data = e.data ?? ""
                        if (data && /\D/.test(data)) e.preventDefault()
                    }}
                />


                <div className="flex items-center gap-2 pt-2">
                    <button
                        type="submit"
                        disabled={salvando}
                        className="rounded-lg bg-sky-800 px-4 py-2 text-white hover:bg-slate-700 disabled:opacity-60"
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

                {erro && <p className="text-sm text-red-600">{erro}</p>}
            </form>
        </div>
    )
}
