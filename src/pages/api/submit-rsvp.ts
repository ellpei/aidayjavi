import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.name || !data.email || !data.attending) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Missing required fields'
        }),
        { 
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
          }
        }
      );
    }

    // If not attending, we don't need to validate other fields
    if (data.attending === 'no') {
      // Send to Google Sheets with just the basic info
      const response = await fetch(import.meta.env.GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          attending: data.attending,
          'no-message': data['no-message'] || ''
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to submit to Google Sheets');
      }

      return new Response(
        JSON.stringify({
          success: true,
          message: 'RSVP submitted successfully'
        }),
        { 
          status: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
          }
        }
      );
    }

    // For those attending, validate additional required fields
    if (data.attending === 'yes') {
      if (!data['plus-one'] || !data.transport) {
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Please answer all required questions'
          }),
          { 
            status: 400,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'POST, OPTIONS',
              'Access-Control-Allow-Headers': 'Content-Type'
            }
          }
        );
      }

      // If they have a plus one, validate the name
      if (data['plus-one'] === 'yes' && !data['plus-one-name']) {
        return new Response(
          JSON.stringify({
            success: false,
            error: 'Please provide your plus one\'s name'
          }),
          { 
            status: 400,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'POST, OPTIONS',
              'Access-Control-Allow-Headers': 'Content-Type'
            }
          }
        );
      }
    }

    // Check if environment variable is set
    if (!import.meta.env.GOOGLE_SCRIPT_URL) {
      console.error('GOOGLE_SCRIPT_URL environment variable is not set');
      throw new Error('Server configuration error');
    }

    console.log('Sending data to Google Sheets:', {
      url: import.meta.env.GOOGLE_SCRIPT_URL,
      data: data
    });

    // Send to Google Sheets
    const response = await fetch(import.meta.env.GOOGLE_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Google Sheets API error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      });
      throw new Error('Failed to submit to Google Sheets');
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'RSVP submitted successfully'
      }),
      { 
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      }
    );
  } catch (error) {
    console.error('Error submitting RSVP:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error'
      }),
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      }
    );
  }
};

// Handle OPTIONS requests for CORS preflight
export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}; 