function createTable (data) {
    const table = document.createElement('table');
    const tHead = document.createElement('thead');
    const tBody = document.createElement('tbody');

    const linha1 = document.createElement('tr');

    const L1Coluna1 = document.createElement('th');
    L1Coluna1.innerHTML = 'Chave';
    const L1coluna2 = document.createElement('th');
    L1coluna2.innerHTML = 'Valor';

    linha1.appendChild(L1Coluna1);
    linha1.appendChild(L1coluna2);

    tHead.appendChild(linha1);
    
    const linha2 = document.createElement('tr');

    const L2Coluna1 = document.createElement('td');
    L2Coluna1.innerHTML = 'Codigo FIPE';
    const L2Coluna2 = document.createElement('td');
    L2Coluna2.innerHTML = data.CodigoFipe;

    linha2.appendChild(L2Coluna1);
    linha2.appendChild(L2Coluna2);

    tBody.appendChild(linha2);

    const linha3 = document.createElement('tr');

    const L3Coluna1 = document.createElement('td');
    L3Coluna1.innerHTML = 'Marca';
    const L3Coluna2 = document.createElement('td');
    L3Coluna2.innerHTML = data.Marca;

    linha3.appendChild(L3Coluna1);
    linha3.appendChild(L3Coluna2);

    tBody.appendChild(linha3);

    const linha4 = document.createElement('tr');

    const L4Coluna1 = document.createElement('td');
    L4Coluna1.innerHTML = 'Modelo';
    const L4Coluna2 = document.createElement('td');
    L4Coluna2.innerHTML = data.Modelo;

    linha4.appendChild(L4Coluna1);
    linha4.appendChild(L4Coluna2);

    tBody.appendChild(linha4);

    const linha5 = document.createElement('tr');

    const L5Coluna1 = document.createElement('td');
    L5Coluna1.innerHTML = 'Ano / Combustivel';
    const L5Coluna2 = document.createElement('td');
    L5Coluna2.innerHTML = `${data.AnoModelo} / ${data.Combustivel}`;

    linha5.appendChild(L5Coluna1);
    linha5.appendChild(L5Coluna2);

    tBody.appendChild(linha5);

    table.appendChild(tHead);
    
    const linha6 = document.createElement('tr');

    const L6Coluna1 = document.createElement('td');
    L6Coluna1.innerHTML = 'Mês Referencia na Tabela FIPE';
    const L6Coluna2 = document.createElement('td');
    L6Coluna2.innerHTML = data.MesReferencia;

    linha6.appendChild(L6Coluna1);
    linha6.appendChild(L6Coluna2);

    tBody.appendChild(linha6);

    table.appendChild(tHead);
    table.appendChild(tBody);
    return table;
}