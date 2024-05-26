import { NEXT_PUBLIC_API_BASE_URL } from "@/lib/config";
import axios from "axios";

export async function POST(request) {
  try {
    const requestBody = await request.json();

    const res = await axios.post(
      `${NEXT_PUBLIC_API_BASE_URL}/auth/login`,
      requestBody
    );

    const { refreshToken } = res.data.data;

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append(
      "Set-Cookie",
      `refreshToken=${refreshToken}; HttpOnly; Path=/; Secure; SameSite=Strict`
    );

    return new Response(JSON.stringify(res.data), {
      status: 200,
      headers: headers,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Invalid credentials!" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}
