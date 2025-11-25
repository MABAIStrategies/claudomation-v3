/**
 * Custom Workflow Diagrams
 *
 * Hand-crafted SVG illustrations for each Schlosser & Associates workflow.
 * Medieval manuscript style with ornate details and contractor-specific stages.
 */

interface WorkflowDiagramProps {
  chapterId: string;
}

export function WorkflowDiagram({ chapterId }: WorkflowDiagramProps) {
  switch (chapterId) {
    case 'chapter-1':
      return <CaptureWorkflow />;
    case 'chapter-2':
      return <BridgeWorkflow />;
    case 'chapter-3':
      return <CloseWorkflow />;
    case 'chapter-4':
      return <CommandCenterWorkflow />;
    case 'chapter-5':
      return <OracleLensWorkflow />;
    case 'chapter-6':
      return <CustomerGatewayWorkflow />;
    default:
      return <GenericWorkflow />;
  }
}

// Chapter 1: The Capture (Estimating & Proposals)
function CaptureWorkflow() {
  return (
    <svg className="w-full h-full" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="scrollGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F6E7C1" />
          <stop offset="50%" stopColor="#FAF0D7" />
          <stop offset="100%" stopColor="#F6E7C1" />
        </linearGradient>
        <filter id="inkBlot">
          <feTurbulence baseFrequency="0.05" numOctaves="2" result="turbulence"/>
          <feDisplacementMap in2="turbulence" in="SourceGraphic" scale="2" xChannelSelector="R" yChannelSelector="G"/>
        </filter>
      </defs>

      {/* Parchment background */}
      <rect width="800" height="400" fill="url(#scrollGradient)" opacity="0.3"/>

      {/* Ornate title scroll */}
      <g transform="translate(400, 30)">
        <path d="M-200,0 Q-180,-15 -160,0 L160,0 Q180,-15 200,0 L200,40 Q180,55 160,40 L-160,40 Q-180,55 -200,40 Z"
              fill="#D4AF37" opacity="0.8"/>
        <text x="0" y="27" textAnchor="middle" className="font-serif text-sm fill-amber-900 font-bold">
          ESTIMATING & PROPOSALS WORKFLOW
        </text>
      </g>

      {/* Stage 1: Web Form Entry */}
      <g transform="translate(100, 150)">
        <circle cx="0" cy="0" r="45" fill="#F6E7C1" stroke="#78350f" strokeWidth="3"/>
        <circle cx="0" cy="0" r="42" fill="none" stroke="#D4AF37" strokeWidth="1" strokeDasharray="4 2"/>
        <text x="0" y="-55" textAnchor="middle" className="font-serif text-xs fill-amber-900 font-bold">
          Customer
        </text>
        <text x="0" y="5" textAnchor="middle" className="font-serif text-sm fill-amber-900">
          📱 Web
        </text>
        <text x="0" y="20" textAnchor="middle" className="font-serif text-xs fill-amber-700">
          Form
        </text>
      </g>

      {/* Arrow 1 */}
      <g transform="translate(150, 150)">
        <line x1="0" y1="0" x2="90" y2="0" stroke="#D4AF37" strokeWidth="2" markerEnd="url(#arrowhead)"/>
        <text x="45" y="-8" textAnchor="middle" className="font-serif text-xs fill-amber-700 italic">
          site visit data
        </text>
      </g>

      {/* Stage 2: AI Processing */}
      <g transform="translate(290, 150)">
        <rect x="-50" y="-50" width="100" height="100" rx="10"
              fill="#FEF3C7" stroke="#78350f" strokeWidth="3"/>
        <rect x="-47" y="-47" width="94" height="94" rx="8"
              fill="none" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3 2"/>
        <text x="0" y="-60" textAnchor="middle" className="font-serif text-xs fill-amber-900 font-bold">
          AI Engine
        </text>
        <text x="0" y="-10" textAnchor="middle" className="font-serif text-sm fill-amber-900">
          🤖 Parse
        </text>
        <text x="0" y="10" textAnchor="middle" className="font-serif text-xs fill-amber-700">
          & Price
        </text>
        <text x="0" y="30" textAnchor="middle" className="font-serif text-xs fill-amber-600">
          via API
        </text>
      </g>

      {/* Arrow 2 */}
      <g transform="translate(345, 150)">
        <line x1="0" y1="0" x2="90" y2="0" stroke="#D4AF37" strokeWidth="2" markerEnd="url(#arrowhead)"/>
        <text x="45" y="-8" textAnchor="middle" className="font-serif text-xs fill-amber-700 italic">
          pricing data
        </text>
      </g>

      {/* Stage 3: PDF Generation */}
      <g transform="translate(485, 150)">
        <polygon points="0,-50 50,0 0,50 -50,0"
                 fill="#FBBF24" stroke="#78350f" strokeWidth="3"/>
        <polygon points="0,-47 47,0 0,47 -47,0"
                 fill="none" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3 2"/>
        <text x="0" y="-60" textAnchor="middle" className="font-serif text-xs fill-amber-900 font-bold">
          Generator
        </text>
        <text x="0" y="5" textAnchor="middle" className="font-serif text-sm fill-amber-900">
          📄 PDF
        </text>
      </g>

      {/* Arrow 3 */}
      <g transform="translate(540, 150)">
        <line x1="0" y1="0" x2="90" y2="0" stroke="#D4AF37" strokeWidth="2" markerEnd="url(#arrowhead)"/>
        <text x="45" y="-8" textAnchor="middle" className="font-serif text-xs fill-amber-700 italic">
          proposal PDF
        </text>
      </g>

      {/* Stage 4: DocuSign */}
      <g transform="translate(680, 150)">
        <circle cx="0" cy="0" r="45" fill="#F59E0B" stroke="#78350f" strokeWidth="3"/>
        <circle cx="0" cy="0" r="42" fill="none" stroke="#D4AF37" strokeWidth="1" strokeDasharray="4 2"/>
        <text x="0" y="-55" textAnchor="middle" className="font-serif text-xs fill-amber-900 font-bold">
          E-Signature
        </text>
        <text x="0" y="5" textAnchor="middle" className="font-serif text-sm fill-white">
          ✍️ Sign
        </text>
        <text x="0" y="20" textAnchor="middle" className="font-serif text-xs fill-amber-100">
          & Close
        </text>
      </g>

      {/* Decorative flourishes */}
      <g opacity="0.3">
        <path d="M50,320 Q100,310 150,320" stroke="#D4AF37" strokeWidth="1" fill="none"/>
        <path d="M650,320 Q700,310 750,320" stroke="#D4AF37" strokeWidth="1" fill="none"/>
        <circle cx="50" cy="320" r="2" fill="#D4AF37"/>
        <circle cx="750" cy="320" r="2" fill="#D4AF37"/>
      </g>

      {/* Arrow marker definition */}
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
          <polygon points="0 0, 10 3, 0 6" fill="#D4AF37"/>
        </marker>
      </defs>

      {/* Time savings annotation */}
      <g transform="translate(400, 350)">
        <text x="0" y="0" textAnchor="middle" className="font-serif text-xs fill-emerald-700 font-bold">
          ⏱️ Reduces 2-3 hour proposal process to 15 minutes
        </text>
      </g>
    </svg>
  );
}

