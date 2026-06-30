'use server'

export type ContactState = {
  status: 'idle' | 'success' | 'error'
  message: string
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get('name') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim()
  const message = String(formData.get('message') ?? '').trim()

  if (!name || !email || !message) {
    return { status: 'error', message: 'Please fill in all fields.' }
  }

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  if (!emailValid) {
    return { status: 'error', message: 'Please enter a valid email address.' }
  }

  // In production, forward this to an email service or database.
  console.log('[v0] New contact message:', { name, email, message })

  return {
    status: 'success',
    message: "Thanks for reaching out! I'll get back to you soon.",
  }
}
