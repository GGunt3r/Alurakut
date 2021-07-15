import React from 'react';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'

function ProfileSidebar(propriedades){
  return(
    <Box as="aside">
      <img src={`https://github.com/${propriedades.githubUser}.png`} style={{borderRadius: '8px'}} />
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
          @{propriedades.githubUser}
        </a>
      </p> 

      <hr />
    
      <AlurakutProfileSidebarMenuDefault/>
    </Box>
  )
}

function ProfileRelationsBox(propriedades){
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {propriedades.title} ({propriedades.items.length})
      </h2>

      <ul>
        {/* {seguidores.map((itemAtual) => {
          return (
            <li key={itemAtual}>
              <a href={`https://github.com/${itemAtual}.png`}>
                <img src={itemAtual.image} />
                <span>{itemAtual.title}</span>
              </a>
            </li>
          )
        })}*/}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {
  const [comunidades, setComunidades] = React.useState([{
    id: '32312312313131',
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }]);
//  const community = ['Alurakut']
  const githubUser = 'ggunt3r'
  const favoritePeoples = [
    'alissonsilvajs', 
    'gustavoguanabara', 
    'KauaBern'
  ]

  const [seguidores, setSeguidores] = React.useState([]);

  React.useEffect(function(){
    fetch('https://api.github.com/users/GGunt3r/followers')
    .then(function (respostaDoServidor){
      return respostaDoServidor.json();
    })
    .then(function(respostaCompleta){
      setSeguidores(respostaCompleta);
    })
  }, [])

  console.log('Seguidores antes do return', seguidores);


  return (
    <>
    <AlurakutMenu githubUser={githubUser}/>
    <MainGrid>
      <div className="profileArea" style={{ gridArea: 'profileArea'}}>
        <ProfileSidebar githubUser={githubUser}/>
      </div>
        
      <div className="welcomeArea" style={{ gridArea: 'welcomeArea'}}>  
        <Box>
          <h1 className="title">
            Bem-vindo(a)
          </h1>

          <OrkutNostalgicIconSet />       
        </Box>

        <Box>
          <h2>O que você deseja fazer?</h2>

          <form onSubmit={function handleCommunityCreate(e){
            e.preventDefault();
            const dadosDoForm = new FormData(e.target);

            const comunidade = {
              id: new Date().toISOString(),
              title: dadosDoForm.get('title'),
              image: dadosDoForm.get('image')
            }
            const updatedCommunities = [...comunidades, comunidade]
            setComunidades(updatedCommunities)
          }}>        
            <div>
              <input 
              placeholder="Qual vai ser o nome da sua comunidade?" 
              name="title" 
              arial-label="Qual vai ser o nome da sua comunidade?"
              type="text"
              />
            </div>

            <div>
              <input 
              placeholder="Coloque uma URL para ser utilizado como capa" 
              name="image" 
              arial-label="Coloque uma URL para ser utilizado como capa"
              />
            </div>

            <button>
              Criar comunidade
            </button>
          </form>
        </Box>

      </div>

      <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea'}}>
      <ProfileRelationsBox title="Seguidores" items={seguidores} />
      <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
            Comunidades ({comunidades.length})
          </h2>
          <ul>
             {comunidades.map((itemAtual) => {
               return (
                <li key={itemAtual.id}>
                  <a href={`/users/${itemAtual.title}`}>
                    <img src={itemAtual.image}/>
                    <span>{itemAtual.title}</span>
                  </a>
                </li>
               )
             })}
          </ul>
      </ProfileRelationsBoxWrapper>
      
      <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
            Pessoas da comunidade ({favoritePeoples.length})
          </h2>

          <ul>
             {favoritePeoples.map((itemAtual) => {
               return (
                <li key={itemAtual}>
                  <a href={`/users/${itemAtual}`}>
                    <img src={`https://github.com/${itemAtual}.png`}/>
                    <span>{itemAtual}</span>
                  </a>
                </li>
               )
             })}
          </ul>
         </ProfileRelationsBoxWrapper>
      </div>
    </MainGrid>
    </>
  )
}
