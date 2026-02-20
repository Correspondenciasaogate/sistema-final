// ================= CONFIGURAÇÃO E VARIÁVEIS =================
const CONFIG = {
    NOME_SISTEMA: "Controle de Encomendas - Gate/Way",
    ID_CLIENTE: "banco_dados_gateway_v2",
};

let encomendas = JSON.parse(localStorage.getItem(CONFIG.ID_CLIENTE)) || [];
let selecionadaId = null;
let canvas, ctx, desenhando = false;
let html5QrCode;

// ================= AGENDA DE MORADORES (Sua lista completa) =================
const agendaMoradores = {
    "Gate002": "11994392466", "Gate004": "11958649090", "Gate007": "11958649090", "Gate101": "11979861261",
    "Gate102": "11915568088", "Gate103": "11915568088", "Gate104": "11971556999", "Gate105": "11971556999",
    "Gate106": "11988132624", "Gate107": "11969715269", "Gate121": "11969715269", "Gate123": "11993498721",
    "Gate124": "11914217088", "Gate125": "11914217088", "Gate126": "11940057497", "Gate202": "11955303530",
    "Gate204": "11985918864", "Gate209": "11953472717", "Gate210": "11988067671", "Gate211": "11988067671",
    "Gate215": "11972277072", "Gate216": "11972277072", "Gate218": "11949380908", "Gate219": "11981069977",
    "Gate220": "11988051513", "Gate223": "11949380908", "Gate224": "11981870451", "Gate225": "11981870451",
    "Gate226": "11981840136", "Gate302": "11942103456", "Gate304": "11910101213", "Gate305": "11993613117",
    "Gate307": "11993371621", "Gate308": "11993371621", "Gate310": "11987413211", "Gate311": "11987413211",
    "Gate315": "11977452000", "Gate319": "11912795347", "Gate323": "11912795347", "Gate324": "11954488602",
    "Gate325": "11954488602", "Gate326": "11986727868", "Gate401": "11994500123", "Gate402": "11984141218",
    "Gate405": "11972079173", "Gate407": "11916991214","Gate412": "11916270842",  "Gate413": "11946093516", "Gate414": "11998636282",
    "Gate417": "11964420087", "Gate418": "11976711191", "Gate419": "11976711191", "Gate421": "11972079173", 
    "Gate422": "11940728668", "Gate423": "11968799892", "Gate424": "11999743530", "Gate426": "11963232040", 
    "Gate502": "11984887067", "Gate503": "11998592019", "Gate506": "11956800426", "Gate507": "11983156104",
    "Gate508": "11983156104", "Gate510": "11972079173", "Gate511": "11972079173", "Gate512": "11972079173",
    "Gate513": "11948286001", "Gate514": "11994781574", "Gate517": "11995971657", "Gate518": "11973637104",
    "Gate519": "11997163229", "Gate521": "11997863040", "Gate522": "11997863040", "Gate525": "11997163229",
    "Gate526": "11999002106", "Gate601": "11998384626", "Gate602": "11914849424", "Gate603": "11989478750",
    "Gate604": "11940502054", "Gate605": "11940394433", "Gate606": "11984323889", "Gate608": "11989698757",
    "Gate610": "11981559223", "Gate611": "11983104658", "Gate612": "11983104658", "Gate615": "11999555858",
    "Gate617": "11991154362", "Gate618": "11991154362", "Gate619": "11987013176", "Gate620": "11987013176",
    "Gate621": "11987013176", "Gate622": "11987013176", "Gate625": "11953125020", "Gate626": "11959561324",
    "Gate701": "11945983290", "Gate702": "11945983290", "Gate703": "11972079173", "Gate704": "11975277222",
    "Gate705": "11982694905", "Gate706": "11991584456", "Gate707": "11974442284", "Gate708": "11963097450", "Gate709": "11982008880",
    "Gate710": "11962021731", "Gate712": "11983539111", "Gate713": "11945551623", "Gate714": "11940091219",
    "Gate715": "11945778383", "Gate716": "11986321220", "Gate717": "11992136352", "Gate718": "11992136352",
    "Gate719": "11985355735", "Gate721": "11992445575", "Gate722": "11992136352", "Gate726": "11992136352",
    "Gate801": "11971773002", "Gate802": "11982084119", "Gate803": "11999378520", "Gate804": "11999378520",
    "Gate805": "11919998392", "Gate808": "11937079090", "Gate809": "11937079090", "Gate813": "11943023232",
    "Gate814": "11943023232", "Gate815": "11982490284", "Gate816": "11947425053", "Gate819": "11944509481",
    "Gate820": "11944509481", "Gate821": "11944509481", "Gate822": "11992414539", "Gate823": "11995529248",
    "Way001": "11994766923", "Way101": "3598154110", "Way102": "11966584923",
    "Way105": "3598154110", "Way106": "3598154110", "Way107": "11964038896", "Way201": "11977268575",
    "Way202": "11984608870", "Way204": "11988978251", "Way205": "11993020196", "Way209": "11982881864",
    "Way210": "11974762455", "Way303": "11951758930", "Way304": "11951758930", "Way306": "11991122765",
    "Way310": "11989558176", "Way404": "11981144343", "Way406": "11995088059", "Way407": "11983317178",
    "Way409": "11916657894", "Way410": "11916657894", "Way501": "11952369167", "Way502": "11947779894",
    "Way503": "11992544441", "Way504": "11949640168", "Way505": "11969219628", "Way507": "11991991833",
    "Way508": "11976704835", "Way601": "11991317150", "Way604": "11952063684", "Way610": "11975776105",
    "Way701": "11952250080", "Way702": "11945079814", "Way707": "11945079814", "Way710": "11938006905",
    "Way801": "11940183228", "Way802": "11958313345", "Way804": "11958313345", "Way810": "11958313345",
    "Way901": "11977119335", "Way902": "11950666086", "Way903": "11950666086", "Way904": "11969219628",
    "Way905": "11941384840", "Way906": "11996019671", "Way907": "11996019671", "Way908": "11985006930",
    "Way1001": "11993905617", "Way1002": "11999083190", "Way1005": "1135938483", "Way1006": "1135938483", "Way1010": "11940037132",
    "Way1101": "11958113536", "Way1102": "11958113536", "Way1103": "11958113536",
    "Way1104": "11997073515", "Way1105": "11997073515", "Way1106": "11997073515", "Way1107": "11997073515", "Way1108": "11958113536","Way1110": "11958113536", "Way1201": "11979569039", "Way1202": "11993936531",
    "Way1205": "11983077846", "Way1206": "11988971195", "Way1208": "11933931917", "Way1302": "11989555962",
    "Way1303": "11975153885", "Way1306": "1142294029", "Way1307": "11937469366", "Way1310": "11953632530",
    "Way1401": "11942999009", "Way1403": "11941928289", "Way1404": "11994783019", "Way1405": "11963315000",
    "Way1406": "11989690868", "Way1409": "11989690868", "Way1501": "11941283021", "Way1502": "11950437885",
    "Way1503": "11973905126", "Way1504": "11973905126", "Way1505": "11912838165", "Way1507": "11947502427",
};

