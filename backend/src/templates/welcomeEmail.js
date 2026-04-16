export const welcomeEmailTemplate = (username, verifyEmailToken) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Perplexity</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
                padding: 20px;
            }
            
            .email-container {
                max-width: 600px;
                margin: 0 auto;
                background: white;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
            }
            
            .header {
                background: linear-gradient(135deg, #141414 0%, #030303 100%);
                padding: 40px 20px;
                text-align: center;
                color: white;
            }
            
            .header h1 {
                font-size: 32px;
                margin-bottom: 10px;
                font-weight: 700;
            }
            
            .header p {
                font-size: 16px;
                opacity: 0.95;
            }
            
            .content {
                padding: 40px 20px;
                text-align: center;
            }
            
            .content h2 {
                color: #333;
                font-size: 24px;
                margin-bottom: 15px;
                font-weight: 600;
            }
            
            .welcome-text {
                color: #666;
                font-size: 16px;
                line-height: 1.6;
                margin-bottom: 30px;
            }
            
            .username-highlight {
                color: #667eea;
                font-weight: 600;
            }
            
            .verify-section {
                background: #f8f9fa;
                padding: 30px;
                border-radius: 8px;
                margin: 30px 0;
            }
            
            .verify-text {
                color: #666;
                font-size: 14px;
                margin-bottom: 20px;
                line-height: 1.6;
            }
            
            .verify-button {
                display: inline-block;
                background: linear-gradient(135deg, #0a0a0a 0%, #161616 100%);
                color: white;
                padding: 14px 40px;
                text-decoration: none;
                border-radius: 6px;
                font-weight: 600;
                font-size: 16px;
                transition: transform 0.3s, box-shadow 0.3s;
                margin: 10px 0;
            }
            
            .verify-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
            }
            
            .verification-link {
                word-break: break-all;
                color: #667eea;
                font-size: 12px;
                margin-top: 20px;
                padding: 15px;
                background: white;
                border-radius: 4px;
                border-left: 3px solid #667eea;
            }
            
            .features {
                margin: 30px 0;
                text-align: left;
                display: inline-block;
            }
            
            .feature-item {
                color: #666;
                font-size: 14px;
                margin: 10px 0;
                padding-left: 25px;
                position: relative;
            }
            
            .feature-item:before {
                content: "✓";
                position: absolute;
                left: 0;
                color: #667eea;
                font-weight: bold;
            }
            
            .footer {
                background: #f8f9fa;
                padding: 20px;
                text-align: center;
                border-top: 1px solid #e0e0e0;
            }
            
            .footer-text {
                color: #999;
                font-size: 12px;
                line-height: 1.6;
            }
            
            .footer-text a {
                color: #667eea;
                text-decoration: none;
            }
            
            .social-icons {
                margin-top: 15px;
            }
            
            .social-icons a {
                display: inline-block;
                width: 32px;
                height: 32px;
                margin: 0 5px;
                color: white;
                background: #667eea;
                border-radius: 50%;
                text-align: center;
                line-height: 32px;
                text-decoration: none;
                font-size: 14px;
            }
            
            .divider {
                height: 1px;
                background: #e0e0e0;
                margin: 20px 0;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <!-- Header Section -->
            <div class="header">
                <h1> Perplexity</h1>
                <p>Welcome to Your AI-Powered Platform</p>
            </div>
            
            <!-- Main Content -->
            <div class="content">
                <h2>Welcome, <span class="username-highlight">${username}</span>!</h2>
                
                <p class="welcome-text">
                    Thank you for joining Perplexity! We're excited to have you on board. 
                    Before you can start exploring, we need to verify your email address.
                </p>
                
                <!-- Verification Section -->
                <div class="verify-section">
                    <p class="verify-text">
                        Click the button below to verify your email address and activate your account:
                    </p>
                    
                    <a href="${process.env.BACKEND_URL || 'http://localhost:3000'}/api/auth/verify-email?verifytoken=${verifyEmailToken}" class="verify-button">
                        ✓ Verify Email Address
                    </a>
                    
                    <div class="verification-link">
                        <strong>Or copy this link:</strong><br>
                        ${process.env.BACKEND_URL || 'http://localhost:3000'}/api/auth/verify-email?verifytoken=${verifyEmailToken}
                    </div>
                </div>
                
                <div class="divider"></div>
                
                <!-- Features Section -->
                <p style="color: #666; margin-bottom: 20px; font-size: 16px; font-weight: 600;">
                    What You Can Do with Perplexity:
                </p>
                
                <div class="features">
                    <div class="feature-item">Get instant answers with AI assistance</div>
                    <div class="feature-item">Have intelligent conversations anytime</div>
                    <div class="feature-item">Access advanced research capabilities</div>
                    <div class="feature-item">Customize your experience</div>
                </div>
            </div>
            
            <!-- Footer -->
            <div class="footer">
                <p class="footer-text">
                    <strong>This is a verification email from Perplexity.</strong><br>
                    If you didn't create this account, please ignore this email or 
                    <a href="#">contact our support team</a>.
                </p>
                <p class="footer-text" style="margin-top: 15px;">
                    © 2026 Perplexity. All rights reserved.
                </p>
            </div>
        </div>
    </body>
    </html>
    `.trim();
};
