import { Hono } from 'hono'
import { html } from 'hono/html'
import { Layout } from './views/layout'
// Import raw content for static files (in a real build step we might handle this differently, 
// but for a simple worker we can import or read file. 
// However, in standard Workers without a bundler config for raw imports, we might need to serve them differently.
// For simplicity in this environment, I will serve them as strings or use a simple serveStatic if available, 
// but since I don't have the file system at runtime in the same way, I'll embed the content or read it if I could.
// Actually, the best way here without a complex build is to just serve the files I just wrote by reading them 
// or pasting them here. But wait, I wrote them to disk. 
// I can use `import` if I set up a bundler, but `wrangler dev` handles imports. 
// Let's try to just serve the static files by reading them or defining them inline if needed.
// To be safe and robust, I will read the files I just created using a helper or just re-define them here? 
// No, that's redundant. 
// I will assume I can't easily read the filesystem at runtime in a Worker.
// So I will create routes that serve the content I defined. 
// Wait, I can just import the CSS/JS as strings if I configure it, but I didn't.
// I will just copy the content into variables here for the static assets to ensure it works 100% without build config issues.
// Actually, I can just use `c.text()` with the content.

// I'll read the files I just wrote to "embed" them in the final worker code if I were building it, 
// but since I am writing the source code now, I should probably just put the content in a separate file and import it?
// No, standard ES modules in Workers support importing code. 
// I will use a simple pattern: I'll put the CSS and JS in the `src` folder (which I did) 
// and I will try to import them. But importing CSS as a module isn't standard.
// PLAN B: I will define the CSS and JS content in this file or a `assets.ts` file to serve them. 
// This guarantees it works without loader config.

// Let's read the files I just wrote to get their content so I can embed them in `assets.ts`.
// I'll do that in a separate step or just re-write them. 
// Actually, I'll just use the `view_file` tool to read them back if I needed to, but I know what I wrote.
// I'll just re-write the CSS/JS into a `src/assets.ts` file that exports strings. 
// This is the most robust way for a zero-config setup.

// Wait, I already wrote `src/styles.css` and `src/client.js`. 
// I will leave them there for reference, but I will create `src/assets.ts` with their content 
// to serve them via Hono.

import { cssContent, jsContent } from './assets'

const app = new Hono()

app.get('/styles.css', (c) => {
    return c.text(cssContent, 200, { 'Content-Type': 'text/css' })
})

app.get('/client.js', (c) => {
    return c.text(jsContent, 200, { 'Content-Type': 'application/javascript' })
})

app.get('/', (c) => {
    return c.html(
        <Layout title="ダッシュボード" active="home">
            <div class="animate-fade-in">
                <h1>ダッシュボード</h1>
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-value" id="stat-total-climbs">0</div>
                        <div class="stat-label">総登山回数</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value" id="stat-total-elevation">0m</div>
                        <div class="stat-label">総獲得標高</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value" id="stat-highest-peak">0m</div>
                        <div class="stat-label">最高到達点</div>
                    </div>
                </div>

                <div class="card">
                    <h2>おかえりなさい！</h2>
                    <p>次の冒険の準備はできましたか？新しい登山を記録するか、過去の履歴を振り返りましょう。</p>
                    <div style="margin-top: 1.5rem;">
                        <a href="/log" class="btn">登山を記録</a>
                        <a href="/history" class="btn btn-outline" style="margin-left: 1rem;">履歴を見る</a>
                    </div>
                </div>
            </div>
        </Layout>
    )
})

app.get('/log', (c) => {
    return c.html(
        <Layout title="登山を記録" active="log">
            <div class="animate-fade-in">
                <h1>登山を記録</h1>
                <div class="card">
                    <form id="log-climb-form">
                        <div class="form-group">
                            <label for="mountainName">山名</label>
                            <input type="text" id="mountainName" name="mountainName" required placeholder="例: 富士山" />
                        </div>

                        <div class="form-group">
                            <label for="date">日付</label>
                            <input type="date" id="date" name="date" required />
                        </div>

                        <div class="form-group">
                            <label for="elevation">標高 (m)</label>
                            <input type="number" id="elevation" name="elevation" required placeholder="例: 3776" />
                        </div>

                        <div class="form-group">
                            <label for="notes">メモ</label>
                            <textarea id="notes" name="notes" rows={4} placeholder="天気はどうでしたか？誰と行きましたか？"></textarea>
                        </div>

                        <button type="submit" class="btn">保存する</button>
                    </form>
                </div>
            </div>
        </Layout>
    )
})

app.get('/history', (c) => {
    return c.html(
        <Layout title="履歴" active="history">
            <div class="animate-fade-in">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <h1>登山履歴</h1>
                    <a href="/log" class="btn" style="font-size: 0.9rem; padding: 0.5rem 1rem;">+ 新規</a>
                </div>

                <ul id="climb-history-list" class="climb-list">
                    {/* Populated by client.js */}
                    <div class="card" style="text-align: center; padding: 3rem;">
                        <p>履歴を読み込み中...</p>
                    </div>
                </ul>
            </div>
        </Layout>
    )
})

export default app
