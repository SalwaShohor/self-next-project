// utils/base64.ts

// ArrayBuffer → Base64 string
export function bufferToBase64(buffer: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}

// Utility for base64url → ArrayBuffer
function base64urlToBuffer(base64url: string): ArrayBuffer {
  const padding = "===".slice((base64url.length + 3) % 4);
  const base64 = (base64url + padding).replace(/-/g, "+").replace(/_/g, "/");
  const str = atob(base64);
  const bytes = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) {
    bytes[i] = str.charCodeAt(i);
  }
  return bytes.buffer;
}