// Chapter 2: The Bridge (Dispatch & Work Orders)
function BridgeWorkflow() {
  return (
    <svg className="w-full h-full" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bridgeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E0F2FE" />
          <stop offset="50%" stopColor="#BAE6FD" />
          <stop offset="100%" stopColor="#E0F2FE" />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="800" height="400" fill="url(#bridgeGradient)" opacity="0.2"/>

      {/* Title */}
      <g transform="translate(400, 30)">
        <rect x="-180" y="-5" width="360" height="35" rx="5" fill="#0EA5E9" opacity="0.7"/>
        <text x="0" y="20" textAnchor="middle" className="font-serif text-sm fill-white font-bold">
          DISPATCH & WORK ORDERS WORKFLOW
        </text>
      </g>

      {/* Stage 1: Job Intake */}
      <g transform="translate(100, 180)">
        <rect x="-40" y="-50" width="80" height="100" rx="8" fill="#DBEAFE" stroke="#0369A1" strokeWidth="2.5"/>
        <text x="0" y="-60" textAnchor="middle" className="font-serif text-xs fill-blue-900 font-bold">Job Intake</text>
        <text x="0" y="-10" textAnchor="middle" className="font-serif text-sm">📋</text>
        <text x="0" y="10" textAnchor="middle" className="font-serif text-xs fill-blue-800">Schedule</text>
        <text x="0" y="25" textAnchor="middle" className="font-serif text-xs fill-blue-700">Request</text>
      </g>

      {/* Stage 2: Auto-Assign */}
      <g transform="translate(280, 180)">
        <circle cx="0" cy="0" r="50" fill="#38BDF8" stroke="#0369A1" strokeWidth="2.5"/>
        <text x="0" y="-60" textAnchor="middle" className="font-serif text-xs fill-blue-900 font-bold">AI Assignment</text>
        <text x="0" y="-8" textAnchor="middle" className="font-serif text-lg">🎯</text>
        <text x="0" y="12" textAnchor="middle" className="font-serif text-xs fill-white">Auto</text>
        <text x="0" y="27" textAnchor="middle" className="font-serif text-xs fill-blue-100">Route</text>
      </g>

      {/* Stage 3: Tech Notification */}
      <g transform="translate(460, 180)">
        <polygon points="0,-55 50,-10 30,50 -30,50 -50,-10" fill="#0EA5E9" stroke="#0369A1" strokeWidth="2.5"/>
        <text x="0" y="-65" textAnchor="middle" className="font-serif text-xs fill-blue-900 font-bold">Mobile Alert</text>
        <text x="0" y="0" textAnchor="middle" className="font-serif text-xl">📱</text>
        <text x="0" y="20" textAnchor="middle" className="font-serif text-xs fill-white">Push</text>
      </g>

      {/* Stage 4: Field Execution */}
      <g transform="translate(640, 180)">
        <rect x="-45" y="-45" width="90" height="90" rx="10" fill="#0284C7" stroke="#0369A1" strokeWidth="2.5"/>
        <text x="0" y="-55" textAnchor="middle" className="font-serif text-xs fill-blue-900 font-bold">On-Site</text>
        <text x="0" y="-8" textAnchor="middle" className="font-serif text-lg">🔧</text>
        <text x="0" y="12" textAnchor="middle" className="font-serif text-xs fill-white">Complete</text>
        <text x="0" y="27" textAnchor="middle" className="font-serif text-xs fill-blue-100">& Update</text>
      </g>

      {/* Connecting arrows */}
      <defs>
        <marker id="blueArrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
          <polygon points="0 0, 10 3, 0 6" fill="#0369A1"/>
        </marker>
      </defs>
      <line x1="140" y1="180" x2="225" y2="180" stroke="#0369A1" strokeWidth="2" markerEnd="url(#blueArrow)"/>
      <line x1="330" y1="180" x2="405" y2="180" stroke="#0369A1" strokeWidth="2" markerEnd="url(#blueArrow)"/>
      <line x1="515" y1="180" x2="590" y2="180" stroke="#0369A1" strokeWidth="2" markerEnd="url(#blueArrow)"/>

      {/* Benefit callout */}
      <g transform="translate(400, 330)">
        <rect x="-150" y="-15" width="300" height="30" rx="15" fill="#ECFDF5" stroke="#059669" strokeWidth="2"/>
        <text x="0" y="5" textAnchor="middle" className="font-serif text-xs fill-emerald-800 font-bold">
          ⚡ Eliminates 90% of dispatch phone calls
        </text>
      </g>
    </svg>
  );
}

