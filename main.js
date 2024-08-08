function openTab(tabName, element) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByTagName("a");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }
    document.getElementById(tabName).style.display = "block";
    element.classList.add("active");
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('a[href="#home"]').click();
    
    document.querySelector('.menu-toggle').addEventListener('click', function() {
        document.querySelector('.nav-links').classList.toggle('active');
    });
});

const yields = {
    milho: {
        m2: 1 / 167,
        ha: 70,
        alq: 220
    },
    soja: {
        m2: 1 / 186,
        ha: 54,
        alq: 174
    },
    trigo: {
        m2: 1 / 134,
        ha: 75,
        alq: 187
    }
};

document.getElementById('plantioForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const area = parseFloat(document.getElementById('area').value);
    const unit = document.getElementById('unit').value;
    const crop = document.getElementById('crop').value;
    const cost = parseFloat(document.getElementById('cost').value);
    const saca = parseFloat(document.getElementById('saca').value);

    if (isNaN(area) || area <= 0) {
        showError('Por favor, insira um valor válido para a área de plantio.');
        return;
    }

    if (isNaN(cost) || cost < 0) {
        showError('Por favor, insira um valor válido para os gastos por unidade de área.');
        return;
    }

    if (isNaN(saca) || saca < 0) {
        showError('Por favor, insira um valor válido para o valor da saca.');
        return;
    }

    const yieldPerArea = yields[crop][unit];

    if (isNaN(yieldPerArea) || yieldPerArea < 0) {
        showError('Por favor, insira um valor válido para o rendimento por unidade de área.');
        return;
    }

    const totalYield = yieldPerArea * area;
    const totalRevenue = saca * totalYield;
    const totalCost = cost * area;
    const profit = totalRevenue - totalCost;

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <p><strong>Tipo de Plantação:</strong> ${crop.charAt(0).toUpperCase() + crop.slice(1)}</p>
        <p><strong>Área de Plantio:</strong> ${area} ${unit}</p>
        <p><strong>Total de Gastos:</strong> R$ ${totalCost.toFixed(2)}</p>
        <p><strong>Total de Rendimento:</strong> ${totalYield.toFixed(2)} sacas</p>
        <p><strong>Total em Receita:</strong> R$ ${totalRevenue.toFixed(2)}</p>
        <p><strong>Lucro:</strong> R$ ${profit.toFixed(2)}</p>
    `;
});

function showError(message) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<p style="color: red;">${message}</p>`;
}
