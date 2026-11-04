const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'js/analytics.js'), 'utf8');
const measurementId = 'G-XNBDDZ4B31';

function createPage(url, overrides = {}) {
    const tags = [];
    const window = { location: new URL(url), ...overrides };
    const document = {
        getElementById: id => tags.find(tag => tag.id === id) || null,
        createElement: name => {
            assert.equal(name, 'script');
            return {};
        },
        head: { appendChild: tag => tags.push(tag) }
    };
    const context = vm.createContext({ window, document });
    return { window, tags, load: () => vm.runInContext(source, context) };
}

test('tracks the production root and every portfolio page', () => {
    for (const pathname of ['/Portfolio', '/Portfolio/', '/Portfolio/index.html', '/Portfolio/research.html', '/Portfolio/experience.html', '/Portfolio/publications.html', '/Portfolio/contact.html']) {
        const page = createPage('https://yashsaxena21.github.io' + pathname);
        page.load();
        assert.equal(page.tags.length, 1, pathname);
        assert.equal(page.tags[0].src, 'https://www.googletagmanager.com/gtag/js?id=' + measurementId);
        assert.equal(page.tags[0].async, true);
        const commands = Array.from(page.window.dataLayer, command => Array.from(command));
        assert.deepEqual(commands.map(command => command[0]), ['js', 'config']);
        assert.deepEqual(commands[1], ['config', measurementId]);
    }
});

test('does not load Analytics or create events on local and preview URLs', () => {
    for (const url of ['http://localhost:8002/contact.html', 'http://127.0.0.1:8002/contact.html', 'http://[::1]:8002/contact.html', 'file:///tmp/portfolio/contact.html', 'https://preview.example.com/Portfolio/contact.html', 'https://yashsaxena21.github.io.attacker.test/Portfolio/', 'https://yashsaxena21.github.io/OtherProject/', 'https://yashsaxena21.github.io/Portfolio-preview/', 'http://yashsaxena21.github.io/Portfolio/']) {
        const page = createPage(url);
        page.load();
        assert.equal(page.tags.length, 0, url);
        assert.equal(page.window.dataLayer, undefined, url);
        assert.equal(page.window.gtag, undefined, url);
    }
});

test('initializes only once if the shared script is loaded again', () => {
    const page = createPage('https://yashsaxena21.github.io/Portfolio/contact.html');
    page.load();
    page.load();
    assert.equal(page.tags.length, 1);
    assert.equal(page.window.dataLayer.length, 2);
});

test('respects an existing Analytics opt-out', () => {
    const page = createPage('https://yashsaxena21.github.io/Portfolio/', {
        ['ga-disable-' + measurementId]: true
    });
    page.load();
    assert.equal(page.tags.length, 0);
    assert.equal(page.window.dataLayer, undefined);
});

test('preserves previously queued consent settings', () => {
    const consent = ['consent', 'default', { analytics_storage: 'denied' }];
    const dataLayer = [consent];
    const page = createPage('https://yashsaxena21.github.io/Portfolio/', { dataLayer });
    page.load();
    assert.equal(page.window.dataLayer, dataLayer);
    assert.equal(page.window.dataLayer[0], consent);
    assert.equal(dataLayer.length, 3);
});

test('uses an existing gtag function without replacing it', () => {
    const calls = [];
    const gtag = (...args) => calls.push(args);
    const page = createPage('https://yashsaxena21.github.io/Portfolio/', { gtag });
    page.load();
    assert.equal(page.window.gtag, gtag);
    assert.deepEqual(calls.map(command => command[0]), ['js', 'config']);
});

test('every HTML page loads the shared script once in its head', () => {
    const pages = fs.readdirSync(root).filter(file => file.endsWith('.html'));
    assert.equal(pages.length, 5);
    for (const file of pages) {
        const html = fs.readFileSync(path.join(root, file), 'utf8');
        const reference = 'src="js/analytics.js';
        assert.equal(html.split(reference).length - 1, 1, file);
        assert.ok(html.indexOf(reference) > html.indexOf('<head>'), file);
        assert.ok(html.indexOf(reference) < html.indexOf('</head>'), file);
        assert.equal(html.includes('googletagmanager.com/gtag/js'), false, file);
        assert.equal(html.includes("gtag('config'"), false, file);
    }
});
