# n8n Cloud Deployment Guide

## Quick Import Instructions

### Step 1: Create n8n Cloud Account
1. Go to https://app.n8n.cloud/register
2. Sign up with your email
3. Create an account name (e.g., "lead-automation")

### Step 2: Import Workflows
1. In n8n, click **Workflows** in the left sidebar
2. Click **Add workflow** → **Import from file**
3. Import these files in order:

| File | Description |
|------|-------------|
| `n8n-01-chatbot-mock-ai.json` | Main chatbot with lead scoring |
| `n8n-02-ai-council-mock.json` | AI Council multi-agent system |
| `n8n-03-self-optimization-cron.json` | Scheduled optimization |
| `n8n-04-dynamic-workflow-gen.json` | Workflow generator |

### Step 3: Test the Chatbot
1. Open the **Lead Chatbot with Mock AI** workflow
2. Click **Execute Workflow** (manual test)
3. Or activate and use the Chat widget

### Step 4: Test Webhook Endpoints
After activation, test with:

```bash
# Test AI Council
curl -X POST https://YOUR-INSTANCE.app.n8n.cloud/webhook/ai-council \
  -H "Content-Type: application/json" \
  -d '{"query": "How to improve lead conversion?"}'

# Test Workflow Generator  
curl -X POST https://YOUR-INSTANCE.app.n8n.cloud/webhook/generate-workflow \
  -H "Content-Type: application/json" \
  -d '{"type": "follow-up", "description": "Create 3-day follow-up"}'
```

### Step 5: Share Access
1. Go to **Settings** → **Users** 
2. Add `origin@aonxi.com` with read access
3. Or share the workflow URLs

## Workflow Summary

### 01 - Lead Chatbot (Mock AI)
```
Chat Trigger → MOCK AI: Lead Scorer → MOCK AI: Response Generator
                          ↓
                    Is Qualified?
                    ↓           ↓
              MOCK CRM    Continue → Respond
                    ↓
              Is Hot Lead?
              ↓         ↓
        MOCK Slack  MOCK Email → Respond
```

### 02 - AI Council (Mock Multi-Agent)
```
Webhook → Prepare → MOCK Agent: Researcher
                          ↓
                    MOCK Agent: Strategist
                          ↓
                    MOCK: Council Moderator → Return Decision
```

### 03 - Self-Optimization (Cron)
```
Schedule (6hr) → MOCK: Read Metrics → MOCK AI: Optimization Engine
                                              ↓
                                        Needs Action?
                                        ↓           ↓
                                  LOG: Decision  LOG: Healthy
```

### 04 - Dynamic Workflow Generator
```
Webhook → Parse Request → MOCK AI: Generate Workflow
                                    ↓
                              LOG: Generated → Return Workflow JSON
```

## No External APIs Required
All workflows use **MOCK** nodes that simulate:
- OpenAI → Code nodes with intelligent responses
- HubSpot CRM → Console logging
- SendGrid Email → Console logging  
- Slack Webhooks → Console logging
- Google Sheets → In-memory mock data

## Files Location
```
c:/Users/Rick/Desktop/Work/intelligent-automation-system/
├── workflows/
│   ├── n8n-01-chatbot-mock-ai.json      ← IMPORT THIS
│   ├── n8n-02-ai-council-mock.json       ← IMPORT THIS
│   ├── n8n-03-self-optimization-cron.json ← IMPORT THIS
│   └── n8n-04-dynamic-workflow-gen.json  ← IMPORT THIS
├── src/
│   ├── utils.js
│   └── config.json
├── docs/
│   └── SELF-EVALUATION.md
└── README.md
```
