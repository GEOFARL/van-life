export async function getVans() {
  try {
    const response = await fetch('/api/vans');
    const data = await response.json();
    return data.vans;
  } catch (err) {
    console.error(err);
  }
}
