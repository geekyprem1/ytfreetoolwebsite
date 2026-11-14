// Ensure the Dodo sandbox has the selected fixed $10 / 30-day YT Toolkit offer.
// This script is hard-pinned to test_mode and only writes the product ID to ignored .dev.vars.
import fs from 'node:fs';
import DodoPayments from 'dodopayments';

if (process.argv[2] !== '--ensure-test-product') {
  console.error('Usage: node scripts/configure-sponsor-test-product.mjs --ensure-test-product');
  process.exit(2);
}

const varsFile = '.dev.vars';
function readVars() {
  return Object.fromEntries(fs.readFileSync(varsFile, 'utf8').split(/\r?\n/).filter(line => line.includes('=') && !line.trim().startsWith('#')).map(line => {
    const index = line.indexOf('=');
    return [line.slice(0, index).trim(), line.slice(index + 1).trim().replace(/^(['"])(.*)\1$/, '$2')];
  }));
}
function matchesOffer(product) {
  const price = product.price;
  return product.name === 'YT Toolkit homepage sponsor — 30 days (TEST)'
    && !product.is_recurring && price?.type === 'one_time_price'
    && price.price === 1000 && price.currency === 'USD' && price.tax_inclusive === true
    && !price.pay_what_you_want && !price.purchasing_power_parity && !price.discount && !price.discount_bps;
}

try {
  const vars = readVars();
  if (!vars.DODO_PAYMENTS_API_KEY || !vars.DODO_SPONSOR_TEST_PRODUCT_ID) throw new Error('Local Dodo sandbox credentials/product configuration are missing.');
  const client = new DodoPayments({ bearerToken: vars.DODO_PAYMENTS_API_KEY, environment: 'test_mode', maxRetries: 0, timeout: 15000 });
  let product;
  for await (const item of client.products.list({ page_size: 100 })) {
    if (item.name === 'YT Toolkit homepage sponsor — 30 days (TEST)') {
      const candidate = await client.products.retrieve(item.product_id);
      if (!matchesOffer(candidate)) throw new Error('A test product with the target name already exists but has a different price. Review it before creating another.');
      product = candidate;
      break;
    }
  }
  if (!product) {
    const old = await client.products.retrieve(vars.DODO_SPONSOR_TEST_PRODUCT_ID);
    if (!old.tax_category) throw new Error('Existing sandbox product has no tax category to reuse.');
    product = await client.products.create({
      name: 'YT Toolkit homepage sponsor — 30 days (TEST)',
      description: 'Test-only checkout for a one-time $10 USD, 30-day YT Toolkit homepage sponsorship. Standard and Featured slots use the same introductory price.',
      tax_category: old.tax_category,
      price: { type: 'one_time_price', currency: 'USD', price: 1000, tax_inclusive: true },
      metadata: { project: 'yttools.pro', purpose: 'sponsor_launch_offer_test', term_days: '30' },
    });
  }
  if (!matchesOffer(product)) throw new Error('Dodo returned a sandbox product that does not match the fixed $10 USD offer.');
  let content = fs.readFileSync(varsFile, 'utf8');
  const entry = `DODO_SPONSOR_TEST_PRODUCT_ID=${product.product_id}`;
  content = /^DODO_SPONSOR_TEST_PRODUCT_ID=.*$/m.test(content)
    ? content.replace(/^DODO_SPONSOR_TEST_PRODUCT_ID=.*$/m, entry)
    : `${content.trimEnd()}\n${entry}\n`;
  fs.writeFileSync(varsFile, content);
  console.log(JSON.stringify({ mode: 'test_mode', productId: product.product_id, amount: 1000, currency: 'USD', durationDays: 30, localProductIdUpdated: true }));
} catch (error) {
  const message = String(error?.message ?? 'Unknown error.').replace(/Bearer\s+\S+/gi, 'Bearer [redacted]').slice(0, 240);
  console.error(JSON.stringify({ success: false, status: typeof error?.status === 'number' ? error.status : null, message }));
  process.exitCode = 1;
}
