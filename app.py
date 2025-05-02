from flask import Flask, render_template, request
from kyber_py.kyber import Kyber512
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad

app = Flask(__name__)
app.secret_key = b'supersecretkey'  # Replace with secure generation in production

# --- Kyber + AES Functions ---

def generate_keys():
    public_key, private_key = Kyber512.keygen()
    return public_key, private_key

def encrypt_message(public_key: bytes, message: str):
    try:
        shared_secret, kem_ct = Kyber512.encaps(public_key)
    except Exception as e:
        raise ValueError(f"KEM encryption failed: {e}")

    aes_key = shared_secret[:32]
    cipher = AES.new(aes_key, AES.MODE_CBC)
    ct_bytes = cipher.encrypt(pad(message.encode(), AES.block_size))
    aes_cipher = cipher.iv + ct_bytes
    return kem_ct, aes_cipher

def decrypt_message(private_key: bytes, kem_ct: bytes, aes_cipher: bytes):
    try:
        shared_secret = Kyber512.decaps(private_key, kem_ct)
    except Exception as e:
        raise ValueError(f"KEM decryption failed: {e}")

    aes_key = shared_secret[:32]
    iv = aes_cipher[:16]
    ct = aes_cipher[16:]

    try:
        cipher = AES.new(aes_key, AES.MODE_CBC, iv)
        decrypted_message = unpad(cipher.decrypt(ct), AES.block_size).decode()
    except Exception as e:
        raise ValueError(f"AES decryption failed: {e}")

    return decrypted_message

# --- Flask logic ---

# Store the keys in memory for demonstration purposes
public_key, private_key = generate_keys()
kem_ciphertext = b''
aes_cipher = b''

@app.route('/', methods=['GET', 'POST'])
def index():
    global public_key, private_key, kem_ciphertext, aes_cipher

    message = ''
    encrypted_message_b64 = ''
    decrypted_message = ''
    pub_key_hex = public_key.hex()[:64] + '...'  # Trimmed for display

    if request.method == 'POST':
        if 'generate_key' in request.form:
            public_key, private_key = generate_keys()
            pub_key_hex = public_key.hex()[:64] + '...'
        elif 'encrypt' in request.form:
            message = request.form['message']
            try:
                kem_ciphertext, aes_cipher = encrypt_message(public_key, message)
                encrypted_message_b64 = (kem_ciphertext + aes_cipher).hex()
            except Exception as e:
                encrypted_message_b64 = f'Encryption Error: {str(e)}'
        elif 'decrypt' in request.form:
            try:
                decrypted_message = decrypt_message(private_key, kem_ciphertext, aes_cipher)
            except Exception as e:
                decrypted_message = f'Decryption Error: {str(e)}'

    return render_template('index.html', key=pub_key_hex, message=message,
                           encrypted_message=encrypted_message_b64, decrypted_message=decrypted_message)

if __name__ == '__main__':
    app.run(debug=True)
