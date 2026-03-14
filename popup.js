document.getElementById('actionButton').addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
  
    window.open('https://github.com/mp3o7/YTvideos-download-extension', '_blank');
    
    window.close(); // Close popup after action
});