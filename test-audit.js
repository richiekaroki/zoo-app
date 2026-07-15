const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // Homepage full page
  await page.goto('https://zoo-app-git-master-richards-projects-ab614866.vercel.app/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'screenshots/audit-01-hero.png', fullPage: false });
  await page.screenshot({ path: 'screenshots/audit-02-home-full.png', fullPage: true });

  // Scroll to featured section
  await page.evaluate(() => window.scrollTo(0, window.innerHeight));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'screenshots/audit-03-featured.png', fullPage: false });

  // Footer
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'screenshots/audit-04-footer.png', fullPage: false });

  // About full
  await page.goto('https://zoo-app-git-master-richards-projects-ab614866.vercel.app/about', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'screenshots/audit-05-about-full.png', fullPage: true });

  // Animals full
  await page.goto('https://zoo-app-git-master-richards-projects-ab614866.vercel.app/animals', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'screenshots/audit-06-animals-full.png', fullPage: true });

  // Contact full
  await page.goto('https://zoo-app-git-master-richards-projects-ab614866.vercel.app/contact', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'screenshots/audit-07-contact-full.png', fullPage: true });

  // Login
  await page.goto('https://zoo-app-git-master-richards-projects-ab614866.vercel.app/login', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'screenshots/audit-08-login.png', fullPage: false });

  // Register
  await page.goto('https://zoo-app-git-master-richards-projects-ab614866.vercel.app/register', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'screenshots/audit-09-register.png', fullPage: false });

  // Mobile homepage
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('https://zoo-app-git-master-richards-projects-ab614866.vercel.app/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'screenshots/audit-10-mobile.png', fullPage: true });

  await browser.close();
  console.log('All audit screenshots saved');
})();
