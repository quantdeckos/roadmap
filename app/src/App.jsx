import React, { useState } from "react";

const tasks = [
  { title: "Define core app concept", tags: ["core", "priority", "ux"], time: "03:18" },
  { title: "Optimize UI responsiveness", tags: ["motion", "mobile", "perf"], time: "14:29" },
  { title: "System Design", tags: ["system", "architecture", "docs"], time: "00:00" },
  { title: "Build Search engine", tags: ["api", "backend", "search"], time: "00:00" },
];

const roadmapPhases = [
  { name: "Phase 1", color: "#cdb1f3", icon: "◍" },
  { name: "Phase 2", color: "#b9ddfb", icon: "✈" },
  { name: "Phase 3", color: "#b6efef", icon: "◌" },
  { name: "Phase 4", color: "#f1e39e", icon: "◎" },
  { name: "Phase 5", color: "#eea331", icon: "◔" },
  { name: "Phase 6", color: "#ef7232", icon: "◕" },
];

export default function App() {
  const [completedView, setCompletedView] = useState(false);
  const [checkedTasks, setCheckedTasks] = useState(() => tasks.map(() => false));
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeScreen, setActiveScreen] = useState("main");
  const progress = 91;

  return (
    <div className="roadmap-shell">
      <style>{`
        :root {
          --bg: #ececec;
          --ink: #33334a;
          --muted: #6e6e80;
          --dark-card: #48495d;
          --yellow: #f2e55e;
          --pink: #ff46ae;
          --mint: #57efb1;
          --line: #dbdbdf;
        }

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
        }

        .roadmap-shell {
          min-height: 100vh;
          display: grid;
          place-items: center;
          background: linear-gradient(180deg, #f0f0f0 0%, #e8e8e8 100%);
          font-family: "Poppins", "Avenir Next", "Segoe UI", sans-serif;
          color: var(--ink);
          padding: 20px;
        }

        .phone {
          width: 360px;
          min-height: 760px;
          border-radius: 28px;
          background: linear-gradient(180deg, #efefef 0%, #e8e8e8 100%);
          padding: 18px 14px 14px;
          box-shadow: 0 18px 36px rgba(38, 38, 49, 0.2);
          position: relative;
          overflow: hidden;
        }

        .top-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
          position: relative;
        }

        .icon {
          font-size: 34px;
          line-height: 1;
          color: #2f2f41;
        }

        .menu-wrap {
          position: relative;
        }

        .icon-btn {
          border: none;
          background: transparent;
          padding: 0;
          cursor: pointer;
        }

        .menu-dropdown {
          position: absolute;
          right: 0;
          top: 38px;
          min-width: 150px;
          background: #ffffff;
          border: 1px solid #d7d8df;
          border-radius: 10px;
          box-shadow: 0 12px 26px rgba(40, 40, 55, 0.16);
          overflow: hidden;
          z-index: 20;
        }

        .menu-item {
          width: 100%;
          text-align: left;
          border: none;
          background: #fff;
          color: #44445b;
          font-size: 14px;
          padding: 10px 12px;
          cursor: pointer;
        }

        .menu-item + .menu-item {
          border-top: 1px solid #efeff3;
        }

        .menu-item:hover {
          background: #f5f6fb;
        }

        .date {
          text-align: right;
          font-size: 28px;
          font-weight: 700;
          letter-spacing: -0.04em;
          margin: 6px 0 10px;
        }

        .progress-box {
          background: var(--dark-card);
          border-radius: 12px;
          padding: 14px;
        }

        .progress-top {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 8px;
        }

        .progress-top span {
          color: #d6d8e7;
          font-size: 12px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .percent {
          margin: 0;
          font-size: 34px;
          line-height: 1;
          color: #f4f4f6;
          letter-spacing: -0.03em;
          font-weight: 600;
        }

        .progress-track-top {
          height: 14px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.18);
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .progress-fill-top {
          display: block;
          height: 100%;
          background: linear-gradient(90deg, #f2df17 0%, #76efba 100%);
          border-radius: inherit;
        }

        .progress-label {
          font-size: 28px;
          font-weight: 600;
          margin: 8px 0 12px;
          letter-spacing: -0.03em;
        }

        .ai-row {
          border-radius: 999px;
          border: 1px solid var(--line);
          background: #fff;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 8px 8px 12px;
          margin-bottom: 12px;
        }

        .ask-label {
          color: #888896;
          font-size: 15px;
          flex: 1;
        }

        .send-btn {
          width: 38px;
          height: 38px;
          border: none;
          border-radius: 999px;
          background: #f2df17;
          color: #2f2f3c;
          font-size: 20px;
        }

        .phase-card {
          background: var(--yellow);
          border-radius: 14px;
          padding: 10px;
          margin-bottom: 12px;
        }

        .phase-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .phase-head h2 {
          margin: 0;
          font-size: 46px;
          line-height: 0.9;
          letter-spacing: -0.04em;
          color: #514f66;
          text-transform: lowercase;
        }

        .switch {
          width: 52px;
          height: 28px;
          border: 1px solid #b9b9c4;
          border-radius: 999px;
          background: #dcdde4;
          position: relative;
          padding: 0;
        }

        .switch::after {
          content: "";
          position: absolute;
          top: 2px;
          left: 2px;
          width: 22px;
          height: 22px;
          border-radius: 999px;
          background: #f8f8fb;
          transition: transform 200ms ease;
        }

        .switch.on::after {
          transform: translateX(24px);
        }

        .phase-copy {
          margin: 0 0 8px;
          font-size: 12px;
          line-height: 1.3;
          color: #53536a;
        }

        .task-list {
          display: grid;
          gap: 8px;
        }

        .task {
          display: grid;
          grid-template-columns: 22px 1fr auto;
          gap: 10px;
          align-items: center;
          background: var(--pink);
          border-radius: 12px;
          padding: 9px 10px;
          color: #fff;
        }

        .task:nth-child(3) {
          background: ${completedView ? "var(--pink)" : "var(--mint)"};
          color: ${completedView ? "#fff" : "#244b3f"};
        }

        .checkbox {
          width: 16px;
          height: 16px;
          border-radius: 4px;
          border: 1.5px solid rgba(255, 255, 255, 0.9);
          background: #fff;
          padding: 0;
          display: grid;
          place-items: center;
          color: transparent;
          font-size: 11px;
          line-height: 1;
          cursor: pointer;
          opacity: 0.9;
        }

        .checkbox.checked {
          background: #fff;
          color: #4f4f67;
          opacity: 1;
        }

        .task-title {
          margin: 0;
          font-size: 14px;
          font-weight: 600;
          line-height: 1.2;
        }

        .task-content {
          text-align: left;
          justify-self: start;
          width: 100%;
        }

        .task-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          margin-top: 4px;
        }

        .tag {
          display: inline-block;
          background: rgba(255, 255, 255, 0.28);
          border-radius: 999px;
          padding: 2px 7px;
          font-size: 9px;
          font-weight: 700;
          text-transform: lowercase;
          color: #3a3a55;
        }

        .task-meta .tag:nth-child(4n + 1) {
          background: #ffd780;
        }

        .task-meta .tag:nth-child(4n + 2) {
          background: #a9ecff;
        }

        .task-meta .tag:nth-child(4n + 3) {
          background: #baf5c6;
        }

        .task-meta .tag:nth-child(4n + 4) {
          background: #ffc1de;
        }

        .time {
          font-family: "Courier New", monospace;
          font-size: 24px;
          line-height: 1;
          letter-spacing: -0.03em;
          font-weight: 700;
        }

        .stats {
          background: #f6f6f7;
          border: 1px solid var(--line);
          border-radius: 16px;
          padding: 10px 12px;
        }

        .stats-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 6px;
        }

        .stats-top b {
          font-size: 40px;
          line-height: 0.9;
          letter-spacing: -0.04em;
        }

        .stats-top span {
          font-size: 14px;
        }

        .bar {
          height: 8px;
          border-radius: 999px;
          background: #ddd;
          overflow: hidden;
        }

        .bar > i {
          display: block;
          width: 80%;
          height: 100%;
          background: linear-gradient(90deg, #fa8f54 0%, #52ebaa 70%);
        }

        .stats-foot {
          margin-top: 6px;
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          color: var(--muted);
        }

        .stats-foot b {
          color: #1d9b75;
        }

        .nav {
          margin-top: 10px;
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          align-items: end;
          gap: 2px;
        }

        .nav-btn {
          border: none;
          background: transparent;
          padding: 6px 0;
          display: grid;
          place-items: center;
          cursor: pointer;
        }

        .nav-icon {
          width: 24px;
          height: 24px;
          fill: none;
          stroke: #a6a7b2;
          stroke-width: 1.9;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .nav-btn.active .nav-icon {
          stroke: #f0bb2f;
        }

        .nav-center-wrap {
          width: 42px;
          height: 42px;
          border-radius: 999px;
          border: 1px solid #cbccd2;
          background: #e3e3e4;
          display: grid;
          place-items: center;
          transition: transform 180ms ease, box-shadow 180ms ease, background-color 180ms ease;
        }

        .nav-center-wrap .nav-icon {
          width: 22px;
          height: 22px;
          stroke: #9da0ad;
        }

        .nav-btn:hover .nav-center-wrap {
          transform: translateY(-2px) scale(1.04);
          background: #ececef;
          box-shadow: 0 8px 16px rgba(63, 63, 84, 0.2);
        }

        .nav-btn:hover .nav-center-wrap .nav-icon {
          stroke: #7b7e8d;
        }

        .roadmap-page {
          display: grid;
          grid-template-rows: auto 1fr auto auto;
          min-height: 728px;
          background: #ececec;
          margin: -18px -14px -14px;
          padding: 16px 14px 14px;
        }

        .roadmap-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 4px;
          position: relative;
        }

        .back-btn {
          border: none;
          background: transparent;
          font-size: 42px;
          line-height: 1;
          color: #8f8f96;
          padding: 0;
          cursor: pointer;
        }

        .road-canvas {
          position: relative;
          height: 560px;
          margin-top: 2px;
        }

        .map-row {
          position: absolute;
          left: 0;
          width: 100%;
          height: 86px;
        }

        .map-label {
          position: absolute;
          top: 22px;
          font-size: 44px;
          line-height: 1;
          letter-spacing: -0.03em;
          font-weight: 600;
          color: var(--phase-color);
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .map-label small {
          font-size: 22px;
          opacity: 0.75;
        }

        .map-row.left .map-label {
          left: 2px;
        }

        .map-row.right .map-label {
          right: 2px;
        }

        .map-seg {
          position: absolute;
          top: 4px;
          width: 210px;
          height: 74px;
        }

        .map-row.left .map-seg {
          right: 8px;
        }

        .map-row.right .map-seg {
          left: 8px;
        }

        .map-track {
          position: absolute;
          inset: 0;
          border: 9px solid var(--phase-color);
          border-radius: 40px;
          opacity: 0.98;
        }

        .map-row.left .map-track {
          border-left-color: transparent;
          background: linear-gradient(90deg, rgba(255, 255, 255, 0) 52%, rgba(255, 255, 255, 0.22) 100%);
        }

        .map-row.right .map-track {
          border-right-color: transparent;
          background: linear-gradient(90deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0) 48%);
        }

        .map-node {
          position: absolute;
          top: 11px;
          width: 66px;
          height: 52px;
          border-radius: 30px;
          background: #f5f5f5;
          border: 1px solid #e5e5ea;
          box-shadow: 0 7px 14px rgba(71, 71, 80, 0.2);
          display: grid;
          place-items: center;
          font-size: 25px;
          color: var(--phase-color);
        }

        .map-row.left .map-node {
          right: -2px;
        }

        .map-row.right .map-node {
          left: -2px;
        }

        .road-progress {
          margin: 6px 0 8px;
          padding: 0 2px;
        }

        .road-progress-top {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 6px;
          color: #8f5fd3;
          font-weight: 700;
        }

        .road-progress-top span {
          font-size: 34px;
          line-height: 1;
        }

        .tiny-pill {
          background: #ece1ff;
          color: #a37bde;
          border-radius: 999px;
          padding: 2px 8px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.03em;
        }

        .road-bars {
          height: 40px;
          border-radius: 2px;
          background:
            repeating-linear-gradient(
              90deg,
              #9f58e9 0px,
              #9f58e9 4px,
              transparent 4px,
              transparent 7px
            ),
            linear-gradient(90deg, rgba(159, 88, 233, 0.16), rgba(159, 88, 233, 0.16));
          overflow: hidden;
          position: relative;
        }

        .road-bars::after {
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          height: 100%;
          width: 34%;
          background: rgba(236, 225, 255, 0.82);
        }

        .roadmap-nav-wrap {
          margin: 0 -14px -14px;
          padding: 8px 10px 10px;
          background: #dfdfdf;
          border-top: 1px solid #d3d3d7;
        }

        .roadmap-nav .nav-btn.active .nav-icon {
          stroke: #f0bb2f;
        }

        @media (max-width: 420px) {
          .roadmap-shell {
            padding: 0;
          }

          .phone {
            width: 100vw;
            min-height: 100vh;
            border-radius: 0;
          }
        }
      `}</style>

      <div className="phone">
        {activeScreen === "roadmap" ? (
          <div className="roadmap-page">
            <div className="roadmap-head">
              <button className="back-btn" onClick={() => setActiveScreen("main")} aria-label="Back">
                ←
              </button>
              <button className="icon icon-btn" onClick={() => setMenuOpen((value) => !value)} aria-label="Open menu">
                ...
              </button>
              {menuOpen && (
                <div className="menu-dropdown">
                  <button className="menu-item" onClick={() => setMenuOpen(false)}>Profile</button>
                  <button className="menu-item" onClick={() => setMenuOpen(false)}>Alerts</button>
                  <button className="menu-item" onClick={() => setMenuOpen(false)}>Support</button>
                </div>
              )}
            </div>

            <div className="road-canvas">
              {roadmapPhases.map((phase, index) => (
                <div
                  className={`map-row ${index % 2 === 0 ? "left" : "right"}`}
                  style={{ top: `${index * 86}px`, "--phase-color": phase.color }}
                  key={phase.name}
                >
                  <div className="map-label">
                    {index % 2 === 0 ? (
                      <>
                        {phase.name}
                        <small>«</small>
                      </>
                    ) : (
                      <>
                        <small>»</small>
                        {phase.name}
                      </>
                    )}
                  </div>
                  <div className="map-seg">
                    <div className="map-track" />
                    <div className="map-node">{phase.icon}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="road-progress">
              <div className="road-progress-top">
                <span>66%</span>
                <div className="tiny-pill">+3%</div>
              </div>
              <div className="road-bars" />
            </div>

            <div className="roadmap-nav-wrap">
              <div className="nav roadmap-nav">
                <button className="nav-btn active" aria-label="Home" onClick={() => setActiveScreen("main")}>
                  <svg className="nav-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M4 11.5L12 5l8 6.5" />
                    <path d="M6.5 10.5V19h11v-8.5" />
                  </svg>
                </button>

                <button className="nav-btn" aria-label="Docs">
                  <svg className="nav-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M4.5 6.5h7v12h-7z" />
                    <path d="M12.5 6.5h7v12h-7z" />
                    <path d="M12 6.5v12" />
                  </svg>
                </button>

                <button className="nav-btn" aria-label="Roadmap">
                  <span className="nav-center-wrap">
                    <svg className="nav-icon" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M3 19L10 5" />
                      <path d="M21 19L14 5" />
                      <path d="M10.8 10h2.4" />
                      <path d="M9.7 14h4.6" />
                    </svg>
                  </span>
                </button>

                <button className="nav-btn" aria-label="Calendar">
                  <svg className="nav-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="4.5" y="6.5" width="15" height="13" rx="1.6" />
                    <path d="M8 4.8v3.1M16 4.8v3.1M4.5 10.2h15" />
                  </svg>
                </button>

                <button className="nav-btn" aria-label="Settings">
                  <svg className="nav-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 8.7a3.3 3.3 0 1 1 0 6.6 3.3 3.3 0 0 1 0-6.6Z" />
                    <path d="M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.4-2.4.7a6.9 6.9 0 0 0-1.7-1l-.4-2.4h-4l-.4 2.4a6.9 6.9 0 0 0-1.7 1L5 6.1 3 9.5 5 11a7 7 0 0 0 0 2l-2 1.5L5 18l2.4-.7a6.9 6.9 0 0 0 1.7 1l.4 2.4h4l.4-2.4a6.9 6.9 0 0 0 1.7-1L19 18l2-3.5-2-1.5c.1-.3.1-.7.1-1Z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="top-row">
              <span className="icon">+</span>
              <div className="menu-wrap">
                <button
                  className="icon icon-btn"
                  onClick={() => setMenuOpen((value) => !value)}
                  aria-label="Open menu"
                >
                  ...
                </button>
                {menuOpen && (
                  <div className="menu-dropdown">
                    <button className="menu-item" onClick={() => setMenuOpen(false)}>Profile</button>
                    <button className="menu-item" onClick={() => setMenuOpen(false)}>Alerts</button>
                    <button className="menu-item" onClick={() => setMenuOpen(false)}>Support</button>
                  </div>
                )}
              </div>
            </div>

            <div className="date">Friday april 17</div>

            <div className="progress-box">
              <div className="progress-top">
                <span>Project Progress</span>
                <h1 className="percent">{progress}%</h1>
              </div>
              <div className="progress-track-top">
                <i className="progress-fill-top" style={{ width: `${progress}%` }} />
              </div>
            </div>
            <div className="progress-label">Project Progress</div>

            <div className="ai-row">
              <span>✦</span>
              <span className="ask-label">Ask Ai</span>
              <button className="send-btn" aria-label="Send">→</button>
            </div>

            <div className="phase-card">
              <div className="phase-head">
                <h2>{completedView ? "completed" : "Phase 8"}</h2>
                <button
                  className={`switch ${completedView ? "on" : ""}`}
                  onClick={() => setCompletedView((value) => !value)}
                  aria-label="Toggle completed mode"
                />
              </div>

              {!completedView && (
                <p className="phase-copy">
                  Build the structural blueprint of the product with clean layout systems and
                  reliable interaction patterns.
                </p>
              )}

              <div className="task-list">
                {tasks.map((task, index) => (
                  <div className="task" key={`${task.title}-${index}`}>
                    <button
                      className={`checkbox ${checkedTasks[index] ? "checked" : ""}`}
                      onClick={() =>
                        setCheckedTasks((prev) => prev.map((item, i) => (i === index ? !item : item)))
                      }
                      aria-label={`Mark ${task.title} as done`}
                    >
                      ✓
                    </button>
                    <div className="task-content">
                      <p className="task-title">{task.title}</p>
                      <div className="task-meta">
                        {task.tags.map((tag) => (
                          <span className="tag" key={`${task.title}-${tag}`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="time">{task.time}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="stats">
              <div className="stats-top">
                <b>6</b>
                <span>Left <b>2</b></span>
              </div>
              <div className="bar">
                <i />
              </div>
              <div className="stats-foot">
                <span>Average performance</span>
                <b>80%</b>
              </div>
            </div>

            <div className="nav">
              <button className="nav-btn active" aria-label="Home">
                <svg className="nav-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4 11.5L12 5l8 6.5" />
                  <path d="M6.5 10.5V19h11v-8.5" />
                </svg>
              </button>

              <button className="nav-btn" aria-label="Docs">
                <svg className="nav-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4.5 6.5h7v12h-7z" />
                  <path d="M12.5 6.5h7v12h-7z" />
                  <path d="M12 6.5v12" />
                </svg>
              </button>

              <button className="nav-btn" aria-label="Roadmap" onClick={() => setActiveScreen("roadmap")}>
                <span className="nav-center-wrap">
                  <svg className="nav-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M3 19L10 5" />
                    <path d="M21 19L14 5" />
                    <path d="M10.8 10h2.4" />
                    <path d="M9.7 14h4.6" />
                  </svg>
                </span>
              </button>

              <button className="nav-btn" aria-label="Calendar">
                <svg className="nav-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="4.5" y="6.5" width="15" height="13" rx="1.6" />
                  <path d="M8 4.8v3.1M16 4.8v3.1M4.5 10.2h15" />
                </svg>
              </button>

              <button className="nav-btn" aria-label="Settings">
                <svg className="nav-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 8.7a3.3 3.3 0 1 1 0 6.6 3.3 3.3 0 0 1 0-6.6Z" />
                  <path d="M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.4-2.4.7a6.9 6.9 0 0 0-1.7-1l-.4-2.4h-4l-.4 2.4a6.9 6.9 0 0 0-1.7 1L5 6.1 3 9.5 5 11a7 7 0 0 0 0 2l-2 1.5L5 18l2.4-.7a6.9 6.9 0 0 0 1.7 1l.4 2.4h4l.4-2.4a6.9 6.9 0 0 0 1.7-1L19 18l2-3.5-2-1.5c.1-.3.1-.7.1-1Z" />
                </svg>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
