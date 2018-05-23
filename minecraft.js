const minecraftAPI = 'https://ping.dags.me/mc.ardacraft.me';
const minecraftAPI2 = 'https://status.ardacraft.io/';
const minecraftLink = 'https://ardacraft.me/map';

function initMinecraft(title, content) {
    query(minecraftAPI, title, content, drawMinecraft);
}

function createHeadURL(player) {
    return `https://minotar.net/helm/${player}`;
}

function drawMinecraft(title, content, response) {
    const status = response['data'];
    const minecraftTitle = document.getElementById(title);
    const minecraftContent = document.getElementById(content);

    clear(minecraftTitle);
    clear(minecraftContent);

    var players = status['players'];
    var title = createMCTitle(players);
    minecraftTitle.appendChild(title);

    var sample = players['sample'];
    if (sample !== undefined) {
        for (var i = 0; i < sample.length; i++) {
            var player = sample[i];
            var user = createMCUser(player['name']);
            minecraftContent.appendChild(user);
        }
    }
}

function createMCTitle(status) {
    var online = status['online'];
    var max = status['max'];
    var title = document.createElement('a');

    if (online !== undefined && max !== undefined) {
        title.href = minecraftLink;
        title.target = '_blank'
        title.innerText = `ArdaCraft: ${online} Online`;
    } else {
        title.innerText = 'ArdaCraft: Status Unavailable';
    }

    return title;
}

function createMCUser(player) {
    var container = document.createElement('div');
    container.className = 'server-tooltip';

    var avatar = document.createElement('img');
    avatar.src = createHeadURL(player);

    var tooltip = document.createElement('div');
    tooltip.className = 'server-tooltiptext status-online';
    tooltip.innerText = player;

    container.appendChild(avatar);
    container.appendChild(tooltip);

    return container;
}
