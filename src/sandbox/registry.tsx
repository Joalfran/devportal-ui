import React from 'react';
import { Terminal, Award, TrendingUp, TrendingDown, Zap, ShoppingBag } from 'lucide-react';
import { SandboxEntry } from '../types';

/*
 * Demos del Sandbox.
 * Usan container queries de Tailwind 4 (@min-[768px]: / @min-[1024px]:) en lugar
 * de md:/lg: para que respondan al ancho del frame redimensionable, no al viewport.
 * Umbrales alineados con los breakpoints estándar: Mobile <768, Tablet 768-1023, Desktop >=1024.
 */

const PRODUCT_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDTFz6uXFndW7MXGjOBLHqEMYHn7V6nnHDhr_e72KHVZvawcn-qJrLlFOR3Ex74c2Z0gX8wcsoFEV2darHWqkR1WLtr2fMxyKyBd7YhrYMovgTJZCICCPrGfuoB6bf8foXipmhv7RRFtILBS4nR6dkevums3mUm1YUoJD7s996SLK2otF-H2TXNkaeDbCJ5V8EQnrq3xPaRJpEvgZggJF5VtzhzbBmbMJIbHf3HGrkG30gJbDQiL15Z';

const AVATAR_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDkBvJgjcv1-lf74OXKn1sY1-A4uBMD1mPUPlRA5yWQI2tyzLfRAYD6ndO8Wsi03ljroEZwEwh_ZhH3Mq-PcSgGoiOgufS26iIDNZAZs_QYkaNN-rgtt3OjGyZ2SjCjHpB5w_zWDKB19cc278zxkpjbFXpuZ2D2pFkWikprps1JdO7UO5zjaYQ7fmq-lh9gCd9Jss0WtQuMyoT8u9JNlclfsX9Xu3KK1hU6czQlsRu1U8EfeIhKMNQH';

function ButtonsDemo() {
  return (
    <div className="p-6">
      {/* Mobile: apilados a ancho completo. Tablet+: fila alineada a la izquierda */}
      <div className="flex flex-col gap-3 @min-[768px]:flex-row @min-[768px]:items-center">
        <button className="bg-primary text-on-primary px-4 py-2.5 rounded-lg font-semibold text-xs shadow-sm w-full @min-[768px]:w-auto">
          Desplegar Proyecto
        </button>
        <button className="bg-primary-container text-on-primary-container px-4 py-2.5 rounded-lg font-semibold text-xs w-full @min-[768px]:w-auto">
          Guardar Borrador
        </button>
        <button className="border border-outline-variant text-on-surface-variant px-4 py-2.5 rounded-lg font-semibold text-xs w-full @min-[768px]:w-auto">
          Cancelar
        </button>
      </div>
      <p className="text-[10px] text-outline font-mono mt-4">
        Mobile: botones apilados (touch target completo) · Tablet/Desktop: fila horizontal
      </p>
    </div>
  );
}

