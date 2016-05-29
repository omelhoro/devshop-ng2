import { Component } from '@angular/core';

/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

console.log('`About` component loaded asynchronously');
/* tslint:disable */
@Component({
  selector: 'about',
  styles: [`
    h1 {
      font-family: Arial, Helvetica, sans-serif
    }
    md-card{
      margin: 25px;
    }

    .about-page {
      margin: 10px;
    }
  `],
  template: `
  <div class="about-page">
  <h2><a id="Objetivo_0"></a>Objetivo</h2>
  <p>Criar o carrinho de compras de uma loja que vende desenvolvedores baseado no exemplo fornecido.</p>
  <p><img src="http://i.imgur.com/8NPz67T.png" alt="Imgur"></p>
  <p>Queremos descobrir seu nível de habilidade em todas as áreas envolvidas na construção de um aplicativo web: <em>back end</em>, <em>front end</em> e usabilidade.</p>
  <p>Sinta-se confortável para focar nas áreas que você tem mais habilidade.</p>
  <h2><a id="Tarefas_e_priorizao_10"></a>Tarefas e priorização</h2>
  <p>Priorize a lista de tarefas abaixo explicando os motivos da priorização de cada uma delas. Então, escolha de três a seis tarefas para implementar.</p>
  <ul>
  <li>Determinar o preço do desenvolvedor a partir de informações do seu perfil do GitHub, como por exemplo: followers, repos, stars, commits, etc.</li>
  <li>Substituir os inputs de texto por uma lista de desenvolvedores com nome, foto, preço e um botão de “Adicionar ao carrinho”.</li>
  <li>Criar paginação para a lista de desenvolvedores.</li>
  <li>Popular a lista de desenvolvedores a partir de uma organização do GitHub.</li>
  <li>Permitir a escolha de quantidade de horas contratadas de cada desenvolvedor.</li>
  <li>Permitir a adição de um cupom de desconto que altera o preço total da compra. Utilize o código “SHIPIT”.</li>
  <li>Melhorar a visualização do desenvolvedor no carrinho mostrando mais informações.</li>
  <li>Adicionar um botão de “comprar” que leva o usuário a uma página de pedido confirmado.</li>
  </ul>
  <h2><a id="Server_side_23"></a>Server side</h2>
  <p>Crie uma API REST simples que, no mínimo, utiliza uma lista em memória para guardar o estado do carrinho.</p>
  <p>As tarefas mais avançadas exigem integração com API do GitHub. Além disso, você pode utilizar uma persistência mais robusta.</p>
  <p>Testes automatizados são <strong>extremamente</strong> bem vindos.</p>
  <p>Adoraríamos que você utilizasse <a href="https://golang.org/">Go</a>, <a href="http://www.asp.net/">.NET</a> ou <a href="https://nodejs.org/">Node</a> para construir sua API. Caso contrário, justifique sua escolha de tecnologia.</p>
  <h2><a id="Client_side_33"></a>Client side</h2>
  <p>Você pode implementar toda a interface com HTML renderizado server-side e formulários.</p>
  <p>Uma opção melhor é criar uma <em>single page application</em> que utilize a API REST por AJAX.</p>
  <p>De preferência, utilize <a href="https://facebook.github.io/react/">React</a>. Caso deseje utilizar outras tecnologias, justifique sua escolha.</p>
  <h2><a id="Entrega_e_observaes_41"></a>Entrega e observações</h2>
  <p>Seu código deve estar disponível em um repositório <em>git</em>, preferencialmente hospedado no <a href="https://github.com/">Github</a>.</p>
  <p>Você pode utilizar plataformas como <a href="https://www.heroku.com/">Heroku</a> ou <a href="https://cloud.google.com/">Google Cloud Plataform</a> para nos mostrar a aplicação funcionando em produção.</p>
  <p>Não se preocupe se você não tem experiência em Go, Node ou React. Grande parte do nosso trabalho é lidar com novas tecnologias. Vamos levar isso em consideração.</p>
  <p>Boa sorte!</p>
  </div>

  `
})
/* tslint:enable */
export class About {
  constructor() {

  }

  ngOnInit() {
    console.log('hello `About` component');
    // static data that is bundled
    // var mockData = require('assets/mock-data/mock-data.json');
    // console.log('mockData', mockData);
    // if you're working with mock data you can also use http.get('assets/mock-data/mock-data.json')
    // this.asyncDataWithWebpack();
  }
  asyncDataWithWebpack() {
    // you can also async load mock data with 'es6-promise-loader'
    // you would do this if you don't want the mock-data bundled
    // remember that 'es6-promise-loader' is a promise
    // var asyncMockDataPromiseFactory = require('es6-promise!assets/mock-data/mock-data.json');
    // setTimeout(() => {
    //
    //   let asyncDataPromise = asyncMockDataPromiseFactory();
    //   asyncDataPromise.then(json => {
    //     console.log('async mockData', json);
    //   });
    //
    // });
  }

}
