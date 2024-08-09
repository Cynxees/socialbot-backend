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
          🤓📄  👉<a href='' onclick="javascript:event.target.port=8080"> docs</a>
          <br>
          👨🏻‍💻🛢 👉<a href='' onclick="javascript:event.target.port=5050"> pgadmin</a>
        </div>
      </body>
      </html>
    `;
  }
}
