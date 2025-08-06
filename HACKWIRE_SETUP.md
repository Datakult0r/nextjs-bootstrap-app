# Hackwire News System Setup Guide

## Overview
Hackwire is a sophisticated AI-powered news system that provides real-time news aggregation, AI monologue generation, and OBS streaming overlay functionality. This guide will help you set up and configure the system.

## Prerequisites
- Node.js 18+ installed
- Next.js 14+ project
- GNews API key (free tier available)
- OpenAI API key (paid)

## Environment Configuration

The Hackwire system requires specific environment variables to function properly. If you already have a comprehensive `.env.local` file, you can continue using it. Otherwise, you can create one based on the example.

### Using Your Existing Configuration
If you already have a `.env.local` file with the necessary API keys, no additional setup is required. The system will automatically use your existing configuration.

### Creating a New Configuration (if needed)
If you need to create a new configuration file, copy the example environment file:

```bash
cp .env.hackwire.example .env.local
```

Then edit `.env.local` and replace the placeholder values with your actual API keys:

```env
# GNews API Configuration
# Get your free API key from: https://gnews.io/
GNEWS_API_KEY=your_actual_gnews_api_key

# OpenAI API Configuration
# Get your API key from: https://platform.openai.com/api-keys
OPENAI_API_KEY=your_actual_openai_api_key

# Next.js Configuration
NEXT_PUBLIC_BASE_URL=http://localhost:3000  # Update for production
```

### Required Environment Variables
The following environment variables are required for full functionality:

- `GNEWS_API_KEY` - For fetching news from GNews API
- `OPENAI_API_KEY` - For AI monologue generation
- `NEXT_PUBLIC_BASE_URL` - For API route URLs (defaults to http://localhost:3000 in development)

## API Endpoints

### News API
- `GET /api/hackwire/news` - Fetch news articles
- `POST /api/hackwire/news` - Search news articles

### Stream API
- `GET /api/hackwire/stream` - Get current stream data
- `POST /api/hackwire/stream` - Update stream settings or add custom headlines

### Settings API
- `GET /api/hackwire/settings` - Get current settings
- `POST /api/hackwire/settings` - Save settings
- `PUT /api/hackwire/settings` - Update specific settings
- `DELETE /api/hackwire/settings` - Reset settings

### Monologue API
- `POST /api/hackwire/monologue` - Generate AI monologue
- `GET /api/hackwire/monologue` - Get monologue templates

### Overlay API
- `GET /api/hackwire/overlay` - Get overlay data or HTML for OBS

## Pages

### 1. Newswire (`/hackwire/newswire`)
Browse and search real-time news articles from GNews API.

### 2. Control Panel (`/hackwire/control-panel`)
Manage all aspects of the Hackwire system:
- Overlay settings (appearance, positioning, etc.)
- Content management (news filters, article limits)
- AI monologue generation
- Live stream monitoring

### 3. Live Stream (`/hackwire/live`)
Monitor the live stream and manage OBS integration:
- Current headlines display
- Stream statistics
- OBS overlay configuration

## OBS Integration

### Setting up the Overlay
1. Open OBS Studio
2. Add a new "Browser" source
3. Use the following URL:
   ```
   http://localhost:3000/api/hackwire/overlay?format=html&mode=auto
   ```
4. Set dimensions to 1920x1080
5. Enable "Refresh browser when scene becomes active"

### Customizing the Overlay
The overlay can be customized through the Control Panel:
- Change themes (dark, light, gaming, minimal)
- Adjust opacity and positioning
- Enable/disable ticker and panel
- Configure refresh rate

## Development

### Running the Development Server
```bash
npm run dev
```

### Building for Production
```bash
npm run build
npm start
```

## Troubleshooting

### Common Issues

1. **"Unexpected token '<'" Error**
   - Ensure all required environment variables are set
   - Restart the development server after adding API keys
   - Check that API keys are valid and have proper permissions

2. **API Routes Returning HTML Instead of JSON**
   - Verify environment variables are correctly configured
   - Check that the development server has been restarted
   - Ensure API keys are valid

3. **OBS Overlay Not Loading**
   - Verify the overlay URL is correct
   - Check that the development server is running
   - Ensure the browser source dimensions are set to 1920x1080

### Debugging Tips

1. Check the browser console for JavaScript errors
2. Check the terminal for server-side errors
3. Verify API keys in `.env.local`
4. Ensure all dependencies are installed:
   ```bash
   npm install
   ```

## Customization

### Adding Custom Headlines
Custom headlines can be added through the Control Panel or by making a POST request to `/api/hackwire/stream` with the following body:

```json
{
  "action": "add_custom_headline",
  "data": {
    "title": "Your custom headline",
    "source": "Your Source",
    "url": "https://example.com",
    "priority": 5
  }
}
```

### Content Modes
The system supports multiple content modes:
- **Auto**: Mix of API headlines and custom headlines
- **Manual**: Manual control only
- **Custom Only**: Custom headlines only
- **AI Monologue**: AI-generated monologue mode

## Security Considerations

- Never commit API keys to version control
- Use environment variables for all sensitive configuration
- In production, consider using a proper database for storing settings
- Implement rate limiting for API endpoints if needed

## Future Enhancements

### Planned Features
- Database integration for persistent storage
- Redis caching for improved performance
- Advanced analytics and reporting
- Multi-language support
- Mobile-responsive design

### Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Support
For issues and feature requests, please open an issue on the GitHub repository.