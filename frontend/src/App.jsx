import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Layout from "./components/Layout"

import AlunosPage from "./pages/AlunosPage"
import DashboardPage2 from "./pages/DashboardPage.jsx"
import DisciplinasPage from "./pages/DisciplinasPage"
import HistoricoPage from "./pages/HistoricoPage"

export default function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Navigate to="/alunos" replace />} />
                    <Route path="/dashboard" element={<DashboardPage2 />} />
                    <Route path="/alunos" element={<AlunosPage />} />
                    <Route path="/disciplinas" element={<DisciplinasPage />} />
                    <Route path="/historico" element={<HistoricoPage />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    )
}

