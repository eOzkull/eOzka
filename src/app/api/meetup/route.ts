import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      company,
      email,
      phone,
      discord,
      serviceNeeded,
      timeline,
      budget,
      meetingWindow,
      description,
    } = body;

    // Validation
    if (
      !name ||
      !company ||
      !email ||
      !phone ||
      !serviceNeeded ||
      !timeline ||
      !meetingWindow ||
      !description
    ) {
      return NextResponse.json(
        { error: 'Meetup request incomplete: All required fields must be filled.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Meetup request incomplete: Invalid email address format.' },
        { status: 400 }
      );
    }

    let messageSent = false;
    const errors: string[] = [];

    const discordWebhookUrl = process.env.DISCORD_MEETUP_WEBHOOK_URL;
    if (discordWebhookUrl) {
      try {
        const discordResponse = await fetch(discordWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: 'eOzka Meetup Portal',
            avatar_url:
              'https://eozka.com/assets/eOzka-essentials/eOzka_Logo_Package_V1/PNG/eozka-venture-studio-logo.png',
            embeds: [
              {
                title: '📅 New Client Meetup Handshake Request',
                color: 15383560, // #EAB308 Royal Gold
                fields: [
                  { name: '👤 Client Name', value: name, inline: true },
                  { name: '🏢 Company / Affiliation', value: company, inline: true },
                  { name: '📧 Client Email', value: email, inline: true },
                  { name: '📞 Phone Number', value: phone, inline: true },
                  {
                    name: '👾 Discord / Social ID',
                    value: discord || 'Not Provided',
                    inline: true,
                  },
                  { name: '⚡ Service Needed', value: serviceNeeded, inline: true },
                  { name: '📆 Preferred Timeline', value: timeline, inline: true },
                  { name: '💰 Budget Range', value: budget || 'Not Provided', inline: true },
                  { name: '🕒 Preferred Meeting Window', value: meetingWindow, inline: true },
                  { name: '📝 Request Details', value: description },
                ],
                footer: {
                  text: 'eOzka Technical Subsidiary & Client Relations',
                  icon_url:
                    'https://eozka.com/assets/eOzka-essentials/eOzka_Logo_Package_V1/PNG/eozka-venture-studio-logo.png',
                },
                timestamp: new Date().toISOString(),
              },
            ],
          }),
        });

        if (discordResponse.ok) {
          messageSent = true;
          console.log('✅ Meetup request successfully pushed to Discord Webhook.');
        } else {
          const errMsg = `Discord API responded with status ${discordResponse.status}`;
          console.error(`❌ Discord Webhook failed: ${errMsg}`);
          errors.push(errMsg);
        }
      } catch (err) {
        console.error('❌ Error sending meetup request to Discord:', err);
        const errMsg = err instanceof Error ? err.message : String(err);
        errors.push(`Discord error: ${errMsg}`);
      }
    }

    if (!discordWebhookUrl) {
      console.log('\n======================================================');
      console.log('📅 [DEVELOPMENT FALLBACK] CLIENT MEETUP REQUEST');
      console.log('------------------------------------------------------');
      console.log(`👤 Client:         ${name}`);
      console.log(`🏢 Company:        ${company}`);
      console.log(`📧 Email:          ${email}`);
      console.log(`📞 Phone:          ${phone}`);
      console.log(`👾 Discord:        ${discord || 'Not Provided'}`);
      console.log(`⚡ Service Needed: ${serviceNeeded}`);
      console.log(`📅 Timeline:       ${timeline}`);
      console.log(`💰 Budget:         ${budget || 'Not Provided'}`);
      console.log(`🕒 Window:         ${meetingWindow}`);
      console.log(`📝 Description:    ${description}`);
      console.log('------------------------------------------------------');
      console.log('💡 TIP: Configure DISCORD_MEETUP_WEBHOOK_URL in .env');
      console.log('======================================================\n');

      return NextResponse.json({
        success: true,
        message:
          'Request captured (Logged to Console). Set DISCORD_MEETUP_WEBHOOK_URL for Discord integration.',
        devMode: true,
      });
    }

    if (messageSent) {
      return NextResponse.json({
        success: true,
        message: 'Meetup request submitted successfully. Our team will reach out shortly.',
      });
    } else {
      return NextResponse.json(
        {
          error: 'Request processed, but webhook delivery failed.',
          details: errors,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('❌ Server error handling meetup request:', error);
    const errorDetails = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: 'Internal system fault during meetup scheduling.', details: errorDetails },
      { status: 500 }
    );
  }
}