// ================= INICIALIZAÇÃO =================
window.onload = () => {
    document.title = CONFIG.NOME_SISTEMA;
    renderizarTabela();
    atualizarDashboard();
};

function buscarContatoAutomatico() {
    const elTorre = document.getElementById('torre');
    const elSala = document.getElementById('sala');
    const elTel = document.getElementById('telefone');
    if (!elTorre || !elSala || !elTel) return;

    const chave = elTorre.value.trim() + elSala.value.trim();
    if (agendaMoradores[chave]) {
        elTel.value = agendaMoradores[chave];
        elTel.style.backgroundColor = "#e8f5e9";
    } else {
        elTel.value = "";
        elTel.style.backgroundColor = "";
    }
}

// ================= SCANNER (CORRIGIDO PARA CELULAR) =================
async function iniciarLeitor() {
    const area = document.getElementById('area-scanner');
    area.style.display = 'block';
    
    // Se o site não for HTTPS, a câmera não abre na maioria dos celulares
    if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
        alert("Atenção: A câmera exige uma conexão segura (HTTPS).");
    }

    html5QrCode = new Html5Qrcode("reader");
    const config = { fps: 15, qrbox: { width: 250, height: 150 } };

    try {
        await html5QrCode.start({ facingMode: "environment" }, config, (text) => {
            document.getElementById('notaFiscal').value = text;
            pararLeitor();
            if (navigator.vibrate) navigator.vibrate(100);
        });
    } catch (err) {
        alert("Erro na câmera: Certifique-se de dar permissão e usar HTTPS.");
        area.style.display = 'none';
    }
}

function pararLeitor() {
    if (html5QrCode) {
        html5QrCode.stop().then(() => {
            document.getElementById('area-scanner').style.display = 'none';
        });
    }
}

