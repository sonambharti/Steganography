export const encodeMessageInImage = (canvas: HTMLCanvasElement, message: string) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Failed to get canvas context');
  
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
  
    const msgBin = new TextEncoder().encode(message);
    const len = msgBin.length;
  
    if (len * 8 > data.length) throw new Error('Message is too long for this image');
  
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
    for (let i = 0; i < data.length; i += 4) {
      const bit = data[i] & 1;
      const byteIndex = Math.floor(i / 32);
      const bitIndex = (i / 4) % 8;
  
      if (!bytes[byteIndex]) bytes[byteIndex] = 0;
      bytes[byteIndex] |= bit << (7 - bitIndex);
    }
  
    return new TextDecoder().decode(new Uint8Array(bytes)).trim();
  };
  