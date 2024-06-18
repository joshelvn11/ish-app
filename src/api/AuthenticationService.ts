import axios from "axios";

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      "login/",
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );

    const userId = response.data.id;

    return userId;
  } catch (error: unknown) {
    if (error instanceof Error && axios.isAxiosError(error)) {
      console.error(
        "Failed to login:",
        error.response ? error.response.data : "No response"
      );
    } else {
      console.error("Failed to login: An unexpected error occurred");
    }
    throw error;
  }
};
