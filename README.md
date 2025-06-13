# Meme Sexism Classifier – Chrome Extension + FastAPI Backend

Una solución inteligente para detectar automáticamente si un meme contiene o aborda contenido sexista. Este proyecto integra una extensión de Chrome que captura memes desde el navegador y un backend desarrollado con FastAPI que procesa las imágenes utilizando un modelo multimodal alojado en Hugging Face.

---

## 🚀 Funcionalidad

### Extensión de Chrome

- Detecta imágenes de memes en páginas web.
- Envía la imagen capturada al servidor backend para su análisis.
- Muestra el resultado del análisis en la interfaz de la extensión:
  - **YES, ...** si el meme es considerado sexista.
  - **NO** si no presenta contenido sexista.
- Indicadores visuales:
  - Texto en color verde para memes no sexistas.
  - Texto en color rojo para memes sexistas.

### Backend FastAPI

- Proporciona un endpoint `/analyze` que recibe imágenes mediante un formulario.
- Utiliza un modelo avanzado para analizar el contenido visual y textual del meme.
- Devuelve una respuesta textual simple con el resultado del análisis.

---

## 🛠️ Tecnologías

- **Frontend:** HTML, CSS, JavaScript, API de extensiones de Chrome.
- **Backend:** Python 3.12, FastAPI.
- **Modelo IA:** Qwen2.5-VL-7B-Instruct a través de Hugging Face Hub.
- **Librerías:** pillow, requests, huggingface_hub, python-multipart.

---

## ⚙️ Instalación y Uso

### 1. Clonar el repositorio

### 2. Preparar el entorno backend
pip install -r requirements.txt
### 3. Ejecutar servidor FastAPI
uvicorn app:app --host 127.0.0.1 --port 8000
El backend estará disponible en http://127.0.0.1:8000/analyze.

### 4. Instalar la extensión en Chrome
Abre Chrome y navega a chrome://extensions/.

Activa el modo desarrollador (Developer mode).

Haz clic en “Cargar descomprimida” (Load unpacked).

Selecciona la carpeta /extension dentro del repositorio clonado.

La extensión quedará instalada y lista para usar.

## Formato de Respuesta del Modelo
El análisis devuelve un texto con formato sencillo:

YES, DIRECT, OBJECTIFICATION

O simplemente:

NO

Dependiendo de si el meme se considera sexista o no, y en caso afirmativo, las categorías asociadas.
