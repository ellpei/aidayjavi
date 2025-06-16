export { renderers } from '../../renderers.mjs';

const prerender = false;
const POST = async ({ request }) => {
  try {
    const data = await request.json();
    if (!data.name || !data.email || !data.attending) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Missing required fields"
        }),
        {
          status: 400,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type"
          }
        }
      );
    }
    if (data.attending === "no") {
      const response2 = await fetch("https://script.google.com/macros/s/AKfycbzKme6BAhlj16ZV22zmWLyHle3c2S91GEpEVaIM3qJ5d0MgJCiIzmwnAUX_5k_DiHNU/exec", {
        method: "POST",
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          attending: data.attending,
          "no-message": data["no-message"] || ""
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (!response2.ok) {
        throw new Error("Failed to submit to Google Sheets");
      }
      return new Response(
        JSON.stringify({
          success: true,
          message: "RSVP submitted successfully"
        }),
        {
          status: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type"
          }
        }
      );
    }
    if (data.attending === "yes") {
      if (!data["plus-one"] || !data.transport) {
        return new Response(
          JSON.stringify({
            success: false,
            error: "Please answer all required questions"
          }),
          {
            status: 400,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "POST, OPTIONS",
              "Access-Control-Allow-Headers": "Content-Type"
            }
          }
        );
      }
      if (data["plus-one"] === "yes" && !data["plus-one-name"]) {
        return new Response(
          JSON.stringify({
            success: false,
            error: "Please provide your plus one's name"
          }),
          {
            status: 400,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "POST, OPTIONS",
              "Access-Control-Allow-Headers": "Content-Type"
            }
          }
        );
      }
    }
    if (false) ;
    console.log("Sending data to Google Sheets:", {
      url: "https://script.google.com/macros/s/AKfycbzKme6BAhlj16ZV22zmWLyHle3c2S91GEpEVaIM3qJ5d0MgJCiIzmwnAUX_5k_DiHNU/exec",
      data
    });
    const response = await fetch("https://script.google.com/macros/s/AKfycbzKme6BAhlj16ZV22zmWLyHle3c2S91GEpEVaIM3qJ5d0MgJCiIzmwnAUX_5k_DiHNU/exec", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Google Sheets API error:", {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      });
      throw new Error("Failed to submit to Google Sheets");
    }
    return new Response(
      JSON.stringify({
        success: true,
        message: "RSVP submitted successfully"
      }),
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      }
    );
  } catch (error) {
    console.error("Error submitting RSVP:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Internal server error"
      }),
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      }
    );
  }
};
const OPTIONS = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  OPTIONS,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
