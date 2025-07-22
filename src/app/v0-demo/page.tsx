import { V0ChatDemo } from '@/components/v0-chat-demo';

export default function V0DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            v0 AI Integration Demo
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience the power of v0 AI models integrated with the AI SDK. 
            Generate components, improve code, and debug issues with advanced AI assistance.
          </p>
        </div>
        
        <V0ChatDemo />
        
        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Available Features</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🎨</span>
                </div>
                <h3 className="font-semibold mb-2">Component Generation</h3>
                <p className="text-sm text-gray-600">
                  Generate React components with modern design patterns
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="font-semibold mb-2">Code Improvement</h3>
                <p className="text-sm text-gray-600">
                  Enhance existing code with TypeScript, error handling, and best practices
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🐛</span>
                </div>
                <h3 className="font-semibold mb-2">Code Debugging</h3>
                <p className="text-sm text-gray-600">
                  Identify and fix bugs with AI-powered analysis
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 