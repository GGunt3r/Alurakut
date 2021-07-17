import { SiteClient } from 'datocms-client';

export default async function recebedorDeRequest(request, response){
    
    if(request.method === 'POST'){
        const TOKEN = '8726d542d96e0a62bec2ab414de367';
        const client = new SiteClient(TOKEN);
    
        const registroCriado = await client.items.create({
            itemType: '968412',
            ...request.body,
        })

        response.json({
            dados: 'Algum dado aqui',
            registroCriado: registroCriado
        })

        return;
    }

    response.status(404).json({
        message: 'Ainda não temos nada no GET, mas no POST tem!'
    })
}