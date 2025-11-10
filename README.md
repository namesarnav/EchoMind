# Emotion-Aware AI Voice Assistant

> A real-time audio AI agent that understands emotions from your voice, transcribes your speech, and responds with the same emotional context — built with FastAPI, Whisper, wav2vec2, GPT-4o, and ElevenLabs.

---

## Overview

When you speak, this assistant doesn’t just hear what you say — it senses how you say it.

The system breaks down your voice into two parallel streams:

1. Emotion Recognition: extracts emotional tone and energy from raw audio.
2. Speech-to-Text: transcribes your voice into clean text.

Both streams are then fused into a context state (text + emotion + intensity) and sent to a conversational LLM. The agent responds with empathy — and speaks back in the right tone.

---

## Architecture

```
User Voice
   │
   ├──▶ Emotion Model (wav2vec2) → {emotion, energy}
   ├──▶ Whisper STT → transcript
   │
   ▼
Fusion Layer → context: { text, emotion, energy }
   │
   ▼
GPT-4o → Emotionally aware response
   │
   ▼
TTS (ElevenLabs / OpenAI TTS) → voiced reply
```

---

## Tech Stack

| Layer              | Tools & Frameworks                         |
| ------------------ | ------------------------------------------ |
| Frontend           | React + WebRTC (mic input, audio playback) |
| Backend            | FastAPI (Python)                           |
| Streaming          | WebSocket (real-time audio flow)           |
| STT                | OpenAI Whisper / faster-whisper            |
| Emotion Detection  | speechbrain/wav2vec2-IEMOCAP               |
| LLM Engine         | GPT-4o (context-conditioned prompt)        |
| TTS                | ElevenLabs / OpenAI TTS                    |
| Secrets Management | HashiCorp Vault                            |
| Database           | MongoDB                                    |
| CI/CD              | GitHub Actions + Docker + Azure Web App    |
| Monitoring         | Prometheus + Grafana                       |
| Deployment         | Docker + Azure App Service / AWS ECS       |

---

## Features

* Real-time voice input and output
* Emotion detection (sad, happy, calm, angry, excited)
* Empathy-driven LLM responses
* Vault-based key management (no .env in prod)
* Logging and latency tracking with Prometheus
* Dockerized backend + CI/CD pipeline

---

## Directory Structure

```
.
├── client/               # React frontend
├── server/
│   ├── main.py           # FastAPI entrypoint
│   ├── services/
│   │   ├── stt_service.py
│   │   ├── emotion_service.py
│   │   ├── fusion_service.py
│   │   └── llm_service.py
│   ├── utils/
│   │   └── vault_loader.py
│   ├── requirements.txt
│   └── Dockerfile
├── docker-compose.yml
├── .github/workflows/
│   └── deploy.yml
└── README.md
```

---

## Secrets Management with Vault

All environment variables (API keys, DB URIs) are loaded securely from HashiCorp Vault using a sidecar or OIDC integration.

**Vault Paths Example**

```
secret/data/audio-assistant/prod
 ├── OPENAI_API_KEY
 ├── TTS_API_KEY
 ├── MONGO_URI
 └── HUGGINGFACE_TOKEN
```

---

## Local Setup

```bash
# Clone the repo
git clone https://github.com/<your-username>/emotion-ai-assistant.git
cd emotion-ai-assistant/server

# Setup environment
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt

# Run server
uvicorn main:app --reload
```

In another terminal:

```bash
cd client
npm install
npm run dev
```

---

## Deployment

### 1. Build & Push Image

```bash
docker build -t audio-agent .
docker tag audio-agent <registry>/audio-agent:latest
docker push <registry>/audio-agent:latest
```

### 2. GitHub Actions Workflow

```yaml
name: Deploy Backend
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      id-token: write
      contents: read
    steps:
      - uses: actions/checkout@v4
      - name: Auth to Vault
        uses: hashicorp/vault-action@v2
        with:
          url: ${{ secrets.VAULT_ADDR }}
          method: oidc
      - name: Build and Push Docker
        run: |
          docker build -t <registry>/audio-agent:latest .
          docker push <registry>/audio-agent:latest
      - name: Deploy to Azure
        uses: azure/webapps-deploy@v3
        with:
          app-name: emotion-ai-assistant
          images: <registry>/audio-agent:latest
```

---

## Prompt Template

> You are an empathetic AI companion. You will receive both the text and emotion of the speaker. If the emotion is sad or low energy, respond softly and supportively. If excited or high energy, mirror enthusiasm. Always sound natural and kind.

---

## Future Roadmap

* Multi-lingual emotion recognition
* Face-based emotion fusion
* Adaptive TTS voice tone
* Personalized emotion baselines
* Offline mode with on-device models

---

## References

* [SpeechBrain Emotion Recognition](https://huggingface.co/speechbrain/emotion-recognition-wav2vec2-IEMOCAP)
* [OpenAI Whisper](https://github.com/openai/whisper)
* [OpenAI TTS API](https://platform.openai.com/docs/guides/text-to-speech)
* [HashiCorp Vault OIDC Auth](https://developer.hashicorp.com/vault/docs/auth/jwt/oidc-auth)

---

## Author

**Arnav Verma** — University of North Texas
[arnav@polish.app](mailto:arnav@polish.app)
[namesarnav.dev](https://namesarnav.dev)
