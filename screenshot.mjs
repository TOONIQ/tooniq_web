import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pages = [
  { url: '/', name: 'home' },
  { url: '/about', name: 'about' },
  { url: '/services', name: 'services' },
  { url: '/works', name: 'works' },
  { url: '/contact', name: 'contact' }
];

(async () => {
  const browser = await chromium.launch();

  // モバイルビュー（iPhone 12 Pro）
  console.log('📱 Capturing mobile views...\n');
  const contextMobile = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
  });

  // 同じページオブジェクトを再利用してsessionStorageを維持
  const pageMobile = await contextMobile.newPage();

  for (const page of pages) {
    console.log(`  📄 ${page.name}...`);
    await pageMobile.goto(`http://localhost:4321${page.url}`);

    // 初回訪問はスプラッシュスクリーンを待つ
    if (page.name === 'home') {
      console.log('     ⏳ Waiting for splash screen (3 seconds)...');
      await pageMobile.waitForTimeout(3000);
    } else {
      await pageMobile.waitForTimeout(1500);
    }

    await pageMobile.screenshot({
      path: join(__dirname, `screenshot-mobile-${page.name}.png`),
      fullPage: true
    });
    console.log(`     ✅ Saved: screenshot-mobile-${page.name}.png`);
  }

  await pageMobile.close();

  await contextMobile.close();

  // デスクトップビュー
  console.log('\n🖥️  Capturing desktop views...\n');
  const contextDesktop = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });

  // 同じページオブジェクトを再利用してsessionStorageを維持
  const pageDesktop = await contextDesktop.newPage();

  for (const page of pages) {
    console.log(`  📄 ${page.name}...`);
    await pageDesktop.goto(`http://localhost:4321${page.url}`);

    // 初回訪問はスプラッシュスクリーンを待つ
    if (page.name === 'home') {
      console.log('     ⏳ Waiting for splash screen (3 seconds)...');
      await pageDesktop.waitForTimeout(3000);
    } else {
      await pageDesktop.waitForTimeout(1500);
    }

    await pageDesktop.screenshot({
      path: join(__dirname, `screenshot-desktop-${page.name}.png`),
      fullPage: true
    });
    console.log(`     ✅ Saved: screenshot-desktop-${page.name}.png`);
  }

  await pageDesktop.close();

  await contextDesktop.close();
  await browser.close();

  console.log('\n🎉 All screenshots captured successfully!');
  console.log(`   Total: ${pages.length} pages × 2 viewports = ${pages.length * 2} screenshots`);
})();
