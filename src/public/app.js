document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Fetch Bitcoin data from your API
    const response = await fetch('/api/bitcoin');
    if (!response.ok) {
      throw new Error('Failed to fetch Bitcoin data');
    }

    const contentType = response.headers.get('Content-Type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Response is not JSON');
    }

    const data1 = await response.json();
    console.log("data1:", data1);

    // Add a check for the structure of the data object
    if (data1 && typeof data1 === 'object' && 'btcPrice' in data1) {
      document.getElementById('bitcoinPrice').innerText = `USD $ ${parseFloat(data1.btcPrice).toFixed(2)}`;
      document.getElementById('bitcoinDifficulty').innerText = ` ${data1.btcDifficulty.toFixed(2)} T`;
      document.getElementById('latestBlocks').innerText = ` ${data1.totalBlocks}`;
      document.getElementById('totalTransactions').innerText = ` ${data1.transactionsCount}`;

      // Fetch Bitcoin historical data for the last 30 days
      const dataPoints = [];
      const labels = [];
      for (let i = 0; i < 10; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateString = date.toISOString().split('T')[0];

        const historicalResponse = await fetch(`https://api.coinbase.com/v2/prices/BTC-USD/spot?date=${dateString}`);
        const historicalData = await historicalResponse.json();

        if (historicalData && typeof historicalData === 'object' && 'data' in historicalData && 'amount' in historicalData.data) {
          dataPoints.push(parseFloat(historicalData.data.amount).toFixed(2));
          labels.push(dateString);
        } else {
          console.error('Invalid data format for date:', dateString);
        }
      }

      // Reverse the data points and labels so they are in chronological order
      dataPoints.reverse();
      labels.reverse();

      // Create a line chart using Chart.js
      const ctx = document.getElementById('bitcoinChart').getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Bitcoin Price (USD)',
            data: dataPoints,
            fill: false,
            borderColor: '#F2A900',
            borderWidth: 3,
            lineTension: 0.4
          }]
        },
        options: {
          scales: {
            x: {
              display: false,
              grid: {
                display:false,
              }
            },
            y: {
              grid: {
                display:false,
              },
              beginAtZero: false,
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                title: function(context) {
                  return context[0].label; // Use the label directly as the title
                },
                label: function(context) {
                  return `USD $ ${parseFloat(context.parsed.y).toFixed(2)}`;
                },
              },
            },
          },
          
          interaction: {
            mode: 'index',
            intersect: false,
          },
        },
      });

    } else {
      throw new Error('Invalid data format from your API');
    }
  } catch (error) {
    console.error('Error fetching Bitcoin data:', error);
  }
});
