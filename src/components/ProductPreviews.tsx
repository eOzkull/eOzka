'use client';

import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  Activity,
  Play,
  RefreshCw,
  PanelsTopLeft,
  FolderSync,
  CheckCircle,
  Users,
} from 'lucide-react';

interface Vulnerability {
  id: number;
  type: string;
  severity: string;
  target: string;
}

// ==========================================
// 1. AIris Security Scan Simulator Preview
// ==========================================
export function AIrisSecurityPreview() {
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([
    '[IDLE] System ready. Signature database v4.2 online.',
  ]);
  const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>([]);

  const filesToScan = [
    'src/app/api/auth/route.ts',
    'src/components/SentientOrb.tsx',
    'src/app/api/contact/route.ts',
    'src/app/api/newsletter/route.ts',
    'src/contexts/AudioContext.tsx',
    'package.json',
    'next.config.ts',
  ];

  const triggerScan = () => {
    if (scanning) return;
    setScanning(true);
    setProgress(0);
    setVulnerabilities([]);
    setLogs(['[START] Initiating web vulnerability scan...']);

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep += 1;
      const percent = Math.min(Math.floor((currentStep / 12) * 100), 100);
      setProgress(percent);

      if (currentStep <= filesToScan.length) {
        const file = filesToScan[currentStep - 1];
        setLogs((prev) => [`[SCANNING] Analyzing AST structure: ${file}`, ...prev]);

        // Randomly find vulnerabilities at specific steps
        if (currentStep === 2) {
          setLogs((prev) => [
            '[ALERT] High-severity vulnerability detected in next.config.ts',
            ...prev,
          ]);
          setVulnerabilities((prev) => [
            ...prev,
            { id: 1, type: 'CORS Misconfig', severity: 'HIGH', target: 'next.config.ts' },
          ]);
        }
        if (currentStep === 4) {
          setLogs((prev) => [
            '[ALERT] Critical SQL injection pattern found in auth endpoint',
            ...prev,
          ]);
          setVulnerabilities((prev) => [
            ...prev,
            { id: 2, type: 'SQL Injection', severity: 'CRITICAL', target: 'api/auth/route.ts' },
          ]);
        }
      } else if (currentStep === 10) {
        setLogs((prev) => ['[RESOLVING] Compiling mitigation paths and reports...', ...prev]);
      } else if (currentStep >= 12) {
        clearInterval(interval);
        setScanning(false);
        setLogs((prev) => [
          '[FINISHED] Scan completed. 2 vulnerabilities cataloged. Reports written.',
          ...prev,
        ]);
      }
    }, 400);
  };

  return (
    <div
      style={{
        display: 'grid',
        gap: '12px',
        width: '100%',
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
        color: 'var(--white)',
      }}
    >
      {/* Top Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 14px',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          background: 'var(--simulator-card-bg)',
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--accent)',
          }}
        >
          <ShieldAlert size={14} /> AIris AST Engine v1.0
        </span>
        <button
          onClick={triggerScan}
          disabled={scanning}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: scanning ? 'rgba(255,255,255,0.05)' : 'var(--white)',
            color: scanning ? 'var(--white-dimmer)' : 'var(--black)',
            border: 'none',
            borderRadius: '6px',
            padding: '4px 10px',
            fontSize: '10px',
            cursor: scanning ? 'not-allowed' : 'pointer',
            fontWeight: 'bold',
            transition: 'all 0.2s ease',
          }}
        >
          <Play size={10} fill={scanning ? 'none' : 'currentColor'} />
          {scanning ? 'Analyzing...' : 'Run Scan'}
        </button>
      </div>

      {/* Terminal View */}
      <div
        style={{
          padding: '12px',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          background: 'var(--simulator-terminal-bg)',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          minHeight: '100px',
          justifyContent: 'flex-start',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            color: 'var(--white-dimmer)',
            fontSize: '9px',
            borderBottom: '1px solid var(--border)',
            paddingBottom: '4px',
          }}
        >
          <span>AST SIGNAL CONSOLE</span>
          <span>{progress}% SCANNING</span>
        </div>

        {/* Progress bar */}
        <div
          style={{
            height: '3px',
            background: 'var(--border)',
            width: '100%',
            borderRadius: '2px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              background: 'var(--accent)',
              width: `${progress}%`,
              transition: 'width 0.2s ease',
            }}
          />
        </div>

        {/* Live log entries */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            maxHeight: '55px',
            overflowY: 'hidden',
            fontSize: '9px',
          }}
        >
          {logs.slice(0, 3).map((log, i) => (
            <div
              key={i}
              style={{
                color: log.startsWith('[ALERT]')
                  ? '#ef4444'
                  : log.startsWith('[FINISHED]')
                    ? '#10b981'
                    : 'var(--white-dim)',
              }}
            >
              {log}
            </div>
          ))}
        </div>
      </div>

      {/* Vulnerability Report Card */}
      <div
        style={{
          padding: '12px',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          background: 'var(--simulator-log-bg)',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
        }}
      >
        <div style={{ color: 'var(--white-dimmer)', fontSize: '8px', textTransform: 'uppercase' }}>
          Vulnerability Log
        </div>
        {vulnerabilities.length === 0 ? (
          <div
            style={{
              color: scanning ? 'var(--white-dimmer)' : '#10b981',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '10px',
              padding: '4px 0',
            }}
          >
            <CheckCircle size={12} />{' '}
            {scanning ? 'Checking security policies...' : 'No issues found. AST clean.'}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {vulnerabilities.map((vuln) => (
              <div
                key={vuln.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'rgba(239, 68, 68, 0.05)',
                  border: '1px solid rgba(239, 68, 68, 0.15)',
                  padding: '6px 10px',
                  borderRadius: '6px',
                }}
              >
                <span style={{ color: '#fca5a5', fontWeight: 'bold' }}>{vuln.type}</span>
                <span style={{ fontSize: '9px', color: 'var(--white-dimmer)' }}>{vuln.target}</span>
                <span
                  style={{
                    fontSize: '8px',
                    color: vuln.severity === 'CRITICAL' ? '#ef4444' : '#f59e0b',
                    border: `1px solid ${vuln.severity === 'CRITICAL' ? 'rgba(239,68,68,0.3)' : 'rgba(245,158,11,0.3)'}`,
                    background:
                      vuln.severity === 'CRITICAL' ? 'rgba(239,68,68,0.1)' : 'rgba(245,158,11,0.1)',
                    padding: '1px 4px',
                    borderRadius: '3px',
                    fontWeight: 'bold',
                  }}
                >
                  {vuln.severity}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 2. Paradigm-Shift HRMS Roster Preview
// ==========================================
export function ParadigmShiftPreview() {
  const [activeTab, setActiveTab] = useState<'employees' | 'workflows'>('employees');
  const [simulatedClock, setSimulatedClock] = useState('09:00:00 AM');

  useEffect(() => {
    const timer = setInterval(() => {
      const date = new Date();
      setSimulatedClock(date.toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const employees = [
    { name: 'Alex Rivera', role: 'Staff Engineer', department: 'Core Infra', status: 'Active' },
    { name: 'Sarah Chen', role: 'Security Analyst', department: 'SecOps', status: 'Meeting' },
    { name: 'Marcus Miller', role: 'Product Lead', department: 'Strategy', status: 'Offline' },
  ];

  return (
    <div
      style={{
        display: 'grid',
        gap: '12px',
        width: '100%',
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
        color: 'var(--white)',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 14px',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          background: 'var(--simulator-card-bg)',
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--accent)',
          }}
        >
          <Users size={14} /> ParadigmShift HRMS
        </span>
        <span style={{ color: 'var(--white-dimmer)', fontSize: '10px' }}>
          Clock: {simulatedClock}
        </span>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '6px' }}>
        <button
          onClick={() => setActiveTab('employees')}
          style={{
            flex: 1,
            padding: '6px',
            borderRadius: '6px',
            border: '1px solid',
            borderColor: activeTab === 'employees' ? 'var(--accent)' : 'var(--border)',
            background: activeTab === 'employees' ? 'var(--accent-glow)' : 'transparent',
            color: activeTab === 'employees' ? 'var(--white)' : 'var(--white-dimmer)',
            fontSize: '9px',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'all 0.2s ease',
          }}
        >
          Team Directory
        </button>
        <button
          onClick={() => setActiveTab('workflows')}
          style={{
            flex: 1,
            padding: '6px',
            borderRadius: '6px',
            border: '1px solid',
            borderColor: activeTab === 'workflows' ? 'var(--accent)' : 'var(--border)',
            background: activeTab === 'workflows' ? 'var(--accent-glow)' : 'transparent',
            color: activeTab === 'workflows' ? 'var(--white)' : 'var(--white-dimmer)',
            fontSize: '9px',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'all 0.2s ease',
          }}
        >
          Pending Actions
        </button>
      </div>

      {/* Roster / Workflow display */}
      <div
        style={{
          padding: '12px',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          background: 'var(--simulator-log-bg)',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        {activeTab === 'employees' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {employees.map((emp, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'var(--simulator-item-bg)',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  border: '1px solid var(--border)',
                }}
              >
                <div>
                  <div style={{ color: 'var(--white)', fontWeight: 'bold' }}>{emp.name}</div>
                  <div style={{ color: 'var(--white-dimmer)', fontSize: '8px', marginTop: '2px' }}>
                    {emp.role}
                  </div>
                </div>
                <span
                  style={{
                    fontSize: '8px',
                    color:
                      emp.status === 'Active'
                        ? '#10b981'
                        : emp.status === 'Meeting'
                          ? '#f59e0b'
                          : 'var(--white-dimmer)',
                    background:
                      emp.status === 'Active'
                        ? 'rgba(16,185,129,0.08)'
                        : emp.status === 'Meeting'
                          ? 'rgba(245,158,11,0.08)'
                          : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${emp.status === 'Active' ? 'rgba(16,185,129,0.2)' : emp.status === 'Meeting' ? 'rgba(245,158,11,0.2)' : 'var(--border)'}`,
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontWeight: 'bold',
                  }}
                >
                  {emp.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div
              style={{
                background: 'rgba(245, 158, 11, 0.03)',
                border: '1px solid rgba(245,158,11,0.15)',
                padding: '10px',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <strong style={{ color: 'var(--white)' }}>Q3 Strategy Deck Approval</strong>
                <div style={{ fontSize: '8px', color: 'var(--white-dimmer)', marginTop: '2px' }}>
                  Assigned to: Harsh Dev Jha
                </div>
              </div>
              <span
                style={{
                  fontSize: '8px',
                  color: '#f59e0b',
                  background: 'rgba(245,158,11,0.08)',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontWeight: 'bold',
                }}
              >
                Pending
              </span>
            </div>
            <div
              style={{
                background: 'rgba(255,255,255,0.01)',
                border: '1px solid var(--border)',
                padding: '10px',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <strong style={{ color: 'var(--white)' }}>Verify SecOps Compliance</strong>
                <div style={{ fontSize: '8px', color: 'var(--white-dimmer)', marginTop: '2px' }}>
                  Audit log check: #A204
                </div>
              </div>
              <span
                style={{
                  fontSize: '8px',
                  color: '#10b981',
                  background: 'rgba(16,185,129,0.08)',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontWeight: 'bold',
                }}
              >
                Ready
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 3. MindSpace Pulse & Stress Preview
// ==========================================
export function MindSpacePreview() {
  const [bpm, setBpm] = useState(72);
  const [bpSys, setBpSys] = useState(120);
  const bpDia = 80;
  const [pulse, setPulse] = useState(false);

  // Heartbeat pulse cycle
  useEffect(() => {
    const pulseInterval = setInterval(
      () => {
        setPulse(true);
        setTimeout(() => setPulse(false), 200);
      },
      (60 / bpm) * 1000
    );
    return () => clearInterval(pulseInterval);
  }, [bpm]);

  // Derived stress score calculated during render
  const bpComponent = Math.max(bpSys - 120, 0) * 1.5 + Math.max(bpDia - 80, 0) * 2;
  const bpmComponent = Math.max(bpm - 70, 0) * 1.2;
  const stressScore = Math.min(Math.round(15 + bpComponent + bpmComponent), 100);

  const getRiskStatus = (score: number) => {
    if (score < 35)
      return {
        status: 'LOW STRESS',
        color: '#10b981',
        bg: 'rgba(16,185,129,0.06)',
        border: 'rgba(16,185,129,0.2)',
      };
    if (score < 65)
      return {
        status: 'MODERATE',
        color: '#f59e0b',
        bg: 'rgba(245,158,11,0.06)',
        border: 'rgba(245,158,11,0.2)',
      };
    return {
      status: 'HIGH STRESS',
      color: '#ef4444',
      bg: 'rgba(239,68,68,0.06)',
      border: 'rgba(239,68,68,0.2)',
    };
  };

  const risk = getRiskStatus(stressScore);

  return (
    <div
      style={{
        display: 'grid',
        gap: '10px',
        width: '100%',
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
        color: 'var(--white)',
      }}
    >
      {/* Mobile Screen Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 14px',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          background: 'var(--simulator-card-bg)',
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--accent)',
          }}
        >
          <Activity size={14} /> MindSpace App
        </span>
        <span
          style={{
            color: risk.color,
            background: risk.bg,
            border: `1px solid ${risk.border}`,
            fontSize: '9px',
            padding: '2px 6px',
            borderRadius: '4px',
            fontWeight: 'bold',
            transition: 'all 0.3s ease',
          }}
        >
          {risk.status}
        </span>
      </div>

      {/* Main Stats Block */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '10px',
          alignItems: 'stretch',
        }}
      >
        {/* Pulse simulator */}
        <div
          style={{
            padding: '12px',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            background: 'var(--simulator-log-bg)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{
              color: risk.color,
              transform: pulse ? 'scale(1.25)' : 'scale(1.0)',
              transition: 'transform 0.15s ease',
              filter: pulse ? `drop-shadow(0 0 8px ${risk.color})` : 'none',
            }}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <div
            style={{
              fontSize: '20px',
              fontWeight: 'bold',
              marginTop: '10px',
              color: 'var(--white)',
            }}
          >
            {bpm}{' '}
            <span style={{ fontSize: '10px', color: 'var(--white-dimmer)', fontWeight: 'normal' }}>
              BPM
            </span>
          </div>
          <span
            style={{
              fontSize: '8px',
              color: 'var(--white-dimmer)',
              marginTop: '4px',
              textTransform: 'uppercase',
            }}
          >
            Pulse Telemetry
          </span>
        </div>

        {/* BP indicators */}
        <div
          style={{
            padding: '12px',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            background: 'var(--simulator-log-bg)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ fontSize: '8px', color: 'var(--white-dimmer)' }}>BLOOD PRESSURE</div>
            <strong
              style={{
                fontSize: '14px',
                color: 'var(--white)',
                display: 'block',
                marginTop: '4px',
              }}
            >
              {bpSys} / {bpDia}
            </strong>
            <span style={{ fontSize: '8px', color: 'var(--white-dimmer)' }}>SYS/DIA mmHg</span>
          </div>
          <div>
            <div style={{ fontSize: '8px', color: 'var(--white-dimmer)' }}>STRESS INDEX</div>
            <strong
              style={{
                fontSize: '14px',
                color: 'var(--accent)',
                display: 'block',
                marginTop: '2px',
              }}
            >
              {stressScore}%
            </strong>
          </div>
        </div>
      </div>

      {/* Biometric Controls */}
      <div
        style={{
          padding: '12px',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          background: 'var(--simulator-controls-bg)',
          display: 'grid',
          gap: '8px',
        }}
      >
        <div style={{ display: 'grid', gap: '2px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              color: 'var(--white-dimmer)',
              fontSize: '8px',
            }}
          >
            <span>SIMULATED HEART RATE</span>
            <span style={{ color: 'var(--white)' }}>{bpm} BPM</span>
          </div>
          <input
            type="range"
            min="50"
            max="120"
            value={bpm}
            onChange={(e) => setBpm(Number(e.target.value))}
            style={{
              width: '100%',
              accentColor: 'var(--accent)',
              height: '2px',
              background: 'var(--border)',
              outline: 'none',
            }}
          />
        </div>

        <div style={{ display: 'grid', gap: '2px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              color: 'var(--white-dimmer)',
              fontSize: '8px',
            }}
          >
            <span>SIMULATED SYSTOLIC PRESSURE</span>
            <span style={{ color: 'var(--white)' }}>{bpSys} mmHg</span>
          </div>
          <input
            type="range"
            min="90"
            max="160"
            value={bpSys}
            onChange={(e) => setBpSys(Number(e.target.value))}
            style={{
              width: '100%',
              accentColor: 'var(--accent)',
              height: '2px',
              background: 'var(--border)',
              outline: 'none',
            }}
          />
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. Entab-D Browser Tab Organizer Preview
// ==========================================
export function EntabDPreview() {
  const [organized, setOrganized] = useState(false);
  const [organizing, setOrganizing] = useState(false);

  const disorganisedTabs = [
    { title: 'eOzka Portfolio', domain: 'eozka.com', color: '#d4c9a8' },
    { title: 'Vibhu-Oska Spec', domain: 'github.com', color: '#7e7e8c' },
    { title: 'CORS Configuration', domain: 'stackexchange.com', color: '#e08244' },
    { title: 'Google Fonts: Inter', domain: 'google.com', color: '#4285F4' },
    { title: 'GitHub Repo Home', domain: 'github.com', color: '#7e7e8c' },
    { title: 'eOzka Main Board', domain: 'eozka.com', color: '#d4c9a8' },
  ];

  const organisedGroups = [
    {
      domain: 'eozka.com',
      count: 2,
      color: '#d4c9a8',
      tabs: ['eOzka Portfolio', 'eOzka Main Board'],
    },
    {
      domain: 'github.com',
      count: 2,
      color: '#7e7e8c',
      tabs: ['Vibhu-Oska Spec', 'GitHub Repo Home'],
    },
    { domain: 'google.com', count: 1, color: '#4285F4', tabs: ['Google Fonts: Inter'] },
    { domain: 'stackexchange.com', count: 1, color: '#e08244', tabs: ['CORS Configuration'] },
  ];

  const triggerOrganize = () => {
    if (organizing) return;
    setOrganizing(true);
    setTimeout(() => {
      setOrganizing(false);
      setOrganized(true);
    }, 1200);
  };

  const resetTabs = () => {
    setOrganized(false);
  };

  return (
    <div
      style={{
        display: 'grid',
        gap: '12px',
        width: '100%',
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
        color: 'var(--white)',
      }}
    >
      {/* Chrome window header bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 14px',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          background: 'var(--simulator-card-bg)',
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--accent)',
          }}
        >
          <PanelsTopLeft size={14} /> Chrome Extension Node
        </span>
        <div style={{ display: 'flex', gap: '6px' }}>
          {organized ? (
            <button
              onClick={resetTabs}
              style={{
                background: 'transparent',
                color: 'var(--white-dimmer)',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                padding: '4px 8px',
                fontSize: '9px',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              Reset
            </button>
          ) : null}
          <button
            onClick={triggerOrganize}
            disabled={organizing || organized}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: organizing || organized ? 'rgba(255,255,255,0.05)' : 'var(--white)',
              color: organizing || organized ? 'var(--white-dimmer)' : 'var(--black)',
              border: 'none',
              borderRadius: '6px',
              padding: '4px 10px',
              fontSize: '10px',
              cursor: organizing || organized ? 'not-allowed' : 'pointer',
              fontWeight: 'bold',
              transition: 'all 0.2s ease',
            }}
          >
            <FolderSync
              size={10}
              className={organizing ? 'animate-spin' : ''}
              style={{ animation: organizing ? 'spin 1s linear infinite' : 'none' }}
            />
            {organizing ? 'Sorting...' : organized ? 'Tabs Grouped' : 'Organize'}
          </button>
        </div>
      </div>

      {/* Simulated browser content */}
      <div
        style={{
          padding: '12px',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          background: 'var(--simulator-log-bg)',
          minHeight: '145px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          justifyContent: 'center',
        }}
      >
        {organizing ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              padding: '20px 0',
              color: 'var(--white-dimmer)',
            }}
          >
            <RefreshCw
              size={24}
              className="animate-spin"
              style={{ color: 'var(--accent)', animation: 'spin 1.2s linear infinite' }}
            />
            <span>Hashing domain namespaces...</span>
          </div>
        ) : !organized ? (
          /* Disorganized Grid */
          <div>
            <div
              style={{
                fontSize: '8px',
                color: 'var(--white-dimmer)',
                marginBottom: '8px',
                textTransform: 'uppercase',
              }}
            >
              Cluttered Workspace (6 Active Tabs)
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
              {disorganisedTabs.map((tab, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '6px 8px',
                    background: 'var(--simulator-item-bg)',
                    border: '1px solid var(--border)',
                    borderLeft: `2.5px solid ${tab.color}`,
                    borderRadius: '4px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '9.5px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  <span
                    style={{
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      color: 'var(--white-dim)',
                    }}
                  >
                    {tab.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Organized Domain Groups */
          <div>
            <div
              style={{
                fontSize: '8px',
                color: 'var(--white-dimmer)',
                marginBottom: '8px',
                textTransform: 'uppercase',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <span>Domain Roster (4 Groups Created)</span>
              <span style={{ color: '#10b981' }}>✓ 34% RAM SAVED</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {organisedGroups.map((group, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '6px 10px',
                    background: 'var(--simulator-item-bg)',
                    border: '1px solid var(--border)',
                    borderRadius: '6px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: group.color,
                      }}
                    />
                    <span style={{ fontWeight: 'bold', color: 'var(--white)' }}>
                      {group.domain}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: '8px',
                      color: 'var(--accent)',
                      border: '1px solid var(--border)',
                      background: 'var(--simulator-controls-bg)',
                      padding: '1px 5px',
                      borderRadius: '4px',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {group.count} Tab{group.count > 1 ? 's' : ''}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
