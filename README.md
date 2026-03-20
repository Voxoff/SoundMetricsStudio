# SoundMetrics

Music analytics app powered by the Chartmetric API and Claude AI.

## Prerequisites

- Python 3.11+
- Node.js
- A [Chartmetric API key](https://api.chartmetric.com)
- An [Anthropic API key](https://console.anthropic.com)

## Setup

**1. Install Python dependencies**

```bash
python -m venv .venv
source .venv/bin/activate
pip install -e .
```

**2. Install frontend dependencies**

```bash
cd frontend && npm install
```

**3. Configure environment variables**

```bash
cp .env.example .env
```

Edit `.env` and fill in your API keys:

```
ANTHROPIC_API_KEY=sk-ant-...
CHARTMETRIC_API_KEY=your_chartmetric_api_key_here
ANTHROPIC_MODEL=claude-sonnet-4-6   # optional, this is the default
```

## Running

```bash
./dev.sh
```

This starts both the backend API (http://localhost:8000) and the frontend dev server concurrently.