// Chapter 3: The Close (Billing & Collections)
function CloseWorkflow() {
  return (
    <svg className="w-full h-full" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="closeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FEF3C7" />
          <stop offset="50%" stopColor="#FDE68A" />
          <stop offset="100%" stopColor="#FEF3C7" />
        </linearGradient>
      </defs>

      <rect width="800" height="400" fill="url(#closeGradient)" opacity="0.2"/>

      {/* Title banner */}
      <g transform="translate(400, 30)">
        <ellipse cx="0" cy="15" rx="190" ry="20" fill="#F59E0B" opacity="0.8"/>
        <text x="0" y="22" textAnchor="middle" className="font-serif text-sm fill-white font-bold">
          BILLING & COLLECTIONS WORKFLOW
        </text>
      </g>

      {/* Stage 1: Job Completion */}
      <g transform="translate(120, 180)">
        <polygon points="0,-50 43.3,-25 43.3,25 0,50 -43.3,25 -43.3,-25"
                 fill="#FEF3C7" stroke="#92400E" strokeWidth="2.5"/>
        <text x="0" y="-60" textAnchor="middle" className="font-serif text-xs fill-amber-900 font-bold">Job Done</text>
        <text x="0" y="5" textAnchor="middle" className="font-serif text-lg">✅</text>
        <text x="0" y="25" textAnchor="middle" className="font-serif text-xs fill-amber-800">Verified</text>
      </g>

      {/* Stage 2: Auto Invoice */}
      <g transform="translate(290, 180)">
        <circle cx="0" cy="0" r="50" fill="#FBBF24" stroke="#92400E" strokeWidth="2.5"/>
        <text x="0" y="-60" textAnchor="middle" className="font-serif text-xs fill-amber-900 font-bold">Generate</text>
        <text x="0" y="-5" textAnchor="middle" className="font-serif text-xl">🧾</text>
        <text x="0" y="15" textAnchor="middle" className="font-serif text-xs fill-amber-900">Invoice</text>
        <text x="0" y="30" textAnchor="middle" className="font-serif text-xs fill-amber-700">Auto</text>
      </g>

      {/* Stage 3: Send & Track */}
      <g transform="translate(460, 180)">
        <rect x="-45" y="-45" width="90" height="90" rx="12" fill="#F59E0B" stroke="#92400E" strokeWidth="2.5"/>
        <text x="0" y="-55" textAnchor="middle" className="font-serif text-xs fill-amber-900 font-bold">Delivery</text>
        <text x="0" y="-5" textAnchor="middle" className="font-serif text-xl">📧</text>
        <text x="0" y="15" textAnchor="middle" className="font-serif text-xs fill-white">Email</text>
        <text x="0" y="30" textAnchor="middle" className="font-serif text-xs fill-amber-100">+ Track</text>
      </g>

      {/* Stage 4: Payment */}
      <g transform="translate(650, 180)">
        <circle cx="0" cy="0" r="50" fill="#D97706" stroke="#92400E" strokeWidth="2.5"/>
        <text x="0" y="-60" textAnchor="middle" className="font-serif text-xs fill-amber-900 font-bold">Collection</text>
        <text x="0" y="-5" textAnchor="middle" className="font-serif text-xl">💳</text>
        <text x="0" y="15" textAnchor="middle" className="font-serif text-xs fill-white">Paid</text>
      </g>

      {/* Auto-reminder loop */}
      <path d="M460 240 Q460 290 650 290 Q650 240 650 230"
            stroke="#DC2626" strokeWidth="2" strokeDasharray="5 3" fill="none" markerEnd="url(#redArrow)"/>
      <text x="555" y="295" textAnchor="middle" className="font-serif text-xs fill-red-700 italic">
        Auto-reminders if unpaid
      </text>

      <defs>
        <marker id="goldArrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
          <polygon points="0 0, 10 3, 0 6" fill="#92400E"/>
        </marker>
        <marker id="redArrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
          <polygon points="0 0, 10 3, 0 6" fill="#DC2626"/>
        </marker>
      </defs>

      {/* Arrows */}
      <line x1="165" y1="180" x2="235" y2="180" stroke="#92400E" strokeWidth="2" markerEnd="url(#goldArrow)"/>
      <line x1="340" y1="180" x2="410" y2="180" stroke="#92400E" strokeWidth="2" markerEnd="url(#goldArrow)"/>
      <line x1="510" y1="180" x2="595" y2="180" stroke="#92400E" strokeWidth="2" markerEnd="url(#goldArrow)"/>

      {/* ROI highlight */}
      <g transform="translate(400, 340)">
        <text x="0" y="0" textAnchor="middle" className="font-serif text-xs fill-emerald-700 font-bold">
          💰 Reduces A/R collection time by 40%
        </text>
      </g>
    </svg>
  );
}

