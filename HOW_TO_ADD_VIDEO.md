# How to Add Your Video Background

## Quick Steps:

1. **Place your video file** in the `public/videos/` folder (create the folder if it doesn't exist)
   - Recommended formats: `.mp4` or `.webm`
   - Recommended size: Keep file size reasonable for web (under 10MB if possible)

2. **Update the VideoThemeManager component**:
   
   Open `components/VideoThemeManager.tsx` and update the `videoSrc`:

```typescript
export function VideoThemeManager() {
  // For local video (recommended):
  const [videoSrc, setVideoSrc] = useState<string | null>("/videos/your-video.mp4");
  
  // OR for remote video:
  // const [videoSrc, setVideoSrc] = useState<string | null>("https://example.com/video.mp4");

  // Rest of the code...
}
```

3. **Alternative: Direct Video URL**
   
   If you have a video URL (YouTube, Vimeo, or direct link), you can use it directly:

```typescript
const [videoSrc, setVideoSrc] = useState<string | null>("https://your-video-url.com/video.mp4");
```

## Video Requirements:

- **Format**: MP4 (H.264) or WebM
- **Resolution**: 1920x1080 or higher (will be scaled automatically)
- **Duration**: Can be any length (will loop automatically)
- **Size**: Optimize for web (use compression tools if needed)

## Tips:

- The video will automatically loop and be muted
- An overlay is applied for better text readability
- The video background is disabled on mobile devices for performance
- If the video fails to load, a fallback gradient background will show

## Testing:

After adding your video, restart the dev server:
```bash
npm run dev
```

The video should now appear as the background!



