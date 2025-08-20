<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" encoding="UTF-8" indent="yes" />
  
  <xsl:template match="/">
    <html>
      <head>
        <title><xsl:value-of select="/rss/channel/title"/> - RSS Feed</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #282a36;
            color: #f8f8f2;
            line-height: 1.6;
            padding: 2rem;
          }
          
          .container {
            max-width: 900px;
            margin: 0 auto;
          }
          
          .header {
            background: #44475a;
            padding: 2rem;
            border-radius: 8px;
            margin-bottom: 2rem;
            border: 1px solid #6272a4;
          }
          
          h1 {
            color: #bd93f9;
            margin-bottom: 0.5rem;
            font-size: 2rem;
          }
          
          .description {
            color: #8be9fd;
            font-size: 1.1rem;
            margin-bottom: 1rem;
          }
          
          .subscribe-info {
            background: #282a36;
            padding: 1rem;
            border-radius: 4px;
            margin-top: 1rem;
            border: 1px solid #6272a4;
          }
          
          .subscribe-info h3 {
            color: #50fa7b;
            margin-bottom: 0.5rem;
          }
          
          .subscribe-info p {
            margin-bottom: 0.5rem;
          }
          
          .feed-url {
            background: #44475a;
            padding: 0.5rem;
            border-radius: 4px;
            font-family: monospace;
            word-break: break-all;
            color: #ffb86c;
          }
          
          .item {
            background: #44475a;
            padding: 1.5rem;
            margin-bottom: 1.5rem;
            border-radius: 8px;
            border: 1px solid #6272a4;
            transition: transform 0.2s;
          }
          
          .item:hover {
            transform: translateY(-2px);
            border-color: #bd93f9;
          }
          
          .item-title {
            color: #bd93f9;
            font-size: 1.3rem;
            margin-bottom: 0.5rem;
            text-decoration: none;
            display: block;
          }
          
          .item-title:hover {
            color: #ff79c6;
          }
          
          .item-date {
            color: #6272a4;
            font-size: 0.9rem;
            margin-bottom: 0.5rem;
          }
          
          .item-description {
            color: #f8f8f2;
            margin-bottom: 0.5rem;
          }
          
          .item-link {
            color: #8be9fd;
            text-decoration: none;
            font-weight: 600;
          }
          
          .item-link:hover {
            color: #50fa7b;
          }
          
          @media (max-width: 768px) {
            body {
              padding: 1rem;
            }
            
            .header {
              padding: 1.5rem;
            }
            
            h1 {
              font-size: 1.5rem;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1><xsl:value-of select="/rss/channel/title"/></h1>
            <p class="description"><xsl:value-of select="/rss/channel/description"/></p>
            
            <div class="subscribe-info">
              <h3>📡 Subscribe to this RSS Feed</h3>
              <p>Copy the URL below and paste it into your RSS reader:</p>
              <div class="feed-url">
                <xsl:value-of select="/rss/channel/link"/>/rss.xml
              </div>
              <p style="margin-top: 1rem;">Popular RSS readers include Feedly, Inoreader, NewsBlur, and many more!</p>
            </div>
          </div>
          
          <div class="items">
            <xsl:for-each select="/rss/channel/item">
              <div class="item">
                <a class="item-title">
                  <xsl:attribute name="href">
                    <xsl:value-of select="link"/>
                  </xsl:attribute>
                  <xsl:value-of select="title"/>
                </a>
                
                <div class="item-date">
                  <xsl:value-of select="pubDate"/>
                </div>
                
                <div class="item-description">
                  <xsl:value-of select="description" disable-output-escaping="yes"/>
                </div>
                
                <a class="item-link">
                  <xsl:attribute name="href">
                    <xsl:value-of select="link"/>
                  </xsl:attribute>
                  Read more →
                </a>
              </div>
            </xsl:for-each>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>