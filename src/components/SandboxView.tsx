import React from 'react';
import { Smartphone, Tablet, Monitor, RotateCcw, Scaling, Info, GripVertical } from 'lucide-react';
import { SANDBOX_DEMOS } from '../sandbox/registry';

interface SandboxViewProps {
  searchQuery: string;
  selectedDemo: string;
  setSelectedDemo: (id: string) => void;
  addNotification: (msg: string, type: 'success' | 'info') => void;
}

const MIN_WIDTH = 320;
const MIN_HEIGHT = 220;
const MAX_HEIGHT = 800;

type BreakpointId = 'mobile' | 'tablet' | 'desktop';

interface Breakpoint {
  id: BreakpointId;
  label: string;
  range: string;
  preset: number;
  icon: typeof Smartphone;
  badgeCls: string;
  zoneCls: string;
}

const BREAKPOINTS: Breakpoint[] = [
  {
    id: 'mobile',
    label: 'Mobile',
    range: '320 – 767px',
    preset: 375,
    icon: Smartphone,
    badgeCls: 'bg-secondary-container/20 text-secondary border-secondary-container/40',
    zoneCls: 'bg-secondary/10'
  },
  {
    id: 'tablet',
    label: 'Tablet',
    range: '768 – 1023px',
    preset: 768,
    icon: Tablet,
    badgeCls: 'bg-primary-container/20 text-primary border-primary/40',
    zoneCls: 'bg-primary/10'
  },
  {
    id: 'desktop',
    label: 'Desktop',
    range: '≥ 1024px',
    preset: 1280,
    icon: Monitor,
    badgeCls: 'bg-tertiary-container/20 text-tertiary border-tertiary/40',
    zoneCls: 'bg-tertiary/10'
  }
];

function getBreakpoint(width: number): Breakpoint {
  if (width < 768) return BREAKPOINTS[0];
  if (width < 1024) return BREAKPOINTS[1];
  return BREAKPOINTS[2];
}

