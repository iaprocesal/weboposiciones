import { 
  BookOpen, 
  FileText, 
  ShieldAlert, 
  Bookmark, 
  BrainCircuit, 
  Sparkles, 
  Compass, 
  CheckSquare 
} from "lucide-react";

interface SidebarProps {
  activeTab: number;
  setActiveTab: (tab: number) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const menuItems = [
    { id: 1, label: "01. Índice de Contenidos", icon: Compass },
    { id: 2, label: "02. Temario Completo", icon: BookOpen },
    { id: 3, label: "03. Histórico Exámenes", icon: FileText },
    { id: 4, label: "04. Criterios y Dificultades", icon: CheckSquare },
    { id: 5, label: "05. Análisis de Trampas", icon: ShieldAlert },
    { id: 6, label: "06. Relación de Artículos Clave", icon: Bookmark },
    { id: 7, label: "07. Recomendaciones de Estudio", icon: Sparkles },
    { id: 8, label: "08. Técnicas de Memorización", icon: BrainCircuit },
  ];

  return (
    <aside className="w-72 bg-white border-r border-slate-200 h-[calc(100vh-64px)] overflow-y-auto sticky top-16 p-6 flex flex-col justify-between print:hidden shrink-0">
      <div className="flex flex-col space-y-1">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
          Contenidos del Programa
        </p>
        <nav className="flex flex-col space-y-1" id="sidebar-navigation">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`sidebar-tab-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm rounded-lg text-left transition-all duration-150 font-medium ${
                  isActive
                    ? "bg-blue-50 text-blue-700 font-bold border-r-4 border-blue-700 shadow-sm"
                    : "text-slate-500 hover:text-slate-950 hover:bg-slate-50"
                }`}
              >
                <Icon className={`h-4.5 w-4.5 shrink-0 ${isActive ? "text-blue-700" : "text-slate-400"}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="bg-white rounded-xl p-5 border border-slate-200 flex-shrink-0 mt-6">
        <h3 className="text-sm font-bold text-slate-800 mb-2">Estado del Temario</h3>
        <div className="w-full bg-slate-100 rounded-full h-2 mb-3">
          <div className="bg-green-500 h-2 rounded-full" style={{ width: "68%" }}></div>
        </div>
        <div className="flex justify-between text-xs mb-3">
          <span className="font-medium text-slate-500">68% Completado</span>
          <span className="font-bold text-slate-800">82 Temas</span>
        </div>
        <p className="text-[10px] text-slate-400 leading-normal">
          Última actualización: LOPJ y LEC 2026 sincronizados desde repositorio.
        </p>
      </div>
    </aside>
  );
}
