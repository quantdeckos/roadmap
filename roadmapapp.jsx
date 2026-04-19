import React, { useMemo, useState } from "react";

const baseTasks = [
  { title: "Define core app concept", tag: "core", priority: "priority", time: "03:18" },
  { title: "Optimize UI responsiveness", tag: "ux", priority: "motion", time: "14:29" },
  { title: "System Design", tag: "system", priority: "", time: "00:00" },
  { title: "Build Search engine", tag: "system", priority: "api", time: "00:00" },
  { title: "Build Search engine", tag: "backend", priority: "", time: "00:00" },
];

export default function RoadmapApp() {
  const [isCompletedView, setIsCompletedView] = useState(false);

  const taskClass = useMemo(() => {
    if (isCompletedView) return "task task-done";
    return "task task-mixed";
  }, [isCompletedView]);

  return (
    <div className="roadmap-shell">
      <style>{`
        :root {
          --bg: #ececec;
          --ink: #33334a;
          --deep: #3b3d50;
          --lemon: #f4e75f;
          --hot-pink: #ff3aac;
          --soft-pink: #ffa2c7;
          --mint: #42f0ac;
          --orange: #ffcb66;
          --card-shadow: 0 10px 24px rgba(41, 41, 56, 0.17);
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
          background: radial-gradient(circle at 20% -10%, #ffffff 0%, #ececec 45%, #dfdfdf 100%);
          font-family: "Poppins", "Avenir Next", "Segoe UI", sans-serif;
          color: var(--ink);
          padding: 20px;
        }

        .phone {
          width: 360px;
          min-height: 760px;
          border-radius: 32px;
          background: linear-gradient(180deg, #efefef 0%, #e9e9e9 100%);
          position: relative;
          overflow: hidden;
          padding: 20px 16px 18px;
          box-shadow: 0 20px 45px rgba(34, 34, 34, 0.2);
        }

        .watermark {
          position: absolute;
          inset: 0;
          opacity: 0.11;
          pointer-events: none;
          font-weight: 800;
          letter-spacing: -1px;
          font-size: 18px;
          line-height: 1.15;
          color: #73737f;
          transform: translateY(-26px);
          padding: 30px 16px;
        }

        .top-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
          position: relative;
          z-index: 1;
        }

        .icon-plus {
          font-size: 64px;
          line-height: 0.9;
          font-weight: 200;
          color: #2e2e3f;
        }

        .icon-dots {
          font-size: 38px;
          line-height: 0;
          margin-top: -18px;
          color: #2e2e3f;
        }

        .date {
          text-align: right;
          font-size: 39px;
          font-weight: 700;
          letter-spacing: -1.2px;
          margin-top: -6px;
          color: #2f2f46;
          position: relative;
          z-index: 1;
        }

        .progress-box {
          margin-top: 6px;
          background: linear-gradient(90deg, #50505f 0%, #46485b 68%, #3c3e53 100%);
          height: 128px;
          border-radius: 0;
          display: flex;
          align-items: center;
          padding: 0 16px;
          box-shadow: var(--card-shadow);
          position: relative;
          z-index: 1;
        }

        .progress-box h1 {
          margin: 0;
          font-size: 90px;
          line-height: 0.88;
          color: #f3f3f5;
          letter-spacing: -2px;
          font-weight: 500;
        }

        .progress-label {
          font-size: 34px;
          margin-top: 8px;
          font-weight: 600;
          color: #333346;
          letter-spacing: -0.8px;
          position: relative;
          z-index: 1;
        }

        .ai-row {
          margin-top: 16px;
          border-radius: 999px;
          background: #fff;
          border: 2px solid #dfdfdf;
          box-shadow: 0 8px 18px rgba(53, 53, 53, 0.12);
          display: flex;
          align-items: center;
          padding: 8px 8px 8px 14px;
          position: relative;
          z-index: 1;
        }

        .spark {
          font-weight: 700;
          font-size: 18px;
          margin-right: 8px;
        }

        .divider {
          width: 2px;
          align-self: stretch;
          background: #dcdcdc;
          margin-right: 10px;
        }

        .ai-placeholder {
          color: #89898f;
          font-size: 22px;
          letter-spacing: -0.2px;
          flex: 1;
        }

        .send-btn {
          width: 44px;
          height: 44px;
          border: none;
          border-radius: 999px;
          background: #f2df17;
          color: #2f2f3c;
          font-size: 28px;
          cursor: pointer;
          box-shadow: 0 6px 12px rgba(209, 196, 26, 0.45);
        }

        .phase-card {
          margin-top: 14px;
          background: var(--lemon);
          border-radius: 16px;
          padding: 12px 10px 10px;
          position: relative;
          z-index: 1;
        }

        .phase-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 6px;
        }

        .phase-head h2 {
          margin: 0;
          font-size: 52px;
          line-height: 0.88;
          letter-spacing: -1.4px;
          color: #4f4d65;
          text-transform: lowercase;
        }

        .switch {
          width: 56px;
          height: 32px;
          border-radius: 30px;
          border: 2px solid #babac7;
          background: #dbdce2;
          position: relative;
          cursor: pointer;
          padding: 0;
        }

        .switch::after {
          content: "";
          position: absolute;
          top: 2px;
          left: 2px;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #f8f8f8;
          transition: transform 220ms ease;
          transform: translateX(0);
        }

        .switch.on::after {
          transform: translateX(24px);
        }

        .phase-copy {
          font-size: 13px;
          line-height: 1.12;
          color: #4f4f5d;
          margin: 0 2px 8px;
        }

        .task-list {
          display: grid;
          gap: 8px;
        }

        .task {
          border-radius: 14px;
          min-height: 50px;
          display: grid;
          grid-template-columns: 32px 1fr auto;
          align-items: center;
          padding: 6px 10px;
          box-shadow: inset 0 -2px rgba(255, 255, 255, 0.25);
        }

        .task.task-mixed:nth-child(1),
        .task.task-mixed:nth-child(2) {
          background: linear-gradient(90deg, #ff8ab9 0%, #f67dad 100%);
        }

        .task.task-mixed:nth-child(3) {
          background: linear-gradient(90deg, #56eead 0%, #4ee6a7 100%);
        }

        .task.task-mixed:nth-child(n + 4) {
          background: linear-gradient(90deg, #f6dd34 0%, #f4d931 100%);
        }

        .task.task-done {
          background: linear-gradient(90deg, #ff52b8 0%, #f93faf 100%);
        }

        .x-pill {
          width: 24px;
          height: 24px;
          border-radius: 8px;
          background: #fff6cd;
          border: 2px solid rgba(0, 0, 0, 0.08);
          display: grid;
          place-items: center;
          font-weight: 700;
          font-size: 15px;
          color: #514751;
        }

        .task-main {
          display: grid;
          align-content: center;
          gap: 1px;
        }

        .task-title {
          font-size: 13px;
          font-weight: 600;
          color: #47475f;
          letter-spacing: -0.2px;
          text-shadow: 0 1px rgba(255, 255, 255, 0.35);
        }

        .tags {
          display: flex;
          gap: 4px;
        }

        .chip {
          border-radius: 99px;
          background: rgba(255, 220, 106, 0.65);
          color: #55506d;
          font-size: 8px;
          line-height: 1;
          padding: 3px 6px;
          font-weight: 700;
          text-transform: lowercase;
          min-width: 34px;
          text-align: center;
        }

        .clock {
          font-size: 24px;
          font-weight: 700;
          color: #f1eee5;
          letter-spacing: -0.6px;
          font-family: "Courier New", monospace;
          padding-left: 8px;
        }

        .stats {
          margin-top: 12px;
          background: #f6f6f6;
          border: 2px solid #dddddd;
          border-radius: 18px;
          padding: 10px 12px 9px;
          position: relative;
          z-index: 1;
          box-shadow: 0 9px 18px rgba(38, 38, 49, 0.12);
        }

        .stats-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          color: #2e2e3e;
          font-weight: 700;
          margin-bottom: 6px;
        }

        .stats-top b {
          font-size: 44px;
          letter-spacing: -1.2px;
          line-height: 0.9;
        }

        .stats-top span {
          font-size: 15px;
          line-height: 1;
        }

        .bar {
          height: 10px;
          border-radius: 999px;
          background: #ddd;
          overflow: hidden;
        }

        .bar > i {
          display: block;
          width: 80%;
          height: 100%;
          background: linear-gradient(90deg, #f26464 0%, #f8d54c 28%, #45ef9d 55%, #6d6df5 100%);
        }

        .stats-foot {
          margin-top: 6px;
          display: flex;
          justify-content: space-between;
          color: #5a5a63;
          font-size: 11px;
          font-weight: 600;
        }

        .stats-foot b {
          color: #1f9f77;
        }

        .bottom-nav {
          margin-top: 10px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 4px;
          color: #b0b0b8;
          font-size: 26px;
          place-items: center;
          position: relative;
          z-index: 1;
        }

        .bottom-nav .active {
          color: #f0bb2f;
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
        <div className="watermark">
          <div>Phase 8</div>
          <div>Establish the core direction...</div>
          <br />
          <div>Phase 8</div>
          <div>Milestone management center</div>
        </div>

        <div className="top-row">
          <div className="icon-plus">+</div>
          <div className="icon-dots">...</div>
        </div>

        <div className="date">Friday april 17</div>

        <div className="progress-box">
          <h1>91%</h1>
        </div>
        <div className="progress-label">Project Progress</div>

        <div className="ai-row">
          <div className="spark">✦</div>
          <div className="divider" />
          <div className="ai-placeholder">Ask Ai</div>
          <button className="send-btn">➜</button>
        </div>

        <div className="phase-card">
          <div className="phase-head">
            <h2>{isCompletedView ? "completed" : "Phase 8"}</h2>
            <button
              className={`switch ${isCompletedView ? "on" : ""}`}
              onClick={() => setIsCompletedView((v) => !v)}
              aria-label="Toggle completed mode"
            />
          </div>
          {!isCompletedView && (
            <p className="phase-copy">
              Build the structural blueprint of the product. This includes UI direction,
              layout systems, and interaction patterns.
            </p>
          )}

          <div className="task-list">
            {baseTasks.map((task, i) => (
              <div className={taskClass} key={`${task.title}-${i}`}>
                <div className="x-pill">x</div>
                <div className="task-main">
                  <div className="task-title">{task.title}</div>
                  <div className="tags">
                    <span className="chip">{task.tag}</span>
                    {task.priority && <span className="chip">{task.priority}</span>}
                  </div>
                </div>
                <div className="clock">{task.time}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="stats">
          <div className="stats-top">
            <b>6</b>
            <span>Left <b style={{ fontSize: "44px" }}>2</b></span>
          </div>
          <div className="bar">
            <i />
          </div>
          <div className="stats-foot">
            <span>Average performance</span>
            <b>80%</b>
          </div>
        </div>

        <div className="bottom-nav">
          <span className="active">⌂</span>
          <span>◫</span>
          <span>⌲</span>
          <span>⚙</span>
        </div>
      </div>
    </div>
  );
}
