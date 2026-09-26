import { useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronDown,
  Copy,
  Download,
  FileText,
  FolderOpen,
  Highlighter,
  Layers3,
  Menu,
  Music2,
  PanelTop,
  Search,
  ShieldCheck,
  Sparkles,
  Terminal,
  X,
} from "lucide-react";

const extensionZipPath = "/manus-storage/Resmatenia-fixed_51e8534d.zip";

const features = [
  {
    number: "01",
    icon: Search,
    title: "Research in one deliberate place",
    text: "Search a subject, surface useful directions, and keep the thread while you browse.",
  },
  {
    number: "02",
    icon: BookOpen,
    title: "Turn scattered tabs into a library",
    text: "Save important points, research, books, and PDFs without losing the source behind them.",
  },
  {
    number: "03",
    icon: Music2,
    title: "Put the right soundtrack behind the work",
    text: "Connect Spotify, search for a track, and keep your focus ritual close to the research.",
  },
];

const assistantTools = [
  {
    icon: Highlighter,
    label: "01 / See the signal",
    title: "Automatically highlight what matters",
    text: "Resmatenia reads the page with you and brings the key claims, facts, and useful passages forward so important ideas do not disappear in the scroll.",
  },
  {
    icon: BookOpen,
    label: "02 / Compress the long read",
    title: "Summarize books and PDFs",
    text: "Turn dense chapters and long documents into clear, usable summaries before deciding what deserves a deeper read.",
  },
  {
    icon: Sparkles,
    label: "03 / Find your voice",
    title: "Humanize rough writing",
    text: "Make notes, drafts, and AI-assisted text sound more natural, thoughtful, and like something you would actually say.",
  },
  {
    icon: Copy,
    label: "04 / Keep the thread",
    title: "Copy straight into your research",
    text: "Move the useful insight, summary, or highlighted passage into your saved research with a clean copy you can build on.",
  },
];

const steps = [
  ["Install the extension", "Download the ZIP and run the PowerShell helper below."],
  ["Load it in Chrome", "Turn on Developer mode, then choose Load unpacked."],
  ["Start a thread", "Open Resmatenia from your toolbar and begin with a question."],
];

