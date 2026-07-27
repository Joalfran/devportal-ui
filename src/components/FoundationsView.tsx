import React from 'react';
import { Grid, Ruler, Palette, Type, Copy, Check, Sliders, Info } from 'lucide-react';
import { ColorToken, TypoToken, SpacingToken } from '../types';

interface FoundationsViewProps {
  searchQuery: string;
  addNotification: (msg: string, type: 'success' | 'info') => void;
}

export default function FoundationsView({ searchQuery, addNotification }: FoundationsViewProps) {
  // Grid interactive states
  const [columns, setColumns] = React.useState(12);
  const [gutter, setGutter] = React.useState(24);
  const [maxWidth, setMaxWidth] = React.useState(1200);

  // Spacing interactive states
  const [selectedSpacing, setSelectedSpacing] = React.useState<string | null>(null);

  // Typography custom preview state
  const [customText, setCustomText] = React.useState('');

  // Copy hex state
  const [copiedHex, setCopiedHex] = React.useState<string | null>(null);

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    addNotification(`Copiado al portapapeles: ${hex}`, 'success');
    setTimeout(() => setCopiedHex(null), 2000);
  };

  // Color Tokens Data
  const colorTokens: ColorToken[] = [
    {
      name: 'Primario',
      tokenName: 'color-primary-500',
      hex: '#BAC3FF',
      containerLabel: 'Container',
      containerHex: '#3F51B5',
      textColor: '#08218a'
    },
    {
      name: 'Secundario',
      tokenName: 'color-secondary-500',
      hex: '#67D9C9',
      containerLabel: 'Container',
      containerHex: '#21A293',
      textColor: '#003731'
    },
    {
      name: 'Superficie',
      tokenName: 'surface-high',
      hex: '#222A3D',
      containerLabel: 'Base',
      containerHex: '#171F33',
      textColor: '#dae2fd'
    },
    {
      name: 'Semántico (Error)',
      tokenName: 'color-error-500',
      hex: '#FFB4AB',
      containerLabel: 'Container',
      containerHex: '#93000A',
      textColor: '#690005'
    }
  ];

  // Spacing Tokens Data
  const spacingTokens: SpacingToken[] = [
    { name: 'XS / Base', pixel: '4px', sizeClass: 'h-1 w-1' },
    { name: 'SM / Small', pixel: '8px', sizeClass: 'h-2 w-2' },
    { name: 'MD / Medium', pixel: '16px', sizeClass: 'h-4 w-4' },
    { name: 'LG / Gutter', pixel: '24px', sizeClass: 'h-6 w-6' },
    { name: 'XL / Large', pixel: '32px', sizeClass: 'h-8 w-8' },
    { name: '2XL / Huge', pixel: '64px', sizeClass: 'h-16 w-16' }
  ];

  // Typography Scale Tokens Data
  const typoTokens: TypoToken[] = [
    {
      tokenName: 'headline-xl',
      exampleText: 'Headline XL',
      sizeWeight: '40px / Bold',
      className: 'text-[40px] leading-[48px] font-bold tracking-tight'
    },
    {
      tokenName: 'headline-lg',
      exampleText: 'Headline Large',
      sizeWeight: '30px / Semi-Bold',
      className: 'text-[30px] leading-[38px] font-semibold tracking-tight'
    },
    {
      tokenName: 'headline-md',
      exampleText: 'Headline Medium',
      sizeWeight: '20px / Semi-Bold',
      className: 'text-[20px] leading-[28px] font-semibold'
    },
    {
      tokenName: 'body-lg',
      exampleText: 'Cuerpo de texto grande para lectura cómoda.',
      sizeWeight: '18px / Regular',
      className: 'text-[18px] leading-[28px] font-normal text-on-surface-variant'
    },
    {
      tokenName: 'body-md',
      exampleText: 'Texto estándar del sistema.',
      sizeWeight: '16px / Regular',
      className: 'text-[16px] leading-[24px] font-normal text-on-surface-variant'
    },
    {
      tokenName: 'label-sm',
      exampleText: 'ETIQUETAS Y MONOESPACIADO',
      sizeWeight: '12px / Medium',
      className: 'text-[12px] leading-[16px] font-mono font-medium tracking-wider uppercase'
    }
  ];

  // Filter lists based on search
  const query = searchQuery.toLowerCase().trim();
  const filteredColors = colorTokens.filter(
    (c) =>
      c.name.toLowerCase().includes(query) ||
      c.tokenName.toLowerCase().includes(query) ||
      c.hex.toLowerCase().includes(query)
  );

  const filteredSpacing = spacingTokens.filter(
    (s) => s.name.toLowerCase().includes(query) || s.pixel.toLowerCase().includes(query)
  );

  const filteredTypo = typoTokens.filter(
    (t) =>
      t.tokenName.toLowerCase().includes(query) ||
      t.exampleText.toLowerCase().includes(query) ||
      t.sizeWeight.toLowerCase().includes(query)
  );

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Intro Hero Section */}
      <section className="border-b border-outline-variant/20 pb-8">
        <h1 className="text-4xl font-bold tracking-tight text-on-surface mb-3 font-sans">
          Fundaciones del Sistema
        </h1>
        <p className="text-lg text-on-surface-variant max-w-3xl leading-relaxed">
          Los pilares visuales y técnicos que garantizan la consistencia en todas las plataformas de
          DevPortal. Desde la rejilla base hasta la semántica del color.
        </p>
      </section>

      {/* Grid and Spacing Bento Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* SECTION: Grid System (Span 8) */}
        <section className="lg:col-span-8 bg-surface-container border border-outline-variant rounded-xl p-6 relative overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-container/20 rounded-lg text-primary">
                <Grid className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-on-surface">Sistema de Rejilla</h2>
                <p className="text-xs text-on-surface-variant">Rejilla flexible adaptable en tiempo real</p>
              </div>
            </div>
            
            {/* Quick customizers */}
            <div className="flex items-center gap-2 bg-surface-container-high/60 border border-outline-variant/30 rounded-lg p-1">
              <button
                onClick={() => { setColumns(4); addNotification('Rejilla móvil (4 col)', 'info'); }}
                className={`px-2 py-1 text-[10px] font-mono rounded ${columns === 4 ? 'bg-primary text-on-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'}`}
              >
                4 col
              </button>
              <button
                onClick={() => { setColumns(8); addNotification('Rejilla tablet (8 col)', 'info'); }}
                className={`px-2 py-1 text-[10px] font-mono rounded ${columns === 8 ? 'bg-primary text-on-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'}`}
              >
                8 col
              </button>
              <button
                onClick={() => { setColumns(12); addNotification('Rejilla desktop (12 col)', 'info'); }}
                className={`px-2 py-1 text-[10px] font-mono rounded ${columns === 12 ? 'bg-primary text-on-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'}`}
              >
                12 col
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {/* Visual Rejilla Columns */}
            <div className="bg-surface-container-lowest/80 border border-outline-variant/50 rounded-lg p-4">
              <div className="grid h-24 gap-2 transition-all duration-300" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
                {Array.from({ length: columns }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-primary/10 hover:bg-primary/25 border border-primary/20 hover:border-primary/40 rounded flex flex-col items-center justify-between py-2 transition-all cursor-crosshair group relative"
                    title={`Columna ${i + 1} de ${columns}`}
                  >
                    <span className="text-primary text-[10px] font-mono font-bold">{i + 1}</span>
                    <span className="opacity-0 group-hover:opacity-100 text-[8px] font-mono text-outline transition-opacity bg-surface-container-high px-1 rounded absolute -bottom-1">
                      W: {Math.round(100/columns)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Config controls */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold tracking-wider text-outline uppercase">Columnas</span>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="1"
                    max="12"
                    value={columns}
                    onChange={(e) => setColumns(Number(e.target.value))}
                    className="w-full h-1 bg-outline-variant rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <span className="font-mono text-sm font-semibold text-on-surface shrink-0 w-12 text-right">
                    {columns} Cols
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] font-bold tracking-wider text-outline uppercase">Gutter (Espacio)</span>
                <div className="flex items-center gap-3">
                  <select
                    value={gutter}
                    onChange={(e) => setGutter(Number(e.target.value))}
                    className="w-full bg-surface-container-low border border-outline-variant rounded px-2 py-1 text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="12">12px (Compacto)</option>
                    <option value="16">16px (Estándar)</option>
                    <option value="24">24px (Gutter UI)</option>
                    <option value="32">32px (Espaciado)</option>
                  </select>
                  <span className="font-mono text-sm font-semibold text-on-surface shrink-0">
                    {gutter}px
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] font-bold tracking-wider text-outline uppercase">Max Width</span>
                <div className="flex items-center gap-3">
                  <select
                    value={maxWidth}
                    onChange={(e) => setMaxWidth(Number(e.target.value))}
                    className="w-full bg-surface-container-low border border-outline-variant rounded px-2 py-1 text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="800">800px (Artículos)</option>
                    <option value="1000">1000px (Compacto)</option>
                    <option value="1200">1200px (Sistema)</option>
                    <option value="1400">1400px (Full Width)</option>
                  </select>
                  <span className="font-mono text-sm font-semibold text-on-surface shrink-0">
                    {maxWidth}px
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: Spacing (Span 4) */}
        <section className="lg:col-span-4 bg-surface-container border border-outline-variant rounded-xl p-6 relative overflow-hidden">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary-container/20 rounded-lg text-primary">
              <Ruler className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-on-surface">Espaciado</h2>
              <p className="text-xs text-on-surface-variant">Hover o clica para ver tamaño</p>
            </div>
          </div>

          <div className="space-y-2">
            {filteredSpacing.length === 0 ? (
              <p className="text-xs text-outline py-4 text-center">No hay espaciados que coincidan</p>
            ) : (
              filteredSpacing.map((token) => (
                <div
                  key={token.name}
                  onClick={() => setSelectedSpacing(selectedSpacing === token.name ? null : token.name)}
                  className={`flex items-center justify-between p-2.5 rounded-lg border transition-all cursor-pointer ${
                    selectedSpacing === token.name
                      ? 'bg-primary-container/10 border-primary/50'
                      : 'bg-surface-container-low border-outline-variant/30 hover:border-outline-variant/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded bg-surface-container-high border border-outline-variant/20">
                      <div className={`${token.sizeClass} bg-primary rounded-full transition-transform`}></div>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-on-surface block">{token.name}</span>
                      <span className="text-[10px] text-outline font-mono">Tailwind variable</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedSpacing === token.name && (
                      <span className="text-[10px] text-secondary font-mono bg-secondary-container/20 px-1.5 py-0.5 rounded animate-pulse">
                        Preview
                      </span>
                    )}
                    <span className="font-mono text-xs text-on-surface-variant bg-surface-container-highest px-2 py-0.5 rounded border border-outline-variant/30">
                      {token.pixel}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Interactive Spacing Sandbox Box */}
          {selectedSpacing && (
            <div className="mt-4 p-3 bg-surface-container-highest rounded-lg border border-outline-variant/40 animate-fade-in">
              <p className="text-[10px] font-mono font-bold text-outline uppercase mb-2">Representación Espacial:</p>
              <div className="bg-surface-container-lowest h-16 rounded border border-outline-variant/20 flex items-center justify-center overflow-hidden">
                <div className="bg-primary/20 border border-primary/40 h-full flex items-center justify-center transition-all"
                  style={{ width: spacingTokens.find(s => s.name === selectedSpacing)?.pixel }}
                >
                  <div className="w-1.5 h-full bg-primary/60"></div>
                </div>
              </div>
              <p className="text-[10px] text-on-surface-variant/80 mt-2 text-center">
                Muestra el grosor exacto de <span className="font-bold text-primary">{selectedSpacing}</span> ({spacingTokens.find(s => s.name === selectedSpacing)?.pixel})
              </p>
            </div>
          )}
        </section>
      </div>

      {/* SECTION: Color Palettes (Span 12) */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-outline-variant/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-container/20 rounded-lg text-primary">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-on-surface">Paletas de Colores</h2>
              <p className="text-xs text-on-surface-variant">Haz click en cualquier color para copiar el código HEX</p>
            </div>
          </div>
          
          <div className="flex items-center gap-1 text-[11px] text-outline bg-surface-container-high px-2.5 py-1 rounded-lg border border-outline-variant/30">
            <Info className="w-3 h-3 text-primary shrink-0" />
            <span>Sistema Material 3 Slate adaptado</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredColors.length === 0 ? (
            <p className="text-xs text-outline py-8 text-center col-span-4">No hay paletas que coincidan</p>
          ) : (
            filteredColors.map((token) => (
              <div key={token.name} className="space-y-3">
                <h3 className="text-[10px] font-bold text-outline uppercase tracking-widest">
                  {token.name}
                </h3>
                
                {/* Master color card with click-to-copy */}
                <div
                  onClick={() => handleCopy(token.hex)}
                  className="group relative h-32 rounded-xl p-4 flex flex-col justify-end border border-outline-variant/20 shadow-md cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-outline-variant"
                  style={{ backgroundColor: token.hex }}
                >
                  {/* Subtle hover overlay */}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-surface-container-high/90 text-on-surface text-xs font-semibold rounded-lg px-2.5 py-1.5 flex items-center gap-1.5 border border-outline-variant">
                      {copiedHex === token.hex ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-secondary" />
                          <span>¡Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-primary" />
                          <span>Copiar HEX</span>
                        </>
                      )}
                    </div>
                  </div>

                  <span className="font-bold tracking-tight text-sm drop-shadow-sm font-sans" style={{ color: token.textColor }}>
                    {token.hex}
                  </span>
                  <span className="text-[10px] font-mono font-medium drop-shadow-sm" style={{ color: token.textColor }}>
                    {token.tokenName}
                  </span>
                </div>

                {/* Sub-container component style */}
                {token.containerHex && (
                  <div
                    onClick={() => handleCopy(token.containerHex!)}
                    className="group bg-surface-container-low hover:bg-surface-container-high border border-outline-variant/30 hover:border-outline-variant/60 px-3 py-2.5 rounded-lg flex justify-between items-center cursor-pointer transition-all"
                  >
                    <span className="text-xs text-on-surface-variant font-medium">{token.containerLabel}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full border border-outline-variant/40" style={{ backgroundColor: token.containerHex }}></div>
                      <span className="text-xs font-mono text-on-surface font-bold group-hover:text-primary transition-colors">
                        {token.containerHex}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </section>

      {/* SECTION: Typographic Scale (Span 12) */}
      <section className="bg-surface-container border border-outline-variant rounded-xl p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-outline-variant/20 pb-5 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-container/20 rounded-lg text-primary">
              <Type className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-on-surface">Escala Tipográfica</h2>
              <p className="text-xs text-on-surface-variant">Inspecciona el renderizado tipográfico</p>
            </div>
          </div>

          {/* Interactive Custom Sandbox Text */}
          <div className="flex items-center gap-2 bg-surface-container-low border border-outline-variant/40 rounded-lg px-3 py-1.5 max-w-sm w-full md:w-auto">
            <Sliders className="w-3.5 h-3.5 text-outline shrink-0" />
            <input
              type="text"
              placeholder="Prueba tu propio texto de ejemplo..."
              className="bg-transparent border-none outline-none text-xs text-on-surface placeholder-outline/60 w-full"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
            />
            {customText && (
              <button
                onClick={() => setCustomText('')}
                className="text-[10px] text-outline hover:text-on-surface font-bold shrink-0"
              >
                Limpiar
              </button>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant">
                <th className="py-3 px-4 text-[10px] font-bold text-outline uppercase tracking-wider">Token</th>
                <th className="py-3 px-4 text-[10px] font-bold text-outline uppercase tracking-wider">Ejemplo</th>
                <th className="py-3 px-4 text-[10px] font-bold text-outline uppercase tracking-wider">Size / Weight</th>
              </tr>
            </thead>
            <tbody>
              {filteredTypo.length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-8 text-center text-xs text-outline">
                    No hay tokens que coincidan
                  </td>
                </tr>
              ) : (
                filteredTypo.map((token) => (
                  <tr
                    key={token.tokenName}
                    className="border-b border-outline-variant/30 hover:bg-surface-container-high/40 transition-colors"
                  >
                    <td className="py-5 px-4 font-mono text-xs text-primary font-medium">
                      {token.tokenName}
                    </td>
                    <td className="py-5 px-4">
                      <div className={`${token.className} transition-all`}>
                        {customText || token.exampleText}
                      </div>
                    </td>
                    <td className="py-5 px-4 text-xs text-on-surface-variant font-mono">
                      {token.sizeWeight}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
