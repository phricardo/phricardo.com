export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string | undefined)?.trim() ||
  "http://localhost:8080";

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  timeoutMs?: number;
};

const isJsonResponse = (contentType: string | null) =>
  Boolean(contentType?.toLowerCase().includes("application/json"));

export const request = async <T>(
  path: string,
  options: RequestOptions = {}
): Promise<T> => {
  const { body, headers, timeoutMs, ...rest } = options;

  const controller = timeoutMs ? new AbortController() : null;
  const timeoutId =
    controller && timeoutMs
      ? window.setTimeout(() => controller.abort(), timeoutMs)
      : null;

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...rest,
      signal: controller?.signal ?? rest.signal,
      headers: {
        ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
        ...headers,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch (error) {
    if (timeoutId) {
      window.clearTimeout(timeoutId);
    }

    if (error instanceof DOMException && error.name === "AbortError") {
      throw new ApiError("Tempo limite de resposta excedido.", 408);
    }

    throw error;
  }

  if (timeoutId) {
    window.clearTimeout(timeoutId);
  }

  const contentType = response.headers.get("content-type");
  const payload = isJsonResponse(contentType)
    ? await response.json().catch(() => null)
    : null;

  if (!response.ok) {
    const message =
      (payload &&
        typeof payload === "object" &&
        "message" in payload &&
        typeof payload.message === "string" &&
        payload.message) ||
      "Nao foi possivel concluir a requisicao.";
    throw new ApiError(message, response.status);
  }

  return (payload as T) ?? (undefined as T);
};

export const apiBaseUrl = API_BASE_URL;
