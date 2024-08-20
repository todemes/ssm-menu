document.addEventListener('DOMContentLoaded', function() {
    const itemInput = document.getElementById('itemInput');
    const suggestions = document.getElementById('suggestions');
    const selectedItems = document.getElementById('selectedItems');
    const copyButton = document.getElementById('copyButton');
    const filterButtons = document.querySelectorAll('.filter-btn');
    let items = [];
    let wordsSet = new Set();
    let currentFilter = 'all';
    let selected = [];

    // Fetch items from items.json
    fetch('items.json')
        .then(response => response.json())
        .then(data => {
            items = data;
            preprocessItems(data);
            displaySuggestions('');
        })
        .catch(error => console.error('Error fetching items:', error));

    function preprocessItems(items) {
        items.forEach(item => {
            const words = item.name.toLowerCase().split(' ');
            words.forEach(word => wordsSet.add(word));
        });
    }

    itemInput.addEventListener('input', function() {
        const query = itemInput.value.toLowerCase();
        displaySuggestions(query);
    });

    itemInput.addEventListener('focus', function() {
        displaySuggestions('');
        suggestions.style.display = 'block';
    });

    function displaySuggestions(query) {
        suggestions.innerHTML = '';
        const queryWords = query.split(' ');

        // Suggest words based on input
        const suggestedWords = Array.from(wordsSet).filter(word => {
            return word.startsWith(queryWords[queryWords.length - 1]);
        });

        suggestedWords.forEach(word => {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.innerHTML = word;
            li.addEventListener('click', function() {
                itemInput.value = itemInput.value.replace(/[^ ]*$/, word);
                suggestions.innerHTML = '';
            });
            suggestions.appendChild(li);
        });
    }

    copyButton.addEventListener('click', function() {
        const text = selected.join('\n');
        navigator.clipboard.writeText(text).then(() => {
            alert('List copied to clipboard!');
        }).catch(err => {
            console.error('Could not copy text: ', err);
        });
    });

    setTimeout(() => {
        itemInput.focus();
    }, 500);
});
