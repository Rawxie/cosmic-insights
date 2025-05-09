import type { APIRoute } from 'astro';

// Mark this endpoint as server-rendered
export const prerender = false;

async function query(data: any) {
  const response = await fetch(
    "https://api.stack-ai.com/inference/v0/run/451d2968-2035-422e-a3a3-a2eaff4afdce/6810900c777ff894d8171c9d",
    {
      headers: {
        'Authorization': 'Bearer 9e821633-7628-4b22-b703-c88311ac17c2',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  return result;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    
    // Handle both initial readings and follow-up questions
    const payload = data.question ? {
      "user_id": `user_${Date.now()}`,
      "in-0": `Previous Birth Details:
${data.birthDetails}

Question: ${data.question}`
    } : {
      "user_id": `user_${Date.now()}`,
      "in-0": `- Name: ${data.birthDetails.split('\n')[0].replace('Name:', '').trim()}
- Date of Birth (${data.birthDetails.split('\n')[1].replace('Date of Birth:', '').trim()})
- Time of Birth (${data.birthDetails.split('\n')[3].replace('Birth Time:', '').trim()})
- Place of Birth (${data.birthDetails.split('\n')[2].replace('Birth Place:', '').trim()})`
    };

    console.log('Sending request to Stack AI:', payload);

    const result = await query(payload);
    console.log('Stack AI Response:', result);
    
    // Check if the response has the expected structure
    if (!result || typeof result !== 'object' || !result.outputs || !result.outputs['out-0']) {
      console.error('Invalid API Response:', result);
      throw new Error('Invalid response format from API');
    }

    // Format the response into HTML with better styling
    const reading = `
      <div class="space-y-6">
        <section>
          <h3 class="text-2xl font-semibold mb-4">${data.question ? 'Your Answer' : 'Your Cosmic Reading'}</h3>
          <div class="prose prose-invert max-w-none">
            ${result.outputs['out-0'].split('\n').map((line: string) => `<p class="mb-4">${line}</p>`).join('')}
          </div>
        </section>
      </div>
    `;

    return new Response(JSON.stringify({ reading }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to generate reading',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}; 