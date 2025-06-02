from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import requests
import json
from gtts import gTTS
import io
import os
import tempfile
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Ollama configuration
OLLAMA_BASE_URL = "http://00.000.00.00:"
MODEL = "mistral:7b"

# Supported Indian languages
SUPPORTED_LANGUAGES = {
    "ta": "Tamil",
    "hi": "Hindi",
    "te": "Telugu",
    "kn": "Kannada",
    "ml": "Malayalam",
    "bn": "Bengali",
    "gu": "Gujarati",
    "mr": "Marathi"
}

# Language codes for gTTS
GTTS_LANGUAGE_CODES = {
    "ta": "ta",
    "hi": "hi",
    "te": "te",
    "kn": "kn",
    "ml": "ml",
    "bn": "bn",
    "gu": "gu",
    "mr": "mr"
}

def create_translation_prompt(text, target_language):
    """Create a prompt for translation"""
    language_name = SUPPORTED_LANGUAGES.get(target_language, target_language)
    
    prompt = f"""You are a professional translator specializing in Indian languages. 
Translate the following English text to {language_name}. 
Provide ONLY the translation without any explanation, notes, or English text.
If the text contains names or proper nouns, keep them as is or transliterate appropriately.

English text: {text}

{language_name} translation:"""
    
    return prompt

def call_ollama(prompt):
    """Call Ollama API for translation"""
    try:
        url = f"{OLLAMA_BASE_URL}/api/generate"
        
        payload = {
            "model": MODEL,
            "prompt": prompt,
            "stream": False,
            "options": {
                "temperature": 0.3,  # Lower temperature for more consistent translations
                "top_p": 0.9,
                "max_tokens": 1000
            }
        }
        
        response = requests.post(url, json=payload, timeout=30)
        response.raise_for_status()
        
        result = response.json()
        return result.get("response", "").strip()
        
    except requests.exceptions.Timeout:
        raise Exception("Translation timeout - please try again")
    except requests.exceptions.ConnectionError:
        raise Exception("Cannot connect to Ollama service")
    except Exception as e:
        raise Exception(f"Translation error: {str(e)}")

@app.route('/api/translate', methods=['POST'])
def translate():
    """Main translation endpoint"""
    try:
        data = request.get_json()
        
        # Validate input
        if not data:
            return jsonify({"error": "No data provided"}), 400
            
        text = data.get('text', '').strip()
        target_language = data.get('targetLanguage', '').strip()
        
        if not text:
            return jsonify({"error": "No text provided for translation"}), 400
            
        if not target_language or target_language not in SUPPORTED_LANGUAGES:
            return jsonify({"error": "Invalid or unsupported target language"}), 400
        
        # Create prompt and translate
        prompt = create_translation_prompt(text, target_language)
        translated_text = call_ollama(prompt)
        
        # Clean up the response
        # Remove any English text that might have been included
        lines = translated_text.split('\n')
        # Filter out lines that might contain the original English
        cleaned_lines = [line for line in lines if line.strip() and not line.strip().lower().startswith('english')]
        translated_text = '\n'.join(cleaned_lines).strip()
        
        if not translated_text:
            return jsonify({"error": "Translation failed - no output received"}), 500
        
        return jsonify({
            "translatedText": translated_text,
            "sourceLanguage": "English",
            "targetLanguage": SUPPORTED_LANGUAGES[target_language]
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/languages', methods=['GET'])
def get_languages():
    """Get list of supported languages"""
    languages = [
        {"code": code, "name": name} 
        for code, name in SUPPORTED_LANGUAGES.items()
    ]
    return jsonify({"languages": languages})

@app.route('/', methods=['GET'])
def home():
    """Root endpoint with API information"""
    return jsonify({
        "message": "Translation API is running",
        "endpoints": {
            "GET /api/languages": "Get list of supported languages",
            "POST /api/translate": "Translate text (body: {text, targetLanguage})",
            "GET /api/health": "Check API and Ollama status"
        },
        "ollama_url": OLLAMA_BASE_URL,
        "model": MODEL
    })

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    try:
        # Test Ollama connection
        response = requests.get(f"{OLLAMA_BASE_URL}/api/tags", timeout=5)
        ollama_status = "connected" if response.status_code == 200 else "disconnected"
    except:
        ollama_status = "disconnected"
    
    return jsonify({
        "status": "healthy",
        "ollama": ollama_status,
        "model": MODEL
    })

@app.route('/api/text-to-speech', methods=['POST'])
def text_to_speech():
    """Convert text to speech"""
    try:
        data = request.get_json()
        
        # Validate input
        if not data:
            return jsonify({"error": "No data provided"}), 400
            
        text = data.get('text', '').strip()
        language = data.get('language', '').strip()
        
        if not text:
            return jsonify({"error": "No text provided for speech synthesis"}), 400
            
        if not language or language not in GTTS_LANGUAGE_CODES:
            return jsonify({"error": "Invalid or unsupported language for speech"}), 400
        
        # Get the gTTS language code
        gtts_lang = GTTS_LANGUAGE_CODES[language]
        
        # Create gTTS object
        tts = gTTS(text=text, lang=gtts_lang, slow=False)
        
        # Save to a temporary file
        temp_file = tempfile.NamedTemporaryFile(delete=False, suffix='.mp3')
        tts.save(temp_file.name)
        temp_file.close()
        
        # Send the file
        response = send_file(
            temp_file.name,
            mimetype='audio/mpeg',
            as_attachment=True,
            download_name=f'translation_{language}_{datetime.now().strftime("%Y%m%d_%H%M%S")}.mp3'
        )
        
        # Clean up the temporary file after sending
        @response.call_on_close
        def cleanup():
            try:
                os.unlink(temp_file.name)
            except:
                pass
                
        return response
        
    except Exception as e:
        return jsonify({"error": f"Speech synthesis failed: {str(e)}"}), 500

@app.route('/api/translate-and-speak', methods=['POST'])
def translate_and_speak():
    """Translate text and return both text and speech"""
    try:
        data = request.get_json()
        
        # Validate input
        if not data:
            return jsonify({"error": "No data provided"}), 400
            
        text = data.get('text', '').strip()
        target_language = data.get('targetLanguage', '').strip()
        
        if not text:
            return jsonify({"error": "No text provided for translation"}), 400
            
        if not target_language or target_language not in SUPPORTED_LANGUAGES:
            return jsonify({"error": "Invalid or unsupported target language"}), 400
        
        # First, translate the text
        prompt = create_translation_prompt(text, target_language)
        translated_text = call_ollama(prompt)
        
        # Clean up the response
        lines = translated_text.split('\n')
        cleaned_lines = [line for line in lines if line.strip() and not line.strip().lower().startswith('english')]
        translated_text = '\n'.join(cleaned_lines).strip()
        
        if not translated_text:
            return jsonify({"error": "Translation failed - no output received"}), 500
        
        # Then convert to speech
        gtts_lang = GTTS_LANGUAGE_CODES[target_language]
        tts = gTTS(text=translated_text, lang=gtts_lang, slow=False)
        
        # Save to bytes buffer instead of file
        audio_buffer = io.BytesIO()
        tts.write_to_fp(audio_buffer)
        audio_buffer.seek(0)
        
        # Convert audio to base64 for easy transmission
        import base64
        audio_base64 = base64.b64encode(audio_buffer.read()).decode('utf-8')
        
        return jsonify({
            "translatedText": translated_text,
            "sourceLanguage": "English",
            "targetLanguage": SUPPORTED_LANGUAGES[target_language],
            "audio": audio_base64,
            "audioFormat": "mp3"
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
