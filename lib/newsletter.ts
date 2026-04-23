const BUTTONDOWN_API_URL = 'https://api.buttondown.email/v1'

interface SubscribeResult {
  success: boolean
  error?: string
}

export async function subscribeToNewsletter(
  email: string
): Promise<SubscribeResult> {
  try {
    const API_KEY = process.env.BUTTONDOWN_API_KEY

    if (!API_KEY) {
      return {
        success: false,
        error: 'Newsletter configuration missing',
      }
    }

    const response = await fetch(`${BUTTONDOWN_API_URL}/subscribers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${API_KEY}`,
      },
      body: JSON.stringify({
        email,
        tags: ['blog'],
      }),
    })

    if (!response.ok) {
      const data = await response.json()

      if (data.email) {
        return {
          success: false,
          error: 'Already subscribed',
        }
      }

      return {
        success: false,
        error: data.detail || 'Failed to subscribe',
      }
    }

    return { success: true }
  } catch {
    return {
      success: false,
      error: 'Network error. Please try again.',
    }
  }
}