function BadgesDemo() {
  const badges = [
    { label: 'GET', cls: 'bg-secondary-container text-on-secondary-container', desc: 'Lectura de recursos' },
    { label: 'POST', cls: 'bg-primary-container text-on-primary-container', desc: 'Creación de recursos' },
    { label: 'DELETE', cls: 'bg-error-container text-on-error-container', desc: 'Eliminación permanente' },
    { label: 'PATCH', cls: 'border border-outline-variant/80 text-on-surface-variant', desc: 'Actualización parcial' }
  ];
  return (
    <div className="p-6 space-y-2 @min-[768px]:space-y-0 @min-[768px]:flex @min-[768px]:flex-wrap @min-[768px]:gap-3">
      {badges.map((b) => (
        <div
          key={b.label}
          className="flex items-center gap-3 bg-surface-container-low border border-outline-variant/30 rounded-lg p-2.5 @min-[768px]:flex-1 @min-[768px]:min-w-[160px]"
        >
          <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold shrink-0 ${b.cls}`}>
            {b.label}
          </span>
          {/* La descripción se oculta en anchos muy pequeños dentro del frame */}
          <span className="text-[11px] text-on-surface-variant hidden @min-[480px]:block">{b.desc}</span>
        </div>
      ))}
    </div>
  );
}

function ProductCardDemo() {
  return (
    <div className="p-6">
      {/* Mobile: imagen arriba (columna). Tablet+: imagen a la izquierda (fila) */}
      <div className="bg-surface-container-highest rounded-xl overflow-hidden border border-outline-variant/80 flex flex-col @min-[768px]:flex-row">
        <div className="h-44 @min-[768px]:h-auto @min-[768px]:w-64 @min-[1024px]:w-80 bg-surface-container-low relative shrink-0">
          <img className="w-full h-full object-cover" alt="Workstation laptop" referrerPolicy="no-referrer" src={PRODUCT_IMG} />
          <div className="absolute top-3 right-3 bg-secondary text-on-secondary px-2.5 py-0.5 text-[10px] font-mono font-bold rounded-full shadow">
            En Stock
          </div>
        </div>
        <div className="p-5 flex flex-col justify-between gap-4 flex-1">
          <div>
            <h3 className="text-lg font-bold text-on-surface font-sans">Workstation Pro M3</h3>
            <p className="text-on-surface-variant text-[11px] font-mono mt-0.5">Laptops / 32GB / 1TB SSD</p>
            {/* Descripción extendida solo en desktop */}
            <p className="text-xs text-on-surface-variant leading-relaxed mt-3 hidden @min-[1024px]:block">
              Estación de trabajo de alto rendimiento para compilación y entornos de virtualización.
              Chasis de aluminio, refrigeración activa dual y certificación para cargas sostenidas.
            </p>
          </div>
          <div className="flex items-center justify-between gap-3 flex-col @min-[768px]:flex-row">
            <span className="text-xl font-bold text-primary font-sans">$2,499.00</span>
            <button className="bg-primary-container text-on-primary-container text-xs px-4 py-2 font-semibold rounded-lg shadow-sm w-full @min-[768px]:w-auto flex items-center justify-center gap-1.5">
              <ShoppingBag className="w-3.5 h-3.5" />
              Añadir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileCardDemo() {
  const tags = ['Rust', 'Go', 'Wasm', 'Drizzle'];
  return (
    <div className="p-6">
      {/* Mobile: columna centrada. Tablet+: fila con avatar a la izquierda y texto alineado */}
      <div className="bg-surface-container border border-outline-variant rounded-xl p-6 flex flex-col items-center text-center gap-4 @min-[768px]:flex-row @min-[768px]:items-start @min-[768px]:text-left">
        <div className="w-24 h-24 rounded-full border-4 border-primary p-1 shrink-0 overflow-hidden">
          <img className="w-full h-full rounded-full object-cover" alt="Adrián Guerrero" referrerPolicy="no-referrer" src={AVATAR_IMG} />
        </div>
        <div className="flex-1 space-y-3 min-w-0">
          <div>
            <h3 className="text-lg font-bold text-on-surface font-sans">Adrián Guerrero</h3>
            <p className="text-primary font-medium text-xs font-mono">Principal System Architect</p>
          </div>
          <div className="flex flex-wrap justify-center gap-1.5 @min-[768px]:justify-start">
            {tags.map((tag) => (
              <span key={tag} className="px-2.5 py-0.5 bg-surface-container-highest text-on-surface text-[10px] font-mono border border-outline-variant/60 rounded">
                {tag}
              </span>
            ))}
          </div>
          <button className="w-full @min-[768px]:w-auto border border-primary text-primary px-4 py-2 font-semibold rounded-lg text-xs">
            Ver Perfil Completo
          </button>
        </div>
      </div>
    </div>
  );
}

function StatCardsDemo() {
  const stats = [
    { icon: Terminal, label: 'API Requests', value: '1.24M', trend: '+12%', up: true },
    { icon: Award, label: 'Latency (Avg)', value: '42ms', trend: '-2%', up: false },
    { icon: Zap, label: 'Uptime', value: '99.98%', trend: '+0.1%', up: true }
  ];
  return (
    <div className="p-6">
      {/* Mobile: 1 col. Tablet: 2 cols. Desktop: 3 cols */}
      <div className="grid grid-cols-1 gap-4 @min-[768px]:grid-cols-2 @min-[1024px]:grid-cols-3">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-surface-container-high border border-outline-variant rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 bg-primary-container text-on-primary-container flex items-center justify-center rounded-lg shadow-sm">
                  <Icon className="w-4.5 h-4.5" />
                </div>
                <span
                  className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded-full flex items-center gap-0.5 ${
                    s.up ? 'bg-secondary-container/20 text-secondary' : 'bg-error-container/20 text-error'
                  }`}
                >
                  {s.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  <span>{s.trend}</span>
                </span>
              </div>
              <p className="text-on-surface-variant text-[11px] font-mono uppercase tracking-wider">{s.label}</p>
              <p className="text-2xl font-bold text-on-surface tracking-tight mt-1">{s.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const SANDBOX_DEMOS: SandboxEntry[] = [
  {
    id: 'buttons',
    label: 'Buttons',
    description: 'Apilados en mobile, fila en tablet/desktop',
    render: () => <ButtonsDemo />
  },
  {
    id: 'badges',
    label: 'Badges',
    description: 'Lista vertical en mobile, wrap horizontal en tablet+',
    render: () => <BadgesDemo />
  },
  {
    id: 'product-card',
    label: 'Tarjeta de Producto',
    description: 'Imagen arriba en mobile, layout horizontal en tablet+',
    render: () => <ProductCardDemo />
  },
  {
    id: 'profile-card',
    label: 'Perfil de Usuario',
    description: 'Columna centrada en mobile, fila en tablet+',
    render: () => <ProfileCardDemo />
  },
  {
    id: 'stat-cards',
    label: 'Stat Cards',
    description: '1 columna mobile, 2 tablet, 3 desktop',
    render: () => <StatCardsDemo />
  }
];
