import { paynowGenerator } from 'paynow-generator'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const {
      proxyType = 'mobile',
      proxyValue = '94508599',
      editable = 'yes',
      amount = 15.0,
      merchant = 'NA',
      remarks = 'Tuition fee'
    } = body

    const qr = paynowGenerator(proxyType, proxyValue, editable, amount, merchant, remarks)

    return { qr }
  } catch (err) {
    console.error('PayNow generation error:', err)
    return { error: 'Failed to generate PayNow payload' }
  }
})
