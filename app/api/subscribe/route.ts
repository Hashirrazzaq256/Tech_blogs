import { NextResponse } from 'next/server'
import { subscribeToNewsletter } from '@/lib/newsletter'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    const result = await subscribeToNewsletter(email)

    if (result.success) {
      return NextResponse.json({ success: true, message: 'Successfully subscribed!' })
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      )
    }
  } catch {
    return NextResponse.json(
      { success: false, error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}