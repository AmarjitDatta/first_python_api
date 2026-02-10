FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY practicing_fastAPI.py .

CMD ["uvicorn", "practicing_fastAPI:app", "--host", "0.0.0.0", "--port", "8000"]
