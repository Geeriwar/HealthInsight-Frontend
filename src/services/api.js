const API_URL = "https://healthinsight-backend-bvvk.onrender.com";

export async function predictDiabetes(patientData) {
  const response = await fetch(`${API_URL}/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(patientData),
  });

  if (!response.ok) {
    throw new Error("Prediction failed");
  }

  return await response.json();
}