// Chapter 4: Command Center (Dashboard)
function CommandCenterWorkflow() {
  return (
    <svg className="w-full h-full" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="400" fill="#1E293B" opacity="0.05"/>

      {/* Central hub */}
      <g transform="translate(400, 200)">
        <circle cx="0" cy="0" r="70" fill="#334155" opacity="0.9"/>
        <circle cx="0" cy="0" r="65" fill="#1E293B"/>
        <text x="0" y="-10" textAnchor="middle" className="font-serif text-lg fill-blue-400">📊</text>
        <text x="0" y="10" textAnchor="middle" className="font-serif text-xs fill-slate-300">Command</text>
        <text x="0" y="25" textAnchor="middle" className="font-serif text-xs fill-slate-400">Center</text>
      </g>

      {/* Data sources radiating out */}
      {[
        { angle: 0, label: 'Jobs', icon: '📋', color: '#3B82F6' },
        { angle: 60, label: 'Techs', icon: '👷', color: '#8B5CF6' },
        { angle: 120, label: 'Revenue', icon: '💵', color: '#10B981' },
        { angle: 180, label: 'Inventory', icon: '📦', color: '#F59E0B' },
        { angle: 240, label: 'KPIs', icon: '📈', color: '#EF4444' },
        { angle: 300, label: 'Alerts', icon: '🔔', color: '#EC4899' },
      ].map((item, i) => {
        const x = 400 + Math.cos((item.angle * Math.PI) / 180) * 200;
        const y = 200 + Math.sin((item.angle * Math.PI) / 180) * 130;
        const lineX = 400 + Math.cos((item.angle * Math.PI) / 180) * 70;
        const lineY = 200 + Math.sin((item.angle * Math.PI) / 180) * 70;

        return (
          <g key={i}>
            <line x1={lineX} y1={lineY} x2={x-30*Math.cos((item.angle * Math.PI) / 180)}
                  y2={y-30*Math.sin((item.angle * Math.PI) / 180)}
                  stroke={item.color} strokeWidth="2" strokeDasharray="4 2"/>
            <circle cx={x} cy={y} r="35" fill={item.color} opacity="0.2" stroke={item.color} strokeWidth="2"/>
            <text x={x} y={y-5} textAnchor="middle" className="font-serif text-sm">{item.icon}</text>
            <text x={x} y={y+15} textAnchor="middle" className="font-serif text-xs fill-slate-700">{item.label}</text>
          </g>
        );
      })}

      <g transform="translate(400, 360)">
        <text x="0" y="0" textAnchor="middle" className="font-serif text-xs fill-indigo-700 font-bold">
          🎯 Real-time visibility across all operations
        </text>
      </g>
    </svg>
  );
}

