import getErrorMessage from "@/base/functions/erros";

const API_URL = "https://api.example.com"; // URL base da sua API
const SECURITY_ENABLED = false; // Habilitar ou desabilitar a segurança

const mp = async (password: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
};

const md = (
  data: Record<string, unknown> | Record<string, unknown>[],
  exception = false
) => {
  if (!exception && !SECURITY_ENABLED) {
    return JSON.stringify(data);
  }
  const jsonData = btoa(JSON.stringify(data))
    .replace("==", "ZqPcD6")
    .replace("=", "5dPCwX")
    .split("")
    .reverse()
    .join("");
  const fakeData = btoa(crypto.randomUUID().replace(/-/g, "")).substring(1, 17);
  return JSON.stringify({ _d: `${fakeData}${jsonData}` });
};

const ud = (data: Record<string, unknown>, exception = false) => {
  const _d = data._d as string;
  if (!exception && (!SECURITY_ENABLED || !_d)) {
    return data;
  }
  return JSON.parse(
    atob(
      _d
        .substring(16)
        .split("")
        .reverse()
        .join("")
        .replace("5dPCwX", "=")
        .replace("ZqPcD6", "==")
    )
  );
};

const ie = (lifetime: number) => {
  return Math.round(new Date().getTime() / 1000) > lifetime;
};

const headers = (method: string) => {
  const headers = new Headers({
    Method: method,
    Accept: "application/json",
    "Content-Type": "application/json",
  });

  const token = localStorage.getItem("_t");
  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }

  return headers;
};

const request = async (
  path: string,
  data?: Record<string, unknown> | Record<string, unknown>[] | null,
  method: string = "GET",
  reload?: boolean
) => {
  const url = `${API_URL}${path.startsWith("/") ? "" : "/"}${path}`;
  const options = {
    method: method,
    headers: headers(method),
  } as Record<string, unknown>;

  if (data) {
    options.body = md(data);
  }

  try {
    const response = await fetch(url, options);
    const json = !["HEAD", "DELETE"].includes(method)
      ? await response.json()
      : {};
    if (typeof json !== "object" || json === null) {
      throw new Error("Invalid payload data");
    }
    const ret = ud(json);
    if (!response.ok) {
      throw {
        status: response.status,
        message: ret?.message || response.statusText,
      };
    }
    return {
      status: response.status,
      data: ret,
    };
  } catch (error) {
    throw getErrorMessage(error);
  }
};

const client = {
  mp,
  md,
  ud,
  ie,
  head: async (path: string, data?: Record<string, unknown>) =>
    await request(path, data, "HEAD"),
  get: async (path: string, data?: Record<string, unknown>, reload = true) =>
    await request(path, data, "GET", reload),
  post: async (path: string, data?: Record<string, unknown>, reload = true) =>
    await request(path, data, "POST", reload),
  put: async (path: string, data?: Record<string, unknown>, reload = true) =>
    await request(path, data, "PUT", reload),
  patch: async (path: string, data?: Record<string, unknown>, reload = true) =>
    await request(path, data, "PATCH", reload),
  delete: async (path: string, data?: Record<string, unknown>, reload = true) =>
    await request(path, data, "DELETE", reload),
};

export { client, ie, md, mp, ud };
