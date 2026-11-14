// Reads local secrets without printing them. Only the Dodo sandbox is reachable.
import fs from 'node:fs';
import DodoPayments from 'dodopayments';
const file='.dev.vars';
function readVars() {
  return Object.fromEntries(fs.readFileSync(file,'utf8').split(/\r?\n/).filter(l=>l.includes('=')&&!l.trim().startsWith('#')).map(l=>{
    const i=l.indexOf('=');return [l.slice(0,i).trim(),l.slice(i+1).trim().replace(/^(['"])(.*)\1$/,'$2')];
  }));
}
try {
  const vars=readVars();
  if(!vars.DODO_PAYMENTS_API_KEY)throw new Error('Test API key is missing from .dev.vars.');
  const client=new DodoPayments({bearerToken:vars.DODO_PAYMENTS_API_KEY,environment:'test_mode',maxRetries:0,timeout:15000});
  const product=await client.products.retrieve(vars.DODO_SPONSOR_TEST_PRODUCT_ID);
  console.log(JSON.stringify({testApiKeyVerified:true,productId:product.product_id}));
  if(process.argv[2]==='--disable') {
    const saved=JSON.parse(fs.readFileSync('.wrangler/sponsor-test/webhook.json','utf8'));
    const hook=await client.webhooks.retrieve(saved.id);
    if(hook.url!==saved.url||hook.metadata.project!=='yttools.pro'||hook.metadata.purpose!=='local_sandbox_test')throw new Error('Stored endpoint does not match this sandbox test.');
    await client.webhooks.update(hook.id,{disabled:true});
    console.log(JSON.stringify({webhookId:hook.id,disabled:true}));
    process.exit(0);
  }
  const target=process.argv[2];if(target&&target!=='--check') {
    const url=new URL(target);
    if(url.protocol!=='https:'||!url.hostname.endsWith('.trycloudflare.com')||url.pathname!=='/api/sponsorship/webhook'||url.search||url.username||url.password)throw new Error('Expected a temporary HTTPS webhook endpoint.');
    const hooks=await client.webhooks.list({limit:100});
    let hook=hooks.data.find(h=>h.url===url.href);
    if(!hook)hook=await client.webhooks.create({url:url.href,description:'YT Toolkit local sandbox checkout test',filter_types:['payment.succeeded','refund.succeeded','dispute.opened'],metadata:{project:'yttools.pro',purpose:'local_sandbox_test'}});
    const {secret}=await client.webhooks.retrieveSecret(hook.id);
    if(!secret)throw new Error('Provider returned no signing secret.');
    let content=fs.readFileSync(file,'utf8');
    content=/^DODO_PAYMENTS_WEBHOOK_KEY=.*$/m.test(content)?content.replace(/^DODO_PAYMENTS_WEBHOOK_KEY=.*$/m,()=>`DODO_PAYMENTS_WEBHOOK_KEY=${secret}`):`${content}\nDODO_PAYMENTS_WEBHOOK_KEY=${secret}\n`;
    fs.writeFileSync(file,content);
    fs.mkdirSync('.wrangler/sponsor-test',{recursive:true});
    fs.writeFileSync('.wrangler/sponsor-test/webhook.json',JSON.stringify({id:hook.id,url:url.href,mode:'test_mode'},null,2));
    console.log(JSON.stringify({webhookId:hook.id,webhookUrl:url.href,signingSecretSaved:true}));
  }
} catch(error) {
  // SDK error objects may carry request headers: never dump them.
  console.error(JSON.stringify({success:false,status:typeof error.status==='number'?error.status:null,message:error instanceof DodoPayments.APIError?'Dodo test API request failed. Check key permissions and test-mode selection.':error.message}));
  process.exitCode=1;
}
