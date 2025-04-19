export const encodeMessageInImage = (canvas: HTMLCanvasElement, message: string) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Failed to get canvas context');
  
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
  
    // Add a unique terminator to mark the end of the message
    const terminator = '|||END|||';
    const fullMessage = message + terminator;
    const msgBin = new TextEncoder().encode(fullMessage);
  
    if (msgBin.length * 8 > data.length / 4) {
      throw new Error('Message is too long for this image');
    }
  
    for (let i = 0; i < msgBin.length; i++) {
      for (let bit = 0; bit < 8; bit++) {
        const byteIndex = i * 8 + bit;
        const bitVal = (msgBin[i] >> (7 - bit)) & 1;
        data[byteIndex * 4] = (data[byteIndex * 4] & ~1) | bitVal;
      }
    }
  
    ctx.putImageData(imageData, 0, 0);
};

export const decodeMessageFromImage = (canvas: HTMLCanvasElement): string => {
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Failed to get canvas context');
  
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
  
    const bytes: number[] = [];
    let currentByte = 0;
    let bitCount = 0;
  
    for (let i = 0; i < data.length; i += 4) {
      const bit = data[i] & 1;
      currentByte = (currentByte << 1) | bit;
      bitCount++;
  
      if (bitCount === 8) {
        bytes.push(currentByte);
        const decodedStr = new TextDecoder().decode(new Uint8Array(bytes));
  
        if (decodedStr.includes('|||END|||')) {
          return decodedStr.split('|||END|||')[0]; // return message before terminator
        }
  
        currentByte = 0;
        bitCount = 0;
      }
    }
  
    return new TextDecoder().decode(new Uint8Array(bytes)).trim(); // fallback
};
  
  