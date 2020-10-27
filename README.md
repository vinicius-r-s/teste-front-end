# Teste para candidatos à vaga de desenvolvedor Front-end

`
Todos os interessados que fizerem pull request e enviarem o curriculo para felipe.alves@fbmobile.com.br com assunto NOME DA VAGA + NOME DA EMPRESA receberão um feedback.
`

## Instale no seu sistema operacional

    Node.js e Angular CLI

## Iniciando

Utilizar o comando 'ng new'

O teste deve conter um CRUD (Criar, Ler, Atualizar e Excluir):

1. Um formulário para cadastro de produto com os campos:

  - Nome (obrigatório)
  - Marca (obrigatório)
  - Modelo (obrigatório)
  - Preço (obrigatório)
  - Link da Foto do Produto
  - Descrição

2. Validar os campos:

  - Preço

3. Uma tabela para listar os produtos cadastrados exibindo as colunas de Nome, Marca, Modelo e Preço.

4. Na tabela adicionar botão para excluir o produto.

5. Na tabela adicionar botão para editar o produto que leve para ser editado no formulário.


## Apis

- POST http://ec2-52-203-6-72.compute-1.amazonaws.com:8000/products/create
- Exemplo :

  ```
  {
    "nome":"Iphone",
    "marca":"Apple",
    "modelo":"11 pro max",
    "preco":100000,
    "link_foto":"https://teste.jpg",
    "descricao":"Melhor celular de 2020",
  }
  ```

- PUT http://ec2-52-203-6-72.compute-1.amazonaws.com:8000/products/{_id}/update

Exemplo :

```
{
  "_id":"5f9849b27f2d087823575d1c",
  "nome":"Iphone",
  "marca":"Apple",
  "modelo":"11 pro max",
  "preco":100000,
  "link_foto":"https://teste.jpg",
  "descricao":"Melhor celular de 2020",
}
```

- GET http://ec2-52-203-6-72.compute-1.amazonaws.com:8000/products/list

- DELETE http://ec2-52-203-6-72.compute-1.amazonaws.com:8000/products/{_id}/delete

### Você pode:

- Utilizar o formato de folha de estilo que desejar.

### Ganhe pontos extras por:

- Desenvolver HTML semântico;
- Validar os inputs do seu formulário antes de habilitar o botão de envio;
- Gerar build minificado (produção).
- Utilizar teste unitário ou teste end-to-end.

**Boa sorte!**
