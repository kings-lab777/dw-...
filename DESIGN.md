# DigiWorku Commander — Design System & UI Specification (DESIGN.md)

## 🎨 Design Philosophy
DigiWorku Commander mirrors the official **DigiWorku.in** design language. It defaults to a modern, ultra-clean **Light Mode** matching `digiworku.in` with pure white cards, crisp slate borders, emerald green accents, and rich typography, while providing an instant toggle to **Stealth Dark Mode**.

---

## 🎨 Dual Theme Color Palette & Design Tokens

### 1. Light Mode (Default — Matching `digiworku.in`)
| Token | Hex Value | Tailwind Class | Usage |
| :--- | :--- | :--- | :--- |
| **Canvas Background** | `#f8fafc` | `bg-slate-50` | Root background with blinking squircle mesh |
| **Surface (Cards)** | `#ffffff` | `bg-white` | Primary container cards, tables, modal bodies |
| **Sub-Surface (Inner Wells)** | `#f1f5f9` / `#f8fafc` | `bg-slate-50` / `bg-slate-100` | Code blocks, inputs, metric well boxes |
| **Border Tokens** | `#e2e8f0` / `#cbd5e1` | `border-slate-200` | Standard card and table dividers |
| **Primary Text** | `#0f172a` | `text-slate-900` | Headings, metrics, important labels |
| **Secondary Text** | `#64748b` | `text-slate-500` | Subtitles, helper text, timestamps |

### 2. Stealth Dark Mode (Toggleable via Sun/Moon)
| Token | Hex Value | Tailwind Class | Usage |
| :--- | :--- | :--- | :--- |
| **Deep Background** | `#0f1115` | `bg-[#0f1115]` | Dark root canvas |
| **Elevated Surface** | `#14171d` | `bg-[#14171d]` | Dark cards, sidebar, header |
| **Inner Wells** | `#090d15` / `#0f1115` | `bg-[#0f1115]` | Dark input boxes, tables |
| **Borders** | `#1e293b` | `border-slate-800` | Dark card boundaries |
| **Primary Text** | `#f8fafc` | `text-white` | Dark mode titles and numbers |
| **Secondary Text** | `#94a3b8` | `text-slate-400` | Dark mode subtitles |

### 3. DigiWorku Signature Accents (Both Modes)
| Token | Hex Value | Purpose |
| :--- | :--- | :--- |
| **DigiWorku Emerald** | `#00c853` | Primary brand accent, approved state, active stopwatch, CTAs |
| **Emerald Hover** | `#00af48` | Interactive button and link hover states |
| **Cyber Blue** | `#3b82f6` | In-progress tasks, public portal link, telemetry icons |
| **Alert Amber** | `#f59e0b` | Delayed project radar, late attendance flag, revision requests |
| **Security Rose** | `#ef4444` | RBAC restricted barriers, reject decisions, declined leaves |
| **Governance Purple** | `#a855f7` | Super Admin badges, executive clearance vaults |

---

## 🔤 Typography & Currency

- **Primary Font Family**: `"Plus Jakarta Sans", "Inter", -apple-system, sans-serif`
  - Crisp, modern geometric sans-serif matching DigiWorku.
- **Monospace Font Family**: `"JetBrains Mono", monospace`
  - Applied to Task IDs (`TSK-1042`), timestamps (`09:30 AM`), shift stopwatch (`05:04:00`), and code snippets.
- **Monetary Currency**: **INR (₹)** strictly across all financial summaries, milestone payouts, client quotes, and payroll disbursements.

---

## 📐 Layout & Viewport Breakpoints

- **Desktop (1440px+)**: Multi-column bento grids, persistent 64-width left navigation sidebar, dual-pane QC sandbox.
- **Tablet (768px - 1024px)**: 2-column adaptive flow, scrollable milestone roadmaps.
- **Mobile (375px - 640px)**: 1-column stacked flow, horizontal scrolling tab controls, touch-friendly tap targets (minimum 44x44px).
