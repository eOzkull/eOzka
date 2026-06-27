import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      discord,
      university,
      gradYear,
      github,
      portfolio,
      statement,
      projects,
      advocacy,
    } = body;

    // Validation (discord / social media ID is optional)
    if (
      !name ||
      !email ||
      !phone ||
      !university ||
      !gradYear ||
      !github ||
      !portfolio ||
      !statement ||
      !projects ||
      !advocacy
    ) {
      return NextResponse.json(
        { error: 'Application incomplete: All required fields must be filled.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Application incomplete: Invalid email address format.' },
        { status: 400 }
      );
    }

    let messageSent = false;
    const errors: string[] = [];

    const discordWebhookUrl = process.env.DISCORD_AMBASSADOR_WEBHOOK_URL;
    if (discordWebhookUrl) {
      try {
        const discordResponse = await fetch(discordWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: 'eOzka Ambassador Portal',
            avatar_url:
              'https://eozka.com/assets/eOzka-essentials/eOzka_Logo_Package_V1/PNG/eozka-venture-studio-logo.png',
            embeds: [
              {
                title: '🎓 New Campus Ambassador Application',
                color: 11032311, // #A855F7 Neon Purple
                fields: [
                  { name: '👤 Applicant Name', value: name, inline: true },
                  { name: '📧 Primary Email', value: email, inline: true },
                  { name: '📞 Phone Number', value: phone, inline: true },
                  {
                    name: '👾 Discord ID / Social',
                    value: discord || 'Not Provided',
                    inline: true,
                  },
                  { name: '🏫 University', value: university, inline: true },
                  { name: '📅 Graduation Year', value: gradYear, inline: true },
                  { name: '🐙 GitHub Profile', value: github, inline: true },
                  { name: '💼 Portfolio / LinkedIn', value: portfolio, inline: true },
                  { name: '📝 Statement of Purpose', value: statement },
                  { name: '🛠️ Recent Project Details', value: projects },
                  { name: '📣 Leadership & Advocacy Plans', value: advocacy },
                ],
                footer: {
                  text: 'eOzka Subsidiary & Community Systems',
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
          console.log('✅ Ambassador application successfully pushed to Discord Webhook.');
        } else {
          const errMsg = `Discord API responded with status ${discordResponse.status}`;
          console.error(`❌ Discord Webhook failed: ${errMsg}`);
          errors.push(errMsg);
        }
      } catch (err) {
        console.error('❌ Error sending application to Discord:', err);
        const errMsg = err instanceof Error ? err.message : String(err);
        errors.push(`Discord error: ${errMsg}`);
      }
    }

    if (!discordWebhookUrl) {
      console.log('\n======================================================');
      console.log('🎓 [DEVELOPMENT FALLBACK] CAMPUS AMBASSADOR APPLICATION');
      console.log('------------------------------------------------------');
      console.log(`👤 Name:       ${name}`);
      console.log(`📧 Email:      ${email}`);
      console.log(`📞 Phone:      ${phone}`);
      console.log(`👾 Discord:    ${discord || 'Not Provided'}`);
      console.log(`🏫 University: ${university} (Grad: ${gradYear})`);
      console.log(`🐙 GitHub:     ${github}`);
      console.log(`💼 Portfolio:  ${portfolio}`);
      console.log(`📝 SOP:        ${statement}`);
      console.log(`🛠️ Project:    ${projects}`);
      console.log(`📣 Advocacy:   ${advocacy}`);
      console.log('------------------------------------------------------');
      console.log('💡 TIP: Configure DISCORD_AMBASSADOR_WEBHOOK_URL in .env');
      console.log('======================================================\n');

      return NextResponse.json({
        success: true,
        message:
          'Application captured (Logged to Console). Set DISCORD_AMBASSADOR_WEBHOOK_URL for Discord integration.',
        devMode: true,
      });
    }

    if (messageSent) {
      return NextResponse.json({
        success: true,
        message: 'Application submitted successfully. Our team will review and connect.',
      });
    } else {
      return NextResponse.json(
        {
          error: 'Form processed, but webhook delivery failed.',
          details: errors,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('❌ Server error handling ambassador application:', error);
    const errorDetails = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: 'Internal system fault during application submission.', details: errorDetails },
      { status: 500 }
    );
  }
}
