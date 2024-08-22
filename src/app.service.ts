import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome</title>
        <style>
          body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            font-family: Arial, sans-serif;
            background-color: #282c34;
            color: white;
            padding: 20px;
            box-sizing: border-box;
          }
          .centered {
            max-width: 600px;
            width: 100%;
            text-align: left;
            font-size: 2rem;
          }
          a {
            color: #61dafb;
            text-decoration: none;
          }
          a:visited {
            color: #61dafb;
          }
          a:hover {
            color: #21a1f1;
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="centered">
          💪😎 👉 <a href='api'> api</a>
          <br>
          🤓📄  👉<a href='terms'> Terms of Service</a>
        </div>
      </body>
      </html>
    `;
  }

  getTerms(): string {

    return `
    <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Terms of Service - Social Bot</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  line-height: 1.6;
                  margin: 20px;
                  padding: 20px;
                  background-color: #f4f4f4;
                  color: #333;
              }
              h1, h2, h3 {
                  color: #444;
              }
              p {
                  margin: 10px 0;
              }
              ul {
                  list-style-type: disc;
                  margin: 10px 0 10px 20px;
              }
              a {
                  color: #1a73e8;
                  text-decoration: none;
              }
              a:hover {
                  text-decoration: underline;
              }
          </style>
      </head>
      <body>

          <h1>Terms of Service</h1>
          <p><strong>Last Updated: 22/08/2024</strong></p>

          <p>Welcome to <strong>Social Bot</strong>! These Terms of Service ("Terms") govern your use of our website located at <a href="https://www.cynx.buzz/">https://www.cynx.buzz/</a> ("Website") and our service that allows you to schedule automatic uploads to social media platforms, including Instagram, YouTube, Facebook, and TikTok ("Service").</p>

          <p>By accessing or using our Website or Service, you agree to be bound by these Terms. If you do not agree with these Terms, please do not use our Website or Service.</p>

          <h2>1. Use of Service</h2>

          <h3>1.1 Eligibility</h3>
          <p>To use Social Bot, you must be at least 18 years old and capable of forming a legally binding contract. By using our Service, you represent and warrant that you meet these requirements.</p>

          <h3>1.2 Account Registration</h3>
          <p>To access certain features of our Service, you must register for an account. You agree to provide accurate and complete information during the registration process and to keep your account information up to date.</p>

          <h3>1.3 User Responsibilities</h3>
          <p>You are responsible for all activities that occur under your account. You must keep your account credentials secure and confidential. You agree not to use the Service for any unlawful or prohibited activities.</p>

          <h2>2. Service Description</h2>
          <p>Social Bot allows users to schedule and automate the upload of content to various social media platforms, including but not limited to Instagram, YouTube, Facebook, and TikTok. Our Service is provided "as is" and "as available," and we do not guarantee the continuous or error-free operation of the Service.</p>

          <h2>3. Content Ownership and Usage</h2>

          <h3>3.1 User Content</h3>
          <p>You retain ownership of the content you upload or schedule using Social Bot ("User Content"). By using our Service, you grant Social Bot a worldwide, non-exclusive, royalty-free license to use, reproduce, and display your User Content solely for the purpose of providing the Service.</p>

          <h3>3.2 Prohibited Content</h3>
          <p>You agree not to upload or schedule any content that is unlawful, harmful, threatening, abusive, defamatory, obscene, or otherwise objectionable. Social Bot reserves the right to remove any User Content that violates these Terms.</p>

          <h2>4. Intellectual Property</h2>
          <p>All content and materials on the Website and in the Service, including text, graphics, logos, and software, are the property of Social Bot or its licensors and are protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or create derivative works of any content from the Website or Service without our express written permission.</p>

          <h2>5. Privacy</h2>
          <p>Your privacy is important to us. Please review our <a href="#">Privacy Policy</a> to understand how we collect, use, and protect your personal information.</p>

          <h2>6. Termination</h2>
          <p>We reserve the right to suspend or terminate your access to the Service at any time, with or without notice, for any reason, including if we believe you have violated these Terms.</p>

          <h2>7. Limitation of Liability</h2>
          <p>To the fullest extent permitted by law, Social Bot shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from (a) your use of or inability to use the Service; (b) any unauthorized access to or use of our servers and/or any personal information stored therein; (c) any interruption or cessation of transmission to or from the Service; (d) any bugs, viruses, trojan horses, or the like that may be transmitted to or through our Service by any third party; (e) any errors or omissions in any content or for any loss or damage incurred as a result of the use of any content posted, emailed, transmitted, or otherwise made available through the Service; and/or (f) the defamatory, offensive, or illegal conduct of any third party.</p>

          <h2>8. Governing Law</h2>
          <p>These Terms shall be governed by and construed in accordance with the laws of Indonesia, without regard to its conflict of law principles.</p>

          <h2>9. Changes to the Terms</h2>
          <p>Social Bot reserves the right to modify these Terms at any time. We will notify you of any changes by posting the new Terms on our Website. Your continued use of the Service after any such changes constitutes your acceptance of the new Terms.</p>

          <h2>10. Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us at cynxsocial@gmail.com.</p>

      </body>
      </html>

    `

  }
}