// Chapter 5: Oracle's Lens (AI Insights)
function OracleLensWorkflow() {
  return (
    <svg className="w-full h-full" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="oracleGlow">
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.3"/>
          <stop offset="100%" stopColor="#6366F1" stopOpacity="0"/>
        </radialGradient>
      </defs>

      <rect width="800" height="400" fill="url(#oracleGlow)"/>

      {/* Crystal ball center */}
      <g transform="translate(400, 180)">
        <circle cx="0" cy="0" r="80" fill="#8B5CF6" opacity="0.1"/>
        <circle cx="0" cy="0" r="65" fill="#A78BFA" opacity="0.3"/>
        <circle cx="0" cy="0" r="50" fill="#DDD6FE"/>
        <text x="0" y="-10" textAnchor="middle" className="font-serif text-2xl">🔮</text>
        <text x="0" y="15" textAnchor="middle" className="font-serif text-xs fill-purple-900 font-bold">AI Insights</text>
      </g>

      {/* Prediction beams */}
      {[
        { x: 150, y: 100, label: 'Demand\nForecast', icon: '📊' },
        { x: 650, y: 100, label: 'Churn\nRisk', icon: '⚠️' },
        { x: 150, y: 260, label: 'Cost\nPrediction', icon: '💰' },
        { x: 650, y: 260, label: 'Route\nOptimize', icon: '🗺️' },
      ].map((pred, i) => (
        <g key={i}>
          <line x1="400" y1="180" x2={pred.x} y2={pred.y}
                stroke="#8B5CF6" strokeWidth="2" opacity="0.5" strokeDasharray="5 5"/>
          <rect x={pred.x-40} y={pred.y-30} width="80" height="60" rx="8"
                fill="#F3E8FF" stroke="#8B5CF6" strokeWidth="2"/>
          <text x={pred.x} y={pred.y-5} textAnchor="middle" className="font-serif text-lg">{pred.icon}</text>
          <text x={pred.x} y={pred.y+15} textAnchor="middle" className="font-serif text-xs fill-purple-900">
            {pred.label.split('\n').map((line, j) => (
              <tspan key={j} x={pred.x} dy={j ? 12 : 0}>{line}</tspan>
            ))}
          </text>
        </g>
      ))}

      <g transform="translate(400, 350)">
        <text x="0" y="0" textAnchor="middle" className="font-serif text-xs fill-purple-700 font-bold">
          🧠 Predictive analytics for proactive decision-making
        </text>
      </g>
    </svg>
  );
}

