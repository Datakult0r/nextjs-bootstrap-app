import { createClient } from 'redis';

// Configuration for max distance
const MAX_DISTANCE = 800;

const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://127.0.0.1:6379',
  socket: {
    connectTimeout: 60000,
  },
  database: 0,
});

async function testRedisConfiguration() {
  try {
    await redisClient.connect();
    console.log('✅ Redis connected successfully');
    console.log(`✅ Max Distance Configuration: ${MAX_DISTANCE}`);
    
    // Test setting and getting a value
    await redisClient.set('test_key', 'test_value');
    const result = await redisClient.get('test_key');
    
    console.log(`✅ Redis GET test_key: ${result}`);
    console.log(`✅ Redis Configuration - Max Distance: ${MAX_DISTANCE}`);
    
    await redisClient.disconnect();
    console.log('✅ Redis disconnected successfully');
    
  } catch (error) {
    console.error('❌ Redis error:', error.message);
  }
}

testRedisConfiguration(); 