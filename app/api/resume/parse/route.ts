import { NextResponse } from "next/server"

export const runtime = "nodejs"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json({ error: "Only PDF files are supported" }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const { PDFParse } = await import("pdf-parse")
    const parser = new PDFParse({ data: buffer })
    const result = await parser.getText()
    await parser.destroy()

    return NextResponse.json({
      text: result.text,
      pages: result.pages?.length ?? 0,
      fileName: file.name,
    })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to parse PDF" },
      { status: 500 }
    )
  }
}
