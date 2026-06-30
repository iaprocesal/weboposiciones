import { Printer, Scale } from "lucide-react";

interface HeaderProps {
  onPrint: () => void;
}

export default function Header({ onPrint }: HeaderProps) {
  return (
    <header className="h-16 flex items-center justify-between px-6 md:px-10 bg-white border-b border-slate-200 shadow-sm sticky top-0 z-40 print:hidden">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 bg-blue-700 rounded flex items-center justify-center shadow-sm">
          <Scale className="h-4.5 w-4.5 text-white" id="header-logo-icon" />
        </div>
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-blue-900 uppercase flex items-center gap-1.5">
            IA Procesal <span className="font-light text-slate-500 lowercase text-sm hidden sm:inline">| tramitación</span>
          </h1>
        </div>
      </div>

      <button
        id="btn-print-page"
        onClick={onPrint}
        className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg border border-slate-300 font-medium transition-colors text-sm shadow-sm active:scale-95"
      >
        <Printer className="h-4 w-4 text-slate-500" />
        <span>Imprimir Informe Final</span>
      </button>
    </header>
  );
}