// Chapter 6: Customer Gateway (Portal)
function CustomerGatewayWorkflow() {
  return (
    <svg className="w-full h-full" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="portalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ECFDF5"/>
          <stop offset="100%" stopColor="#D1FAE5"/>
        </linearGradient>
      </defs>

      <rect width="800" height="400" fill="url(#portalGradient)" opacity="0.3"/>

      {/* Portal archway */}
      <g transform="translate(400, 200)">
        <path d="M-80,100 L-80,0 Q-80,-80 0,-80 Q80,-80 80,0 L80,100"
              fill="none" stroke="#059669" strokeWidth="4"/>
        <text x="0" y="-95" textAnchor="middle" className="font-serif text-sm fill-emerald-900 font-bold">
          CUSTOMER PORTAL
        </text>
      </g>

      {/* Portal features */}
      {[
        { x: 200, y: 120, label: 'View Jobs', icon: '📋' },
        { x: 350, y: 90, label: 'Pay Online', icon: '💳' },
        { x: 450, y: 90, label: 'History', icon: '📜' },
        { x: 600, y: 120, label: 'Review', icon: '⭐' },
        { x: 250, y: 220, label: 'Schedule', icon: '📅' },
        { x: 550, y: 220, label: 'Support', icon: '💬' },
      ].map((feat, i) => (
        <g key={i}>
          <circle cx={feat.x} cy={feat.y} r="30" fill="#10B981" opacity="0.2"
                  stroke="#059669" strokeWidth="2"/>
          <text x={feat.x} y={feat.y-5} textAnchor="middle" className="font-serif text-lg">
            {feat.icon}
          </text>
          <text x={feat.x} y={feat.y+15} textAnchor="middle" className="font-serif text-xs fill-emerald-900">
            {feat.label}
          </text>
        </g>
      ))}

      {/* Customer icon */}
      <g transform="translate(400, 200)">
        <circle cx="0" cy="0" r="25" fill="#ECFDF5" stroke="#059669" strokeWidth="2"/>
        <text x="0" y="8" textAnchor="middle" className="font-serif text-xl">👤</text>
      </g>

      <g transform="translate(400, 340)">
        <text x="0" y="0" textAnchor="middle" className="font-serif text-xs fill-emerald-700 font-bold">
          🌟 Self-service portal reduces support calls by 60%
        </text>
      </g>
    </svg>
  );
}

// Fallback generic workflow
function GenericWorkflow() {
  return (
    <svg className="w-full h-full" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
      <text x="400" y="200" textAnchor="middle" className="font-serif text-lg fill-amber-700">
        Workflow diagram in progress...
      </text>
    </svg>
  );
}
