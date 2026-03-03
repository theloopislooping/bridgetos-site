import { useState, useMemo, Fragment } from "react";

const DRIFT_DATA = [
  {
    id: 1,
    type: "Goal / Intent Drift",
    icon: "🎯",
    definition: "Progressive deviation of the agent's effective objective from its specified goal during deployment.",
    references: "Arike et al., 2025 (Goal Drift); Langosco et al., 2022 (Goal Misgeneralization)",
    example: "Support agent shifts from \"solve issue\" to \"minimize chat time\" and closes tickets prematurely.",
    metrics: ["Goal Adherence Score (GAS)", "Plan Divergence", "Proxy–True Objective Correlation"],
    horizon: "Session → Longitudinal",
    category: "behavioral",
  },
  {
    id: 2,
    type: "Instruction Adherence Decay",
    icon: "📜",
    definition: "Decline in instruction-following fidelity as instruction density or context length increases.",
    references: "Jaroslawicz et al., 2025 (IFScale)",
    example: "Agent drops 2 of 20 constraints when instructions become complex.",
    metrics: ["Instruction Following Rate", "Constraint Satisfaction Ratio"],
    horizon: "Short-term → Session",
    category: "behavioral",
  },
  {
    id: 3,
    type: "Specification Gaming",
    icon: "🧩",
    definition: "Optimization of proxy objectives that technically satisfy the metric while violating intent.",
    references: "Denison et al., 2024; Skalse et al., 2022",
    example: "Agent inflates \"tickets resolved\" by misclassifying hard cases as duplicates.",
    metrics: ["Reward Hacking Frequency", "Proxy–True Divergence"],
    horizon: "Session → Longitudinal",
    category: "alignment",
  },
  {
    id: 4,
    type: "Safety / Guardrail Erosion",
    icon: "🛑",
    definition: "Degradation in refusal behavior or compliance with safety constraints over time or after modification.",
    references: "Betley et al., 2025; ASB Benchmark",
    example: "Agent previously refused jailbreak prompts, now partially complies.",
    metrics: ["Refusal Rate Shift (ΔR)", "Harmful Compliance Rate", "ASR Trend"],
    horizon: "Short-term → Longitudinal",
    category: "safety",
  },
  {
    id: 5,
    type: "Tool-Use Drift",
    icon: "🔧",
    definition: "Changes in tool selection patterns, sequencing, or parameter usage relative to baseline.",
    references: "Microsoft Agent Failure Taxonomy; ASB",
    example: "Research agent begins calling code execution tool unnecessarily.",
    metrics: ["Tool Call Entropy", "JSD Tool Divergence", "Sequence Edit Distance"],
    horizon: "Session",
    category: "operational",
  },
  {
    id: 6,
    type: "Memory / Context Contamination",
    icon: "🧠",
    definition: "Persistent corruption or poisoning of memory or retrieval context influencing future behavior.",
    references: "OWASP Agentic Top 10; ASB",
    example: "Injected memory causes agent to recommend a specific vendor repeatedly.",
    metrics: ["Memory Retrieval Error Rate", "Canary Integrity Score"],
    horizon: "Session → Longitudinal",
    category: "safety",
  },
  {
    id: 7,
    type: "Autonomy Boundary Drift",
    icon: "🚧",
    definition: "Expansion of operational authority or action scope beyond defined boundaries.",
    references: "OWASP ASI06; Microsoft Failure Modes",
    example: "Scheduling agent begins sending external emails without approval.",
    metrics: ["Boundary Violation Rate", "Human Override Bypass Rate"],
    horizon: "Session → Longitudinal",
    category: "operational",
  },
  {
    id: 8,
    type: "Coordination Drift",
    icon: "🤝",
    definition: "Breakdown in consensus or coherence among multi-agent systems over time.",
    references: "Rath, 2026",
    example: "Planner and compliance agents begin conflicting on action decisions.",
    metrics: ["Inter-Agent Agreement Rate", "Consensus Convergence Time"],
    horizon: "Session → Longitudinal",
    category: "operational",
  },
  {
    id: 9,
    type: "Calibration Drift",
    icon: "🎚️",
    definition: "Systematic change in expressed confidence or uncertainty across multi-turn interaction.",
    references: "Harshavardhan, 2026",
    example: "Agent becomes progressively more certain about an early incorrect assumption.",
    metrics: ["Confidence Drift Score (CDS)", "Expected Calibration Error"],
    horizon: "Session",
    category: "alignment",
  },
];

