export const generateBase64FromAudio = (audioFile) => {
  const reader = new FileReader();
  const promise = new Promise((resolve, reject) => {
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = (err) => reject(err);
  });

  reader.readAsDataURL(audioFile);
  return promise;
};
