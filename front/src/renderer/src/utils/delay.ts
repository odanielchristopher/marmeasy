export default function delay(ms = 500) : Promise<unknown> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
