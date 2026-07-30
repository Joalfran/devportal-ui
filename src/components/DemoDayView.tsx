import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  MonitorPlay,
  Layers,
  Puzzle,
  LayoutTemplate,
  Scaling,
  AlertTriangle,
  CheckCircle2,
  EyeOff,
  Info,
  Bot,
  ShieldCheck,
  Lightbulb,
  GraduationCap
} from 'lucide-react';

const LIVE_URL = 'https://devportal-ui.vercel.app/';

/* ---------- Piezas reutilizables de la presentación ---------- */

function TimeBadge({ range }: { range: string }) {
  return (
    <span className="inline-block bg-secondary-container/20 text-secondary border border-secondary-container/40 px-3 py-1 rounded-full text-lg font-mono font-bold">
      {range}
    </span>
  );
}

function SlideHeading({
  eyebrow,
  title,
  time
}: {
  eyebrow: string;
  title: string;
  time?: string;
}) {
  return (
    <header className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <p className="text-lg font-mono font-bold uppercase tracking-widest text-primary">
          {eyebrow}
        </p>
        {time && <TimeBadge range={time} />}
      </div>
      <h2 className="text-3xl md:text-5xl font-bold text-on-background leading-tight">
        {title}
      </h2>
    </header>
  );
}

function Bullet({
  children,
  icon: Icon = CheckCircle2,
  tone = 'default'
}: {
  children: React.ReactNode;
  icon?: React.ElementType;
  tone?: 'default' | 'warn' | 'ok';
}) {
  const iconColor =
    tone === 'warn' ? 'text-error' : tone === 'ok' ? 'text-secondary' : 'text-primary';
  return (
    <li className="flex items-start gap-3 text-lg md:text-2xl text-on-surface-variant leading-relaxed">
      <Icon aria-hidden="true" className={`w-6 h-6 mt-1 shrink-0 ${iconColor}`} />
      <span>{children}</span>
    </li>
  );
}

