import { Client } from '@modelcontextprotocol/sdk/client/index.js';

async function testOperativeSh() {
  const client = new Client({
    name: 'test-client',
    version: '0.1.0',
  });

  // Connect to the MCP server via stdio
  await client.connectStdio();

  try {
    // Test evaluate_website tool
    const evalResult = await client.callTool('operative.sh', 'evaluate_website', {
      url: 'https://example.com',
    });
    console.log('evaluate_website result:', evalResult);

    // Test debug_website tool
    const debugResult = await client.callTool('operative.sh', 'debug_website', {
      url: 'https://example.com',
    });
    console.log('debug_website result:', debugResult);
  } catch (error) {
    console.error('Error calling tools:', error);
  } finally {
    await client.disconnect();
  }
}

testOperativeSh();
