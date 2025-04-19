
const Jimp = require('jimp') as any;

export const encodeLSB = async (inputPath: string, message: string, outputPath: string) => {
  const image = await Jimp.read(inputPath);
  const binaryMessage = message.split('').map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join('') + '00000000';
  let bitIndex = 0;

  image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (this: any, x: number, y: number, idx: number) {
    if (bitIndex >= binaryMessage.length) return;

    let red = this.bitmap.data[idx + 0];
    red = (red & 0xFE) | parseInt(binaryMessage[bitIndex], 2);
    this.bitmap.data[idx + 0] = red;

    bitIndex++;
  });

  await image.writeAsync(outputPath);
};

export const decodeLSB = async (inputPath: string): Promise<string> => {
  const image = await Jimp.read(inputPath);
  let bits = '';
  let nullCharCount = 0;
  let stopReading = false;

  image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (this: any, x: number, y: number, idx: number) {
    if (stopReading) return;

    const red = this.bitmap.data[idx + 0];
    bits += (red & 1).toString();

    if (bits.length % 8 === 0) {
      const byte = bits.slice(bits.length - 8);
      if (byte === '00000000') {
        stopReading = true;
      }
    }
  });

  const bytes = bits.match(/.{8}/g) || [];
  const chars = bytes.map(b => String.fromCharCode(parseInt(b, 2)));

  const message = chars.join('');
  return message.split('\0')[0];
};
