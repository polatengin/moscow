const token: string = '';

Notification.requestPermission();

enum Direction {
  'up',
  'down'
}

const companies = [
  { name: 'Microsoft', symbol: 'MSFT', isAdded: false, data: undefined },
  { name: 'Apple', symbol: 'AAPL', isAdded: false, data: undefined },
  { name: 'Amazon', symbol: 'AMZN', isAdded: false, data: undefined },
  { name: 'Facebook', symbol: 'FB', isAdded: false, data: undefined },
  { name: 'Google', symbol: 'GOOGL', isAdded: false, data: undefined },
  { name: 'IBM', symbol: 'IBM', isAdded: false, data: undefined },
  { name: 'Intel', symbol: 'INTC', isAdded: false, data: undefined },
  { name: 'Oracle', symbol: 'ORCL', isAdded: false, data: undefined },
  { name: 'Tesla', symbol: 'TSLA', isAdded: false, data: undefined }
];

const symbolList = document.getElementById('symbol-list');
companies.forEach(item => {
  const element = document.createElement('button');
  element.className = 'list-group-item list-group-item-action';
  element.innerText = `(${item.symbol}) ${item.name}`;

  element.addEventListener('click', () => {
    element.classList.toggle('active');
    element.blur();

    item.isAdded = !item.isAdded;

    refreshStockList();
  });

  symbolList.appendChild(element);
});

const refreshProgress = document.getElementById('refresh-progress');

let _isPaused = false;
setInterval(() => {
  if (!_isPaused && companies.filter(e => e.isAdded).length > 0) {
    let current = parseInt(refreshProgress.style.width.replace('%', ''), 10) - 1;

    if (current === 0) {
      current = 99;

      refreshStockList();
    }

    refreshProgress.style.width = `${current}%`;
  }
}, 100);

document.addEventListener('keydown', (e) => {
  if (e.keyCode === 32) {
    _isPaused = !_isPaused;
  }
});

const stockList = document.getElementById('stock-list');
function refreshStockList() {
  stockList.innerHTML = '';
  for (const company of companies.filter(e => e.isAdded)) {
    fetch(`https://finnhub.io/api/v1/quote?symbol=${company.symbol}&token=${token}`).then(_ => {
      _.json().then(body => {
        const previous = company.data;

        const isRed = company.data && company.data.c > body.c;
        const isGreen = company.data && company.data.c < body.c;

        company.data = body;

        const item = document.createElement('div');
        item.className = `list-group-item list-group-item-action symbol-${company.symbol} list-group-item${ isRed ? '-danger' : '' }${ isGreen ? '-success' : '' }`;

        const div = document.createElement('div');
        div.className = 'd-flex w-100 justify-content-between';

        const _name = document.createElement('h5');
        _name.innerText = company.name;

        const _symbol = document.createElement('small');
        _symbol.innerText = company.symbol;

        const _current = document.createElement('p');
        _current.className = 'mb-1';
        _current.innerText = `${company.data.c}$`;

        const _daily = document.createElement('small');
        _daily.innerText = `Daily Lowest: ${company.data.l}$ , Daily Highest: ${company.data.h}$`;

        div.appendChild(_name);
        div.appendChild(_symbol);

        item.appendChild(div);
        item.appendChild(_current);
        item.appendChild(_daily);

        stockList.appendChild(item);

        if (isRed) {
          showNotification(company, previous, Direction.up);
        }

        if (isGreen) {
          showNotification(company, previous, Direction.down);
        }
      });
    });
  }
}

function showNotification(company, previous, direction: Direction) {
  const options = {
    vibrate: [500, 110, 500, 110, 450, 110, 200, 110, 170, 40, 450, 110, 200, 110, 170, 40, 500],
    icon: '/favicon.png',
    body: `${company.name} (${company.symbol}) is going ${Direction[direction]}. It was ${previous.c}$ now it's ${company.data.c}$`,
    badge: `./${direction === Direction.up ? 'buy' : 'sell'}.png`,
    image: `./${direction === Direction.up ? 'buy' : 'sell'}.png`,
    tag: company.symbol
  };
  const notification = new Notification(company.name, options);

  setTimeout(notification.close.bind(notification), 8000);

  notification.addEventListener('click', (event) => {
    const symbol = (event.target as Notification).tag;
    const element = stockList.getElementsByClassName(`symbol-${symbol}`)[0];
    element.classList.add('selected');
  });
}
