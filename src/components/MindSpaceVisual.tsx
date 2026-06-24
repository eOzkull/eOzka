'use client';

import { useState } from 'react';
import { Sparkles, Brain } from 'lucide-react';

export default function MindSpaceVisual() {
  const [activeDay, setActiveDay] = useState<number>(4); // Friday default
  const [reflectionValue, setReflectionValue] = useState<number>(75);
  const [currentMood, setCurrentMood] = useState<'Calm' | 'Anxious' | 'Creative' | 'Reflective'>(
    'Calm'
  );

  const days = [
    { label: 'M', value: 40, mood: 'Reflective', note: 'Calm evening walk' },
    { label: 'T', value: 30, mood: 'Anxious', note: 'Back-to-back meetings' },
    { label: 'W', value: 65, mood: 'Creative', note: 'New feature prototype' },
    { label: 'T', value: 55, mood: 'Calm', note: 'Quiet coding focus' },
    { label: 'F', value: 85, mood: 'Creative', note: 'Project demo and release' },
    { label: 'S', value: 90, mood: 'Calm', note: 'Rest and nature time' },
    { label: 'S', value: 75, mood: 'Reflective', note: 'Weekly goals overview' },
  ];

  const moodResponses = {
    Calm: 'A quiet mind builds stable systems. Your focus is steady and clear.',
    Anxious: 'Pressure is just noisy telemetry. Take a breath; verify one step at a time.',
    Creative: 'Non-Euclidean ideas are forming. Code the prototype while the spark is hot.',
    Reflective:
      'Looking back calibrates the next trajectory. Retrospectives yield compound returns.',
  };

  // Generate SVG path for trend line
  const width = 220;
  const height = 90;
  const padding = 15;
  const points = days.map((day, idx) => {
    const x = padding + (idx * (width - padding * 2)) / 6;
    const y = height - padding - (day.value * (height - padding * 2)) / 100;
    return { x, y };
  });

  const pathD = `M ${points.map((p) => `${p.x} ${p.y}`).join(' L ')}`;

  // Circular Dial Math
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (reflectionValue / 100) * circumference;

  return (
    <div
      style={{
        display: 'grid',
        gap: '14px',
        width: '100%',
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 14px',
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
          <Brain size={15} /> Mood Telemetry
        </span>
        <span style={{ color: 'var(--white-dimmer)', fontSize: '10px' }}>Calm mode active</span>
      </div>

      {/* Main Grid: Left Trend, Right Dial */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '12px',
          alignItems: 'stretch',
        }}
      >
        {/* Trend Area */}
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
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              color: 'var(--white-dimmer)',
              fontSize: '9px',
              marginBottom: '8px',
            }}
          >
            <span>WEEKLY TREND</span>
            <span style={{ color: 'var(--accent)' }}>{days[activeDay].mood}</span>
          </div>

          {/* SVG Chart */}
          <div style={{ position: 'relative', height: '90px', width: '100%' }}>
            <svg
              width="100%"
              height="90"
              viewBox={`0 0 ${width} ${height}`}
              preserveAspectRatio="none"
              style={{ overflow: 'visible' }}
            >
              {/* Grid Lines */}
              <line
                x1={padding}
                y1={padding}
                x2={width - padding}
                y2={padding}
                stroke="var(--border)"
                strokeDasharray="2 2"
              />
              <line
                x1={padding}
                y1={height / 2}
                x2={width - padding}
                y2={height / 2}
                stroke="var(--border)"
                strokeDasharray="2 2"
              />
              <line
                x1={padding}
                y1={height - padding}
                x2={width - padding}
                y2={height - padding}
                stroke="var(--border)"
                strokeDasharray="2 2"
              />

              {/* Smooth trend path */}
              <path d={pathD} fill="none" stroke="var(--accent)" strokeWidth="2" opacity="0.85" />

              {/* Dots */}
              {points.map((p, idx) => (
                <circle
                  key={idx}
                  cx={p.x}
                  cy={p.y}
                  r={idx === activeDay ? '5' : '3.5'}
                  fill={idx === activeDay ? 'var(--white)' : 'var(--accent-dim)'}
                  stroke="var(--black)"
                  strokeWidth="1.5"
                  style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
                  onClick={() => setActiveDay(idx)}
                />
              ))}
            </svg>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '0 6px',
              color: 'var(--white-dimmer)',
              fontSize: '9px',
            }}
          >
            {days.map((day, idx) => (
              <span
                key={idx}
                onClick={() => setActiveDay(idx)}
                style={{
                  cursor: 'pointer',
                  color: idx === activeDay ? 'var(--white)' : 'var(--white-dimmer)',
                  fontWeight: idx === activeDay ? 'bold' : 'normal',
                }}
              >
                {day.label}
              </span>
            ))}
          </div>
        </div>

        {/* Dial Area */}
        <div
          style={{
            padding: '12px',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            background: 'var(--simulator-log-bg)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            textAlign: 'center',
          }}
        >
          <span
            style={{
              fontSize: '9px',
              color: 'var(--white-dimmer)',
              alignSelf: 'flex-start',
              textTransform: 'uppercase',
            }}
          >
            Reflection Dial
          </span>

          <div style={{ position: 'relative', width: '64px', height: '64px', margin: '4px 0' }}>
            <svg width="64" height="64" viewBox="0 0 64 64">
              <circle
                cx="32"
                cy="32"
                r={radius}
                fill="none"
                stroke="var(--border)"
                strokeWidth="3"
              />
              <circle
                cx="32"
                cy="32"
                r={radius}
                fill="none"
                stroke="var(--accent)"
                strokeWidth="3.5"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                transform="rotate(-90 32 32)"
                style={{ transition: 'stroke-dashoffset 0.35s ease' }}
              />
            </svg>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--white)' }}>
                {reflectionValue}%
              </span>
            </div>
          </div>

          <div style={{ width: '100%' }}>
            <input
              type="range"
              min="10"
              max="100"
              value={reflectionValue}
              onChange={(e) => setReflectionValue(Number(e.target.value))}
              style={{
                width: '100%',
                accentColor: 'var(--accent)',
                height: '3px',
                background: 'var(--border)',
                border: 'none',
                outline: 'none',
                cursor: 'pointer',
              }}
            />
            <div style={{ fontSize: '8px', color: 'var(--white-dimmer)', marginTop: '4px' }}>
              DEPTH SLIDER
            </div>
          </div>
        </div>
      </div>

      {/* Selected Day Info & Mood prompt */}
      <div
        style={{
          padding: '12px',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          background: 'var(--simulator-card-bg)',
          display: 'grid',
          gap: '8px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            color: 'var(--accent-dim)',
            fontSize: '10px',
          }}
        >
          <span>REFLECTIVE NOTES</span>
          <span style={{ color: 'var(--white-dim)' }}>Score: {days[activeDay].value}/100</span>
        </div>
        <p style={{ color: 'var(--white)', fontStyle: 'italic', fontSize: '10.5px', margin: 0 }}>
          &ldquo;{days[activeDay].note}&rdquo;
        </p>
      </div>

      {/* Interactive Chat Prompt Area */}
      <div
        style={{
          display: 'grid',
          gap: '8px',
          padding: '12px',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          background: 'var(--simulator-controls-bg)',
        }}
      >
        <div style={{ display: 'flex', gap: '6px' }}>
          {(['Calm', 'Anxious', 'Creative', 'Reflective'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setCurrentMood(m)}
              style={{
                flex: 1,
                padding: '4px 6px',
                border: '1px solid',
                borderColor: currentMood === m ? 'var(--accent)' : 'var(--border)',
                background: currentMood === m ? 'var(--accent-glow)' : 'transparent',
                color: currentMood === m ? 'var(--white)' : 'var(--white-dimmer)',
                borderRadius: '6px',
                fontSize: '9px',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)',
                transition: 'all 0.2s ease',
              }}
            >
              {m}
            </button>
          ))}
        </div>
        <div
          style={{
            display: 'flex',
            gap: '8px',
            alignItems: 'flex-start',
            borderTop: '1px solid var(--border)',
            paddingTop: '8px',
            marginTop: '2px',
          }}
        >
          <Sparkles size={14} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }} />
          <p style={{ color: 'var(--white-dim)', margin: 0, fontSize: '10px', lineHeight: '1.4' }}>
            {moodResponses[currentMood]}
          </p>
        </div>
      </div>
    </div>
  );
}
