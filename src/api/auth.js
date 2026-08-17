import api from "./axios";

export async function login(username, password) {
  try {
    const form = new URLSearchParams();
    form.append("username", username);
    form.append("password", password);

    const { data } = await api.post("auth/login", form, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    return data;
  } catch (err) {
    console.error("Login error:", err);
    throw err;
  }
}

export async function googleLogin(credential) {
  try {
    const { data } = await api.post("oauth/google", { credential });
    return data; // { otp_required, pending_token, email }
  } catch (err) {
    console.error("Google login error:", err);
    throw err;
  }
}

export async function verifyGoogleOtp(pendingToken, otp) {
  try {
    const { data } = await api.post("oauth/google/verify-otp", {
      pending_token: pendingToken,
      otp,
    });
    return data; // { access_token, token_type }
  } catch (err) {
    console.error("OTP verification error:", err);
    throw err;
  }
}

export default api;