import React from 'react';
import { Search, Moon, Sun, Globe, Github, ShoppingCart, Menu, X } from 'lucide-react';
import { ActiveView } from '../types';

interface HeaderProps {
  activeView: ActiveView;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  cartCount: number;
  onClearCart: () => void;
  addNotification: (msg: string, type: 'success' | 'info') => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export default function Header({
  activeView,
  searchQuery,
  setSearchQuery,
  cartCount,
  onClearCart,
  addNotification,
  mobileMenuOpen,
  setMobileMenuOpen
}: HeaderProps) {
  const [isDark, setIsDark] = React.useState(true);
  const [language, setLanguage] = React.useState('ES');

  const toggleLanguage = () => {
    const nextLang = language === 'ES' ? 'EN' : 'ES';
    setLanguage(nextLang);
    addNotification(
      nextLang === 'ES' ? 'Idioma cambiado a Español' : 'Language changed to English',
      'info'
    );
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    addNotification(
      isDark ? 'Modo claro activado (simulado)' : 'Modo oscuro activado',
      'info'
    );
  };

  const getPlaceholder = () => {
    switch (activeView) {
      case 'foundations':
        return 'Buscar en fundaciones (ej. "xl", "primary")...';
      case 'components':
        return 'Buscar componentes (ej. "button", "badge")...';
      case 'templates':
        return 'Buscar plantillas (ej. "profile", "product")...';
      case 'sandbox':
        return 'Buscar demos (ej. "buttons", "producto")...';
      default:
        return 'Buscar...';
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full h-16 bg-surface-container border-b border-outline-variant flex justify-between items-center px-4 md:px-6">
      <div className="flex items-center gap-6 md:gap-8">
        {/* Mobile/Tablet hamburger menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-sidebar"
          aria-label={mobileMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
          className="lg:hidden p-2 -ml-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center text-primary font-bold text-lg shadow-inner">
            D
          </div>
          <span className="font-sans text-xl font-bold tracking-tight text-primary">
            DevPortal <span className="text-xs font-mono font-medium text-outline">UI</span>
          </span>
        </div>
        
        {/* Navigation for desktop */}
        <div className="hidden md:flex gap-6">
          <span className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium cursor-pointer">
            Guides
          </span>
          <span className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium cursor-pointer">
            API
          </span>
          <span className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium cursor-pointer">
            Changelog
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Search Input bar */}
        <div className="relative flex items-center bg-surface-container-low border border-outline-variant rounded-lg px-3 py-1.5 focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent transition-all">
          <Search className="text-outline w-4 h-4 mr-2" />
          <input
            type="text"
            className="bg-transparent border-none outline-none text-xs text-on-surface w-36 md:w-52 placeholder-outline/60"
            placeholder={getPlaceholder()}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-outline hover:text-on-surface text-xs font-bold ml-1.5"
              title="Clear search"
            >
              ×
            </button>
          )}
        </div>

        {/* Cart Counter if active */}
        {cartCount > 0 && (
          <button
            onClick={onClearCart}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-secondary-container/20 text-secondary border border-secondary-container/40 text-xs font-mono hover:bg-secondary-container/30 transition-all animate-bounce"
            title="Vaciar Carrito"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Carrito ({cartCount})</span>
          </button>
        )}

        {/* Theme button toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors"
          title="Toggle Dark/Light theme"
        >
          {isDark ? <Moon className="w-4.5 h-4.5" /> : <Sun className="w-4.5 h-4.5" />}
        </button>

        {/* Language button switcher */}
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-1 px-2 py-1 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors text-xs font-mono font-semibold"
          title="Switch language"
        >
          <Globe className="w-3.5 h-3.5" />
          <span>{language}</span>
        </button>

        {/* Github Button */}
        <a
          href="https://github.com/Joalfran/devportal-ui"
          target="_blank"
          rel="noopener noreferrer"
          referrerPolicy="no-referrer"
          className="bg-primary text-on-primary hover:bg-primary/90 px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold hover:shadow-lg transition-all hidden sm:flex items-center gap-1.5"
        >
          <Github className="w-3.5 h-3.5" />
          <span>GitHub</span>
        </a>
      </div>
    </header>
  );
}
