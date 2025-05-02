# Post-Quantum-Cryptography-Web-Application
In this repository I will create  a Post-Quantum Cryptography Web Application.

# PQC Flask Kyber Demo - CS-3002 Information Security

This project demonstrates Post-Quantum Cryptography (PQC) using the Kyber512 algorithm within a simple Flask web application. It allows users to:

1.  Generate a Kyber512 public/private key pair.
2.  Perform Kyber encapsulation using a public key to generate a ciphertext and a shared secret.
3.  Perform Kyber decapsulation using the corresponding private key and ciphertext to recover the original shared secret.

This project fulfills the requirements for the Semester Project Al-K for CS-3002, Spring 2025.

## Team Members

*   [Your Name] ([Your GitHub Username])
*   [Partner's Name] ([Partner's GitHub Username]) - *If applicable*

*(Ensure both members make commits if working as a pair)*

## Features

*   Web interface built with Flask.
*   PQC operations using the `pqcrystals-python` library for Kyber512.
*   Demonstrates Key Generation, Encapsulation, and Decapsulation.
*   Uses Base64 encoding for displaying keys and ciphertext.
*   Basic security practices (CSRF protection, security headers via Flask-Talisman - optional but included).
*   Clear feedback messages using Flask's flashing system.

## Technologies Used

*   **Programming Language:** Python 3.x
*   **Framework:** Flask
*   **Cryptography Library:** `pqcrystals-python` (for Kyber512)
*   **Frontend:** HTML, CSS (minimal inline)
*   **Security:** Flask-WTF (CSRF), Flask-Talisman (Headers)
*   **Environment Management:** `python-dotenv`
*   **Version Control:** Git + GitHub

## Project Structure