// ================= FUNÇÕES DE FILTRO (RESTAURADAS) =================
function aplicarFiltros() {
    const fData = document.getElementById('filtroData').value;
    const fSala = document.getElementById('filtroSala').value.toLowerCase();
    const fNome = document.getElementById('filtroNome').value.toLowerCase();
    const fNF = document.getElementById('filtroNF').value.toLowerCase();
    const fStatus = document.getElementById('filtroStatus').value;

    const filtrados = encomendas.filter(e => {
        const dataFormatada = e.data.split('/').reverse().join('-');
        return (fData === "" || dataFormatada === fData) &&
               (fSala === "" || e.sala.toLowerCase().includes(fSala)) &&
               (fNome === "" || e.destinatario.toLowerCase().includes(fNome)) &&
               (fNF === "" || e.nf.toLowerCase().includes(fNF)) &&
               (fStatus === "" || e.status === fStatus);
    });
    renderizarTabela(filtrados);
}

function renderizarTabela(dados = encomendas) {
    const corpo = document.getElementById('listaCorpo');
    corpo.innerHTML = '';
    dados.forEach(item => {
        const tr = document.createElement('tr');
        tr.onclick = () => selecionarUnica(item.id);
        tr.innerHTML = `
            <td>${item.data}</td>
            <td>${item.nf}</td>
            <td style="font-weight:bold;">${item.sala}</td>
            <td>${item.torre}</td>
            <td>${item.destinatario}</td>
            <td style="color:${item.status === 'Retirado' ? 'green' : 'orange'}">${item.status}</td>
            <td><button onclick="event.stopPropagation(); editar(${item.id})">✏️</button></td>
        `;
        corpo.appendChild(tr);
    });
}

// ================= DEMAIS FUNÇÕES (SALVAR, DASHBOARD, ETC) =================
function salvarEAtualizar() {
    localStorage.setItem(CONFIG.ID_CLIENTE, JSON.stringify(encomendas));
    renderizarTabela();
    atualizarDashboard();
}

function atualizarDashboard() {
    const aguardando = encomendas.filter(e => e.status === 'Aguardando retirada').length;
    const retirados = encomendas.filter(e => e.status === 'Retirado').length;
    document.getElementById('dashTotal').innerText = encomendas.length;
    document.getElementById('dashAguardando').innerText = aguardando;
    document.getElementById('dashRetirados').innerText = retirados;
}

document.getElementById('formRecebimento').addEventListener('submit', function(e) {
    e.preventDefault();
    const idExistente = document.getElementById('editId').value;
    const dados = {
        id: idExistente ? parseInt(idExistente) : Date.now(),
        nf: document.getElementById('notaFiscal').value,
        torre: document.getElementById('torre').value,
        sala: document.getElementById('sala').value,
        destinatario: document.getElementById('destinatario').value,
        telefone: document.getElementById('telefone').value,
        data: idExistente ? encomendas.find(x => x.id == idExistente).data : new Date().toLocaleDateString('pt-BR'),
        status: idExistente ? encomendas.find(x => x.id == idExistente).status : 'Aguardando retirada'
    };

    if (idExistente) {
        const index = encomendas.findIndex(en => en.id == idExistente);
        encomendas[index] = dados;
    } else {
        encomendas.push(dados);
    }
    salvarEAtualizar();
    this.reset();
    document.getElementById('editId').value = "";
});

function selecionarUnica(id) {
    selecionadaId = id;
    const item = encomendas.find(e => e.id === id);
    const cont = document.getElementById('resultadoConteudo');
    cont.innerHTML = `
        <div style="padding:10px; border-left:4px solid #15803d; background:#f9f9f9;">
            <p><strong>NF:</strong> ${item.nf}</p>
            <p><strong>Destinatário:</strong> ${item.destinatario}</p>
            <p><strong>Status:</strong> ${item.status}</p>
        </div>
    `;
    document.getElementById('blocoConfirmarRetirada').style.display = item.status === 'Retirado' ? 'none' : 'block';
    if(item.status !== 'Retirado') configurarCanvas();
}

function configurarCanvas() {
    canvas = document.getElementById('canvasAssinatura');
    ctx = canvas.getContext('2d');
    canvas.onmousedown = () => desenhando = true;
    window.onmouseup = () => desenhando = false;
    canvas.onmousemove = (e) => {
        if (!desenhando) return;
        const rect = canvas.getBoundingClientRect();
        ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
        ctx.stroke();
    };
}

function finalizarEntrega() {
    const index = encomendas.findIndex(e => e.id === selecionadaId);
    encomendas[index].status = 'Retirado';
    salvarEAtualizar();
    document.getElementById('blocoConfirmarRetirada').style.display = 'none';
}

function visualizarTudo() {
    document.getElementById('filtroData').value = "";
    document.getElementById('filtroSala').value = "";
    document.getElementById('filtroNome').value = "";
    document.getElementById('filtroNF').value = "";
    document.getElementById('filtroStatus').value = "";
    renderizarTabela();
}
