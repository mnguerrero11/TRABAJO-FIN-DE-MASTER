from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import JSONResponse
from huggingface_hub import InferenceClient
import base64
import requests
from io import BytesIO
from PIL import Image

client = InferenceClient(api_key="", provider="hyperbolic") 

app = FastAPI()

base_prompt = """
You are a professional meme analyst. Your task is to determine whether the meme contains or addresses sexism in any way. This includes:

- Sexist content or messages
- Depictions of discrimination or prejudice toward women
- Criticism or representation of sexist behavior

Respond with only one word: YES or NO.
"""


def encode_image_to_base64_bytes(file_bytes):
    return "data:image/jpeg;base64," + base64.b64encode(file_bytes).decode("utf-8")

@app.post("/analyze")
async def analyze_image(file: UploadFile = File(...), text: str = Form("")):
    try:
        file_bytes = await file.read()
        image_b64 = encode_image_to_base64_bytes(file_bytes)

        messages = [{
            "role": "user",
            "content": [
                {"type": "text", "text": base_prompt + "\n\n" + text},
                {"type": "image_url", "image_url": {"url": image_b64}}
            ]
        }]

        completion = client.chat.completions.create(
            model="Qwen/Qwen2.5-VL-7B-Instruct",
            messages=messages,
            max_tokens=256
        )

        return {"result": completion.choices[0].message["content"].strip()}

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
