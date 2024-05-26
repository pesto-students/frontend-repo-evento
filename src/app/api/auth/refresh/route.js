import { NEXT_PUBLIC_API_BASE_URL } from "@/lib/config";
import axios from "axios";
import { cookies } from "next/headers";

export async function POST(request) {
  try {
    const cookieStore = cookies();
    const refreshToken = cookieStore.get("refreshToken");

    if (!refreshToken?.value) {
      throw new Error("Refresh token not found in cookies!");
    }

    const res = await axios.post(`${NEXT_PUBLIC_API_BASE_URL}/auth/refresh`, {
      refreshToken: refreshToken.value,
    });

    return new Response(JSON.stringify(res.data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": `refreshToken=${res.data.data.refreshToken}`,
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Refresh token expired!" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": `refreshToken=${null}`,
      },
    });
  }
}
