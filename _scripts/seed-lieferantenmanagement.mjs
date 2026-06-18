const API = "https://core.orbitype.com/api/sql/v1"
const KEY = "kEkQgV/n0I/9lySA8dsI1Fcn1454cVMPtj3bDwDBWalr48IDbFWNrA=="

const sections = [
  {
    title: {
      de: "So funktioniert ganzheitlicher Einkauf",
      en: "How holistic procurement works",
    },
    subtitle: {
      de: "Risiken, komplexe Lieferketten und regulatorische Anforderungen erfordern mehr als isolierte Massnahmen. Sie sind Massnahmen eines Systems.",
      en: "Risks, complex supply chains and regulatory requirements need more than isolated measures. They are parts of a system.",
    },
    _orbi: { component: "SectionCenteredIntro" },
  },
  {
    title: {
      de: "5 Bausteine eines Systems",
      en: "5 building blocks of a system",
    },
    content: {
      de: "<p>Moderne Einkaufsorganisationen stehen vor der Herausforderung, steigende Risiken, komplexe Lieferketten und wachsende regulatorische Anforderungen gleichzeitig zu steuern. Einzelne Massnahmen wie Lieferantenbewertung oder Vertragsmanagement reichen dabei nicht aus. Erst das Zusammenspiel aller relevanten Disziplinen ermöglicht eine professionelle, transparente und strategische Steuerung der Lieferantenbasis.</p><p>Risikomanagement, Lieferantenmanagement, Vertragsmanagement und Warengruppenmanagement sind keine isolierten Themen, sondern eng miteinander verknüpfte Bausteine eines ganzheitlichen Einkaufsansatzes.</p><p>Lernen Sie im Folgenden den gesamten Prozess kennen und erfahren Sie, wie wir alle Bausteine in einer gemeinsamen Datenbasis vereinen.</p>",
      en: "<p>Modern procurement organisations face the challenge of managing rising risks, complex supply chains and growing regulatory requirements simultaneously. Individual measures such as supplier evaluation or contract management are not enough. Only the interplay of all relevant disciplines enables professional, transparent and strategic control of the supplier base.</p><p>Risk management, supplier management, contract management and commodity group management are not isolated topics, but closely linked building blocks of a holistic procurement approach.</p><p>Learn about the entire process below and discover how we unite all building blocks in a shared data foundation.</p>",
    },
    blocks: [
      {
        number: 1,
        title: { de: "Risikomanagement", en: "Risk management" },
        description: {
          de: "Lieferantenrisiken systematisch erkennen, bewerten und überwachen als Grundlage strategischer Einkaufsentscheidungen.",
          en: "Systematically identify, assess and monitor supplier risks as the basis for strategic procurement decisions.",
        },
        side: "left",
      },
      {
        number: 2,
        title: { de: "Lieferantenmanagement", en: "Supplier management" },
        description: {
          de: "Lieferantenbeziehungen strukturiert steuern, entwickeln und auf integrierten Informationen aufbauen.",
          en: "Structured control and development of supplier relationships based on integrated information.",
        },
        side: "right",
      },
      {
        number: 3,
        title: { de: "Lieferantenbewertung", en: "Supplier evaluation" },
        description: {
          de: "Lieferantenleistung und Risiken messen, vergleichen und kontinuierlich überwachen.",
          en: "Measure, compare and continuously monitor supplier performance and risks.",
        },
        side: "left",
      },
      {
        number: 4,
        title: { de: "Vertragsmanagement", en: "Contract management" },
        description: {
          de: "Verträge transparent nutzen, um Risiken zu kontrollieren und Lieferantenbeziehungen verbindlich zu steuern.",
          en: "Use contracts transparently to control risks and manage supplier relationships bindingly.",
        },
        side: "right",
      },
      {
        number: 5,
        title: {
          de: "Warengruppen-management",
          en: "Commodity group management",
        },
        description: {
          de: "Lieferanten, Bedarfe und Risiken pro Warengruppe strategisch analysieren und steuern.",
          en: "Strategically analyse and manage suppliers, requirements and risks per commodity group.",
        },
        side: "left",
      },
    ],
    _orbi: { component: "SectionSystemBlocks" },
  },
  {
    tagline: { de: "Fundament im Einkauf", en: "Foundation in procurement" },
    title: { de: "1 Risikomanagement", en: "1 Risk management" },
    content: {
      de: "<p>Risikomanagement bildet die Grundlage für alle weiteren Entscheidungen im Einkauf. Ohne ein klares Verständnis über Risiken entlang der Lieferkette lassen sich Lieferanten weder sinnvoll bewerten noch strategisch entwickeln.</p><p>Ein professionelles Risikomanagement sorgt dafür, diese Risiken strukturiert zu erfassen, zu bewerten und kontinuierlich zu überwachen. Die gewonnenen Erkenntnisse fliessen direkt in die Lieferantenbewertung, die Lieferantenstrategie und das Warengruppenmanagement ein.</p><p>Risiken entstehen unter anderem durch:</p>",
      en: "<p>Risk management forms the basis for all further decisions in procurement. Without a clear understanding of risks along the supply chain, suppliers cannot be meaningfully evaluated or strategically developed.</p><p>Professional risk management ensures that these risks are systematically recorded, assessed and continuously monitored.</p><p>Risks arise, among other things, from:</p>",
    },
    items: [
      {
        de: "Geografische und politische Abhängigkeiten",
        en: "Geographic and political dependencies",
      },
      {
        de: "Finanzielle Instabilität von Lieferanten",
        en: "Financial instability of suppliers",
      },
      {
        de: "Nichteinhaltung von regulatorischen Anforderungen wie ESG",
        en: "Non-compliance with regulatory requirements such as ESG",
      },
      {
        de: "Vertragliche Schwächen oder fehlende Absicherungen",
        en: "Contractual weaknesses or missing safeguards",
      },
      { de: "Technische Abhängigkeiten", en: "Technical dependencies" },
    ],
    image: "/lieferantenmanagement/feature-1.jpg",
    imagePosition: "right",
    _orbi: { component: "SectionFeatureSplit" },
  },
  {
    tagline: {
      de: "Übergeordnete Steuerungsebene",
      en: "Overarching control level",
    },
    title: { de: "2 Lieferantenmanagement", en: "2 Supplier management" },
    content: {
      de: "<p>Lieferantenmanagement ist der organisatorische Rahmen, in dem alle lieferantenbezogenen Aktivitäten zusammenlaufen. Es umfasst die Auswahl, Bewertung, Betreuung, Entwicklung und falls notwendig auch die Trennung von Lieferanten im Rahmen eines Phase-Out Prozesses.</p><p>Ohne diese Verzahnung kann das Lieferantenmanagement nicht seine volle Wirkung entfalten. Mit einer integrierten Sicht wird es jedoch zu einem strategischen Instrument, mit dem Unternehmen ihre Lieferanten gezielt steuern und entwickeln können.</p><p>Ein professionelles Lieferantenmanagement kann nur funktionieren, wenn es auf belastbaren Informationen basiert:</p>",
      en: "<p>Supplier management is the organisational framework in which all supplier-related activities come together.</p><p>Without this interlinking, supplier management cannot fully unfold its impact. With an integrated view, it becomes a strategic instrument.</p><p>Professional supplier management can only work when based on reliable information:</p>",
    },
    items: [
      {
        de: "Leistungsdaten aus der Lieferantenbewertung",
        en: "Performance data from supplier evaluation",
      },
      {
        de: "Risikodaten aus dem Risikomanagement",
        en: "Risk data from risk management",
      },
      {
        de: "Vertragsinformationen aus dem Vertragsmanagement",
        en: "Contract information from contract management",
      },
      {
        de: "Strategische Einordnung aus dem Warengruppenmanagement",
        en: "Strategic classification from commodity group management",
      },
    ],
    image: "/lieferantenmanagement/feature-2.jpg",
    imagePosition: "left",
    _orbi: { component: "SectionFeatureSplit" },
  },
  {
    tagline: {
      de: "Aktiver Steuerungsmechanismus",
      en: "Active control mechanism",
    },
    title: {
      de: "3 Lieferantenbewertung & Überwachung",
      en: "3 Supplier evaluation & monitoring",
    },
    content: {
      de: "<p>Die Lieferantenbewertung liefert objektive Entscheidungsgrundlagen innerhalb des Lieferantenmanagements. Sie macht Leistung, Qualität, Zuverlässigkeit und Nachhaltigkeit messbar und vergleichbar.</p><p>Die kontinuierliche Lieferantenüberwachung sorgt dafür, dass Veränderungen frühzeitig erkannt werden und der Einkauf handlungsfähig bleibt.</p><p>Ihre volle Wirkung entfaltet die Lieferantenbewertung jedoch erst im Zusammenspiel mit anderen Disziplinen:</p>",
      en: "<p>Supplier evaluation provides objective decision-making foundations within supplier management.</p><p>Continuous supplier monitoring ensures that changes are detected early and procurement remains capable of action.</p><p>Supplier evaluation only unfolds its full impact in interplay with other disciplines:</p>",
    },
    items: [
      {
        de: "Risikomanagement ergänzt Leistungskennzahlen um Risikoperspektiven",
        en: "Risk management complements performance KPIs with risk perspectives",
      },
      {
        de: "Vertragsmanagement stellt sicher, dass bewertete Leistungen auch vertraglich abgesichert sind",
        en: "Contract management ensures evaluated performance is contractually secured",
      },
      {
        de: "Warengruppenmanagement ordnet Lieferanten strategisch ein",
        en: "Commodity group management strategically classifies suppliers",
      },
    ],
    image: "/lieferantenmanagement/feature-3.jpg",
    imagePosition: "right",
    _orbi: { component: "SectionFeatureSplit" },
  },
  {
    tagline: {
      de: "Zentrale Grundlage jeder Lieferantenbeziehung",
      en: "Central basis of every supplier relationship",
    },
    title: { de: "4 Vertragsmanagement", en: "4 Contract management" },
    content: {
      de: "<p>Verträge bilden die rechtliche und wirtschaftliche Basis jeder Lieferantenbeziehung. Ein professionelles Vertragsmanagement ist daher ein zentraler Bestandteil des Lieferantenmanagements.</p><p>Fehlende oder isolierte Vertragsinformationen führen häufig zu unnötigen Risiken, Kosten und Abhängigkeiten. Integriertes Vertragsmanagement stellt sicher, dass vertragliche Regelungen aktiv in die Lieferantensteuerung einfliessen und nicht nur archiviert werden.</p><p>Nur wenn Vertragsinhalte transparent verfügbar sind, kann der Einkauf:</p>",
      en: "<p>Contracts form the legal and economic basis of every supplier relationship.</p><p>Missing or isolated contract information often leads to unnecessary risks, costs and dependencies.</p><p>Only when contract contents are transparently available can procurement:</p>",
    },
    items: [
      { de: "Risiken realistisch bewerten", en: "Assess risks realistically" },
      {
        de: "Lieferanten fair und einheitlich steuern",
        en: "Manage suppliers fairly and consistently",
      },
      {
        de: "Vereinbarte Leistungen überwachen",
        en: "Monitor agreed performance",
      },
      {
        de: "Fristen, Konditionen und Pflichten zuverlässig einhalten",
        en: "Reliably meet deadlines, terms and obligations",
      },
    ],
    image: "/lieferantenmanagement/feature-4.jpg",
    imagePosition: "left",
    _orbi: { component: "SectionFeatureSplit" },
  },
  {
    tagline: { de: "Strategischer Ordnungsrahmen", en: "Strategic framework" },
    title: {
      de: "5 Warengruppen-management",
      en: "5 Commodity group management",
    },
    content: {
      de: "<p>Warengruppenmanagement schafft Struktur im Einkauf, indem Bedarfe, Lieferanten und Risiken systematisch zusammengeführt werden. Es ermöglicht eine strategische Betrachtung über einzelne Lieferanten hinaus. Damit verbindet Warengruppenmanagement operative Einkaufsprozesse mit strategischer Steuerung.</p><p>Im Zusammenspiel mit den anderen Disziplinen:</p>",
      en: "<p>Commodity group management creates structure in procurement by systematically bringing together requirements, suppliers and risks.</p><p>In interplay with other disciplines:</p>",
    },
    items: [
      {
        de: "Identifiziert es Abhängigkeiten und Bündelungspotenziale",
        en: "It identifies dependencies and bundling potential",
      },
      {
        de: "Priorisiert es Risiken pro Warengruppe",
        en: "It prioritises risks per commodity group",
      },
      {
        de: "Unterstützt es gezielte Verhandlungs- und Lieferantenstrategien",
        en: "It supports targeted negotiation and supplier strategies",
      },
      {
        de: "Bildet es die Grundlage für langfristige Einkaufsplanung",
        en: "It forms the basis for long-term procurement planning",
      },
    ],
    image: "/lieferantenmanagement/feature-5.jpg",
    imagePosition: "right",
    _orbi: { component: "SectionFeatureSplit" },
  },
  {
    quote: {
      de: "„Die grösste Schwäche vieler Einkaufsorganisationen ist nicht fehlendes Wissen, sondern fragmentierte Information.“",
      en: '"The greatest weakness of many procurement organisations is not a lack of knowledge, but fragmented information."',
    },
    _orbi: { component: "SectionQuoteBanner" },
  },
  {
    title: {
      de: "Die Lösung: eine zentrale integrierte Datenbasis",
      en: "The solution: a central integrated data foundation",
    },
    content: {
      de: "<p>Die grösste Schwäche vieler Einkaufsorganisationen ist nicht fehlendes Wissen, sondern fragmentierte Information. Ein integrierter Ansatz verändert das grundlegend. Alle relevanten Informationen werden zentral verwaltet. Eine einheitliche Datenbasis schafft Klarheit. Kriterien, Bewertungen und Anforderungen bleiben flexibel anpassbar. Lieferanten können über alle Dimensionen hinweg gesteuert werden.</p><p>So entwickelt sich der Einkauf vom reaktiven Problemlöser zum strategischen Gestalter stabiler, resilienter Lieferketten. Und genau das entscheidet heute über Wettbewerbsfähigkeit und Zukunftsfähigkeit.</p>",
      en: "<p>The greatest weakness of many procurement organisations is not a lack of knowledge, but fragmented information. An integrated approach fundamentally changes this.</p><p>This is how procurement evolves from reactive problem-solving to strategic shaping of stable, resilient supply chains.</p>",
    },
    cards: [
      {
        title: {
          de: "Daten sind vorhanden, aber verteilt",
          en: "Data exists but is distributed",
        },
        variant: "green",
      },
      {
        title: {
          de: "Systeme sprechen nicht miteinander",
          en: "Systems do not communicate",
        },
        variant: "orange",
      },
      {
        title: {
          de: "Excel Dateien ersetzen Transparenz",
          en: "Excel files replace transparency",
        },
        variant: "green",
      },
    ],
    _orbi: { component: "SectionSolutionCards" },
  },
  {
    title: {
      de: "Mit ZAMENTA haben Sie alles auf einen Blick",
      en: "With ZAMENTA you have everything at a glance",
    },
    content: {
      de: "Zamenta bietet Ihnen nicht nur eine einheitliche Datenbasis für all Ihre Prozesse und Dokumente des Lieferantenmanagements sondern analysiert kontinuierlich alle Risikofaktoren. So wissen Sie jederzeit wie es um Ihre Prozesse steht und können reagieren.",
      en: "Zamenta offers not only a unified data foundation for all your supplier management processes and documents, but also continuously analyses all risk factors.",
    },
    ctaLabel: {
      de: "Zum kostenlosen Beratungsgespräch",
      en: "Free consultation",
    },
    ctaUrl: "mailto:info@z-management.ch",
    backgroundImage: "/lieferantenmanagement/zamenta-cta-bg.jpg",
    logoImage: "/lieferantenmanagement/zamenta-logo-white.png",
    _orbi: { component: "SectionZamentaCta" },
  },
]

const body = {
  sql: "INSERT INTO pages (title, slug, sections, keywords, head) VALUES (:title::json, :slug, :sections::json, :keywords::json, :head::json)",
  bindings: {
    title: JSON.stringify({
      de: "Ganzheitliches Lieferantenmanagement im Einkauf",
      en: "Holistic supplier management in procurement",
    }),
    slug: "ganzheitliches-lieferantenmanagement",
    sections: JSON.stringify(sections),
    keywords: JSON.stringify([
      "lieferantenmanagement",
      "einkauf",
      "risikomanagement",
    ]),
    head: JSON.stringify({ title: "Ganzheitliches Lieferantenmanagement" }),
  },
}

const res = await fetch(API, {
  method: "POST",
  headers: { "X-API-KEY": KEY, "Content-Type": "application/json" },
  body: JSON.stringify(body),
})
console.log(await res.text())
