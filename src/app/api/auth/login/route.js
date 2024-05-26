import { NEXT_PUBLIC_API_BASE_URL } from "@/lib/config";
import axios from "axios";

export async function POST(request) {
  try {
    const requestBody = await request.json();

    const res = await axios.post(
      `${NEXT_PUBLIC_API_BASE_URL}/auth/login`,
      requestBody
    );

    return new Response(JSON.stringify(res.data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": `refreshToken=${res.data.data.refreshToken}`,
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Invalid credentials!" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}