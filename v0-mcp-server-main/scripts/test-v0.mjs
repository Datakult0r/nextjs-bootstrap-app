#!/usr/bin/env node

/**
 * Test script for the v0 API tool
 * 
 * Usage:
 *   node scripts/test-v0.mjs
 */


// Configuration
const MCP_SERVER_URL = 'http://localhost:3006/api/v0-direct';
const V0_PROMPT = 'Create a Next.js AI chatbot with authentication';

async function main() {
  try {
    console.log('Testing v0.generateCompletion tool...');
    
    // First, test if the server is running with a simple GET request
    console.log('Testing v0-direct endpoint...');
    const echoResponse = await fetch(MCP_SERVER_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    const echoResponseText = await echoResponse.text();
    
    if (!echoResponse.ok) {
      throw new Error(`Server not responding correctly. Status: ${echoResponse.status} ${echoResponse.statusText}. Response: ${echoResponseText}`);
    }
    
    let echoData;
    try {
      echoData = JSON.parse(echoResponseText);
    } catch (error) {
      console.error('Error parsing echo response:', error);
      console.log('Raw response text:', echoResponseText);
      throw new Error(`Failed to parse echo response as JSON. Raw response: ${echoResponseText}`);
    }
    console.log('Echo response:', echoData);
    
    // We don't need to test the v0.generateCompletion tool separately
    // since the v0-direct endpoint already calls the v0 API directly
    console.log('\nv0 API test completed successfully!');
    
    // Extract the data from the response
    if (echoData && echoData.data) {
      console.log('\nGenerated text:');
      if (echoData.data.choices && echoData.data.choices.length > 0 && echoData.data.choices[0].message) {
        console.log(echoData.data.choices[0].message.content);
      }
    }
    
    return;
    
    // This code is no longer needed
    const response = await fetch('http://localhost:3006/transport', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tool: 'v0.generateCompletion',
        input: {
          prompt: V0_PROMPT,
          model: 'v0-1.0-md',
          stream: false,
          system_message: 'You are a helpful assistant that provides concise code examples.'
        }
      }),
    });
    
    const responseText = await response.text();
    
    if (!response.ok) {
      throw new Error(`v0 API error. Status: ${response.status} ${response.statusText}. Response: ${responseText}`);
    }
    
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (error) {
      console.error('Error parsing v0 response:', error);
      console.log('Raw response text:', responseText);
      throw new Error(`Failed to parse v0 response as JSON. Raw response: ${responseText}`);
    }
    console.log('Response from v0 API:');
    console.log(JSON.stringify(data, null, 2));
    
    // Extract the text content from the response
    if (data.content && data.content.length > 0) {
      const textContent = data.content.find(item => item.type === 'text');
      if (textContent) {
        console.log('\nGenerated text:');
        console.log(textContent.text);
      }
    }
    
  } catch (error) {
    console.error('Error testing v0 API:', error);
  }
}

main();
