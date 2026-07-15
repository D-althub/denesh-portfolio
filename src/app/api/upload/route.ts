import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import sharp from "sharp";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure uploads directory exists inside public/uploads
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadsDir, { recursive: true });

    // Clean base name for filesystem safety
    const originalExt = path.extname(file.name) || ".jpg";
    const baseName = path
      .basename(file.name, originalExt)
      .replace(/[^a-zA-Z0-9]/g, "-")
      .toLowerCase();
    const timestamp = Date.now();

    const isImage = /\.(jpe?g|png|webp|tiff?|gif)$/i.test(file.name) || file.type.startsWith("image/");

    // If it is an image, compress and convert to WebP + generate thumbnail via sharp
    if (isImage) {
      try {
        const fileName = `${baseName}-${timestamp}.webp`;
        const thumbName = `${baseName}-${timestamp}-thumb.webp`;
        const filePath = path.join(uploadsDir, fileName);
        const thumbPath = path.join(uploadsDir, thumbName);

        // Master Compressed Image (WebP, quality 82, max width 2400px)
        await sharp(buffer)
          .resize({ width: 2400, withoutEnlargement: true })
          .webp({ quality: 82 })
          .toFile(filePath);

        // Thumbnail Compressed Image (WebP, quality 75, max width 600px)
        await sharp(buffer)
          .resize({ width: 600, withoutEnlargement: true })
          .webp({ quality: 75 })
          .toFile(thumbPath);

        const publicUrl = `/uploads/${fileName}`;
        const thumbUrl = `/uploads/${thumbName}`;

        return NextResponse.json({
          success: true,
          url: publicUrl,
          thumbUrl,
          fileName,
        });
      } catch (sharpError) {
        console.warn("Sharp image processing fallback:", sharpError);
        // Fallback to raw file write below if sharp encounters an unsupported format
      }
    }

    // Non-image files or fallback: write raw file
    const fileName = `${baseName}-${timestamp}${originalExt}`;
    const filePath = path.join(uploadsDir, fileName);
    await writeFile(filePath, buffer);

    const publicUrl = `/uploads/${fileName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      thumbUrl: publicUrl,
      fileName,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Failed to process and upload file to server" }, { status: 500 });
  }
}
