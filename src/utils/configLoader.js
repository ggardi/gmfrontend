// src/utils/configLoader.js
// Loads runtime config from public/env-config.json

let config = null;

export async function loadConfig() {
  if (config) return config;
  const response = await fetch("/env-config.json", { cache: "no-store" });
  if (!response.ok) throw new Error("Failed to load env-config.json");
  config = await response.json();
  return config;
}

export function getConfig() {
  if (!config)
    throw new Error("Config not loaded yet. Call loadConfig() first.");
  return config;
}
