import { Command } from 'commander';
import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const program = new Command();
const capturesDir = path.join(__dirname, 'captures');
const userDataDir = path.join(__dirname, 'user-data');
if (!fs.existsSync(capturesDir)) {
    fs.mkdirSync(capturesDir);
}
if (!fs.existsSync(userDataDir)) {
    fs.mkdirSync(userDataDir);
}
async function monitor(prompt) {
    console.log('Launching browser...');
    const context = await chromium.launchPersistentContext(userDataDir, {
        headless: false,
        channel: 'chrome',
    });
    const page = await context.newPage();
    await page.goto('https://v0.dev');
    console.log('Navigated to v0.dev');
    const capturedResponses = [];
    page.on('response', async (response) => {
        if (response.url().includes('/api/generation')) { // This URL might need adjustment
            try {
                const text = await response.text();
                capturedResponses.push(text);
            }
            catch (error) {
                console.log('Could not read response text');
            }
        }
    });
    try {
        console.log('Waiting for prompt input field...');
        await page.waitForSelector('textarea[placeholder*="Describe what you want to build"]', { timeout: 30000 });
        console.log('Typing prompt...');
        await page.locator('textarea[placeholder*="Describe what you want to build"]').fill(prompt);
        await page.locator('button[type="submit"]').click();
        console.log('Prompt submitted. Capturing responses...');
        // Wait for a reasonable time for the generation to complete.
        // A more robust solution would be to watch for a specific "done" signal.
        await page.waitForTimeout(30000);
        const timestamp = new Date().getTime();
        const filePath = path.join(capturesDir, `capture_${timestamp}.txt`);
        fs.writeFileSync(filePath, capturedResponses.join('\\n--- RESPONSE --- \\n'));
        console.log(`Capture saved to ${filePath}`);
    }
    catch (error) {
        console.error('An error occurred:', error);
    }
    finally {
        await context.close();
        console.log('Browser closed.');
    }
}
program
    .command('monitor')
    .description('Monitor v0.dev and capture the AI-generated content.')
    .argument('<prompt>', 'The prompt to send to v0.dev')
    .action(monitor);
program
    .command('list')
    .description('List captured files.')
    .action(() => {
    console.log('Listing captured files...');
    const files = fs.readdirSync(capturesDir);
    if (files.length === 0) {
        console.log('No captures found.');
        return;
    }
    files.forEach(file => console.log(file));
});
program
    .command('extract')
    .description('Extract response from a captured file.')
    .argument('<filename>', 'The filename of the capture to extract.')
    .action((filename) => {
    console.log(`Extracting from ${filename}...`);
    const filePath = path.join(capturesDir, filename);
    if (!fs.existsSync(filePath)) {
        console.error('File not found.');
        return;
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    const cleanedContent = cleanVercelStream(content);
    console.log(cleanedContent);
});
function cleanVercelStream(content) {
    const lines = content.split('\\n--- RESPONSE --- \\n');
    let fullText = '';
    for (const line of lines) {
        if (line.startsWith('0:')) {
            try {
                const jsonContent = JSON.parse(line.substring(2));
                fullText += jsonContent;
            }
            catch (e) {
                // Not a valid JSON, skip
            }
        }
        else if (line.match(/^\d+:/)) { // Matches patterns like 2:{...}
            try {
                // Extract the JSON part of the string
                const jsonPart = line.substring(line.indexOf(':') + 1);
                const parsed = JSON.parse(jsonPart);
                if (Array.isArray(parsed)) {
                    for (const item of parsed) {
                        if (item.type === 'generations') {
                            fullText += item.data.completion;
                        }
                    }
                }
            }
            catch (e) {
                // Not a valid JSON, skip
            }
        }
    }
    // A final cleanup to remove any remaining stream artifacts if necessary
    // This part might need to be adjusted based on actual captured data.
    return fullText.replace(/\\n/g, '\\n').replace(/\\"/g, '"');
}
program.parse(process.argv);
