// src/utils/api.ts

export const encodeImage = async (formData: FormData): Promise<{ downloadUrl: string }> => {
  const res = await fetch('http://localhost:5000/api/stegano/encode', {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    throw new Error('Encoding request failed');
  }

  const data = await res.json();

  if (!data.downloadUrl) {
    throw new Error('No download URL returned from backend');
  }

  return data;
};

  export const decodeImage = async (formData: FormData) => {
    const res = await fetch('http://localhost:5000/api/stegano/decode', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    return data.message;
  };
