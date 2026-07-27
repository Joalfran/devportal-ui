import React from 'react';
import { ShoppingBag, Plus, Trash2, Check, Copy, TrendingUp, TrendingDown, RefreshCw, Sparkles, Award, Terminal } from 'lucide-react';

interface TemplatesViewProps {
  searchQuery: string;
  onAddToCart: () => void;
  addNotification: (msg: string, type: 'success' | 'info') => void;
}

export default function TemplatesView({ searchQuery, onAddToCart, addNotification }: TemplatesViewProps) {
  // Laptop specs states
  const [laptopModel, setLaptopModel] = React.useState('Workstation Pro M3');
  const [ram, setRam] = React.useState('32GB');
  const [storage, setStorage] = React.useState('1TB SSD');
  const [price, setPrice] = React.useState(2499.0);

  // Profile states
  const [profileTags, setProfileTags] = React.useState(['Rust', 'Go', 'Wasm', 'Drizzle']);
  const [newTag, setNewTag] = React.useState('');

  // Live traffic simulation state
  const [isSimulating, setIsSimulating] = React.useState(true);
  const [apiRequests, setApiRequests] = React.useState(1.2);
  const [latency, setLatency] = React.useState(42);
  const [apiTrend, setApiTrend] = React.useState(12);
  const [latencyTrend, setLatencyTrend] = React.useState(-2);

  // SVG chart data path state
  const [chartData, setChartData] = React.useState([35, 45, 30, 60, 50, 42, 48]);

  // Copy states
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  // Calculate pricing based on options
  React.useEffect(() => {
    let basePrice = 2199.0;
    if (ram === '64GB') basePrice += 400;
    if (ram === '128GB') basePrice += 800;
    if (storage === '2TB SSD') basePrice += 200;
    if (storage === '4TB SSD') basePrice += 600;
    if (laptopModel.includes('Max')) basePrice += 500;
    setPrice(basePrice);
  }, [ram, storage, laptopModel]);

  // Live simulation ticker
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSimulating) {
      interval = setInterval(() => {
        // Randomize API Request
        const apiDelta = (Math.random() - 0.4) * 0.1; // positive drift
        const nextRequests = Math.max(0.1, Number((apiRequests + apiDelta).toFixed(2)));
        setApiRequests(nextRequests);

        // Randomize Latency
        const latencyDelta = Math.round((Math.random() - 0.5) * 6);
        const nextLatency = Math.max(10, Math.min(150, latency + latencyDelta));
        setLatency(nextLatency);

        // Update random graph
        setChartData(prev => [...prev.slice(1), Math.round(nextLatency / 1.5)]);

        // Drift trend slightly
        setApiTrend(prev => Math.max(1, Math.min(99, prev + (Math.random() > 0.5 ? 1 : -1))));
        setLatencyTrend(prev => Math.min(-1, Math.max(-50, prev + (Math.random() > 0.5 ? 1 : -1))));
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isSimulating, apiRequests, latency]);

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    addNotification(`Código HTML de ${id} copiado al portapapeles`, 'success');
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault();
    const tag = newTag.trim();
    if (tag && !profileTags.includes(tag)) {
      setProfileTags([...profileTags, tag]);
      setNewTag('');
      addNotification(`Tag "${tag}" añadido al perfil de Adrián`, 'success');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setProfileTags(profileTags.filter(t => t !== tag));
    addNotification(`Tag "${tag}" eliminado`, 'info');
  };

  // Raw codes for display
  const productCode = `<div class="w-72 bg-surface-container-highest rounded-xl overflow-hidden border border-outline-variant hover:shadow-lg transition-shadow">
  <div class="h-48 bg-surface-container-low relative">
    <img src="https://lh3.googleusercontent.com/... " alt="Product" class="w-full h-full object-cover">
    <div class="absolute top-sm right-sm bg-secondary text-on-secondary px-sm py-1 text-label-sm font-label-sm rounded-full">En Stock</div>
  </div>
  <div class="p-md">
    <h3 class="font-headline-md text-headline-md mb-xs">${laptopModel}</h3>
    <p class="text-on-surface-variant text-label-sm font-label-sm mb-md">Laptops / ${ram} / ${storage}</p>
    <div class="flex items-end justify-between">
      <span class="font-headline-lg text-headline-lg text-primary">$${price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
      <button class="bg-primary-container text-on-primary-container px-md py-sm rounded">Añadir</button>
    </div>
  </div>
</div>`;

  const profileCode = `<div class="w-full max-w-sm bg-surface-container border border-outline-variant rounded-xl p-lg flex flex-col items-center text-center">
  <div class="w-24 h-24 rounded-full border-4 border-primary p-1 mb-md">
    <img src="avatar.jpg" class="rounded-full w-full h-full object-cover">
  </div>
  <h3 class="font-headline-md text-headline-md">Adrián Guerrero</h3>
  <p class="text-primary font-body-md">Principal System Architect</p>
  <div class="flex gap-sm mb-lg">
    ${profileTags.map(tag => `<span class="px-sm py-1 bg-surface-container-highest text-label-sm border border-outline-variant">${tag}</span>`).join('\n    ')}
  </div>
  <button class="w-full border border-primary text-primary px-md py-sm rounded">Ver Perfil</button>
</div>`;

  const statCode = `<div class="bg-surface-container-high border border-outline-variant rounded-lg p-md">
  <div class="flex items-center justify-between mb-sm">
    <div class="w-10 h-10 bg-primary-container text-on-primary-container flex items-center justify-center rounded">
      <span class="material-symbols-outlined">analytics</span>
    </div>
    <span class="px-sm py-1 bg-secondary-container/20 text-secondary text-label-sm font-label-sm rounded-full flex items-center gap-1">
      <span class="material-symbols-outlined !text-xs">trending_up</span> +${apiTrend}%
    </span>
  </div>
  <p class="text-on-surface-variant text-label-sm">API Requests</p>
  <p class="font-headline-lg text-headline-lg">${apiRequests}M</p>
</div>`;

  const query = searchQuery.toLowerCase().trim();

  // Filter based on search query
  const showProduct = 'producto'.includes(query) || 'laptop'.includes(query) || 'workstation'.includes(query) || 'card'.includes(query) || query === '';
  const showProfile = 'perfil'.includes(query) || 'usuario'.includes(query) || 'adrian'.includes(query) || 'guerrero'.includes(query) || query === '';
  const showMetrics = 'metricas'.includes(query) || 'dashboard'.includes(query) || 'api'.includes(query) || 'latency'.includes(query) || query === '';

  return (
    <div className="space-y-16 animate-fade-in pb-12">
      
      {/* SECTION HEADER */}
      <section className="border-b border-outline-variant/20 pb-8">
        <h1 className="text-4xl font-bold tracking-tight text-on-surface mb-3 font-sans">
          Composiciones y Plantillas
        </h1>
        <p className="text-lg text-on-surface-variant max-w-3xl leading-relaxed">
          Explora nuestra galería de patrones de UI construidos íntegramente con los tokens del sistema. Estos ejemplos demuestran cómo combinar tipografía, colores y componentes atómicos de forma modular.
        </p>
      </section>

      {/* TEMPLATE 1: TARJETA DE PRODUCTO */}
      {showProduct && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-secondary-container/20 text-secondary rounded-lg">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-semibold text-on-surface">Tarjeta de Producto</h2>
            </div>
            <span className="px-3 py-1 bg-secondary-container text-on-secondary-container text-[11px] font-mono font-bold rounded uppercase">
              Composición
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            
            {/* Visual Preview Side with Live Controller options */}
            <div className="space-y-4">
              <div className="glass-panel p-8 rounded-xl flex items-center justify-center min-h-[340px]">
                
                {/* Visual Card Component */}
                <div className="w-72 bg-surface-container-highest rounded-xl overflow-hidden border border-outline-variant/80 hover:shadow-xl transition-all duration-300 group">
                  <div className="h-48 bg-surface-container-low relative overflow-hidden">
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      alt="Workstation laptop on desk"
                      referrerPolicy="no-referrer"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTFz6uXFndW7MXGjOBLHqEMYHn7V6nnHDhr_e72KHVZvawcn-qJrLlFOR3Ex74c2Z0gX8wcsoFEV2darHWqkR1WLtr2fMxyKyBd7YhrYMovgTJZCICCPrGfuoB6bf8foXipmhv7RRFtILBS4nR6dkevums3mUm1YUoJD7s996SLK2otF-H2TXNkaeDbCJ5V8EQnrq3xPaRJpEvgZggJF5VtzhzbBmbMJIbHf3HGrkG30gJbDQiL15Z"
                    />
                    <div className="absolute top-3 right-3 bg-secondary text-on-secondary px-2.5 py-0.5 text-[10px] font-mono font-bold rounded-full shadow">
                      En Stock
                    </div>
                  </div>
                  
                  <div className="p-5 space-y-4">
                    <div>
                      <h3 className="text-lg font-bold text-on-surface font-sans line-clamp-1">
                        {laptopModel}
                      </h3>
                      <p className="text-on-surface-variant text-[11px] font-mono mt-0.5">
                        Laptops / {ram} / {storage}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xl font-bold text-primary font-sans">
                        ${price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </span>
                      <button
                        onClick={() => {
                          onAddToCart();
                          addNotification(`${laptopModel} añadido al carrito de compras`, 'success');
                        }}
                        className="bg-primary-container hover:bg-primary-container/80 text-on-primary-container text-xs px-4 py-2 font-semibold rounded-lg transition-colors cursor-pointer shadow-sm active:scale-95"
                      >
                        Añadir
                      </button>
                    </div>
                  </div>
                </div>

              </div>

              {/* Specs Customizer for Laptop */}
              <div className="bg-surface-container p-4 rounded-xl border border-outline-variant/40 space-y-3">
                <span className="text-[10px] font-bold text-outline uppercase tracking-wider block">Personalizar Producto (Afecta código y precio)</span>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] text-outline">Modelo CPU</label>
                    <select
                      className="w-full bg-surface-container-low border border-outline-variant rounded p-1.5 text-xs text-on-surface outline-none"
                      value={laptopModel}
                      onChange={(e) => setLaptopModel(e.target.value)}
                    >
                      <option value="Workstation Pro M3">Pro M3</option>
                      <option value="Workstation Max M3">Max M3 (+ $500)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-outline">Memoria RAM</label>
                    <select
                      className="w-full bg-surface-container-low border border-outline-variant rounded p-1.5 text-xs text-on-surface outline-none"
                      value={ram}
                      onChange={(e) => setRam(e.target.value)}
                    >
                      <option value="32GB">32 GB RAM</option>
                      <option value="64GB">64 GB RAM (+ $400)</option>
                      <option value="128GB">128 GB RAM (+ $800)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-outline">Almacenamiento</label>
                    <select
                      className="w-full bg-surface-container-low border border-outline-variant rounded p-1.5 text-xs text-on-surface outline-none"
                      value={storage}
                      onChange={(e) => setStorage(e.target.value)}
                    >
                      <option value="1TB SSD">1 TB SSD</option>
                      <option value="2TB SSD">2 TB SSD (+ $200)</option>
                      <option value="4TB SSD">4 TB SSD (+ $600)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Code Output Block */}
            <div className="bg-surface-container-low rounded-xl border border-outline-variant overflow-hidden flex flex-col h-full justify-between">
              <div className="bg-surface-container-highest px-4 py-2 flex justify-between items-center border-b border-outline-variant">
                <span className="text-[10px] font-mono text-outline">ProductCard.html</span>
                <button
                  onClick={() => handleCopyCode('ProductCard', productCode)}
                  className="text-xs text-primary hover:underline flex items-center gap-1"
                >
                  {copiedCode === 'ProductCard' ? <Check className="w-3.5 h-3.5 text-secondary" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode === 'ProductCard' ? '¡Copiado!' : 'Copy'}</span>
                </button>
              </div>
              <pre className="p-4 text-xs font-mono text-on-surface-variant/90 overflow-x-auto leading-relaxed max-h-[380px] overflow-y-auto">
                <code>{productCode}</code>
              </pre>
            </div>

          </div>
        </section>
      )}

      {/* TEMPLATE 2: USER PROFILE */}
      {showProfile && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-secondary-container/20 text-secondary rounded-lg">
                <Award className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-semibold text-on-surface">Perfil de Usuario</h2>
            </div>
            <span className="px-3 py-1 bg-secondary-container text-on-secondary-container text-[11px] font-mono font-bold rounded uppercase">
              Composición
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            
            {/* Visual Side with Tag Editor */}
            <div className="space-y-4">
              <div className="glass-panel p-8 rounded-xl flex items-center justify-center min-h-[340px]">
                
                {/* Visual Card Component */}
                <div className="w-full max-w-sm bg-surface-container border border-outline-variant rounded-xl p-6 flex flex-col items-center text-center space-y-4 shadow-lg">
                  <div className="w-24 h-24 rounded-full border-4 border-primary p-1 shadow-inner relative overflow-hidden">
                    <img
                      className="w-full h-full rounded-full object-cover"
                      alt="Adrián Guerrero portrait"
                      referrerPolicy="no-referrer"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkBvJgjcv1-lf74OXKn1sY1-A4uBMD1mPUPlRA5yWQI2tyzLfRAYD6ndO8Wsi03ljroEZwEwh_ZhH3Mq-PcSgGoiOgufS26iIDNZAZs_QYkaNN-rgtt3OjGyZ2SjCjHpB5w_zWDKB19cc278zxkpjbFXpuZ2D2pFkWikprps1JdO7UO5zjaYQ7fmq-lh9gCd9Jss0WtQuMyoT8u9JNlclfsX9Xu3KK1hU6czQlsRu1U8EfeIhKMNQH"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-on-surface font-sans">Adrián Guerrero</h3>
                    <p className="text-primary font-medium text-xs font-mono">Principal System Architect</p>
                  </div>

                  {/* Visual Tags */}
                  <div className="flex flex-wrap justify-center gap-1.5">
                    {profileTags.map(tag => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 bg-surface-container-highest text-on-surface text-[10px] font-mono border border-outline-variant/60 rounded flex items-center gap-1 hover:border-error hover:text-error transition-all group cursor-pointer"
                        title="Click to remove tag"
                        onClick={() => handleRemoveTag(tag)}
                      >
                        <span>{tag}</span>
                        <span className="opacity-40 group-hover:opacity-100 text-[10px] font-bold">×</span>
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => addNotification('Cargando perfil expandido de Adrián...', 'info')}
                    className="w-full border border-primary hover:bg-primary/10 text-primary px-4 py-2 font-semibold rounded-lg text-xs transition-all cursor-pointer active:scale-98"
                  >
                    Ver Perfil Completo
                  </button>
                </div>

              </div>

              {/* Tag Editor controls */}
              <form onSubmit={handleAddTag} className="bg-surface-container p-4 rounded-xl border border-outline-variant/40 flex items-center gap-3">
                <div className="flex-1 space-y-1">
                  <span className="text-[10px] font-bold text-outline uppercase tracking-wider block">Añadir habilidades customizadas al perfil</span>
                  <input
                    type="text"
                    placeholder="Escribe un tag (ej. TypeScript, React)..."
                    className="w-full bg-surface-container-low border border-outline-variant rounded px-2.5 py-1.5 text-xs text-on-surface outline-none focus:ring-1 focus:ring-primary"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="bg-primary text-on-primary hover:opacity-90 px-4 py-2.5 rounded-lg text-xs font-semibold shrink-0 mt-4 cursor-pointer"
                >
                  Añadir
                </button>
              </form>
            </div>

            {/* Code Output Block */}
            <div className="bg-surface-container-low rounded-xl border border-outline-variant overflow-hidden flex flex-col h-full justify-between">
              <div className="bg-surface-container-highest px-4 py-2 flex justify-between items-center border-b border-outline-variant">
                <span className="text-[10px] font-mono text-outline">ProfileCard.html</span>
                <button
                  onClick={() => handleCopyCode('ProfileCard', profileCode)}
                  className="text-xs text-primary hover:underline flex items-center gap-1"
                >
                  {copiedCode === 'ProfileCard' ? <Check className="w-3.5 h-3.5 text-secondary" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode === 'ProfileCard' ? '¡Copiado!' : 'Copy'}</span>
                </button>
              </div>
              <pre className="p-4 text-xs font-mono text-on-surface-variant/90 overflow-x-auto leading-relaxed max-h-[380px] overflow-y-auto">
                <code>{profileCode}</code>
              </pre>
            </div>

          </div>
        </section>
      )}

      {/* TEMPLATE 3: METRICAS DEL DASHBOARD */}
      {showMetrics && (
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-outline-variant/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-secondary-container/20 text-secondary rounded-lg">
                <Sparkles className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-semibold text-on-surface">Métricas del Dashboard</h2>
            </div>
            
            {/* Live simulation toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setIsSimulating(!isSimulating);
                  addNotification(isSimulating ? 'Simulación pausada' : 'Simulación de tráfico en vivo iniciada', 'info');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                  isSimulating
                    ? 'bg-secondary/15 text-secondary border-secondary/30'
                    : 'bg-surface-container-high text-outline border-outline-variant/40'
                }`}
              >
                <RefreshCw className={`w-3 h-3 ${isSimulating ? 'animate-spin' : ''}`} />
                <span>{isSimulating ? 'Live Simulating' : 'Simulación Off'}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            
            {/* Visual preview Side with live charts */}
            <div className="space-y-4">
              <div className="glass-panel p-6 rounded-xl space-y-6 min-h-[340px] flex flex-col justify-between">
                
                {/* Metric widgets row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* API Requests */}
                  <div className="bg-surface-container-high border border-outline-variant rounded-xl p-4 flex flex-col justify-between relative overflow-hidden group hover:border-outline transition-colors duration-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 bg-primary-container text-on-primary-container flex items-center justify-center rounded-lg shadow-sm">
                        <Terminal className="w-4.5 h-4.5" />
                      </div>
                      <span className="px-2 py-0.5 bg-secondary-container/20 text-secondary text-[10px] font-mono font-bold rounded-full flex items-center gap-0.5">
                        <TrendingUp className="w-3 h-3" />
                        <span>+{apiTrend}%</span>
                      </span>
                    </div>
                    <div>
                      <p className="text-on-surface-variant text-[11px] font-mono uppercase tracking-wider">API Requests</p>
                      <p className="text-2xl font-bold text-on-surface tracking-tight mt-1">
                        {apiRequests.toFixed(2)}M
                      </p>
                    </div>
                  </div>

                  {/* Latency card */}
                  <div className="bg-surface-container-high border border-outline-variant rounded-xl p-4 flex flex-col justify-between relative overflow-hidden group hover:border-outline transition-colors duration-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 bg-tertiary-container text-on-tertiary-container flex items-center justify-center rounded-lg shadow-sm">
                        <Award className="w-4.5 h-4.5" />
                      </div>
                      <span className="px-2 py-0.5 bg-error-container/20 text-error text-[10px] font-mono font-bold rounded-full flex items-center gap-0.5">
                        <TrendingDown className="w-3 h-3" />
                        <span>{latencyTrend}%</span>
                      </span>
                    </div>
                    <div>
                      <p className="text-on-surface-variant text-[11px] font-mono uppercase tracking-wider">Latency (Avg)</p>
                      <p className="text-2xl font-bold text-on-surface tracking-tight mt-1">
                        {latency}ms
                      </p>
                    </div>
                  </div>

                </div>

                {/* Live simulated SVG line chart for visual completeness */}
                <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-outline font-mono uppercase">Métricas de Tráfico Seguro</span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-ping"></span>
                      <span className="text-[9px] text-secondary font-mono">EN VIVO</span>
                    </span>
                  </div>
                  <div className="h-20 flex items-end">
                    <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#67d9c9" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#67d9c9" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path
                        d={`M 0 ${40 - chartData[0]} 
                            C 15 ${40 - chartData[1]}, 30 ${40 - chartData[2]}, 45 ${40 - chartData[3]} 
                            S 60 ${40 - chartData[4]}, 75 ${40 - chartData[5]}, 100 ${40 - chartData[6]}`}
                        fill="none"
                        stroke="#67d9c9"
                        strokeWidth="2"
                        className="transition-all duration-500"
                      />
                      <path
                        d={`M 0 ${40 - chartData[0]} 
                            C 15 ${40 - chartData[1]}, 30 ${40 - chartData[2]}, 45 ${40 - chartData[3]} 
                            S 60 ${40 - chartData[4]}, 75 ${40 - chartData[5]}, 100 ${40 - chartData[6]} 
                            L 100 40 L 0 40 Z`}
                        fill="url(#chartGrad)"
                        className="transition-all duration-500"
                      />
                    </svg>
                  </div>
                </div>

              </div>
            </div>

            {/* Code Output Block */}
            <div className="bg-surface-container-low rounded-xl border border-outline-variant overflow-hidden flex flex-col h-full justify-between">
              <div className="bg-surface-container-highest px-4 py-2 flex justify-between items-center border-b border-outline-variant">
                <span className="text-[10px] font-mono text-outline">StatCard.html</span>
                <button
                  onClick={() => handleCopyCode('StatCard', statCode)}
                  className="text-xs text-primary hover:underline flex items-center gap-1"
                >
                  {copiedCode === 'StatCard' ? <Check className="w-3.5 h-3.5 text-secondary" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode === 'StatCard' ? '¡Copiado!' : 'Copy'}</span>
                </button>
              </div>
              <pre className="p-4 text-xs font-mono text-on-surface-variant/90 overflow-x-auto leading-relaxed max-h-[380px] overflow-y-auto">
                <code>{statCode}</code>
              </pre>
            </div>

          </div>
        </section>
      )}

    </div>
  );
}
