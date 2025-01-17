import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

// Define the directory where the Storybook build is located
const buildDir = resolve('./storybook-static')

// Define the file to modify (e.g., `index.html` or other affected files)
const filesToFix = ['index.html']

// Define the incorrect and correct strings
const incorrectPath = './sb-preview/runtime.js'
const correctPath = './sb-manager/runtime.js'

filesToFix.forEach(async (file) => {
  const filePath = join(buildDir, file)

  if (existsSync(filePath)) {
    const content = readFileSync(filePath, 'utf8')

    // Replace incorrect paths with the correct ones
    const updatedContent = content.replace(new RegExp(incorrectPath, 'g'), correctPath)

    // Write the updated content back to the file
    writeFileSync(filePath, updatedContent, 'utf8')
  }
  else {
    console.warn(`File not found: ${filePath}`)
  }
})
