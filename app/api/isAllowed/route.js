
const ALLOWED_REFERER = 'https://example.com/specific-uri';

export async function GET(request) {
  const referer = request.headers.get('referer');
  console.log({referer})
  if (referer !== ALLOWED_REFERER) {
    return new Response(JSON.stringify({ message: 'Access denied. Requests must come from a specific URI.' }), { status: 403 });
  }

  return new Response(JSON.stringify({ message: 'succuss' }), { status: 200 });
}
