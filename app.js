document.addEventListener('DOMContentLoaded', function() {
    const itemInput = document.getElementById('itemInput');
    const suggestions = document.getElementById('suggestions');
    const selectedItems = document.getElementById('selectedItems');
    const copyButton = document.getElementById('copyButton');
    const filterButtons = document.querySelectorAll('.filter-btn');

    let items = [];
    let currentFilter = 'all';
    let selected = [];

    // Fetch items from items.json
    fetch('items.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            items = data;
            console.log('Items loaded:', items); // Debug: Log the items loaded
            displaySuggestions('');
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            currentFilter = this.getAttribute('data-filter');
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            displaySuggestions(itemInput.value.toLowerCase());
        });
    });

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
        const filteredItems = items.filter(item => {
            return (currentFilter === 'all' || item.type === currentFilter) && item.name.toLowerCase().includes(query);
        });
        console.log('Filtered items:', filteredItems); // Debug: Log filtered items
        filteredItems.forEach(item => {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.innerHTML = `<input type="checkbox" value="${item.name}"> ${item.name}`;
            li.addEventListener('click', function(event) {
                event.stopPropagation();
                const checkbox = li.querySelector('input[type="checkbox"]');
                toggleItem(item.name, li, checkbox);
                itemInput.value = '';
            });
            if (selected.includes(item.name)) {
                li.querySelector('input[type="checkbox"]').checked = true;
                li.classList.add('selected');
            }
            suggestions.appendChild(li);
        });
    }

    function toggleItem(item, li, checkbox) {
        if (selected.includes(item)) {
            removeItem(item);
            li.classList.remove('selected');
            checkbox.checked = false;
        } else {
            addItem(item);
            li.classList.add('selected');
            checkbox.checked = true;
        }
    }

    function addItem(item) {
        selected.push(item);
        updateSelectedItems();
    }

    function removeItem(item) {
        selected = selected.filter(i => i !== item);
        updateSelectedItems();
    }

    function updateSelectedItems() {
        selectedItems.innerHTML = '';
        selected.forEach(item => {
            const li = document.createElement('li');
            li.className = 'list-group-item selected-item';
            li.innerHTML = `${item} <button class="delete-button" style="color: red;">&times;</button>`;
            li.querySelector('.delete-button').addEventListener('click', function() {
                removeItem(item);
                const suggestionItems = Array.from(suggestions.children);
                suggestionItems.forEach(suggestionItem => {
                    if (suggestionItem.textContent.trim() === item) {
                        suggestionItem.querySelector('input[type="checkbox"]').checked = false;
                        suggestionItem.classList.remove('selected');
                    }
                });
            });
            selectedItems.appendChild(li);
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