const CATEGORIES = {
  all:        { label: "All Types",    color: "#e0e0e0" },
  behavioral: { label: "Behavioral",   color: "#f59e0b" },
  alignment:  { label: "Alignment",    color: "#ef4444" },
  safety:     { label: "Safety",       color: "#ec4899" },
  operational:{ label: "Operational",  color: "#06b6d4" },
};

const HORIZONS = ["All", "Short-term", "Session", "Longitudinal"];

export default function DriftTaxonomy() {
  const [expandedRow, setExpandedRow]       = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm]         = useState("");
  const [horizonFilter, setHorizonFilter]   = useState("All");
  const [sortField, setSortField]           = useState(null);
  const [sortDir, setSortDir]               = useState("asc");

  const filtered = useMemo(() => {
    let rows = DRIFT_DATA.filter((d) => {
      if (activeCategory !== "all" && d.category !== activeCategory) return false;
      if (horizonFilter !== "All" && !d.horizon.includes(horizonFilter)) return false;
      if (searchTerm) {
        const q = searchTerm.toLowerCase();
        return (
          d.type.toLowerCase().includes(q) ||
          d.definition.toLowerCase().includes(q) ||
          d.example.toLowerCase().includes(q) ||
          d.metrics.some((m) => m.toLowerCase().includes(q))
        );
      }
      return true;
    });
    if (sortField) {
      rows = [...rows].sort((a, b) => {
        const va = a[sortField] || "";
        const vb = b[sortField] || "";
        const cmp = typeof va === "string" ? va.localeCompare(vb) : va - vb;
        return sortDir === "asc" ? cmp : -cmp;
      });
    }
    return rows;
  }, [activeCategory, searchTerm, horizonFilter, sortField, sortDir]);

  const toggleSort = (field) => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const sortIndicator = (field) => {
    if (sortField !== field) return " ↕";
    return sortDir === "asc" ? " ↑" : " ↓";
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <div style={styles.logoMark}>◈</div>
          <div>
            <h1 style={styles.title}>Agentic Drift Taxonomy</h1>
            <p style={styles.subtitle}>
              9-Type Core Classification · BridgetOS / Holborn Rowe
            </p>
          </div>
        </div>
        <div style={styles.badge}>{filtered.length} / {DRIFT_DATA.length}</div>
      </div>

      {/* Controls */}
      <div style={styles.controls}>
        <input
          type="text"
          placeholder="Search types, definitions, metrics..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
        <div style={styles.filterRow}>
          <div style={styles.filterGroup}>
            {Object.entries(CATEGORIES).map(([key, { label, color }]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                style={{
                  ...styles.filterBtn,
                  borderColor: activeCategory === key ? color : "#333",
                  color:       activeCategory === key ? color : "#888",
                  background:  activeCategory === key ? `${color}12` : "transparent",
                }}
              >
                {label}
              </button>
            ))}
          </div>
          <div style={styles.filterGroup}>
            {HORIZONS.map((h) => (
              <button
                key={h}
                onClick={() => setHorizonFilter(h)}
                style={{
                  ...styles.filterBtn,
                  borderColor: horizonFilter === h ? "#8b5cf6" : "#333",
                  color:       horizonFilter === h ? "#8b5cf6" : "#888",
                  background:  horizonFilter === h ? "#8b5cf612" : "transparent",
                }}
              >
                {h}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div style={styles.tableWrap}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={{ ...styles.th, width: 44 }}>#</th>
              <th
                style={{ ...styles.th, cursor: "pointer", width: "25%" }}
                onClick={() => toggleSort("type")}
              >
                Drift Type{sortIndicator("type")}
              </th>
              <th style={{ ...styles.th, width: "35%" }}>Definition</th>
              <th
                style={{ ...styles.th, cursor: "pointer", width: "20%" }}
                onClick={() => toggleSort("horizon")}
              >
                Horizon{sortIndicator("horizon")}
              </th>
              <th style={{ ...styles.th, width: "12%" }}>Category</th>
              <th style={{ ...styles.th, width: 44 }}></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((d) => {
              const isOpen    = expandedRow === d.id;
              const catColor  = CATEGORIES[d.category]?.color || "#888";
              return (
                <Fragment key={d.id}>
                  <tr
                    onClick={() => setExpandedRow(isOpen ? null : d.id)}
                    style={{
                      ...styles.tr,
                      background: isOpen ? "#111" : "transparent",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      if (!isOpen) e.currentTarget.style.background = "#0a0a0a";
                    }}
                    onMouseLeave={(e) => {
                      if (!isOpen) e.currentTarget.style.background = "transparent";
                    }}
                  >
                    <td style={{ ...styles.td, ...styles.mono, color: "#555" }}>
                      {String(d.id).padStart(2, "0")}
                    </td>
                    <td style={styles.td}>
                      <span style={{ marginRight: 8, fontSize: 16 }}>{d.icon}</span>
                      <span style={{ fontWeight: 600, color: "#e0e0e0" }}>{d.type}</span>
                    </td>
                    <td style={{ ...styles.td, color: "#999", fontSize: 13 }}>
                      {d.definition.length > 90 && !isOpen
                        ? d.definition.slice(0, 90) + "…"
                        : d.definition}
                    </td>
                    <td style={{ ...styles.td, ...styles.mono, fontSize: 12, color: "#777" }}>
                      {d.horizon}
                    </td>
                    <td style={styles.td}>
                      <span
                        style={{
                          ...styles.catPill,
                          color:       catColor,
                          borderColor: catColor,
                          background:  `${catColor}10`,
                        }}
                      >
                        {d.category}
                      </span>
                    </td>
                    <td style={{ ...styles.td, color: "#555", fontSize: 16 }}>
                      {isOpen ? "−" : "+"}
                    </td>
                  </tr>
                  {isOpen && (
                    <tr style={{ background: "#111" }}>
                      <td colSpan={6} style={{ padding: 0 }}>
                        <div style={styles.expandPanel}>
                          <div style={styles.expandGrid}>
                            <div>
                              <div style={styles.expandLabel}>Example Scenario</div>
                              <div style={styles.expandText}>{d.example}</div>
                            </div>
                            <div>
                              <div style={styles.expandLabel}>Key Metrics</div>
                              <div style={styles.metricsWrap}>
                                {d.metrics.map((m, i) => (
                                  <span key={i} style={styles.metricChip}>{m}</span>
                                ))}
                              </div>
                            </div>
                            <div style={{ gridColumn: "1 / -1" }}>
                              <div style={styles.expandLabel}>Primary References</div>
                              <div style={{ ...styles.expandText, ...styles.mono, fontSize: 12 }}>
                                {d.references}
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} style={{ ...styles.td, textAlign: "center", color: "#555", padding: 40 }}>
                  No drift types match current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Structural Notes */}
      <div style={styles.notes}>
        <div style={styles.notesTitle}>Structural Notes</div>
        <div style={styles.noteItem}>
          <span style={styles.noteMarker}>▸</span>
          <span><strong style={{ color: "#ccc" }}>Compromise ≠ Drift:</strong> Prompt injection and adversarial attacks are incidents, not organic drift.</span>
        </div>
        <div style={styles.noteItem}>
          <span style={styles.noteMarker}>▸</span>
          <span><strong style={{ color: "#ccc" }}>Model Updates ≠ Drift:</strong> Changes at update boundaries are interventions. Drift is longitudinal deviation between updates.</span>
        </div>
        <div style={styles.noteItem}>
          <span style={styles.noteMarker}>▸</span>
          <span><strong style={{ color: "#ccc" }}>Traditional ML Drift Excluded:</strong> Covariate shift and concept drift apply to model distributions, not agentic behavioral systems.</span>
        </div>
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <span>◈ BridgetOS · Holborn Rowe LLC</span>
        <span style={{ color: "#444" }}>Taxonomy v1.0 · 2026</span>
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "system-ui, -apple-system, sans-serif",
    background: "#050505",
    color: "#ccc",
    minHeight: "100vh",
    padding: "24px 20px",
    maxWidth: 1100,
    margin: "0 auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    borderBottom: "1px solid #1a1a1a",
    paddingBottom: 16,
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: 14,
  },
  logoMark: {
    fontSize: 28,
    color: "#8b5cf6",
    fontWeight: 700,
  },
  title: {
    fontSize: 22,
    fontWeight: 700,
    color: "#f0f0f0",
    margin: 0,
    letterSpacing: "-0.02em",
  },
  subtitle: {
    fontSize: 13,
    color: "#555",
    margin: "2px 0 0",
    fontFamily: "ui-monospace, 'Cascadia Code', monospace",
  },
  badge: {
    fontFamily: "ui-monospace, 'Cascadia Code', monospace",
    fontSize: 13,
    color: "#8b5cf6",
    background: "#8b5cf610",
    border: "1px solid #8b5cf633",
    borderRadius: 6,
    padding: "4px 12px",
  },
  controls: {
    marginBottom: 20,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  searchInput: {
    width: "100%",
    padding: "10px 14px",
    background: "#0a0a0a",
    border: "1px solid #222",
    borderRadius: 8,
    color: "#ddd",
    fontSize: 14,
    fontFamily: "ui-monospace, 'Cascadia Code', monospace",
    outline: "none",
    boxSizing: "border-box",
  },
  filterRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "space-between",
  },
  filterGroup: {
    display: "flex",
    gap: 6,
    flexWrap: "wrap",
  },
  filterBtn: {
    padding: "5px 12px",
    borderRadius: 6,
    border: "1px solid #333",
    background: "transparent",
    color: "#888",
    fontSize: 12,
    fontFamily: "ui-monospace, 'Cascadia Code', monospace",
    cursor: "pointer",
    transition: "all 0.15s",
  },
  tableWrap: {
    overflowX: "auto",
    borderRadius: 10,
    border: "1px solid #1a1a1a",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    tableLayout: "fixed",
  },
  th: {
    textAlign: "left",
    padding: "10px 12px",
    fontSize: 11,
    fontFamily: "ui-monospace, 'Cascadia Code', monospace",
    fontWeight: 600,
    color: "#555",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    borderBottom: "1px solid #1a1a1a",
    background: "#080808",
    whiteSpace: "nowrap",
    userSelect: "none",
  },
  tr: {
    borderBottom: "1px solid #111",
    transition: "background 0.12s",
  },
  td: {
    padding: "10px 12px",
    fontSize: 14,
    verticalAlign: "middle",
    lineHeight: 1.45,
  },
  mono: {
    fontFamily: "ui-monospace, 'Cascadia Code', monospace",
  },
  catPill: {
    fontSize: 11,
    fontFamily: "ui-monospace, 'Cascadia Code', monospace",
    padding: "2px 8px",
    borderRadius: 4,
    border: "1px solid",
    fontWeight: 500,
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  },
  expandPanel: {
    padding: "16px 24px 20px",
    borderTop: "1px solid #1a1a1a",
    background: "#0c0c0c",
  },
  expandGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 16,
  },
  expandLabel: {
    fontSize: 10,
    fontFamily: "ui-monospace, 'Cascadia Code', monospace",
    fontWeight: 600,
    color: "#555",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    marginBottom: 6,
  },
  expandText: {
    fontSize: 13,
    color: "#aaa",
    lineHeight: 1.5,
  },
  metricsWrap: {
    display: "flex",
    flexWrap: "wrap",
    gap: 6,
  },
  metricChip: {
    fontSize: 11,
    fontFamily: "ui-monospace, 'Cascadia Code', monospace",
    padding: "3px 8px",
    borderRadius: 4,
    background: "#8b5cf60d",
    border: "1px solid #8b5cf622",
    color: "#a78bfa",
  },
  notes: {
    marginTop: 24,
    padding: 20,
    borderRadius: 10,
    border: "1px solid #1a1a1a",
    background: "#080808",
  },
  notesTitle: {
    fontSize: 11,
    fontFamily: "ui-monospace, 'Cascadia Code', monospace",
    fontWeight: 600,
    color: "#555",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    marginBottom: 12,
  },
  noteItem: {
    display: "flex",
    gap: 8,
    fontSize: 13,
    color: "#888",
    lineHeight: 1.5,
    marginBottom: 8,
  },
  noteMarker: {
    color: "#8b5cf6",
    flexShrink: 0,
  },
  footer: {
    marginTop: 20,
    padding: "12px 0",
    borderTop: "1px solid #1a1a1a",
    display: "flex",
    justifyContent: "space-between",
    fontSize: 12,
    fontFamily: "ui-monospace, 'Cascadia Code', monospace",
    color: "#333",
  },
};
