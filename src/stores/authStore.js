import { atom } from "nanostores";

export const authStore = atom({
  isAuthenticated: localStorage.getItem("isAuthenticated") === "false",
  currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
  usersList: JSON.parse(localStorage.getItem("usersList")) || [],
});

if (process.env.NODE_ENV === "development") {
  window.authStore = authStore;
}

export const login = (userData) => {
  authStore.set({
    ...authStore.get(),
    isAuthenticated: true,
    currentUser: userData,
  });
  localStorage.setItem("isAuthenticated", "true");
  localStorage.setItem("currentUser", JSON.stringify(userData));
};

export const logout = () => {
  authStore.set({
    ...authStore.get(),
    isAuthenticated: false,
    currentUser: null,
  });
  localStorage.removeItem("isAuthenticated");
  localStorage.removeItem("currentUser");
};

export const registerUser = (newUser) => {
  const currentState = authStore.get();

  const updatedUsersList = [...currentState.usersList, newUser];

  authStore.set({
    ...currentState,
    usersList: updatedUsersList,
  });
  localStorage.setItem("usersList", JSON.stringify(updatedUsersList));
};
