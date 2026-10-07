/** Bounded batches with one flush timer and stable IDs across delivery retries. */
const ENDPOINT = "/api/telemetry";
const MAX_RECORDS = 20;
const MAX_BYTES = 48_000;
let pending: Record<string, unknown>[] = [];
let timer: ReturnType<typeof setTimeout> | undefined;
let sending = false;
let retries = 0;
let fallbackSession: string | undefined;

export const newId = () => crypto.randomUUID();
export function getSessionId(): string {
  if (fallbackSession) return fallbackSession;
  try {
    const key = "jonang_telemetry_sid";
    const id = sessionStorage.getItem(key) || newId();
    sessionStorage.setItem(key, id);
    return (fallbackSession = id);
  } catch {
    return (fallbackSession = newId());
  }
}

export function queueTelemetry(data: Record<string, unknown>, immediate = false): void {
  const record = { ...data, id: newId(), timestamp: Date.now() };
  if (new Blob([JSON.stringify({ records: [record] })]).size > MAX_BYTES) return;
  pending.push(record);
  if (pending.length > 100) pending.shift();
  if (immediate || pending.length >= MAX_RECORDS) void flushTelemetry();
  else schedule();
}
function schedule() {
  if (!timer && pending.length)
    timer = setTimeout(() => {
      timer = undefined;
      void flushTelemetry();
    }, 5000);
}
export async function flushTelemetry(unloading = false): Promise<void> {
  if (timer) clearTimeout(timer);
  timer = undefined;
  if ((sending && !unloading) || !pending.length) return;
  const batch: Record<string, unknown>[] = [];
  while (pending.length && batch.length < MAX_RECORDS) {
    const next = pending[0];
    if (new Blob([JSON.stringify({ records: [...batch, next] })]).size > MAX_BYTES) break;
    batch.push(pending.shift()!);
  }
  const body = JSON.stringify({ records: batch });
  if (
    unloading &&
    navigator.sendBeacon?.(ENDPOINT, new Blob([body], { type: "application/json" }))
  ) {
    schedule();
    return;
  }
  sending = true;
  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
      credentials: "omit",
    });
    if (!response.ok) throw new Error(`Telemetry HTTP ${response.status}`);
    retries = 0;
  } catch {
    if (++retries <= 3) pending = [...batch, ...pending].slice(0, 100);
    else {
      pending = [];
      retries = 0;
    }
  } finally {
    sending = false;
    schedule();
  }
}
