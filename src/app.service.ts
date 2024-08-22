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

  getPrivacyPolicy(): string {

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Privacy Policy - Social Bot</title>
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

        <h1>Privacy Policy</h1>
        <p><strong>Last Updated: 22 August 2024</strong></p>

        <p>Welcome to <strong>Social Bot</strong>! We respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and share information about you when you use our website located at <a href="https://www.cynx.buzz/">https://www.cynx.buzz/</a> ("Website") and our service that allows you to schedule automatic uploads to social media platforms, including Instagram, YouTube, Facebook, and TikTok ("Service").</p>

        <h2>1. Information We Collect</h2>
        <p>We collect information about you in various ways when you use our Website and Service. This includes:</p>
        <ul>
            <li><strong>Information You Provide:</strong> We collect information that you provide to us directly, such as when you create an account, upload content, or communicate with us. This may include your name, email address, and any other information you choose to provide.</li>
            <li><strong>Information We Collect Automatically:</strong> When you use our Service, we may automatically collect certain information about your device and usage, including your IP address, browser type, operating system, and usage data.</li>
            <li><strong>Information from Social Media Platforms:</strong> If you connect your social media accounts to our Service, we may collect information from those accounts, such as your profile information and any content you upload or interact with using our Service.</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
            <li>Provide, maintain, and improve our Service;</li>
            <li>Process transactions and send you related information, such as confirmations and invoices;</li>
            <li>Send you technical notices, updates, security alerts, and support messages;</li>
            <li>Respond to your comments, questions, and requests, and provide customer service;</li>
            <li>Monitor and analyze trends, usage, and activities in connection with our Service;</li>
            <li>Personalize your experience and provide advertisements, content, or features that match your profile and interests;</li>
            <li>Comply with legal obligations and protect our rights and the rights of others.</li>
        </ul>

        <h2>3. Sharing Your Information</h2>
        <p>We may share your information with third parties in the following circumstances:</p>
        <ul>
            <li><strong>With Your Consent:</strong> We may share your information with third parties if you have given us your consent to do so.</li>
            <li><strong>Service Providers:</strong> We may share your information with vendors, consultants, and other service providers who need access to such information to carry out work on our behalf.</li>
            <li><strong>Legal Requirements:</strong> We may disclose your information if we are required to do so by law or if we believe that such action is necessary to comply with legal obligations or to protect the security or integrity of our Service.</li>
            <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction.</li>
        </ul>

        <h2>4. Security of Your Information</h2>
        <p>We take reasonable measures to protect the information we collect from or about you from unauthorized access, use, or disclosure. However, no method of transmission over the internet or method of electronic storage is completely secure, so we cannot guarantee its absolute security.</p>

        <h2>5. Your Choices</h2>
        <p>You have certain choices regarding the information we collect and how it is used. You may update or correct your account information at any time by logging into your account. You may also opt out of receiving promotional communications from us by following the instructions in those communications.</p>

        <h2>6. Children's Privacy</h2>
        <p>Our Service is not intended for use by children under the age of 13, and we do not knowingly collect personal information from children under 13. If we learn that we have collected personal information from a child under 13, we will delete that information as quickly as possible.</p>

        <h2>7. Changes to This Privacy Policy</h2>
        <p>We may update this Privacy Policy from time to time. If we make changes, we will notify you by revising the date at the top of this policy, and in some cases, we may provide additional notice (such as adding a statement to our homepage or sending you a notification). We encourage you to review this Privacy Policy periodically to stay informed about our information practices and the ways you can help protect your privacy.</p>

        <h2>8. Contact Us</h2>
        <p>If you have any questions or concerns about this Privacy Policy, please contact us at <a href="mailto:cynxsocial@gmail.com">cynxsocial@gmail.com</a>.</p>

    </body>
    </html>
    `

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
