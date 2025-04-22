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


## Command to setup this code locally.
1. Git clone or download the to your local machine.
2. Navigate to the project directory and install the required dependencies using `npm install`.
3. Run the application using `npm start` to launch the web app in your browser.
4. Open your browser and go to `http://localhost:3000` to access the application.
5. Follow the on-screen instructions to upload an image and enter your secret message.
6. Once the image is processed, you can download the modified image with the hidden message.

## Conclusion
This web application provides a simple yet effective way to utilize steganography for secure communication and data protection. By leveraging modern web technologies, users can easily encrypt and hide messages within images, ensuring their privacy and security in digital communications.
Overall, this application demonstrates the power of combining encryption and steganography, making it a useful tool for anyone looking to protect sensitive information. Future improvements could include supporting additional image formats, enhancing the user interface, and implementing more advanced encryption techniques to further secure the hidden messages. Additionally, user authentication features could be integrated to restrict access to authorized users only, ensuring that sensitive messages are handled securely. Overall, this application serves as an excellent introduction to the concepts of steganography and encryption, providing a practical use case for developers and users alike.
