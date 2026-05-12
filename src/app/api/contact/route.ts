import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // 1. Basic Server-Side Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Handshake failed: All fields are required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Handshake failed: Invalid email address format.' },
        { status: 400 }
      );
    }

    let messageSent = false;
    const errors: string[] = [];

    // ── STRATEGY A: DISCORD WEBHOOK (Recommended, Instant, 100% Free) ──
    const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (discordWebhookUrl) {
      try {
        const discordResponse = await fetch(discordWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: 'eOzka Contact Node',
            avatar_url: 'https://eozka.com/assets/eOzka-essentials/eOzka_Logo_Package_V1/PNG/eozka-venture-studio-logo.png',
            embeds: [
              {
                title: '📬 New Contact Form Submission',
                color: 13945256, // Decimal for eOzka Gold/Accent #d4c9a8
                fields: [
                  { name: '👤 Sender Name', value: name, inline: true },
                  { name: '📧 Sender Email', value: email, inline: true },
                  { name: '💬 Message Content', value: message }
                ],
                footer: {
                  text: 'eOzka Venture Studio Core Systems',
                  icon_url: 'https://eozka.com/assets/eOzka-essentials/eOzka_Logo_Package_V1/PNG/eozka-venture-studio-logo.png'
                },
                timestamp: new Date().toISOString()
              }
            ]
          }),
        });

        if (discordResponse.ok) {
          messageSent = true;
          console.log('✅ Message successfully pushed to Discord Webhook.');
        } else {
          const errMsg = `Discord API responded with status ${discordResponse.status}`;
          console.error(`❌ Discord Webhook failed: ${errMsg}`);
          errors.push(errMsg);
        }
      } catch (err: any) {
        console.error('❌ Error sending message to Discord:', err);
        errors.push(`Discord error: ${err.message || err}`);
      }
    }

    // ── STRATEGY B: TELEGRAM BOT ──
    const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = process.env.TELEGRAM_CHAT_ID;
    if (telegramToken && telegramChatId) {
      try {
        const text = `*📬 New Contact Submission*\n\n*Name:* ${name}\n*Email:* ${email}\n\n*Message:*\n${message}`;
        const telegramUrl = `https://api.telegram.org/bot${telegramToken}/sendMessage`;
        
        const telegramResponse = await fetch(telegramUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: telegramChatId,
            text,
            parse_mode: 'Markdown',
          }),
        });

        if (telegramResponse.ok) {
          messageSent = true;
          console.log('✅ Message successfully pushed to Telegram Bot.');
        } else {
          const errMsg = `Telegram API responded with status ${telegramResponse.status}`;
          console.error(`❌ Telegram failed: ${errMsg}`);
          errors.push(errMsg);
        }
      } catch (err: any) {
        console.error('❌ Error sending message to Telegram:', err);
        errors.push(`Telegram error: ${err.message || err}`);
      }
    }

    // ── STRATEGY C: RESEND EMAIL API (Standard Email) ──
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        const resendResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendApiKey}`
          },
          body: JSON.stringify({
            from: 'eOzka Portal <onboarding@resend.dev>',
            to: ['eozka.hq@gmail.com'],
            subject: `📬 Contact Submission from ${name}`,
            html: `
              <div style="background-color: #0c0c0c; color: #f0eeea; font-family: 'Courier New', Courier, monospace; padding: 30px; border: 1px solid #d4c9a8; max-width: 600px; margin: auto; border-radius: 4px;">
                <h2 style="color: #d4c9a8; border-bottom: 1px solid #2a2a2a; padding-bottom: 10px; margin-top: 0;">eOzka Venture Studio Node</h2>
                <p style="font-size: 14px; color: #999; margin-bottom: 20px;">A connection handshake has been established from the home portal form.</p>
                
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px; font-size: 14px;">
                  <tr>
                    <td style="padding: 6px 0; font-weight: bold; color: #d4c9a8; width: 120px;">SENDER:</td>
                    <td style="padding: 6px 0; color: #f0eeea;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-weight: bold; color: #d4c9a8;">EMAIL:</td>
                    <td style="padding: 6px 0; color: #f0eeea;"><a href="mailto:${email}" style="color: #d4c9a8; text-decoration: none;">${email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; font-weight: bold; color: #d4c9a8;">TIMESTAMP:</td>
                    <td style="padding: 6px 0; color: #666;">${new Date().toLocaleString()}</td>
                  </tr>
                </table>

                <div style="border-top: 1px solid #2a2a2a; padding-top: 20px;">
                  <h4 style="color: #d4c9a8; margin: 0 0 10px 0;">MESSAGE DECRYPTED:</h4>
                  <p style="background-color: #141414; border: 1px solid #2a2a2a; padding: 15px; color: #f0eeea; line-height: 1.6; white-space: pre-wrap; font-size: 13px; margin: 0;">${message}</p>
                </div>

                <div style="margin-top: 30px; font-size: 10px; color: #666; text-align: center; border-top: 1px solid #2a2a2a; padding-top: 15px;">
                  Automated Security Telemetry. Please do not reply directly to this automated onboarding address.
                </div>
              </div>
            `
          })
        });

        if (resendResponse.ok) {
          messageSent = true;
          console.log('✅ Email successfully dispatched via Resend.');
        } else {
          const resText = await resendResponse.text();
          const errMsg = `Resend API responded with status ${resendResponse.status}: ${resText}`;
          console.error(`❌ Resend failed: ${errMsg}`);
          errors.push(errMsg);
        }
      } catch (err: any) {
        console.error('❌ Error sending email via Resend:', err);
        errors.push(`Resend error: ${err.message || err}`);
      }
    }

    // ── STRATEGY D: LOCAL DEVELOPMENT FALLBACK (Logs to terminal) ──
    if (!discordWebhookUrl && !telegramToken && !resendApiKey) {
      console.log('\n======================================================');
      console.log('📬 [DEVELOPMENT FALLBACK] NEW CONTACT SUBMISSION');
      console.log('------------------------------------------------------');
      console.log(`👤 Name:    ${name}`);
      console.log(`📧 Email:   ${email}`);
      console.log(`💬 Message: ${message}`);
      console.log('------------------------------------------------------');
      console.log('💡 TIP: Configure any of the following environment variables');
      console.log('   in your .env.local file to route this in production:');
      console.log('   - DISCORD_WEBHOOK_URL  (Recommended, Instant, Free)');
      console.log('   - TELEGRAM_BOT_TOKEN & TELEGRAM_CHAT_ID');
      console.log('   - RESEND_API_KEY');
      console.log('======================================================\n');
      
      return NextResponse.json({
        success: true,
        message: 'Message captured cleanly (Logged in Node Terminal). Set environment keys for direct routing.',
        devMode: true
      });
    }

    if (messageSent) {
      return NextResponse.json({
        success: true,
        message: 'Message successfully dispatched to eOzka core communication nodes.'
      });
    } else {
      return NextResponse.json(
        {
          error: 'Connection handshake complete, but dispatch channels failed to deliver the message.',
          details: errors
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('❌ Server error handling contact form submission:', error);
    return NextResponse.json(
      { error: 'Internal system fault during contact routing process.', details: error.message },
      { status: 500 }
    );
  }
}
