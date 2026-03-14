# Introduction

I made a browser extension that replaces the download button under youtube videos with a button that actually downloads the video. No Youtube Premium needed.

![](https://i.imgur.com/CNdAWQR.png)
![](https://i.imgur.com/KgZijFW.png)

# How it works

After clicking download it downloads a .bat file, that you then have to run. I used [yt-dlp](https://github.com/yt-dlp/yt-dlp) for the downloading, so on the first run that is installed (may take some time). After that, the video starts downloading. It downloads the best quality video or audio for the format you selected on youtube. 

# How to use
- Download the ZIP of this project
- un-zip it
- go to your browser extension manager
- click "Load unpacked" (may have to enable Developer mode first at top right) and select the folder.
