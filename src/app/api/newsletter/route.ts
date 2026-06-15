import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface Subscriber {
  email: string;
  subscribedAt: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    // 1. Basic validation
    if (!email) {
      return NextResponse.json(
        { error: 'Subscription failed: Email is required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Subscription failed: Invalid email format.' },
        { status: 400 }
      );
    }

    // 2. Local database file path
    const dataDir = path.join(process.cwd(), 'src', 'data');
    const dbPath = path.join(dataDir, 'subscribers.json');

    // 3. Ensure data directory exists
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // 4. Read existing subscribers
    let subscribers: Subscriber[] = [];
    if (fs.existsSync(dbPath)) {
      try {
        const fileContent = fs.readFileSync(dbPath, 'utf-8');
        subscribers = JSON.parse(fileContent);
      } catch (err) {
        console.error('⚠️ Failed to parse subscribers JSON database. Re-initializing...', err);
        subscribers = [];
      }
    }

    // 5. Check if email already subscribed
    const normalizedEmail = email.toLowerCase().trim();
    const alreadySubscribed = subscribers.some(
      (sub) => sub.email.toLowerCase().trim() === normalizedEmail
    );

    if (alreadySubscribed) {
      return NextResponse.json({
        success: true,
        message: 'Email is already subscribed to eOzka Insights.',
        alreadySubscribed: true,
      });
    }

    // 6. Append new subscriber
    const newSubscriber: Subscriber = {
      email: normalizedEmail,
      subscribedAt: new Date().toISOString(),
    };
    subscribers.push(newSubscriber);

    // 7. Write back to database file
    fs.writeFileSync(dbPath, JSON.stringify(subscribers, null, 2), 'utf-8');

    // 8. Console logging fallback (Vibhu-Oska system telemetry)
    console.log('\n======================================================');
    console.log('📬 [NEWSLETTER ACTIVE NODE] NEW SUBSCRIBER CAPTURED');
    console.log('------------------------------------------------------');
    console.log(`📧 Email:         ${normalizedEmail}`);
    console.log(`⏰ Subscribed At: ${newSubscriber.subscribedAt}`);
    console.log(`📊 Total Count:   ${subscribers.length}`);
    console.log('======================================================\n');

    return NextResponse.json({
      success: true,
      message: 'Transmission success: Handshake registered. You are subscribed.',
    });
  } catch (error: any) {
    console.error('❌ Server error handling newsletter subscription:', error);
    return NextResponse.json(
      { error: 'Internal system fault during newsletter routing process.', details: error.message },
      { status: 500 }
    );
  }
}
