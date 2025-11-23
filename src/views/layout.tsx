import { FC } from 'hono/jsx'

export const Layout: FC<{ title: string; children: any; active?: string }> = (props) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{props.title} - 登山ログ</title>
        <link rel="stylesheet" href="/styles.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <header>
          <nav>
            <a href="/" class="logo">Summit Log</a>
            <div class="nav-links">
              <a href="/" style={props.active === 'home' ? 'color: var(--primary-color);' : ''}>ダッシュボード</a>
              <a href="/log" style={props.active === 'log' ? 'color: var(--primary-color);' : ''}>記録する</a>
              <a href="/history" style={props.active === 'history' ? 'color: var(--primary-color);' : ''}>履歴</a>
            </div>
          </nav>
        </header>
        <main>
          {props.children}
        </main>
        <script src="/client.js"></script>
      </body>
    </html>
  )
}

