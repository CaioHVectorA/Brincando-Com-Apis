import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
const ButtonN = styled.button`
border-radius: 5px;
background-color: #44FFD2;
color: black;
border: none;
font-size: 20px;
padding: 14px 8px;
&:hover {
  background-color: #87F6FF;
  cursor: pointer;
}
`
const Search = styled.input`
border-radius: 5px;
padding: 16px 12px;
/* width: 200px; */
border: 0px solid rgba(0,0,0,0.2);
&:active,&:focus-visible,&:focus {
    border: none;
    outline: none;  
    background-color: #fff;
}
`
const Division = styled.div`
width: 48px;
height: 47px;
background: #d9d9d9;
position: relative;
bottom: 47px;
left: 89%;
border-radius: 0px 5px 5px 0px;
&:hover {
background: #e7e7e7;
cursor: pointer;

}
`
const Detail = styled.div`
border-radius: 5px;
background-color: rgba(255,255,255,0.2);
height: 4px;
width: 80%;
margin: 0 auto;
`

function App() {
  const [Array,setArray] = useState([])
  const [Filtro,setFiltro] = useState(null)
  const [inputValue,setIV] = useState('')
  const [Busca,setBusca] = useState(null)
  // const [Modal,setModal] = useState(null)
  let Temp = [];
  useEffect(() => {
    console.log('foi')
    fetch('https://api.tcgdex.net/v2/pt/cards/').then((Response) => Response.json().then((data) => {
    data.forEach(element => {
        if (element.image) {
          Temp.push(element)
          setArray(Temp)
        }
      });
    }))
  },[])
  useEffect(() => {
    console.log(Array)
    if (Array.length !== 4945) {
      fetch('https://api.tcgdex.net/v2/pt/cards/').then((Response) => Response.json().then((data) => {
        data.forEach(element => {
            if (element.image) {
              Temp.push(element)
              setArray(Temp)
                console.log(Array.length,'foi')
            }
          });
        }))
    }
  },[Array])
  function SearchModal() {
  const ArrayFiltrada = Array.filter(item => item.name.toUpperCase().startsWith(inputValue.toUpperCase()))
  setBusca(ArrayFiltrada)
}
  return (
    <div className="App">
      {!Filtro &&  !Busca && <div>
      <h1>Bem vindo ao Centro TCG!</h1>
      <p>Todas as suas informações sobre as cartas aqui.</p>
      <h2>Busce por uma carta</h2>
      <div style={{display: 'grid'}}>
        <Search value={inputValue} onChange={(e) => {setIV(e.target.value)}} placeholder='Pikachu'>
        </Search>
        <Division onClick={SearchModal}>
          <svg style={{scale: '0.7'}} xmlns="http://www.w3.org/2000/svg" fill="#000" height="48" width="48"><path d="M39.8 41.95 26.65 28.8q-1.5 1.3-3.5 2.025-2 .725-4.25.725-5.4 0-9.15-3.75T6 18.75q0-5.3 3.75-9.05 3.75-3.75 9.1-3.75 5.3 0 9.025 3.75 3.725 3.75 3.725 9.05 0 2.15-.7 4.15-.7 2-2.1 3.75L42 39.75Zm-20.95-13.4q4.05 0 6.9-2.875Q28.6 22.8 28.6 18.75t-2.85-6.925Q22.9 8.95 18.85 8.95q-4.1 0-6.975 2.875T9 18.75q0 4.05 2.875 6.925t6.975 2.875Z"/></svg>
        </Division>
        
        <Detail></Detail>
      {!Busca && <div style={{display: 'grid'}}>
        <p>Sem uma carta em mente?</p>
        <ButtonN onClick={() => {setFiltro('All')}}>Mostrar todos</ButtonN>
      </div>
      }
      </div>
        </div>}
      {Busca && <ButtonN onClick={() => {setBusca(null)}}>Voltar a página inicial</ButtonN>}
     {Array.length === 4945 && Filtro === 'All' && <div>
      <h2>Mostrando todas as {Array.length} Cartas.</h2>
      <p>As imagens podem demorar para carregar.</p>
      <ButtonN onClick={() => setFiltro(null)}>Voltar ao início</ButtonN>
      <div style={{display: 'grid',gridTemplateColumns: 'repeat(auto-fit,300px)',gap: '12px',width: '100vw',margin: '0 auto',justifyContent: 'center'}}>
      {Array.map(item => (
        <div key={item.id + item.name + item.localid}>
        <h1 style={{fontFamily: 'Arial'}}>{item.name}</h1>
        <img alt='CARREGANDO-IMAGEM' style={{height: '400px',width: '280px',backgroundColor: '#161616',borderRadius: '20px'}} src={`${item.image}/low.png`} />
        </div>
      ))}
      </div>
      </div>}
      {Busca && <div>
      <p>As imagens podem demorar para carregar.</p>
      <div style={{display: 'grid',gridTemplateColumns: 'repeat(auto-fit,300px)',gap: '12px',width: '100vw',margin: '0 auto',justifyContent: 'center'}}>
        {Busca.map(item => (
                  <div key={item.id + item.name + item.localid}>
                  <h1 style={{fontFamily: 'Arial'}}>{item.name}</h1>
                  <img alt='CARREGANDO-IMAGEM' style={{height: '400px',width: '280px',backgroundColor: '#d9d9d9'}} src={`${item.image}/low.png`} />
                  </div>
        ))}
        </div>
        </div>}
        {Busca !== null && Busca.length === 0 && <h1>Nenhuma carta foi encontrada.Use palavras chave mais específicas!</h1>}
      {Array.length !== 4945 && Filtro === 'All' && <h1>Carregando...</h1>}
    </div>
  );
}

export default App;
