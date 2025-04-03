document.addEventListener('DOMContentLoaded', function() {
    const youtubeUrlInput = document.getElementById('youtube-url');
    const extractBtn = document.getElementById('extract-btn');
    const resultContainer = document.getElementById('result-container');
    const thumbnailsContainer = document.getElementById('thumbnails');
    
    extractBtn.addEventListener('click', extractThumbnails);
    youtubeUrlInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            extractThumbnails();
        }
    });
    
    function extractThumbnails() {
        const url = youtubeUrlInput.value.trim();
        if (!url) {
            alert('الرجاء إدخال رابط فيديو يوتيوب');
            return;
        }
        
        // Extract video ID from YouTube URL
        const videoId = getYoutubeVideoId(url);
        if (!videoId) {
            alert('رابط يوتيوب غير صالح');
            return;
        }
        
        // Clear previous results
        thumbnailsContainer.innerHTML = '';
        
        // Define thumbnail qualities
        const thumbnailQualities = [
            { quality: 'عالية الجودة', size: 'maxresdefault' },
            { quality: 'جودة عالية', size: 'sddefault' },
            { quality: 'جودة متوسطة', size: 'hqdefault' },
            { quality: 'جودة منخفضة', size: 'mqdefault' }
        ];
        
        // Create thumbnail elements
        thumbnailQualities.forEach(quality => {
            const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/${quality.size}.jpg`;
            
            const thumbnailItem = document.createElement('div');
            thumbnailItem.className = 'thumbnail-item';
            
            const img = document.createElement('img');
            img.className = 'thumbnail-img';
            img.src = thumbnailUrl;
            img.alt = `Thumbnail ${quality.quality}`;
            
            // Add error handling for images that don't exist
            img.onerror = function() {
                thumbnailItem.remove();
            };
            
            const qualityLabel = document.createElement('p');
            qualityLabel.className = 'thumbnail-quality';
            qualityLabel.textContent = quality.quality;
            
            const downloadBtn = document.createElement('a');
            downloadBtn.className = 'download-btn';
            downloadBtn.href = thumbnailUrl;
            downloadBtn.download = `youtube-thumbnail-${videoId}-${quality.size}.jpg`;
            downloadBtn.textContent = 'تحميل';
            downloadBtn.target = '_blank';
            
            thumbnailItem.appendChild(img);
            thumbnailItem.appendChild(qualityLabel);
            thumbnailItem.appendChild(downloadBtn);
            
            thumbnailsContainer.appendChild(thumbnailItem);
        });
        
        // Show results
        resultContainer.classList.add('active');
    }
    
    function getYoutubeVideoId(url) {
        // Regular expressions to match different YouTube URL formats
        const regexps = [
            /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/,
            /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^/?]+)/,
            /(?:https?:\/\/)?(?:www\.)?youtube\.com\/v\/([^/?]+)/,
            /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^/?]+)/
        ];
        
        for (const regex of regexps) {
            const match = url.match(regex);
            if (match) {
                return match[1];
            }
        }
        
        return null;
    }
}); 