function getSiteOrigin() {
  return typeof window === "undefined" ? "https://YOUR-SITE-DOMAIN" : window.location.origin;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const downloadUrl = useMemo(() => `${getSiteOrigin()}${extensionZipPath}`, []);
  const installScript = useMemo(
    () => `# Resmatenia — Chrome extension installer\n$ErrorActionPreference = "Stop"\n\n$ZipUrl = "${downloadUrl}"\n$ZipPath = Join-Path $env:TEMP "resmatenia.zip"\n$InstallParent = Join-Path $HOME "Resmatenia-install"\n\nInvoke-WebRequest -Uri $ZipUrl -OutFile $ZipPath\nif (Test-Path $InstallParent) { Remove-Item $InstallParent -Recurse -Force }\nExpand-Archive -Path $ZipPath -DestinationPath $InstallParent -Force\n\n$ExtensionPath = Join-Path $InstallParent "Resmatenia"\nStart-Process "chrome.exe" "chrome://extensions"\nWrite-Host "Resmatenia is ready at: $ExtensionPath"\nWrite-Host "In Chrome: enable Developer mode, choose Load unpacked, then select that folder."`,
    [downloadUrl],
  );

  async function copyScript() {
    await navigator.clipboard.writeText(installScript);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Resmatenia home" onClick={closeMenu}>
          <span className="brand-mark">R</span>
          <span className="brand-name">Resmatenia</span>
        </a>
        <button
          className="mobile-menu-button"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <nav className={menuOpen ? "site-nav is-open" : "site-nav"} aria-label="Primary navigation">
          <a href="#features" onClick={closeMenu}>Features</a>
          <a href="#assistant" onClick={closeMenu}>Research helper</a>
          <a href="#install" onClick={closeMenu}>Install</a>
          <a href="#about" onClick={closeMenu}>Why Resmatenia</a>
          <a className="nav-cta" href="#install" onClick={closeMenu}>Get the extension <ArrowUpRight size={15} /></a>
        </nav>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-dot" /> The best research helper for curious work</p>
            <h1>Keep the thread.<br /><em>Find the signal.</em></h1>
            <p className="hero-lede">Resmatenia is the research helper for your browser — automatically highlighting important ideas, summarizing books and PDFs, humanizing your writing, and keeping every useful insight close at hand.</p>
            <div className="hero-actions">
              <a className="button button-dark" href="#install">Install Resmatenia <ArrowDown size={17} /></a>
              <a className="text-link" href="#features">See how it works <ArrowUpRight size={16} /></a>
            </div>
            <div className="hero-proof"><ShieldCheck size={16} /> Local-first workflow · Built for Chrome · Free to try</div>
          </div>

          <div className="hero-art" aria-label="A preview of the Resmatenia research workspace">
            <div className="art-glow" />
            <div className="hero-photo-frame"><img src="/manus-storage/resmatenia-hero_15733264.jpg" alt="Paper notes and a research workspace" /></div>
            <div className="art-paper paper-back" />
            <div className="art-paper paper-front">
              <div className="paper-topline"><span>RESMATENIA</span><span>RESEARCH / 01</span></div>
              <div className="paper-rule" />
              <div className="paper-title">What are you<br />researching?</div>
              <div className="paper-search"><Search size={14} /><span>Search a topic...</span><b>Search</b></div>
              <div className="paper-label">CURRENT THREAD</div>
              <div className="paper-thread">The architecture of attention <ArrowUpRight size={15} /></div>
              <div className="paper-cards">
                <div><span className="mini-kicker">RESEARCH</span><strong>Find the useful edge.</strong><small>OpenAlex · 12 sources</small></div>
                <div><span className="mini-kicker">BOOKS & PDFS</span><strong>Keep the good references.</strong><small>3 saved directions</small></div>
              </div>
              <div className="paper-footer"><span>01 — 04</span><span className="footer-dots"><i /><i /><i /></span></div>
            </div>
            <div className="art-note note-one"><Sparkles size={14} /> keep exploring</div>
            <div className="art-note note-two"><Music2 size={14} /> focus mix / ready</div>
          </div>
        </section>

        <section className="signal-strip" aria-label="Product principles">
          <span>One place for the open loops</span><i />
          <span>Made for curious work</span><i />
          <span>Less tab drift, more through-line</span>
        </section>

        <section className="section features-section" id="features">
          <div className="section-heading split-heading">
            <div><p className="eyebrow">01 / The premise</p><h2>Your research deserves<br /><em>a home base.</em></h2></div>
            <p>Resmatenia turns the browser from a pile of open loops into a calm, searchable workspace for the ideas you want to return to.</p>
          </div>
          <div className="feature-grid">
            {features.map(({ number, icon: Icon, title, text }) => (
              <article className="feature-card" key={number}>
                <div className="feature-top"><span>{number}</span><Icon size={21} strokeWidth={1.6} /></div>
                <h3>{title}</h3><p>{text}</p><a href="#install" aria-label={`Learn more about ${title}`}>Explore <ArrowUpRight size={15} /></a>
              </article>
            ))}
          </div>
        </section>

        <section className="section assistant-section" id="assistant">
          <div className="assistant-heading">
            <p className="eyebrow">01 / Your research helper</p>
            <h2>Less hunting.<br /><em>More understanding.</em></h2>
            <p>Resmatenia does the first pass with you, so you can spend more time making connections and less time moving information around.</p>
          </div>
          <div className="assistant-grid">
            {assistantTools.map(({ icon: Icon, label, title, text }) => (
              <article className="assistant-card" key={title}>
                <div className="assistant-icon"><Icon size={20} strokeWidth={1.7} /></div>
                <p className="assistant-label">{label}</p>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section about-section" id="about">
          <div className="about-visual"><div className="about-orbit orbit-one" /><div className="about-orbit orbit-two" /><div className="about-core"><Layers3 size={27} /><span>THREAD</span><strong>01</strong></div><span className="orbit-label label-top">question</span><span className="orbit-label label-right">source</span><span className="orbit-label label-bottom">direction</span></div>
          <div className="about-copy"><p className="eyebrow">02 / The feeling</p><h2>Research should feel<br /><em>expansive, not endless.</em></h2><p>Good tools disappear into the rhythm of the work. Resmatenia gives each thread a place to land — so the best part of browsing is not finding one more tab, but seeing how the pieces start to connect.</p><div className="quote"><span>“</span><p>A quieter way to do more meaningful research.</p></div></div>
        </section>

        <section className="section install-section" id="install">
          <div className="install-intro"><p className="eyebrow">03 / Get started</p><h2>Make room<br /><em>for the next idea.</em></h2><p>Resmatenia is ready as an unpacked Chrome extension. Download it, run the helper, and you’re one small setup away from a better research ritual.</p><a className="button button-dark" href={extensionZipPath} download>Download ZIP <Download size={16} /></a><p className="install-note"><Check size={15} /> No account required to begin</p></div>
          <div className="install-panel">
            <div className="panel-heading"><div><span className="terminal-dot" /> <span className="terminal-dot" /> <span className="terminal-dot" /></div><span>PowerShell / install.ps1</span><button type="button" className="copy-button" onClick={copyScript}>{copied ? <Check size={15} /> : <Copy size={15} />} {copied ? "Copied" : "Copy code"}</button></div>
            <pre><code>{installScript}</code></pre>
            <div className="install-footnote"><Terminal size={15} /><span>The script downloads and unpacks the extension, then opens Chrome’s extensions page. Chrome still asks you to click <strong>Load unpacked</strong> — that’s intentional.</span></div>
          </div>
        </section>

        <section className="section how-section" id="how-it-works">
          <div className="section-heading"><p className="eyebrow">04 / The short version</p><h2>From question<br /><em>to through-line.</em></h2></div>
          <div className="steps-grid">{steps.map(([title, text], index) => <div className="step" key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></div>)}</div>
        </section>

        <section className="faq-section">
          <div><p className="eyebrow">Questions, answered</p><h2>Keep it simple.</h2></div>
          <div className="faq-list">
            {[
              ["What is Resmatenia?", "A Chrome side panel that helps you research, save, and revisit the useful parts of browsing without scattering your thinking across dozens of tabs."],
              ["Does the PowerShell script install it automatically?", "It downloads and unpacks the extension, then opens Chrome’s extension manager. Chrome requires the final Load unpacked click for security, so you stay in control."],
              ["Can I use Spotify with it?", "Yes. The extension includes a Spotify workspace with OAuth/PKCE connection, search, and links that open in Spotify."],
            ].map(([question, answer], index) => <div className="faq-item" key={question}><button type="button" onClick={() => setExpandedFaq(expandedFaq === index ? null : index)} aria-expanded={expandedFaq === index}><span>{question}</span><ChevronDown size={18} className={expandedFaq === index ? "faq-chevron is-open" : "faq-chevron"} /></button>{expandedFaq === index && <p>{answer}</p>}</div>)}
          </div>
        </section>
      </main>

      <footer className="site-footer"><div className="footer-brand"><span className="brand-mark">R</span><span><strong>Resmatenia</strong><small>Research without losing the thread.</small></span></div><div className="footer-links"><a href="#features">Features</a><a href="#install">Install</a><a href="#about">About</a><a href="#top">Back to top ↑</a></div><p>© 2026 Resmatenia. Made for curious work.</p></footer>
    </div>
  );
}
