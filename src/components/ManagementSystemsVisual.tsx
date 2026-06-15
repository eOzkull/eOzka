'use client';

import { useState } from 'react';
import { Server, RefreshCw, Database } from 'lucide-react';

export default function ManagementSystemsVisual() {
  const [syncing, setSyncing] = useState(false);
  const [activeNode, setActiveNode] = useState<'Core' | 'Edu' | 'Health' | 'Tech'>('Core');
  const [logs, setLogs] = useState<string[]>([
    '[INIT] Node Core online. Registry synced.',
    '[OK] SEC compliance matrix matches hash #F83A',
    '[OK] Edu node replication: 18,204 ledger packets verified.'
  ]);

  const nodes = {
    Core: { name: 'Core Registry', status: 'Synced', records: '254,192', integrity: '99.99%', load: '12%' },
    Edu: { name: 'Edu Subsidiary', status: 'Synced', records: '48,102', integrity: '99.98%', load: '4%' },
    Health: { name: 'Health Subsidiary', status: 'Synced', records: '104,850', integrity: '99.99%', load: '18%' },
    Tech: { name: 'Tech Subsidiary', status: 'Synced', records: '92,340', integrity: '99.95%', load: '22%' },
  };

  const addLog = (msg: string) => {
    setLogs(prev => [msg, ...prev.slice(0, 3)]);
  };

  const handleSync = () => {
    if (syncing) return;
    setSyncing(true);
    addLog('[SYNC] Core initiating cross-node handshake...');
    
    setTimeout(() => {
      addLog('[SYNC] Re-evaluating compliance registry trees...');
    }, 800);

    setTimeout(() => {
      addLog('[OK] All 4 nodes synchronized. Epoch token updated.');
      setSyncing(false);
    }, 1800);
  };

  return (
    <div style={{ display: 'grid', gap: '14px', width: '100%', fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', border: '1px solid var(--border)', borderRadius: '12px', background: 'rgba(255,255,255,0.02)' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--accent)' }}>
          <Database size={15} /> Distributed Core Matrix
        </span>
        <button
          onClick={handleSync}
          disabled={syncing}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: syncing ? 'rgba(255,255,255,0.05)' : 'var(--white)',
            color: syncing ? 'var(--white-dimmer)' : 'var(--black)',
            border: 'none',
            borderRadius: '6px',
            padding: '4px 10px',
            fontSize: '10px',
            cursor: syncing ? 'not-allowed' : 'pointer',
            fontWeight: 'bold',
            transition: 'all 0.2s ease',
          }}
        >
          <RefreshCw size={11} className={syncing ? 'animate-spin' : ''} style={{ animation: syncing ? 'spin 1.5s linear infinite' : 'none' }} />
          {syncing ? 'Syncing...' : 'Sync Nodes'}
        </button>
      </div>

      {/* Network Nodes Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', textAlign: 'center' }}>
        {(Object.keys(nodes) as Array<keyof typeof nodes>).map((key) => {
          const node = nodes[key];
          const isActive = activeNode === key;
          return (
            <div
              key={key}
              onClick={() => setActiveNode(key)}
              style={{
                padding: '10px 6px',
                border: '1px solid',
                borderColor: isActive ? 'var(--accent)' : 'var(--border)',
                borderRadius: '8px',
                background: isActive ? 'rgba(212,201,168,0.06)' : 'rgba(0,0,0,0.15)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <Server size={14} style={{ color: isActive ? 'var(--accent)' : 'var(--white-dimmer)', marginBottom: '6px' }} />
              <div style={{ fontSize: '9px', fontWeight: 'bold', color: 'var(--white)' }}>{key} Node</div>
              <div style={{ fontSize: '8px', color: syncing ? '#f59e0b' : '#10b981', marginTop: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3px' }}>
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: syncing ? '#f59e0b' : '#10b981', display: 'inline-block' }} />
                {syncing ? 'Syncing' : 'Online'}
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Node Metadata */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', padding: '12px', border: '1px solid var(--border)', borderRadius: '12px', background: 'rgba(0,0,0,0.2)' }}>
        <div>
          <div style={{ color: 'var(--white-dimmer)', fontSize: '8px' }}>RECORD COUNT</div>
          <strong style={{ color: 'var(--white)' }}>{nodes[activeNode].records}</strong>
        </div>
        <div>
          <div style={{ color: 'var(--white-dimmer)', fontSize: '8px' }}>INTEGRITY HASH</div>
          <strong style={{ color: 'var(--accent)' }}>{nodes[activeNode].integrity}</strong>
        </div>
        <div>
          <div style={{ color: 'var(--white-dimmer)', fontSize: '8px' }}>CPU LOAD</div>
          <strong style={{ color: 'var(--white)' }}>{nodes[activeNode].load}</strong>
        </div>
      </div>

      {/* Compliance Stream */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', padding: '12px', border: '1px solid var(--border)', borderRadius: '12px', background: 'rgba(0,0,0,0.35)', fontSize: '9px', minHeight: '82px', justifyContent: 'flex-start' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--accent-dim)', borderBottom: '1px solid var(--border)', paddingBottom: '4px', marginBottom: '2px', fontWeight: 'bold' }}>
          <span>COMPLIANCE REGISTRY STREAM</span>
          <span>ACTIVE</span>
        </div>
        {logs.map((log, idx) => (
          <div key={idx} style={{ color: log.startsWith('[OK]') ? '#10b981' : log.startsWith('[SYNC]') ? '#f59e0b' : 'var(--white-dim)' }}>
            {log}
          </div>
        ))}
      </div>
    </div>
  );
}