function LiveDemoButton({ large = false }: { large?: boolean }) {
  return (
    <a
      href={LIVE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-3 rounded-xl bg-primary text-on-primary font-bold
        motion-safe:transition-colors hover:bg-primary/90
        focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-secondary
        ${large ? 'px-8 py-5 text-2xl md:text-3xl' : 'px-6 py-3 text-lg md:text-xl'}`}
    >
      <MonitorPlay aria-hidden="true" className={large ? 'w-8 h-8' : 'w-5 h-5'} />
      {large ? 'Abre la demo viva' : 'Ver demo en vivo'}
      <ExternalLink aria-hidden="true" className={large ? 'w-6 h-6' : 'w-4 h-4'} />
      <span className="sr-only">(se abre en una pestaña nueva)</span>
    </a>
  );
}

/* ---------- Diapositivas ---------- */

function SlideCover() {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-8 h-full">
      <p className="text-lg font-mono font-bold uppercase tracking-widest text-secondary">
        Demo Day
      </p>
      <h1 className="text-4xl md:text-7xl font-bold text-on-background leading-tight max-w-4xl">
        Dev Porta UI
      </h1>
      <p className="text-2xl md:text-4xl text-on-surface-variant max-w-3xl leading-snug">
        Librería de patrones vivos en el navegador
      </p>
      <p className="text-xl md:text-2xl text-on-surface-variant">
        Para desarrolladores Front End
      </p>
      <div className="flex flex-col items-center gap-4">
        <LiveDemoButton />
        <a
          href={LIVE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg md:text-xl font-mono text-primary underline underline-offset-4
            focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary rounded"
        >
          https://devportal-ui.vercel.app/
          <span className="sr-only">(se abre en una pestaña nueva)</span>
        </a>
      </div>
    </div>
  );
}

function SlideProblem() {
  return (
    <div className="space-y-8">
      <SlideHeading eyebrow="Problema" title="La fricción entre diseño y código" time="0:00–0:30" />
      <ul className="space-y-4">
        <Bullet icon={AlertTriangle} tone="warn">
          Especificaciones de diseño llegan como imágenes estáticas
        </Bullet>
        <Bullet icon={AlertTriangle} tone="warn">
          Desarrolladores pierden información al trasladar a código
        </Bullet>
        <Bullet icon={AlertTriangle} tone="warn">
          Sin visibilidad de comportamiento responsive
        </Bullet>
        <Bullet icon={AlertTriangle} tone="warn">
          Cada equipo construye componentes de forma distinta
        </Bullet>
      </ul>
      <p className="text-xl md:text-3xl font-semibold text-error border-l-4 border-error pl-4">
        Resultado: fricción, retrabajo, inconsistencia
      </p>
    </div>
  );
}

function SlideDemo() {
  const screens = [
    {
      icon: Layers,
      name: 'Fundamentos',
      desc: 'elementos primitivos y partículas que estructuran átomos'
    },
    {
      icon: Puzzle,
      name: 'Componentes',
      desc: 'átomos basados en composiciones de primitivos'
    },
    {
      icon: LayoutTemplate,
      name: 'Templates',
      desc: 'secciones completas de pantalla usando componentes'
    },
    {
      icon: Scaling,
      name: 'Sandbox',
      desc: 'interactúa con templates, arrastra bordes, ve comportamiento en mobile (<768px), tablet (768–1023px) y desktop (≥1024px)'
    }
  ];
  return (
    <div className="space-y-8">
      <SlideHeading eyebrow="Demo en vivo" title="Pantallas reales del producto" time="0:30–2:30" />
      <div>
        <LiveDemoButton large />
      </div>
      <ul className="grid gap-4 md:grid-cols-2">
        {screens.map(({ icon: Icon, name, desc }) => (
          <li
            key={name}
            className="bg-surface-container border border-outline-variant/50 rounded-xl p-5 space-y-2"
          >
            <h3 className="flex items-center gap-3 text-xl md:text-2xl font-bold text-on-surface">
              <Icon aria-hidden="true" className="w-6 h-6 text-primary shrink-0" />
              {name}
            </h3>
            <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed">{desc}</p>
          </li>
        ))}
      </ul>
      <div className="space-y-3">
        <p className="flex items-start gap-3 text-lg md:text-xl text-on-surface-variant">
          <Info aria-hidden="true" className="w-6 h-6 mt-0.5 shrink-0 text-secondary" />
          <span>
            <strong className="text-on-surface">Nota importante:</strong> en el sandbox se
            demuestran comportamientos responsivos; no se mostrará código de clases responsivas.
          </span>
        </p>
        <p className="flex items-start gap-3 text-lg md:text-xl text-on-surface-variant">
          <EyeOff aria-hidden="true" className="w-6 h-6 mt-0.5 shrink-0 text-secondary" />
          <span>
            <strong className="text-on-surface">Fuera de cámara (no se muestra):</strong> niveles
            de accesibilidad WCAG de los componentes.
          </span>
        </p>
      </div>
    </div>
  );
}

function SlideDecisions() {
  return (
    <div className="space-y-8">
      <SlideHeading eyebrow="Decisiones" title="Qué delegué y qué retuve" time="2:30–4:30" />
      <ul className="space-y-5">
        <Bullet icon={Bot}>
          <strong className="text-on-surface">Delegó:</strong> framework, implementación en
          desarrollo, pruebas automatizadas en navegador
        </Bullet>
        <Bullet icon={Bot}>
          <strong className="text-on-surface">Modo:</strong> agencia (plan antes de ejecutar,
          validación de alineación antes de correr)
        </Bullet>
        <Bullet icon={ShieldCheck} tone="ok">
          <strong className="text-on-surface">Retuvo:</strong> verificación final de experiencia
          porque agentes pueden errar; interacción humana no se automatiza
        </Bullet>
        <Bullet icon={CheckCircle2} tone="ok">
          <strong className="text-on-surface">Tarea clave:</strong> pruebas automatizadas de
          accesibilidad + checklist manual
        </Bullet>
      </ul>
    </div>
  );
}

function SlideVerification() {
  return (
    <div className="space-y-8">
      <SlideHeading
        eyebrow="Verificación y transparencia"
        title="Cómo se validó el resultado"
        time="2:30–4:30"
      />
      <ul className="space-y-5">
        <Bullet icon={Bot}>
          <strong className="text-on-surface">Herramientas:</strong> Claude Sonnet, Cursor, Vercel
          (modo agencia)
        </Bullet>
        <Bullet icon={ShieldCheck} tone="ok">
          <strong className="text-on-surface">Datos verificados:</strong> sin datos sensibles; se
          usaron datos mock
        </Bullet>
        <Bullet icon={AlertTriangle} tone="warn">
          <strong className="text-on-surface">Hallazgo crítico:</strong> email de cuenta Google
          expuesto como ejemplo; se corrigió con plan en rama dedicada
        </Bullet>
        <Bullet icon={CheckCircle2} tone="ok">
          <strong className="text-on-surface">Verificación:</strong> navegación intuitiva,
          interacción fluida, layout ordenado con ventana redimensionable
        </Bullet>
        <Bullet icon={Lightbulb}>
          <strong className="text-on-surface">Aprendizaje durante el proceso:</strong> sin marco
          claro con reglas específicas, el agente tiende a desviarse
        </Bullet>
      </ul>
    </div>
  );
}

function SlideClosing() {
  return (
    <div className="space-y-8">
      <SlideHeading eyebrow="Cierre" title="Lo difícil, lo aprendido" time="4:30–5:00" />
      <ul className="space-y-5">
        <Bullet icon={Lightbulb}>
          <strong className="text-on-surface">Pensaba que sería difícil:</strong> pipeline sin
          perfil fullstack
        </Bullet>
        <Bullet icon={AlertTriangle} tone="warn">
          <strong className="text-on-surface">Realmente fue difícil:</strong> coordinar flujo
          completo con roles multiagentes específicos
        </Bullet>
        <Bullet icon={GraduationCap}>
          <strong className="text-on-surface">Si reiniciara:</strong> prepararía roles con puntajes
          de calidad que deben pasar antes de avanzar a siguiente fase
        </Bullet>
      </ul>
      <p className="text-xl md:text-2xl text-on-surface leading-relaxed bg-surface-container border-l-4 border-secondary rounded-r-xl p-5">
        <strong className="text-secondary">Aprendizaje #1:</strong> Sin un marco que defina rieles
        con contexto claro y específico, el agente se desviará; reglas claras y registro de
        iteraciones son vitales para que la orquestación madure.
      </p>
    </div>
  );
}

const SLIDES: { id: string; label: string; render: () => React.ReactNode }[] = [
  { id: 'portada', label: 'Portada', render: () => <SlideCover /> },
  { id: 'problema', label: 'Problema', render: () => <SlideProblem /> },
  { id: 'demo', label: 'Demo en vivo', render: () => <SlideDemo /> },
  { id: 'decisiones', label: 'Decisiones', render: () => <SlideDecisions /> },
  { id: 'verificacion', label: 'Verificación y transparencia', render: () => <SlideVerification /> },
  { id: 'cierre', label: 'Cierre', render: () => <SlideClosing /> }
];

/* ---------- Vista principal de la presentación ---------- */

export default function DemoDayView() {
  const [current, setCurrent] = React.useState(0);
  const total = SLIDES.length;

  const goPrev = React.useCallback(() => setCurrent((c) => Math.max(c - 1, 0)), []);
  const goNext = React.useCallback(() => setCurrent((c) => Math.min(c + 1, total - 1)), [total]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goPrev, goNext]);

  React.useEffect(() => {
    document.title = `Demo Day — Dev Porta UI (${current + 1}/${total})`;
  }, [current, total]);

  const slide = SLIDES[current];

  return (
    <div className="h-dvh bg-background text-on-background font-sans flex flex-col selection:bg-primary-container selection:text-on-primary-container">
      {current !== 0 && <h1 className="sr-only">Dev Porta UI — Demo Day</h1>}

      {/* Barra superior: identidad + progreso */}
      <div className="flex items-center justify-between gap-4 px-5 md:px-10 py-4 border-b border-outline-variant/40">
        <p className="text-lg font-mono font-bold text-on-surface-variant truncate">
          Dev Porta UI <span className="text-outline-variant" aria-hidden="true">/</span> Demo Day
        </p>
        <p className="text-lg font-mono font-bold text-secondary whitespace-nowrap" aria-hidden="true">
          {current + 1} / {total}
        </p>
      </div>

      {/* Diapositiva activa */}
      <main className="flex-1 min-h-0 overflow-y-auto flex flex-col">
        <section
          key={slide.id}
          role="group"
          aria-roledescription="diapositiva"
          aria-label={`Diapositiva ${current + 1} de ${total}: ${slide.label}`}
          className="flex-1 w-full max-w-5xl mx-auto px-5 md:px-10 py-8 md:py-12 flex flex-col justify-center
            motion-safe:animate-[demo-day-fade_300ms_ease-out]"
        >
          {slide.render()}
        </section>
      </main>

      {/* Controles de navegación */}
      <nav
        aria-label="Navegación de diapositivas"
        className="flex items-center justify-between gap-4 px-5 md:px-10 py-4 border-t border-outline-variant/40"
      >
        <button
          type="button"
          onClick={goPrev}
          disabled={current === 0}
          className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-surface-container-high text-on-surface
            text-lg font-semibold motion-safe:transition-colors hover:bg-surface-container-highest
            disabled:opacity-40 disabled:cursor-not-allowed
            focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-secondary"
        >
          <ChevronLeft aria-hidden="true" className="w-6 h-6" />
          <span className="hidden sm:inline">Anterior</span>
          <span className="sr-only sm:hidden">Diapositiva anterior</span>
        </button>

        <div className="flex flex-col items-center gap-2 min-w-0">
          <p className="text-lg font-semibold text-on-surface-variant text-center" aria-live="polite">
            Diapositiva {current + 1} de {total}
          </p>
          <ul className="flex items-center gap-2" aria-label="Ir a diapositiva">
            {SLIDES.map((s, i) => (
              <li key={s.id} className="flex">
                <button
                  type="button"
                  onClick={() => setCurrent(i)}
                  aria-label={`Ir a la diapositiva ${i + 1}: ${s.label}`}
                  aria-current={i === current ? 'true' : undefined}
                  className={`w-4 h-4 rounded-full border-2 motion-safe:transition-colors
                    focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-secondary
                    ${i === current ? 'bg-primary border-primary' : 'bg-transparent border-outline hover:border-primary'}`}
                />
              </li>
            ))}
          </ul>
          <p className="text-base text-on-surface-variant hidden md:block">
            Usa las flechas <kbd className="font-mono border border-outline-variant rounded px-1.5">←</kbd>{' '}
            <kbd className="font-mono border border-outline-variant rounded px-1.5">→</kbd> del teclado
          </p>
        </div>

        <button
          type="button"
          onClick={goNext}
          disabled={current === total - 1}
          className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-surface-container-high text-on-surface
            text-lg font-semibold motion-safe:transition-colors hover:bg-surface-container-highest
            disabled:opacity-40 disabled:cursor-not-allowed
            focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-secondary"
        >
          <span className="hidden sm:inline">Siguiente</span>
          <span className="sr-only sm:hidden">Diapositiva siguiente</span>
          <ChevronRight aria-hidden="true" className="w-6 h-6" />
        </button>
      </nav>
    </div>
  );
}
