'use client';

import { useState } from 'react';
import { useV0Chat } from '@/hooks/use-v0-chat';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function V0ChatDemo() {
  const [selectedModel, setSelectedModel] = useState<'v0-1.0-md' | 'v0-1.5-lg'>('v0-1.0-md');
  
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    generateComponent,
    improveCode,
    debugCode,
  } = useV0Chat({
    model: selectedModel,
    onError: (error) => {
      console.error('V0 Chat Error:', error);
    },
  });

  const handleQuickAction = (action: 'component' | 'improve' | 'debug') => {
    switch (action) {
      case 'component':
        generateComponent('A modern login form with email and password fields');
        break;
      case 'improve':
        improveCode(
          'function add(a, b) { return a + b; }',
          'Add TypeScript types and error handling'
        );
        break;
      case 'debug':
        debugCode(
          'const [count, setCount] = useState(0); setCount(count++);',
          'React state not updating correctly'
        );
        break;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>v0 AI Chat Demo</CardTitle>
          <div className="flex gap-4 items-center">
            <Select value={selectedModel} onValueChange={(value: any) => setSelectedModel(value)}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="v0-1.0-md">v0-1.0-md</SelectItem>
                <SelectItem value="v0-1.5-lg">v0-1.5-lg (when available)</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleQuickAction('component')}
                disabled={isLoading}
              >
                Generate Component
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleQuickAction('improve')}
                disabled={isLoading}
              >
                Improve Code
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleQuickAction('debug')}
                disabled={isLoading}
              >
                Debug Code
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Messages */}
          <div className="h-96 overflow-y-auto border rounded-lg p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500">
                Start a conversation with v0 AI...
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`p-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-blue-100 ml-8'
                      : 'bg-gray-100 mr-8'
                  }`}
                >
                  <div className="font-semibold text-sm mb-1">
                    {message.role === 'user' ? 'You' : 'v0'}
                  </div>
                  <div className="whitespace-pre-wrap">{message.content}</div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="bg-gray-100 mr-8 p-3 rounded-lg">
                <div className="font-semibold text-sm mb-1">v0</div>
                <div className="text-gray-500">Thinking...</div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Ask v0 to generate, improve, or debug code..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading || !input.trim()}>
              Send
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 