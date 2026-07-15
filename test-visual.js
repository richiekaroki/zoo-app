const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const errors = [];
  page.on('pageerror', (err) => errors.push(err.message));
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });

  // Test 1: Homepage
  console.log('--- Testing Homepage ---');
  await page.goto('https://zoo-app-git-master-richards-projects-ab614866.vercel.app/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'screenshots/01-homepage.png', fullPage: false });
  console.log('Homepage screenshot saved');

  // Check hero content
  const heroTitle = await page.textContent('.hero-title');
  console.log('Hero title:', heroTitle ? heroTitle.trim().substring(0, 50) : 'NOT FOUND');

  const heroEyebrow = await page.textContent('.hero-eyebrow');
  console.log('Hero eyebrow:', heroEyebrow ? heroTitle.trim().substring(0, 30) : 'NOT FOUND');

  // Check navbar
  const navBrand = await page.textContent('.brand-text');
  console.log('Nav brand:', navBrand ? navBrand.trim() : 'NOT FOUND');

  const navLinks = await page.$$eval('.nav-link', els => els.map(e => e.textContent.trim()));
  console.log('Nav links:', navLinks.join(', '));

  // Test 2: Scroll down to trigger navbar glass effect
  console.log('\n--- Testing Navbar Scroll Effect ---');
  await page.evaluate(() => window.scrollTo(0, 200));
  await page.waitForTimeout(500);
  const hasScrolled = await page.$eval('.navbar', el => el.classList.contains('scrolled'));
  console.log('Navbar scrolled class:', hasScrolled);
  await page.screenshot({ path: 'screenshots/02-navbar-scrolled.png', fullPage: false });
  console.log('Navbar scrolled screenshot saved');

  // Test 3: About page
  console.log('\n--- Testing About Page ---');
  await page.goto('https://zoo-app-git-master-richards-projects-ab614866.vercel.app/about', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'screenshots/03-about.png', fullPage: false });
  const aboutTitle = await page.textContent('.page-title');
  console.log('About title:', aboutTitle ? aboutTitle.trim() : 'NOT FOUND');

  // Test 4: Animals page
  console.log('\n--- Testing Animals Page ---');
  await page.goto('https://zoo-app-git-master-richards-projects-ab614866.vercel.app/animals', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'screenshots/04-animals.png', fullPage: false });
  const animalsContent = await page.textContent('body');
  console.log('Animals page loaded:', animalsContent.includes('Lion') || animalsContent.includes('Tiger') || animalsContent.includes('Animal'));

  // Test 5: Contact page
  console.log('\n--- Testing Contact Page ---');
  await page.goto('https://zoo-app-git-master-richards-projects-ab614866.vercel.app/contact', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'screenshots/05-contact.png', fullPage: false });
  const contactContent = await page.textContent('body');
  console.log('Contact page loaded:', contactContent.includes('Contact') || contactContent.includes('form'));

  // Test 6: Login page
  console.log('\n--- Testing Login Page ---');
  await page.goto('https://zoo-app-git-master-richards-projects-ab614866.vercel.app/login', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'screenshots/06-login.png', fullPage: false });
  const loginContent = await page.textContent('body');
  console.log('Login page loaded:', loginContent.includes('Sign') || loginContent.includes('Login') || loginContent.includes('Email'));

  // Test 7: Mobile viewport
  console.log('\n--- Testing Mobile View ---');
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('https://zoo-app-git-master-richards-projects-ab614866.vercel.app/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'screenshots/07-mobile-home.png', fullPage: false });
  const mobileToggler = await page.$('.navbar-toggler');
  console.log('Mobile menu toggler visible:', !!mobileToggler);

  // Test mobile menu
  if (mobileToggler) {
    await mobileToggler.click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'screenshots/08-mobile-menu.png', fullPage: false });
    const menuOpen = await page.$eval('.navbar-collapse', el => el.classList.contains('show'));
    console.log('Mobile menu opened:', menuOpen);
  }

  // Report errors
  console.log('\n--- Console Errors ---');
  if (errors.length === 0) {
    console.log('No console errors!');
  } else {
    errors.forEach(e => console.log('ERROR:', e));
  }

  await browser.close();
  console.log('\nAll tests completed!');
})();
