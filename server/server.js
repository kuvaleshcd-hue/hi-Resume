import express from 'express';
import cors from 'cors';
import { randomUUID } from 'node:crypto';
const app=express(), port=process.env.PORT||5000;
app.use(cors({origin:process.env.CLIENT_ORIGIN||'http://localhost:5173'}));
app.use(express.json({limit:'1mb'}));
// Demo-only memory store; connect MongoDB for persistence before production.
const resumes=new Map();
app.get('/api/health',(_req,res)=>res.json({ok:true,service:'smartresume-api'}));
app.post('/api/resumes',(req,res)=>{const item={id:randomUUID(),...req.body,createdAt:new Date().toISOString()};resumes.set(item.id,item);res.status(201).json(item)});
app.get('/api/resumes',(_req,res)=>res.json([...resumes.values()]));
app.get('/api/resumes/:id',(req,res)=>{const item=resumes.get(req.params.id);if(!item)return res.status(404).json({error:'Resume not found'});res.json(item)});
app.put('/api/resumes/:id',(req,res)=>{const old=resumes.get(req.params.id);if(!old)return res.status(404).json({error:'Resume not found'});const item={...old,...req.body,id:old.id,updatedAt:new Date().toISOString()};resumes.set(item.id,item);res.json(item)});
app.delete('/api/resumes/:id',(req,res)=>{if(!resumes.delete(req.params.id))return res.status(404).json({error:'Resume not found'});res.status(204).end()});
app.listen(port,()=>console.log(`SmartResume API running at http://localhost:${port}`));
