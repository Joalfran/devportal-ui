import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import FoundationsView from './components/FoundationsView';
import ComponentsView from './components/ComponentsView';
import TemplatesView from './components/TemplatesView';
import SandboxView from './components/SandboxView';
import Footer from './components/Footer';
import { ActiveView, Notification } from './types';
import { Sparkles, Info, X, Terminal, CheckCircle2 } from 'lucide-react';

export default function App() {
  // Navigation states
  const [activeView, setActiveView] = React.useState<ActiveView>('foundations');
  const [activeSubSection, setActiveSubSection] = React.useState<string>('buttons');
  const [searchQuery, setSearchQuery] = React.useState<string>('');

  // Cart state
  const [cartCount, setCartCount] = React.useState<number>(0);

  // Notification state
  const [notifications, setNotifications] = React.useState<Notification[]>([]);

  // Add toast notification helper
  const addNotification = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setNotifications((prev) => [...prev, { id, message, type }]);
    
    // Auto remove after 4.5s
    setTimeout(() => {
      setNotifications((prev) => prev.filter((item) => item.id !== id));
    }, 4500);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((item) => prev.some(n => n.id === id) && item.id !== id));
  };

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  const handleClearCart = () => {
    setCartCount(0);
    addNotification('Tu carrito de compras ha sido vaciado', 'info');
  };

  // Welcome greeting on load
  React.useEffect(() => {
    addNotification('Bienvenido a DevPortal UI Design System v2.4.0', 'success');
  }, []);

  return (
    <div className="min-h-screen bg-background text-on-background font-sans selection:bg-primary-container selection:text-on-primary-container flex flex-col relative overflow-x-hidden">
      
      {/* GLOBAL TOAST NOTIFICATION CONTAINER */}
      <div className="fixed top-20 right-4 z-50 pointer-events-none flex flex-col gap-2 max-w-sm w-full">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border shadow-xl animate-slide-in justify-between ${
              n.type === 'success'
                ? 'bg-secondary-container/15 text-secondary border-secondary-container/40'
                : n.type === 'error'
                ? 'bg-error-container/20 text-error border-error-container/30'
                : 'bg-surface-container-high text-on-surface-variant border-outline-variant/50'
            }`}
          >
            <div className="flex items-start gap-2">
              {n.type === 'success' ? (
                <CheckCircle2 className="w-4.5 h-4.5 text-secondary shrink-0 mt-0.5" />
              ) : n.type === 'error' ? (
                <X className="w-4.5 h-4.5 text-error shrink-0 mt-0.5" />
              ) : (
                <Info className="w-4.5 h-4.5 text-primary shrink-0 mt-0.5" />
              )}
              <span className="text-xs font-semibold tracking-tight">{n.message}</span>
            </div>
            <button
              onClick={() => removeNotification(n.id)}
              className="text-outline hover:text-on-surface focus:outline-none shrink-0"
              title="Cerrar"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* HEADER SECTION */}
      <Header
        activeView={activeView}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartCount={cartCount}
        onClearCart={handleClearCart}
        addNotification={addNotification}
      />

      {/* BODY WITH SIDEBAR AND MAIN CONTENT */}
      <div className="flex flex-1 relative w-full">
        
        {/* SIDEBAR NAVIGATION */}
        <Sidebar
          activeView={activeView}
          setActiveView={setActiveView}
          activeSubSection={activeSubSection}
          setActiveSubSection={setActiveSubSection}
          addNotification={addNotification}
        />

        {/* MAIN DISPLAY CANVAS */}
        {/* El sandbox necesita más ancho para poder probar breakpoints desktop (>=1024px) */}
        <main className={`flex-grow px-6 md:px-10 py-10 mx-auto min-w-0 w-full ${activeView === 'sandbox' ? 'max-w-[1600px]' : 'max-w-5xl'}`}>
          
          {/* RENDER ACTIVE SCREEN TAB */}
          {activeView === 'foundations' && (
            <FoundationsView
              searchQuery={searchQuery}
              addNotification={addNotification}
            />
          )}

          {activeView === 'components' && (
            <ComponentsView
              searchQuery={searchQuery}
              addNotification={addNotification}
            />
          )}

          {activeView === 'templates' && (
            <TemplatesView
              searchQuery={searchQuery}
              onAddToCart={handleAddToCart}
              addNotification={addNotification}
            />
          )}

          {activeView === 'sandbox' && (
            <SandboxView
              searchQuery={searchQuery}
              selectedDemo={activeSubSection}
              setSelectedDemo={setActiveSubSection}
              addNotification={addNotification}
            />
          )}

          {/* PAGE FOOTER */}
          <Footer />
        </main>

      </div>
    </div>
  );
}
