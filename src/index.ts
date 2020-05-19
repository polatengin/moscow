Notification.requestPermission();

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
}

function showNotification(company, previous, direction: Direction) {
  });
}
