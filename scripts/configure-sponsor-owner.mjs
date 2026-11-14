// Run only after checking that SPONSOR_ADMIN_TOKEN is not already configured.
// The production key is never passed as a shell argument or printed.
import fs from 'node:fs';
import { randomBytes } from 'node:crypto';
import { spawn } from 'node:child_process';
import path from 'node:path';
const file='.sponsor-production-owner.key';
const key=fs.existsSync(file)?fs.readFileSync(file,'utf8').trim():randomBytes(32).toString('hex');
if (!/^[a-f0-9]{64}$/.test(key)) throw new Error('Unexpected owner-key format.');
if (!fs.existsSync(file)) fs.writeFileSync(file,`${key}\n`,{mode:0o600,flag:'wx'});
const packageFile=fs.realpathSync('node_modules/wrangler/package.json');
const packageInfo=JSON.parse(fs.readFileSync(packageFile,'utf8'));
const bin=path.resolve(path.dirname(packageFile),packageInfo.bin.wrangler);
const child=spawn(process.execPath,[bin,'secret','put','SPONSOR_ADMIN_TOKEN'],{stdio:['pipe','pipe','pipe']});
let output='';
child.stdout.on('data',chunk=>{output+=chunk.toString();});
child.stderr.on('data',chunk=>{output+=chunk.toString();});
child.stdin.end(`${key}\n`);
child.on('error',()=>{console.error('Could not start Wrangler. Owner key remains in the ignored local file.');process.exitCode=1;});
child.on('close',code=>{
  console.log(output.replaceAll(key,'[REDACTED]'));
  if(code===0) console.log('Production owner key configured. Keep .sponsor-production-owner.key private; it is ignored by Git.');
  process.exitCode=code??1;
});
