import { Hono } from 'hono'
import { html } from 'hono/html'
import { Layout } from './views/layout'

import { cssContent, jsContent } from './assets'

// D1 Database bindings
type Bindings = {
    DB: D1Database
}

type Climb = {
    id: string
    mountain_name: string
    date: string
    elevation: number
    notes: string | null
    created_at: string
}

const app = new Hono<{ Bindings: Bindings }>()

app.get('/styles.css', (c) => {
    return c.text(cssContent, 200, { 'Content-Type': 'text/css' })
})

app.get('/client.js', (c) => {
    return c.text(jsContent, 200, { 'Content-Type': 'application/javascript' })
})

// API Endpoints
// GET all climbs
app.get('/api/climbs', async (c) => {
    try {
        const { results } = await c.env.DB.prepare(
            'SELECT * FROM climbs ORDER BY date DESC'
        ).all()
        return c.json(results)
    } catch (error) {
        console.error('Error fetching climbs:', error)
        return c.json({ error: 'Failed to fetch climbs' }, 500)
    }
})

// POST new climb
app.post('/api/climbs', async (c) => {
    try {
        const body = await c.req.json()
        const { id, mountainName, date, elevation, notes, createdAt } = body

        await c.env.DB.prepare(
            'INSERT INTO climbs (id, mountain_name, date, elevation, notes, created_at) VALUES (?, ?, ?, ?, ?, ?)'
        ).bind(id, mountainName, date, parseInt(elevation), notes || null, createdAt).run()

        return c.json({ success: true, id })
    } catch (error) {
        console.error('Error creating climb:', error)
        return c.json({ error: 'Failed to create climb' }, 500)
    }
})

// DELETE climb
app.delete('/api/climbs/:id', async (c) => {
    try {
        const id = c.req.param('id')
        await c.env.DB.prepare('DELETE FROM climbs WHERE id = ?').bind(id).run()
        return c.json({ success: true })
    } catch (error) {
        console.error('Error deleting climb:', error)
        return c.json({ error: 'Failed to delete climb' }, 500)
    }
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
