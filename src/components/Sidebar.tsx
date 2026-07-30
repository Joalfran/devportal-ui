import React from 'react';
import { Layers, Puzzle, LayoutTemplate, Scaling, Settings, HelpCircle, ChevronRight } from 'lucide-react';
import { ActiveView } from '../types';
import { SANDBOX_DEMOS } from '../sandbox/registry';

interface SidebarProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  activeSubSection?: string;
  setActiveSubSection?: (sub: string) => void;
  addNotification: (msg: string, type: 'success' | 'info') => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({
  activeView,
  setActiveView,
  activeSubSection,
  setActiveSubSection,
  addNotification,
  isOpen,
  onClose
}: SidebarProps) {
  // Close the mobile/tablet drawer on Escape
  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);
  const navItems = [
    { id: 'foundations' as ActiveView, label: 'Foundations', icon: Layers, desc: 'Visual & tech foundations' },
    { id: 'components' as ActiveView, label: 'Components', icon: Puzzle, desc: 'Modular technical components' },
    { id: 'templates' as ActiveView, label: 'Templates', icon: LayoutTemplate, desc: 'Ready-made layout templates' },
    { id: 'sandbox' as ActiveView, label: 'Sandbox', icon: Scaling, desc: 'Responsive playground' }
  ];

  const handleNavClick = (viewId: ActiveView) => {
    setActiveView(viewId);
    addNotification(`Mostrando sección: ${viewId.charAt(0).toUpperCase() + viewId.slice(1)}`, 'info');
    onClose();
  };

  const handleSubClick = (sectionId: string) => {
    if (setActiveSubSection) {
      setActiveSubSection(sectionId);
    }
    // Scroll to element with id
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    onClose();
  };

  return (
    <>
      {/* Backdrop (mobile/tablet only, dims content below the header while the drawer is open) */}
      {isOpen && (
        <div
          onClick={onClose}
          aria-hidden="true"
          className="lg:hidden fixed top-16 inset-x-0 bottom-0 z-30 bg-black/60"
        />
      )}

      <aside
        id="mobile-sidebar"
        role="dialog"
        aria-modal={isOpen ? true : undefined}
        aria-label="Navegación principal"
        className={`w-72 lg:w-64 bg-surface-container border-r border-outline-variant flex flex-col h-[calc(100vh-64px)] shrink-0 select-none
          fixed top-16 left-0 bottom-0 z-40 transition-transform duration-300 ease-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:sticky lg:top-16 lg:translate-x-0 lg:z-auto`}
      >
      {/* Brand Header */}
      <div className="p-5 border-b border-outline-variant/30">
        <h2 className="font-sans text-sm font-bold uppercase tracking-wider text-on-surface-variant">
          Explorador
        </h2>
        <div className="flex items-center gap-1.5 mt-1">
          <span className="bg-secondary-container/20 text-secondary border border-secondary-container/40 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase">
            v2.4.0
          </span>
          <span className="text-[11px] text-outline font-mono">24 Oct 2024</span>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <p className="px-3 py-2 text-[10px] font-bold tracking-widest text-outline uppercase">
          Navegación
        </p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-left ${
                isActive
                  ? 'bg-primary-container text-on-primary-container border-l-2 border-primary font-semibold shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-outline'}`} />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold">{item.label}</p>
              </div>
              {isActive && <ChevronRight className="w-3.5 h-3.5 text-primary" />}
            </button>
          );
        })}

        {/* Sandbox demos sub-navigation */}
        {activeView === 'sandbox' && (
          <div className="mt-4 pt-4 border-t border-outline-variant/20 space-y-1">
            <p className="px-3 py-1.5 text-[10px] font-bold tracking-widest text-outline uppercase">
              Componentes
            </p>
            {SANDBOX_DEMOS.map((demo) => {
              const isSubActive = activeSubSection === demo.id;
              return (
                <button
                  key={demo.id}
                  onClick={() => {
                    if (setActiveSubSection) setActiveSubSection(demo.id);
                    onClose();
                  }}
                  className={`w-full block px-6 py-1.5 text-left text-xs transition-colors ${
                    isSubActive
                      ? 'text-secondary font-semibold'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {demo.label}
                </button>
              );
            })}
          </div>
        )}

        {/* Dynamic elements sub-navigation if activeView is components */}
        {activeView === 'components' && (
          <div className="mt-4 pt-4 border-t border-outline-variant/20 space-y-1">
            <p className="px-3 py-1.5 text-[10px] font-bold tracking-widest text-outline uppercase">
              Elementos
            </p>
            {[
              { id: 'buttons', label: 'Buttons' },
              { id: 'inputs', label: 'Inputs' },
              { id: 'badges', label: 'Badges' },
              { id: 'cards', label: 'Cards' },
              { id: 'modals', label: 'Modals' }
            ].map((sub) => {
              const isSubActive = activeSubSection === sub.id;
              return (
                <button
                  key={sub.id}
                  onClick={() => handleSubClick(sub.id)}
                  className={`w-full block px-6 py-1.5 text-left text-xs transition-colors ${
                    isSubActive
                      ? 'text-secondary font-semibold'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {sub.label}
                </button>
              );
            })}
          </div>
        )}
      </nav>

      {/* Footer controls */}
      <div className="p-3 border-t border-outline-variant/30 space-y-1">
        <button
          onClick={() => addNotification('Configuración del sistema cargada (Local)', 'success')}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high text-xs transition-colors text-left"
        >
          <Settings className="w-4 h-4 text-outline" />
          <span>Settings</span>
        </button>
        <button
          onClick={() => addNotification('Soporte técnico: soporte@devportal.dev', 'info')}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high text-xs transition-colors text-left"
        >
          <HelpCircle className="w-4 h-4 text-outline" />
          <span>Support</span>
        </button>
      </div>
      </aside>
    </>
  );
}
