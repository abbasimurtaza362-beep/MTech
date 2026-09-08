#!/usr/bin/env bash
export LOCAL_BACKEND_API_KEY="${LOCAL_BACKEND_API_KEY:-replitclone-session-local}"
export LLM_MODEL="${LLM_MODEL:-openai/deepseek-coder-6.7b-instruct}"
export LLM_API_KEY="${LLM_API_KEY:-replitclone-local}"
export LLM_BASE_URL="${LLM_BASE_URL:-http://127.0.0.1:8100/v1}"
export OPENAI_API_KEY="$LLM_API_KEY"
export OPENAI_BASE_URL="$LLM_BASE_URL"
export PROJECTS_PATH="${PROJECTS_PATH:-/content/drive/MyDrive/ReplitClone/projects}"
