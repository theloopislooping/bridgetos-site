import React from 'react';

const FRAMEWORKS = [
  { name: 'LangChain',           category: 'Orchestration'  },
  { name: 'LangGraph',           category: 'Orchestration'  },
  { name: 'LlamaIndex',          category: 'Retrieval'      },
  { name: 'AutoGen',             category: 'Multi-agent'    },
  { name: 'CrewAI',              category: 'Multi-agent'    },
  { name: 'OpenAI Agents SDK',   category: 'Agent runtime'  },
  { name: 'Anthropic Claude',    category: 'Model layer'    },
  { name: 'Semantic Kernel',     category: 'Orchestration'  },
];

export default function Integrations() {
  return (
    <section className="section-divider py-20 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-600 mb-2">
            Integrates with the frameworks you already use
          </p>
          <p className="text-xs text-gray-700 max-w-sm mx-auto">
            BridgetOS wraps the governance layer around your existing stack.
            No model modifications. No agent rewrites.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {FRAMEWORKS.map(({ name, category }) => (
            <div
              key={name}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl transition-all duration-200 hover:border-indigo-500/30 group"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/50 group-hover:bg-indigo-400 transition-colors" />
              <span className="text-sm font-medium text-gray-400 group-hover:text-gray-200 transition-colors">{name}</span>
              <span className="text-xs text-gray-700 hidden sm:inline">{category}</span>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-gray-700 mt-6">
          REST API + WebSocket interface. Bring your own agent framework.
          SDK in development — available to design partners.
        </p>
      </div>
    </section>
  );
}
