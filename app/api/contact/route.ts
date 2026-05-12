import { NextRequest, NextResponse } from 'next/server';

/**
 * Contact form handler.
 * Integrates with EmailJS via server-side fetch.
 * Set env vars: EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PRIVATE_KEY
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // EmailJS server-side API
    const serviceId = process.env.EMAILJS_SERVICE_ID;
    const templateId = process.env.EMAILJS_TEMPLATE_ID;
    const privateKey = process.env.EMAILJS_PRIVATE_KEY;

    if (serviceId && templateId && privateKey) {
      const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: templateId,
          user_id: process.env.EMAILJS_PUBLIC_KEY,
          accessToken: process.env.EMAILJS_PRIVATE_KEY,
          template_params: {
            from_name: name,
            from_email: email,
            subject,
            message,
            to_email: 'ansh10tripathi@gmail.com',
          },
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error('EmailJS Error:', errorText);

        throw new Error(errorText);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        error: error.message || 'Failed to send message',
      },
      { status: 500 }
    );
  }
}
