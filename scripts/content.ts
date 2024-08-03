import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const sourceDir = "/Users/jmill/Documents/obsidian/nhx3b"
const destDir = path.join(__dirname, "../content")

function copyPublishedFiles(dir: string) {
  const files = fs.readdirSync(dir)

  for (const file of files) {
    const fullPath = path.join(dir, file)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      copyPublishedFiles(fullPath)
    } else if (path.extname(file) === ".md") {
      const content = fs.readFileSync(fullPath, "utf8")
      if (content.includes('publish: "true"')) {
        // Remove emoji and space from the start of the filename
        let destFileName = file.replace(/^(\p{Emoji_Presentation}|\p{Emoji}\uFE0F|\s)+/gu, "")

        // Use only the filename for the destination path
        const destPath = path.join(destDir, destFileName)

        // Remove H1 level headings (lines starting with a single #)
        const modifiedContent = content
          .split("\n")
          .filter((line) => !line.trim().match(/^#\s/))
          .join("\n")

        fs.mkdirSync(destDir, { recursive: true })
        fs.writeFileSync(destPath, modifiedContent)
        console.log(`Copied and modified: ${fullPath} to ${destPath}`)
      }
    }
  }
}

// Ensure the destination directory exists
fs.mkdirSync(destDir, { recursive: true })

// Start the recursive search and copy process
copyPublishedFiles(sourceDir)

console.log("Finished copying and modifying published files.")
