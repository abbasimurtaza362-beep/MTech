# MTech Colab Integration

MTech is designed to run against a local OpenAI-compatible model server inside the same Colab runtime. The default stack used by this project is:

- DeepSeek-Coder 6.7B Instruct on the T4 GPU
- Local model API: `http://127.0.0.1:8100/v1`
- MTech/Agent Canvas ingress: `8000`
- Agent server: `18000`
- Automation is intentionally not used by the MTech UI.

The Colab runtime is temporary; keep models/projects/configuration in Google Drive and use `/content` for runtime/build caches.
