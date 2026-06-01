import { NextRequest, NextResponse } from 'next/server'
import puppeteer from 'puppeteer'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  let browser
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })

    const page = await browser.newPage()

    await page.setViewport({ width: 1122, height: 794 }) // 297mm × 210mm at 96dpi

    await page.goto(`${baseUrl}/imprimir/${id}`, {
      waitUntil: 'networkidle2',
      timeout: 30000,
    })

    // Wait for Inter font and all content to render
    await page.evaluate(() => document.fonts.ready)
    await new Promise(resolve => setTimeout(resolve, 1500))

    const pdf = await page.pdf({
      format: 'A4',
      landscape: true,
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    })

    await browser.close()

    const clientName = request.nextUrl.searchParams.get('name') || id
    const filename = `Proposta - ${clientName}.pdf`

    return new NextResponse(Buffer.from(pdf), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    })
  } catch (error) {
    if (browser) await browser.close()
    console.error('PDF generation error:', error)
    return NextResponse.json({ error: 'Erro ao gerar PDF' }, { status: 500 })
  }
}
