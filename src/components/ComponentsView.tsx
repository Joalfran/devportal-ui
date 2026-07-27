import React from 'react';
import { Key, Link2, AlertCircle, Check, Copy, Tag, CheckCircle2, XCircle, Terminal, HelpCircle, Eye, EyeOff } from 'lucide-react';

interface ComponentsViewProps {
  searchQuery: string;
  addNotification: (msg: string, type: 'success' | 'info') => void;
}

export default function ComponentsView({ searchQuery, addNotification }: ComponentsViewProps) {
  // Theme toggle state for previews
  const [buttonTheme, setButtonTheme] = React.useState<'dark' | 'light'>('dark');
  const [inputTheme, setInputTheme] = React.useState<'dark' | 'light'>('dark');

  // Input states
  const [apiKey, setApiKey] = React.useState('dp_live_492080312019a8bc43901b');
  const [showApiKey, setShowApiKey] = React.useState(false);
  const [endpointUrl, setEndpointUrl] = React.useState('invalid-url');

  // Custom Badge Creator states
  const [badgeText, setBadgeText] = React.useState('ACTIVE');
  const [badgeVariant, setBadgeVariant] = React.useState<'get' | 'post' | 'delete' | 'patch' | 'beta'>('get');

  // Modal demo state
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // Copy Snippet States
  const [copiedSection, setCopiedSection] = React.useState<string | null>(null);

  const handleCopyCode = (section: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSection(section);
    addNotification(`Snippet de ${section} copiado al portapapeles`, 'success');
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const isUrlValid = (url: string) => {
    return url.startsWith('https://');
  };

  // Snippets
  const buttonSnippet = `import { Button } from '@devportal/ui';

const MyComponent = () => (
  <Button 
    variant="primary" 
    size="md" 
    onClick={() => console.log('Action')}
  >
    Desplegar Proyecto
  </Button>
);`;

  const inputSnippet = `<div className="space-y-sm">
  <label className="text-label-sm font-semibold">API Key</label>
  <div className="relative">
    <input 
      type="password" 
      className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-md py-sm"
      value="dp_live_..."
    />
  </div>
</div>`;

  const badgeSnippet = `<Badge variant="${badgeVariant}">
  ${badgeText}
</Badge>`;

  const query = searchQuery.toLowerCase().trim();

  // Determine which sections to render based on query
  const showButtons = 'buttons'.includes(query) || 'button'.includes(query) || query === '';
  const showInputs = 'inputs'.includes(query) || 'input'.includes(query) || 'url'.includes(query) || 'api'.includes(query) || query === '';
  const showBadges = 'badges'.includes(query) || 'badge'.includes(query) || 'get'.includes(query) || 'post'.includes(query) || query === '';
  const showModals = 'modals'.includes(query) || 'modal'.includes(query) || 'dialog'.includes(query) || query === '';

  return (
    <div className="space-y-16 animate-fade-in">
      
      {/* SECTION HEADER */}
      <section className="border-b border-outline-variant/20 pb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-secondary-container/20 text-secondary border border-secondary-container/40 px-2 py-0.5 rounded text-xs font-mono font-bold uppercase">
            v2.4.0
          </span>
          <span className="text-xs text-outline font-mono">• Última actualización: 24 Oct 2024</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-on-surface mb-3 font-sans">
          Documentación de Componentes
        </h1>
        <p className="text-lg text-on-surface-variant max-w-3xl leading-relaxed">
          Explora nuestra biblioteca de componentes modulares diseñados para interfaces técnicas de alta precisión.
          Cada componente incluye guías de uso, especificaciones técnicas y ejemplos interactivos.
        </p>
      </section>

      {/* SECTION: BUTTONS */}
      {showButtons && (
        <section id="buttons" className="scroll-mt-24 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary-container/20 rounded-lg text-primary">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-on-surface">Buttons</h2>
              <p className="text-xs text-on-surface-variant">Acciones de sistema estructuradas por jerarquía</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* BUTTON PREVIEW (Col span 2) */}
            <div className="lg:col-span-2 bg-surface-container rounded-xl border border-outline-variant p-6 flex flex-col justify-between">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-[10px] font-bold text-outline uppercase tracking-wider">
                  Vista Previa (Dark/Light)
                </h3>
                <div className="flex gap-1 bg-surface-container-low p-1 rounded-lg border border-outline-variant/40">
                  <button
                    onClick={() => { setButtonTheme('dark'); addNotification('Botón en fondo Oscuro', 'info'); }}
                    className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-all ${buttonTheme === 'dark' ? 'bg-primary-container text-on-primary-container font-bold shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
                  >
                    Dark
                  </button>
                  <button
                    onClick={() => { setButtonTheme('light'); addNotification('Botón en fondo Claro', 'info'); }}
                    className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-all ${buttonTheme === 'light' ? 'bg-primary text-on-primary bg-slate-200 text-slate-800 font-bold shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
                  >
                    Light
                  </button>
                </div>
              </div>

              {/* Dynamic Theme Interactive Container */}
              <div className={`grid grid-cols-2 sm:grid-cols-4 gap-6 items-center justify-items-center py-10 rounded-lg border border-outline-variant/30 transition-all duration-300 ${buttonTheme === 'light' ? 'bg-slate-50 text-slate-900 shadow-inner' : 'bg-surface-container-lowest text-on-surface'}`}>
                
                <div className="text-center space-y-2">
                  <button className="bg-primary text-on-primary px-4 py-2 rounded-lg font-semibold hover:opacity-90 active:scale-95 transition-all text-xs cursor-pointer shadow-sm">
                    Primary
                  </button>
                  <p className="text-[10px] text-outline font-mono">Default</p>
                </div>

                <div className="text-center space-y-2">
                  <button className="bg-primary/80 text-on-primary px-4 py-2 rounded-lg font-semibold transition-all text-xs cursor-pointer shadow-sm">
                    Hover
                  </button>
                  <p className="text-[10px] text-outline font-mono">Hover</p>
                </div>

                <div className="text-center space-y-2">
                  <button className="bg-primary text-on-primary/70 px-4 py-2 rounded-lg font-semibold scale-95 transition-all text-xs cursor-pointer shadow-inner">
                    Active
                  </button>
                  <p className="text-[10px] text-outline font-mono">Active</p>
                </div>

                <div className="text-center space-y-2">
                  <button className="bg-outline-variant/50 text-outline px-4 py-2 rounded-lg font-semibold cursor-not-allowed text-xs" disabled>
                    Disabled
                  </button>
                  <p className="text-[10px] text-outline font-mono">Disabled</p>
                </div>

              </div>
            </div>

            {/* TECHNICAL SPECS (Col span 1) */}
            <div className="bg-surface-container rounded-xl border border-outline-variant p-6 flex flex-col justify-between">
              <h3 className="text-[10px] font-bold text-outline uppercase tracking-wider mb-4">
                Especificaciones Técnicas
              </h3>
              <ul className="space-y-4 flex-1">
                <li className="flex justify-between border-b border-outline-variant/20 pb-2">
                  <span className="text-xs text-on-surface-variant font-medium">Versión</span>
                  <span className="font-mono text-xs text-secondary font-semibold">v1.2.0</span>
                </li>
                <li className="flex justify-between border-b border-outline-variant/20 pb-2">
                  <span className="text-xs text-on-surface-variant font-medium">Paquete</span>
                  <span className="font-mono text-xs text-secondary font-semibold">@devportal/ui</span>
                </li>
                <li className="flex flex-col gap-2">
                  <span className="text-xs text-on-surface-variant font-medium">Design Tokens</span>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 bg-surface-container-high border border-outline-variant/20 text-[10px] font-mono rounded">
                      primary-indigo
                    </span>
                    <span className="px-2 py-0.5 bg-surface-container-high border border-outline-variant/20 text-[10px] font-mono rounded">
                      radius-lg
                    </span>
                    <span className="px-2 py-0.5 bg-surface-container-high border border-outline-variant/20 text-[10px] font-mono rounded">
                      shadow-sm
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* USES (DOs AND DONTs) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface-container border-l-4 border-secondary/50 rounded-r-xl p-5">
              <div className="flex items-center gap-2 text-secondary mb-3">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <h4 className="font-semibold text-xs uppercase tracking-wider">Usos permitidos</h4>
              </div>
              <ul className="space-y-2 text-xs text-on-surface-variant list-disc list-inside">
                <li>Acciones principales que requieren la atención inmediata del desarrollador.</li>
                <li>Navegación crítica en formularios y flujos de configuración.</li>
                <li>Botones con iconos para clarificar la acción técnica (e.g. "Deploy").</li>
              </ul>
            </div>

            <div className="bg-surface-container border-l-4 border-error/50 rounded-r-xl p-5">
              <div className="flex items-center gap-2 text-error mb-3">
                <XCircle className="w-4 h-4 shrink-0" />
                <h4 className="font-semibold text-xs uppercase tracking-wider">Usos no permitidos</h4>
              </div>
              <ul className="space-y-2 text-xs text-on-surface-variant list-disc list-inside">
                <li>No usar más de un botón primario por sección visual predominante.</li>
                <li>No usar botones primarios para acciones destructivas (usar variantes de error).</li>
                <li>No saturar la interfaz con botones de alto contraste.</li>
              </ul>
            </div>
          </div>

          {/* CODE SNIPPET */}
          <div className="bg-surface-container-highest rounded-xl border border-outline-variant overflow-hidden">
            <div className="flex justify-between items-center px-4 py-2 border-b border-outline-variant bg-surface-container/60">
              <span className="text-[10px] text-on-surface-variant font-mono uppercase">
                React Snippet
              </span>
              <button
                onClick={() => handleCopyCode('Buttons', buttonSnippet)}
                className="flex items-center gap-1.5 text-xs text-primary hover:underline transition-all"
              >
                {copiedSection === 'Buttons' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-secondary" />
                    <span>¡Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 text-xs font-mono text-tertiary bg-surface-container-lowest/40 overflow-x-auto leading-relaxed">
              <code>{buttonSnippet}</code>
            </pre>
          </div>
        </section>
      )}

      {/* SECTION: INPUTS */}
      {showInputs && (
        <section id="inputs" className="scroll-mt-24 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-tertiary-container/20 rounded-lg text-tertiary">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-on-surface">Inputs</h2>
              <p className="text-xs text-on-surface-variant">Captura de parámetros técnicos y validación en tiempo real</p>
            </div>
          </div>

          <div className="bg-surface-container rounded-xl border border-outline-variant p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[10px] font-bold text-outline uppercase tracking-wider">
                Campos del Formulario (Demostración)
              </h3>
              <div className="flex gap-1 bg-surface-container-low p-1 rounded-lg border border-outline-variant/40">
                <button
                  onClick={() => setInputTheme('dark')}
                  className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-all ${inputTheme === 'dark' ? 'bg-primary-container text-on-primary-container font-bold' : 'text-on-surface-variant hover:text-on-surface'}`}
                >
                  Dark
                </button>
                <button
                  onClick={() => setInputTheme('light')}
                  className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-all ${inputTheme === 'light' ? 'bg-primary bg-slate-200 text-slate-800 font-bold' : 'text-on-surface-variant hover:text-on-surface'}`}
                >
                  Light
                </button>
              </div>
            </div>

            <div className={`p-6 rounded-lg border border-outline-variant/30 transition-all duration-300 ${inputTheme === 'light' ? 'bg-slate-50 text-slate-900 shadow-inner' : 'bg-surface-container-lowest text-on-surface'}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* API Key Form Field */}
                <div className="space-y-2">
                  <label className={`text-xs font-semibold ${inputTheme === 'light' ? 'text-slate-700' : 'text-on-surface'}`}>API Key</label>
                  <div className="relative flex items-center">
                    <input
                      type={showApiKey ? 'text' : 'password'}
                      className={`w-full bg-surface-container-low border border-outline-variant/80 rounded-lg pl-3 pr-10 py-2.5 text-xs font-mono outline-none focus:ring-2 focus:ring-primary ${inputTheme === 'light' ? 'text-slate-900 bg-white border-slate-300' : 'text-on-surface bg-surface-container-low'}`}
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="absolute right-3 text-outline hover:text-on-surface transition-colors focus:outline-none"
                    >
                      {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-[11px] text-outline">Ejecuta tu conexión de forma segura.</p>
                </div>

                {/* Endpoint URL Field */}
                <div className="space-y-2">
                  <label className={`text-xs font-semibold ${isUrlValid(endpointUrl) ? (inputTheme === 'light' ? 'text-slate-700' : 'text-on-surface') : 'text-error'}`}>
                    Endpoint URL
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      className={`w-full rounded-lg pl-3 pr-10 py-2.5 text-xs font-mono outline-none focus:ring-1 ${
                        isUrlValid(endpointUrl)
                          ? (inputTheme === 'light' ? 'bg-white text-slate-900 border border-slate-300 focus:ring-primary' : 'bg-surface-container-low text-on-surface border border-outline-variant/80 focus:ring-primary')
                          : 'bg-error-container/10 text-error border border-error focus:ring-error'
                      }`}
                      value={endpointUrl}
                      onChange={(e) => setEndpointUrl(e.target.value)}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {isUrlValid(endpointUrl) ? (
                        <Link2 className="w-4 h-4 text-outline" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-error" />
                      )}
                    </div>
                  </div>
                  <p className={`text-[11px] ${isUrlValid(endpointUrl) ? 'text-outline' : 'text-error font-medium'}`}>
                    {isUrlValid(endpointUrl)
                      ? 'Formato de Endpoint seguro aceptado.'
                      : 'Error: La URL debe comenzar con https://'}
                  </p>
                </div>

              </div>
            </div>
          </div>

          {/* GUIDELINES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface-container border-l-4 border-secondary/50 rounded-r-xl p-5">
              <div className="flex items-center gap-2 text-secondary mb-3">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <h4 className="font-semibold text-xs uppercase tracking-wider">Usos permitidos</h4>
              </div>
              <ul className="space-y-2 text-xs text-on-surface-variant list-disc list-inside">
                <li>Captura de parámetros técnicos en paneles de control.</li>
                <li>Campos de filtrado rápido para tablas de datos.</li>
              </ul>
            </div>

            <div className="bg-surface-container border-l-4 border-error/50 rounded-r-xl p-5">
              <div className="flex items-center gap-2 text-error mb-3">
                <XCircle className="w-4 h-4 shrink-0" />
                <h4 className="font-semibold text-xs uppercase tracking-wider">Usos no permitidos</h4>
              </div>
              <ul className="space-y-2 text-xs text-on-surface-variant list-disc list-inside">
                <li>No omitir etiquetas (labels) descriptivas.</li>
                <li>No usar placeholders para instrucciones largas.</li>
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* SECTION: BADGES */}
      {showBadges && (
        <section id="badges" className="scroll-mt-24 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-secondary-container/20 rounded-lg text-secondary">
              <Tag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-on-surface">Badges</h2>
              <p className="text-xs text-on-surface-variant">Metadatos visuales compactos para micro-información</p>
            </div>
          </div>

          <div className="bg-surface-container rounded-xl border border-outline-variant p-6">
            <h3 className="text-[10px] font-bold text-outline uppercase tracking-wider mb-4">
              Tipos de Badge del Sistema
            </h3>
            
            <div className="flex flex-wrap gap-4 justify-center items-center py-8 bg-surface-container-lowest rounded-lg border border-outline-variant/30">
              <span className="px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-xs font-mono font-bold flex items-center gap-1.5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-on-secondary-container animate-ping"></span>
                GET
              </span>

              <span className="px-3 py-1 bg-primary-container text-on-primary-container rounded-full text-xs font-mono font-bold shadow-sm">
                POST
              </span>

              <span className="px-3 py-1 bg-error-container text-on-error-container rounded-full text-xs font-mono font-bold shadow-sm">
                DELETE
              </span>

              <span className="px-3 py-1 border border-outline-variant/80 text-on-surface-variant rounded-full text-xs font-mono font-bold bg-surface-container-high/30">
                PATCH
              </span>

              <span className="px-2.5 py-0.5 bg-surface-variant text-on-surface-variant rounded text-xs font-mono border border-outline-variant/20">
                v2.1.0-beta
              </span>
            </div>
          </div>

          {/* BADGE CONFIGURATION AND CUSTOMIZATION ZONE */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Customizer */}
            <div className="bg-surface-container rounded-xl border border-outline-variant p-6 space-y-4">
              <h3 className="text-[10px] font-bold text-outline uppercase tracking-wider">
                Generador de Badges Personalizados
              </h3>

              <div className="space-y-3">
                <div className="space-y-1.5">
                  <label className="text-xs text-on-surface-variant">Texto del Badge</label>
                  <input
                    type="text"
                    className="w-full bg-surface-container-low border border-outline-variant rounded px-2.5 py-1.5 text-xs text-on-surface outline-none focus:ring-1 focus:ring-primary font-mono"
                    value={badgeText}
                    onChange={(e) => setBadgeText(e.target.value.toUpperCase())}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-on-surface-variant">Variante / Método</label>
                  <div className="grid grid-cols-5 gap-1.5">
                    {(['get', 'post', 'delete', 'patch', 'beta'] as const).map((variant) => (
                      <button
                        key={variant}
                        onClick={() => setBadgeVariant(variant)}
                        className={`py-1 text-[10px] font-mono font-bold rounded capitalize border ${
                          badgeVariant === variant
                            ? 'bg-primary text-on-primary border-primary'
                            : 'bg-surface-container-low border-outline-variant text-outline hover:text-on-surface'
                        }`}
                      >
                        {variant}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* LIVE BADGE PREVIEW */}
              <div className="pt-4 border-t border-outline-variant/20">
                <span className="text-[10px] font-bold text-outline uppercase tracking-wider block mb-2">Live Preview:</span>
                <div className="bg-surface-container-lowest/60 py-4 rounded-lg flex items-center justify-center border border-outline-variant/10">
                  {badgeVariant === 'get' && (
                    <span className="px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-xs font-mono font-bold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-on-secondary-container animate-pulse"></span>
                      {badgeText || 'GET'}
                    </span>
                  )}
                  {badgeVariant === 'post' && (
                    <span className="px-3 py-1 bg-primary-container text-on-primary-container rounded-full text-xs font-mono font-bold">
                      {badgeText || 'POST'}
                    </span>
                  )}
                  {badgeVariant === 'delete' && (
                    <span className="px-3 py-1 bg-error-container text-on-error-container rounded-full text-xs font-mono font-bold">
                      {badgeText || 'DELETE'}
                    </span>
                  )}
                  {badgeVariant === 'patch' && (
                    <span className="px-3 py-1 border border-outline-variant text-on-surface rounded-full text-xs font-mono font-bold bg-surface-container-high/40">
                      {badgeText || 'PATCH'}
                    </span>
                  )}
                  {badgeVariant === 'beta' && (
                    <span className="px-2.5 py-0.5 bg-surface-variant text-on-surface-variant rounded text-xs font-mono border border-outline-variant/30">
                      {badgeText || 'BETA'}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Code and Styles Specs */}
            <div className="space-y-4">
              <div className="bg-surface-container rounded-xl border border-outline-variant p-6 space-y-3">
                <h3 className="text-[10px] font-bold text-outline uppercase tracking-wider">
                  Especificaciones de Diseño
                </h3>
                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between items-center border-b border-outline-variant/20 pb-2">
                    <span className="text-on-surface-variant">Radius</span>
                    <span className="text-secondary font-mono font-bold">full (rounded-full)</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-outline-variant/20 pb-2">
                    <span className="text-on-surface-variant">Padding Horizontal</span>
                    <span className="text-secondary font-mono font-bold">12px (px-md)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-on-surface-variant">Tipografía</span>
                    <span className="text-secondary font-mono font-bold">JetBrains Mono / 12px</span>
                  </div>
                </div>
              </div>

              {/* Code */}
              <div className="bg-surface-container-highest rounded-xl border border-outline-variant overflow-hidden">
                <div className="flex justify-between items-center px-4 py-2 border-b border-outline-variant bg-surface-container/60">
                  <span className="text-[10px] text-on-surface-variant font-mono uppercase">React code</span>
                  <button
                    onClick={() => handleCopyCode('Badges', badgeSnippet)}
                    className="flex items-center gap-1 text-xs text-primary hover:underline"
                  >
                    {copiedSection === 'Badges' ? <Check className="w-3.5 h-3.5 text-secondary" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSection === 'Badges' ? '¡Copiado!' : 'Copiar'}</span>
                  </button>
                </div>
                <pre className="p-4 text-xs font-mono text-tertiary bg-surface-container-lowest/30 overflow-x-auto">
                  <code>{badgeSnippet}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION: MODALS / DIALOGS */}
      {showModals && (
        <section id="modals" className="scroll-mt-24 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary-container/20 rounded-lg text-primary">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-on-surface">Modals & Popups</h2>
              <p className="text-xs text-on-surface-variant">Flujos informativos interactivos de confirmación técnica</p>
            </div>
          </div>

          <div className="bg-surface-container rounded-xl border border-outline-variant p-6 flex flex-col items-center justify-center py-12 text-center space-y-4">
            <div className="max-w-md space-y-2">
              <h3 className="text-lg font-bold text-on-surface font-sans">
                Prueba de Diálogo de Confirmación
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Abre el modal interactivo para inspeccionar la alineación tipográfica, transiciones, y el respeto estricto del lenguaje de diseño "Technical Precision".
              </p>
            </div>

            <button
              onClick={() => { setIsModalOpen(true); addNotification('Modal interactivo abierto', 'info'); }}
              className="bg-primary text-on-primary px-5 py-2.5 rounded-lg text-xs font-semibold hover:opacity-95 transition-all shadow-md cursor-pointer"
            >
              Lanzar Modal de Demo
            </button>
          </div>

          {/* THE ACTUAL INTERACTIVE MODAL (With backdrop blur) */}
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <div
                className="absolute inset-0 bg-background/80 backdrop-blur-md transition-opacity duration-300"
                onClick={() => setIsModalOpen(false)}
              ></div>

              {/* Modal Card */}
              <div className="bg-surface-container border border-outline-variant rounded-xl p-6 max-w-lg w-full relative z-10 shadow-2xl animate-scale-up space-y-6">
                
                {/* Header */}
                <div className="flex items-start justify-between border-b border-outline-variant/30 pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-on-surface font-sans">
                      Deploy de Infraestructura UI
                    </h3>
                    <p className="text-xs text-outline font-mono mt-0.5">Ref: CONFIRMATION_DLG_v1</p>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-on-surface-variant hover:text-on-surface text-lg font-bold p-1 bg-surface-container-high/40 hover:bg-surface-container-high rounded-full w-7 h-7 flex items-center justify-center transition-colors focus:outline-none"
                  >
                    ×
                  </button>
                </div>

                {/* Content */}
                <div className="space-y-4 text-xs text-on-surface-variant leading-relaxed">
                  <div className="flex items-start gap-3 bg-primary-container/10 border border-primary/25 rounded-lg p-3">
                    <AlertCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-on-surface block mb-0.5">Acción Crítica</span>
                      Estas a punto de confirmar los cambios de tokens de diseño para producción. Esta acción actualiza las paletas en los microservicios sincronizados.
                    </div>
                  </div>

                  <p>
                    El sistema registrará esta firma bajo su cuenta <span className="text-primary font-mono font-bold">admin@devportal.dev</span> en el ledger de cambios centralizado del DevPortal.
                  </p>

                  <div className="bg-surface-container-lowest p-3 rounded-lg border border-outline-variant/30 font-mono text-[11px] text-secondary space-y-1">
                    <p>{`> USER_SIGNATURE_OK: true`}</p>
                    <p>{`> TOKENS_REGENERATED_SUCCESSFULLY`}</p>
                    <p>{`> APP_ENV: production`}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-outline-variant/20">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-surface-container-low hover:bg-surface-container-high border border-outline-variant/40 rounded-lg text-xs font-semibold text-on-surface-variant hover:text-on-surface transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      addNotification('Tokens confirmados y guardados exitosamente', 'success');
                    }}
                    className="px-4 py-2 bg-primary text-on-primary font-semibold rounded-lg text-xs hover:opacity-90 transition-all shadow-md"
                  >
                    Confirmar Cambios
                  </button>
                </div>

              </div>
            </div>
          )}
        </section>
      )}

    </div>
  );
}
