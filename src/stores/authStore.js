import { atom } from "nanostores";

// export const authStore = atom({
//   isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
//   user: JSON.parse(localStorage.getItem("user")) || null,
// });

// if (process.env.NODE_ENV === "development") {
//   window.authStore = authStore;
// }

// export const login = (userData) => {
//   authStore.set({ isAuthenticated: true, user: userData });
//   localStorage.setItem("isAuthenticated", "true");
//   localStorage.setItem("user", JSON.stringify(userData));
// };

// export const logout = () => {
//   authStore.set({ isAuthenticated: false, user: null });
//   localStorage.removeItem("isAuthenticated");
//   /* localStorage.removeItem('user'); */
// };

// Loading users and authentication state from the localStorage
export const authStore = atom({
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
  user: JSON.parse(localStorage.getItem("currentUser")) || null,
  users: JSON.parse(localStorage.getItem("users")) || [], // users store
});

if (process.env.NODE_ENV === "development") {
  window.authStore = authStore;
}

// Login
export const login = (userData) => {
  const users = authStore.get().users || [];
  console.log(users);
  const foundUser = users.find((user) => user.email === userData.email);

  if (foundUser) {
    // verified right password
    if (foundUser.password === userData.password) {
      authStore.set({ isAuthenticated: true, user: foundUser });
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
      return { success: true }; // success Login
    } else {
      return { success: false, error: "Incorrect password." }; // Incorrect password
    }
  }
  return { success: false, error: "Invalid credentials" }; // User not found / fail Login
};

// Register new user
export const registerUser = (newUser) => {
  const users = authStore.get().users || [];
  const existingUser = users.find((user) => user.email === newUser.email);

  if (existingUser) {
    return {
      success: false,
      error: "Email is already registered. Please Login",
    }; // Email exists
  }

  const updatedUsers = [...users, newUser];
  console.log(updatedUsers);
  authStore.set({ ...authStore.get(), users: updatedUsers });
  localStorage.setItem("users", JSON.stringify(updatedUsers));
  return { success: true }; // User registered successfully
};

// Logout
export const logout = () => {
  authStore.set({ isAuthenticated: false, user: null });
  localStorage.removeItem("isAuthenticated");
  localStorage.removeItem("currentUser"); //will be null
};
