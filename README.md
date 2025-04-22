# Steganography Web App
## Author: [Sonam Bharti]
## Date: 19-04-2025
**Description:** This is a simple web application that uses steganography to hide secret messages in images.

## Introduction
Steganography is the practice of concealing a secret message within a non-secret message, image,
audio, or text. This web application uses steganography to hide secret messages in images.
The application allows users to upload an image, enter a secret message, and then download the
image with the secret message hidden inside.

## Requirements
- React
- TypeScript
- Crypto JS
- Tailwind CSS


## AES Technique
The application uses the AES (Advanced Encryption Standard) technique to encrypt the secret message.
The AES technique is a symmetric-key block cipher that encrypts data in blocks of 128 bits.
The application uses the Crypto JS library to implement the AES technique.


## Image Steganography
The application uses the least significant bit (LSB) substitution technique to hide the secret message in the
image. The LSB substitution technique replaces the least significant bit of each pixel in the image with the
corresponding bit of the secret message.

## Command to run this application locally.
`npm start`

## Command to create react app using typescript
`npx create-react-app my-app --template typescript`