export default function SandboxView({ searchQuery, selectedDemo, setSelectedDemo, addNotification }: SandboxViewProps) {
  // width/height null = auto (frame ocupa todo el ancho disponible / altura del contenido)
  const [width, setWidth] = React.useState<number | null>(null);
  const [height, setHeight] = React.useState<number | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [maxWidth, setMaxWidth] = React.useState(1280);

  const areaRef = React.useRef<HTMLDivElement>(null);
  const frameRef = React.useRef<HTMLDivElement>(null);

  // Medir el ancho disponible del área de trabajo (límite superior del frame)
  React.useLayoutEffect(() => {
    const measure = () => {
      if (areaRef.current) setMaxWidth(areaRef.current.clientWidth);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const effectiveWidth = Math.max(MIN_WIDTH, Math.min(width ?? maxWidth, maxWidth));
  const activeBp = getBreakpoint(effectiveWidth);

  const startDrag = (e: React.PointerEvent, mode: 'x' | 'xy') => {
    e.preventDefault();
    if (!frameRef.current) return;
    const startX = e.clientX;
    const startY = e.clientY;
    const startW = frameRef.current.offsetWidth;
    const startH = frameRef.current.offsetHeight;
    const bpAtStart = getBreakpoint(startW).id;
    setIsDragging(true);

    let lastW = startW;
    const onMove = (ev: PointerEvent) => {
      lastW = Math.max(MIN_WIDTH, Math.min(startW + (ev.clientX - startX), areaRef.current?.clientWidth ?? maxWidth));
      setWidth(lastW);
      if (mode === 'xy') {
        setHeight(Math.max(MIN_HEIGHT, Math.min(startH + (ev.clientY - startY), MAX_HEIGHT)));
      }
    };
    const onUp = () => {
      setIsDragging(false);
      window.removeEventListener('pointermove', onMove);
      const bpAtEnd = getBreakpoint(lastW);
      if (bpAtEnd.id !== bpAtStart) {
        addNotification(`Breakpoint ${bpAtEnd.label} activo (${bpAtEnd.range})`, 'info');
      }
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp, { once: true });
  };

  const applyPreset = (bp: Breakpoint) => {
    if (bp.preset > maxWidth) {
      setWidth(maxWidth);
      addNotification(`Preset ${bp.label} limitado a ${maxWidth}px por el ancho de tu ventana`, 'info');
    } else {
      setWidth(bp.preset);
      addNotification(`Frame ajustado a ${bp.label} (${bp.preset}px)`, 'success');
    }
  };

  const resetFrame = () => {
    setWidth(null);
    setHeight(null);
    addNotification('Frame restablecido al ancho completo', 'info');
  };

  // Filtrado por búsqueda global
  const query = searchQuery.toLowerCase().trim();
  const filteredDemos = SANDBOX_DEMOS.filter(
    (d) => d.label.toLowerCase().includes(query) || d.description.toLowerCase().includes(query)
  );

  // Fallback: si el id seleccionado no existe en el registro (p. ej. viene de otra vista)
  const activeDemo = SANDBOX_DEMOS.find((d) => d.id === selectedDemo) ?? SANDBOX_DEMOS[0];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* HERO */}
      <section className="border-b border-outline-variant/20 pb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-secondary-container/20 text-secondary border border-secondary-container/40 px-2 py-0.5 rounded text-xs font-mono font-bold uppercase">
            Playground
          </span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-on-surface mb-3 font-sans">Sandbox Responsivo</h1>
        <p className="text-lg text-on-surface-variant max-w-3xl leading-relaxed">
          Arrastra el borde del frame para ver cómo cada componente se adapta a los breakpoints estándar de la
          industria: Mobile (&lt;768px), Tablet (768–1023px) y Desktop (≥1024px).
        </p>
      </section>

      {/* SELECTOR DE COMPONENTE */}
      <section className="space-y-3">
        <h2 className="text-[10px] font-bold text-outline uppercase tracking-widest">Componente</h2>
        {filteredDemos.length === 0 ? (
          <p className="text-xs text-outline py-2">No hay demos que coincidan con la búsqueda</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {filteredDemos.map((demo) => {
              const isActive = demo.id === activeDemo.id;
              return (
                <button
                  key={demo.id}
                  onClick={() => setSelectedDemo(demo.id)}
                  title={demo.description}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold border transition-all ${
                    isActive
                      ? 'bg-primary-container text-on-primary-container border-primary shadow-sm'
                      : 'bg-surface-container text-on-surface-variant border-outline-variant/40 hover:text-on-surface hover:border-outline-variant'
                  }`}
                >
                  {demo.label}
                </button>
              );
            })}
          </div>
        )}
      </section>

      {/* TOOLBAR */}
      <section className="bg-surface-container border border-outline-variant rounded-xl p-4 flex flex-wrap items-center gap-4 justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary-container/20 rounded-lg text-primary">
            <Scaling className="w-4.5 h-4.5" />
          </div>
          <div>
            <span className="font-mono text-lg font-bold text-on-surface tabular-nums">{effectiveWidth}px</span>
            <span className="text-xs text-outline font-mono ml-2">× {height ? `${height}px` : 'auto'}</span>
          </div>
          <span
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-mono font-bold ${activeBp.badgeCls}`}
          >
            <activeBp.icon className="w-3.5 h-3.5" />
            <span>{activeBp.label}</span>
            <span className="opacity-70 font-normal hidden sm:inline">· {activeBp.range}</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex gap-1 bg-surface-container-low p-1 rounded-lg border border-outline-variant/40">
            {BREAKPOINTS.map((bp) => {
              const Icon = bp.icon;
              const isActive = activeBp.id === bp.id;
              return (
                <button
                  key={bp.id}
                  onClick={() => applyPreset(bp)}
                  title={`${bp.label}: ${bp.preset}px`}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-semibold rounded-md transition-all ${
                    isActive
                      ? 'bg-primary-container text-on-primary-container font-bold shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">{bp.label}</span>
                </button>
              );
            })}
          </div>
          <button
            onClick={resetFrame}
            title="Restablecer al ancho completo"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold text-on-surface-variant hover:text-on-surface bg-surface-container-low border border-outline-variant/40 hover:border-outline-variant transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Reset</span>
          </button>
        </div>
      </section>

      {/* ÁREA DE TRABAJO */}
      <section ref={areaRef} className="relative">
        {/* REGLA DE BREAKPOINTS (misma escala en px que el frame) */}
        <div className="relative h-7 mb-2 rounded-md overflow-hidden border border-outline-variant/30 bg-surface-container-lowest select-none">
          {/* Zonas coloreadas */}
          <div className={`absolute inset-y-0 left-0 ${BREAKPOINTS[0].zoneCls}`} style={{ width: 768 }} />
          <div className={`absolute inset-y-0 ${BREAKPOINTS[1].zoneCls}`} style={{ left: 768, width: 1024 - 768 }} />
          <div className={`absolute inset-y-0 right-0 ${BREAKPOINTS[2].zoneCls}`} style={{ left: 1024 }} />

          {/* Etiquetas de zona */}
          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[9px] font-mono font-bold text-secondary">
            MOBILE
          </span>
          {maxWidth > 820 && (
            <span className="absolute top-1/2 -translate-y-1/2 text-[9px] font-mono font-bold text-primary" style={{ left: 776 }}>
              TABLET
            </span>
          )}
          {maxWidth > 1080 && (
            <span className="absolute top-1/2 -translate-y-1/2 text-[9px] font-mono font-bold text-tertiary" style={{ left: 1032 }}>
              DESKTOP
            </span>
          )}

          {/* Ticks de umbral */}
          <div className="absolute inset-y-0 border-l border-dashed border-outline/60" style={{ left: 768 }}>
            <span className="absolute -top-0.5 left-1 text-[9px] font-mono text-outline">768</span>
          </div>
          <div className="absolute inset-y-0 border-l border-dashed border-outline/60" style={{ left: 1024 }}>
            <span className="absolute -top-0.5 left-1 text-[9px] font-mono text-outline">1024</span>
          </div>

          {/* Indicador del ancho actual */}
          <div
            className={`absolute inset-y-0 w-0.5 bg-on-surface ${isDragging ? '' : 'transition-all duration-300'}`}
            style={{ left: effectiveWidth - 2 }}
          />
        </div>

        {/* Líneas guía de umbral extendidas sobre el área del frame */}
        {maxWidth > 768 && (
          <div className="absolute top-9 bottom-0 border-l border-dashed border-outline-variant/40 pointer-events-none" style={{ left: 768 }} />
        )}
        {maxWidth > 1024 && (
          <div className="absolute top-9 bottom-0 border-l border-dashed border-outline-variant/40 pointer-events-none" style={{ left: 1024 }} />
        )}

        {/* FRAME REDIMENSIONABLE */}
        <div
          ref={frameRef}
          className={`@container relative bg-surface-container-lowest border-2 rounded-xl overflow-hidden ${
            isDragging ? 'border-primary select-none' : 'border-outline-variant transition-[width,height] duration-300'
          }`}
          style={{ width: effectiveWidth, height: height ?? undefined, minHeight: MIN_HEIGHT }}
        >
          {/* Overlay de dimensiones (visible durante el drag) */}
          {isDragging && (
            <span className="absolute top-2 right-6 z-10 bg-surface-container-high/90 border border-outline-variant text-on-surface text-[10px] font-mono font-bold px-2 py-1 rounded pointer-events-none">
              {effectiveWidth} × {height ?? 'auto'}
            </span>
          )}

          {/* Contenido de la demo */}
          <div className="h-full overflow-y-auto">{activeDemo.render()}</div>

          {/* Asa: borde derecho (ancho) */}
          <div
            onPointerDown={(e) => startDrag(e, 'x')}
            className="absolute inset-y-0 right-0 w-4 flex items-center justify-center cursor-ew-resize bg-surface-container-high/60 hover:bg-primary-container/40 border-l border-outline-variant/40 transition-colors group"
            style={{ touchAction: 'none' }}
            title="Arrastra para cambiar el ancho"
          >
            <GripVertical className="w-3 h-3 text-outline group-hover:text-primary" />
          </div>

          {/* Asa: esquina inferior derecha (ancho + alto) */}
          <div
            onPointerDown={(e) => startDrag(e, 'xy')}
            className="absolute bottom-0 right-0 w-5 h-5 cursor-nwse-resize z-10"
            style={{ touchAction: 'none' }}
            title="Arrastra para cambiar ancho y alto"
          >
            <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-r-2 border-b-2 border-outline rounded-br-sm" />
          </div>
        </div>
      </section>

      {/* NOTA TÉCNICA */}
      <div className="flex items-start gap-2 text-[11px] text-outline bg-surface-container-high/50 px-3 py-2.5 rounded-lg border border-outline-variant/30 max-w-3xl">
        <Info className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
        <span>
          Las demos usan <span className="font-mono text-on-surface-variant">container queries</span> de Tailwind 4
          (responden al ancho del frame, no al de tu navegador). En producción, los componentes usan las variantes de
          viewport equivalentes (<span className="font-mono text-on-surface-variant">md:</span> /{' '}
          <span className="font-mono text-on-surface-variant">lg:</span>) con los mismos umbrales.
        </span>
      </div>
    </div>
  );
}
