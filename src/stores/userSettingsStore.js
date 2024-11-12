import { atom } from "nanostores";

const initialSettings = JSON.parse(localStorage.getItem("userSettings")) || {
  totalBudgetLimit: 1000,
  categoryLimits: {},
  alertsEnabled: true,
  budgetExceeded: false,
};

export const userSettingsStore = atom(initialSettings);

export const setUserSettings = (settings) => {
  userSettingsStore.set(settings);
  localStorage.setItem("userSettings", JSON.stringify(settings));
};

if (process.env.NODE_ENV === "development") {
  window.userSettingsStore = userSettingsStore;
}
