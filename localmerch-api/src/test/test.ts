import server from '../infrastructure/server';

const app = server.get();

app.get('/test', (request, response) => {
    console.log(request.supabase);
    response.json({ 'message': 'Hello world' });
});