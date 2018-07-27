var noticias = [];

function atualizarLista(noticia) {
    var lista = document.getElementById('noticias-recentes-list');
    var li = document.createElement('li');
    li.setAttribute('id', 'noticia-' + noticia.id);
    li.setAttribute('class', 'noticia');
    var dataNoticia = new Date(Date.parse(noticia.datahora));
    if (compararDH(dataNoticia)){
        li.innerHTML = '<p class="titulo" onclick="mostrarNoticia(' + noticia.id + ')">'
            + noticia.titulo
            + '</p>'
            + '<p class="conteudo">'
            + 'Autor: '
            + noticia.autor
            + '<br>'
            + 'Publicado: '
            + dataNoticia.toLocaleString('pt-br', { timeZone: 'America/Araguaina' })
            + '<br>'
            + 'Conteúdo: '
            + noticia.conteudo
            + '<br>'
            + '<span>------------------</span>'
            + '<br>'
            + '<button onclick="ocultarNoticia(' + noticia.id + ')">Fechar</button>';
            + '</p>';
        lista.appendChild(li);
    }    
}

function salvar(form) {
    var titulo = document.getElementById('frm-titulo').value;
    var autor = document.getElementById('frm-autor').value;
    var email = document.getElementById('frm-email').value;
    var datahora = document.getElementById('frm-datahora').value;
    var conteudo = document.getElementById('frm-conteudo').value;

    var noticia = {
        id: noticias.length,
        titulo: titulo,
        autor: autor,
        email: email,
        datahora: datahora,
        conteudo: conteudo
    };
    noticias.push(noticia);
    ordenar();
    form.reset();   
}

function mostrarNoticia(id) {
    var li = document.getElementById('noticia-' + id);
    for (var i = 0; i < li.childNodes.length; i++) {
        var node = li.childNodes[i];
        if (node.getAttribute('class') == 'conteudo') {
            node.setAttribute('style', 'display:inline');
        }
    }
}

function ocultarNoticia(id) {
    var li = document.getElementById('noticia-' + id);
    for (var i = 0; i < li.childNodes.length; i++) {
        var node = li.childNodes[i];
        if (node.getAttribute('class') == 'conteudo') {
            node.setAttribute('style', 'display:none');
        }
    }
}

function compararDH(dataNoticia) {
    var dataAtual = new Date().getTime();
    if (dataNoticia != undefined && dataNoticia <= dataAtual){
        return true
    }
    else{
        return false
    }
}

function compare(a,b) {
    if (a.datahora > b.datahora)
       return -1;
    if (a.datahora < b.datahora)
      return 1;
    return 0;
  }

function ordenar(){
    noticias.sort(compare);
    var lista = document.getElementById('noticias-recentes-list');
    lista.innerHTML = '';

    for (var i = 0; i < noticias.length; i++){
        atualizarLista(noticias[i]);
    }
}