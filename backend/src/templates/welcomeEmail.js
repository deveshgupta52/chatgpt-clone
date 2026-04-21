export const welcomeEmailTemplate = (username, verifyEmailToken) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to ChatGPT</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background: linear-gradient(135deg, #121212 0%, #1a1a1a 100%);
                min-height: 100vh;
                padding: 20px;
            }
            
            .email-container {
                max-width: 600px;
                margin: 0 auto;
                background: #ffffff;
                border-radius: 16px;
                overflow: hidden;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
            }
            
            .header {
                background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
                padding: 40px 20px;
                text-align: center;
                color: white;
            }

            .logo-container {
                display: inline-block;
                width: 56px;
                height: 56px;
                border-radius: 12px;
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                margin-bottom: 20px;
                line-height: 56px;
                text-align: center;
            }
            
            .header h1 {
                font-size: 32px;
                margin-bottom: 10px;
                font-weight: 700;
                color: #ffffff;
            }
            
            .header p {
                font-size: 16px;
                color: #aaaaaa;
            }
            
            .content {
                padding: 40px 20px;
                text-align: center;
            }
            
            .content h2 {
                color: #111;
                font-size: 24px;
                margin-bottom: 15px;
                font-weight: 600;
            }
            
            .welcome-text {
                color: #555;
                font-size: 16px;
                line-height: 1.6;
                margin-bottom: 30px;
            }
            
            .username-highlight {
                color: #3b82f6;
                font-weight: 600;
            }
            
            .verify-section {
                background: #f4f4f5;
                padding: 30px;
                border-radius: 12px;
                margin: 30px 0;
            }
            
            .verify-text {
                color: #555;
                font-size: 14px;
                margin-bottom: 20px;
                line-height: 1.6;
            }
            
            .verify-button {
                display: inline-block;
                background: #111111;
                color: white;
                padding: 14px 40px;
                text-decoration: none;
                border-radius: 8px;
                font-weight: 600;
                font-size: 16px;
                transition: transform 0.3s;
                margin: 10px 0;
            }
            
            .verification-link {
                word-break: break-all;
                color: #3b82f6;
                font-size: 12px;
                margin-top: 20px;
                padding: 15px;
                background: white;
                border-radius: 8px;
                border: 1px solid #e4e4e7;
            }
            
            .features {
                margin: 30px 0;
                text-align: left;
                display: inline-block;
            }
            
            .feature-item {
                color: #555;
                font-size: 14px;
                margin: 10px 0;
                padding-left: 25px;
                position: relative;
            }
            
            .feature-item:before {
                content: "✓";
                position: absolute;
                left: 0;
                color: #3b82f6;
                font-weight: bold;
            }
            
            .footer {
                background: #f8f9fa;
                padding: 24px;
                text-align: center;
                border-top: 1px solid #e0e0e0;
            }
            
            .footer-text {
                color: #999;
                font-size: 12px;
                line-height: 1.6;
            }
            
            .footer-text a {
                color: #3b82f6;
                text-decoration: none;
            }
            
            .divider {
                height: 1px;
                background: #e4e4e7;
                margin: 20px 0;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <!-- Header Section -->
            <div class="header">
                <div class="logo-container">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" style="vertical-align: middle;">
                        <path d="M19 9l1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25L19 9zm-7.5 .5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5zM19 15l-1.25 2.75L15 19l2.75 1.25L19 23l1.25-2.75L23 19l-2.75-1.25L19 15z"/>
                    </svg>
                </div>
                <h1>ChatGPT</h1>
                <p>Welcome to Your AI-Powered Platform</p>
            </div>
            
            <!-- Main Content -->
            <div class="content">
                <h2>Welcome, <span class="username-highlight">${username}</span>!</h2>
                
                <p class="welcome-text">
                    Thank you for joining ChatGPT! We're excited to have you on board. 
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
                <p style="color: #444; margin-bottom: 20px; font-size: 16px; font-weight: 600;">
                    What You Can Do with ChatGPT:
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
                    <strong>This is a verification email from ChatGPT.</strong><br>
                    If you didn't create this account, please ignore this email or 
                    <a href="#">contact our support team</a>.
                </p>
                <p class="footer-text" style="margin-top: 15px;">
                    © 2026 ChatGPT. All rights reserved.
                </p>
            </div>
        </div>
    </body>
    </html>
    `.trim();
};
