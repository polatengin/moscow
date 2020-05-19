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
  symbolList.appendChild(element);
});

});
  });
