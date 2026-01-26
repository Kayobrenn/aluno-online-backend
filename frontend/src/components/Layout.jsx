import { NavLink } from "react-router-dom"
import { IconDashboard, IconAlunos, IconDisciplinas, IconHistorico } from "../icons/icons";
import { useState } from "react"

export default function Layout({ children }) {
    const [aberta, setAberta] = useState(true)

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside
                className={[
                    "bg-sky-800 text-white p-4",
                    "transition-all duration-300 ease-in-out",
                    aberta ? "w-64" : "w-16",
                ].join(" ")}
            >
                {/* Topo da sidebar */}
                <div className="flex items-center justify-between mb-6">
                    <h2
                        className={[
                            "text-xl font-bold whitespace-nowrap overflow-hidden",
                            "transition-all duration-300 ease-in-out",
                            aberta ? "opacity-100 translate-x-0 max-w-[200px]" : "opacity-0 -translate-x-2 max-w-0",
                        ].join(" ")}
                    >
                        Aluno Online
                    </h2>

                    {/* Botão hambúrguer */}
                    <button
                        onClick={() => setAberta((v) => !v)}
                        className="p-2 rounded hover:bg-sky-600"
                        title={aberta ? "Recolher menu" : "Abrir menu"}
                    >
                        ☰
                    </button>
                </div>

                {/* Menu */}
                <nav className="flex flex-col gap-2">
                    <NavItem to="/dashboard" aberta={aberta} icon={<IconDashboard />}>
                        Dashboard
                    </NavItem>

                    <NavItem to="/alunos" aberta={aberta} icon={<IconAlunos />}>
                        Alunos
                    </NavItem>

                    <NavItem to="/disciplinas" aberta={aberta} icon={<IconDisciplinas />}>
                        Disciplinas
                    </NavItem>

                    <NavItem to="/historico" aberta={aberta} icon={<IconHistorico />}>
                        Histórico
                    </NavItem>
                </nav>

            </aside>

            {/* Conteúdo */}
            <main className="flex-1 p-6">{children}</main>
        </div>
    )
}

function NavItem({ to, aberta, icon, children }) {
    return (
        <NavLink
            to={to}
            title={!aberta ? children : undefined}
            className={({ isActive }) =>
                [
                    "relative flex items-center gap-5 px-2 py-2 rounded overflow-hidden",
                    "transition-colors",
                    isActive ? "bg-sky-600" : "hover:bg-sky-600",
                ].join(" ")
            }
        >
            {/* ÍCONE: sempre aparece */}
            <span
                className={[
                    "shrink-0 transition-transform duration-300 ease-in-out",
                    // aberto: posição normal
                    aberta ? "translate-x-0" : "translate-x-[-4px]",
                ].join(" ")}
            >
              {icon}
            </span>

            {/* TEXTO: aparece/desaparece */}
            <span
                className={[
                    "whitespace-nowrap transition-all duration-300 ease-in-out",
                    aberta ? "opacity-100 translate-x-0 max-w-[200px]" : "opacity-0 -translate-x-2 max-w-0",
                ].join(" ")}
            >
        {children}
      </span>
        </NavLink>
    );
}

