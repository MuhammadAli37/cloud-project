# =========================
# DOCKER DEPLOYMENT SECTION
# =========================
# This Dockerfile packages the Streamlit app so it can run locally or on AWS ECS.
# Base Python image used by the container.
FROM python:3.11-slim

# Prevents Python from writing .pyc files and enables stdout/stderr logging
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Application files are copied into this working directory.
WORKDIR /app

# Install system dependencies
# - build-essential: needed for some Python packages that compile C extensions
# - curl: used by the ECS health check
# - libmagic1: needed by python-magic for file type detection
# - poppler-utils: needed for PDF reading support
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    libmagic1 \
    poppler-utils \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
# Install dependencies before app code for better Docker layer caching.
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy app source and local knowledge artifacts when present.
# This includes chroma_db_kb, chroma_db_web, chroma_db_doc, incoming_pdfs,
# and processed_files.json unless they are absent or ignored by .dockerignore.
COPY . .

# Expose Streamlit port
# Streamlit listens on port 8501 inside the container.
EXPOSE 8501

# Health check for ECS
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD curl -f http://localhost:8501/_stcore/health || exit 1

# Run Streamlit
# Start the Streamlit server when the container runs.
# OPENAI_API_KEY is supplied at runtime by ECS/GitHub Actions, not baked into this image.
CMD ["streamlit", "run", "app/main.py", \
     "--server.port=8501", \
     "--server.address=0.0.0.0", \
     "--server.headless=true", \
     "--browser.gatherUsageStats=false"]
