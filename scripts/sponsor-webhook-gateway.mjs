// Tunnel this narrow gateway, not the local development app or owner panel.
import http from 'node:http';
http.createServer(async(req,res)=>{
  try {
    const path=new URL(req.url,'http://localhost').pathname;
    if(req.method==='GET'&&path==='/health') {res.writeHead(200,{'Content-Type':'application/json'});res.end('{"sandboxGateway":true}');return;}
    if(req.method!=='POST'||path!=='/api/sponsorship/webhook') {res.writeHead(404);res.end();return;}
    let size=0;const chunks=[];
    for await(const chunk of req) {size+=chunk.length;if(size>131072){res.writeHead(413);res.end();return;}chunks.push(chunk);}
    const headers={'Content-Type':'application/json'};
    for(const name of ['webhook-id','webhook-signature','webhook-timestamp'])if(typeof req.headers[name]==='string')headers[name]=req.headers[name];
    const response=await fetch('http://localhost:4180/api/sponsorship/webhook',{method:'POST',headers,body:Buffer.concat(chunks),signal:AbortSignal.timeout(25000)});
    res.writeHead(response.status,{'Content-Type':'application/json','Cache-Control':'no-store'});res.end(Buffer.from(await response.arrayBuffer()));
  }catch {res.writeHead(503);res.end('{"error":"Local webhook receiver unavailable."}');}
}).listen(4181,'127.0.0.1',()=>console.log('Sandbox webhook-only gateway listening on 127.0.0.1:4181'));
